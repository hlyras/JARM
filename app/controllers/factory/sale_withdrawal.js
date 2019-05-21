var lib = require('../../../config/lib');
var User = require('../../models/user');
var userController = require('../../controllers/user');
var Product = require('../../models/factory/product');
var Sale = require('../../models/factory/sale');
var Withdrawal = require('../../models/factory/sale_withdrawal');

var saleWithdrawalController = {
	index: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				response.render('factory/sale/withdrawal/index');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	save: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				var salesCod = JSON.parse(request.body.sales);
				var sales = [];
				var products = [];
				var withdrawalArray = [];
				var indice = [];

				for(var i in salesCod){
					Sale.get(salesCod[i], function(sale, err){
						sales.push(sale[0]);
						if(sales.length===salesCod.length){
							for(var i in sales){
								if(sales[i].withdrawal!='0'){
									withdrawalArray.push(sales[i]);
									response.send({ msg:'a venda de código: '+sales[i].cod+' já está em outro pedido de retira.' });
									return;
								} else {
									indice.push('.');
								}
							};
							if(withdrawalArray.length<1 && indice.length===salesCod.length){
								Product.list(function(rows, err){
									var productsAmount = [];
									var productsArray = [];
									for(var i in rows){
										rows[i].amount = 0;
										productsAmount.push(rows[i]);
									};
									indice = [];
									for(var i in sales){
										Sale.getProducts(sales[i].cod, function(product, err){
											products.push(product);
											product.forEach(function(prod){
												productsArray.push(prod);
											});
											indice.push('.');
											if(indice.length==sales.length){
												for(var i in productsAmount){
													for(var j in productsArray){
														if(productsAmount[i].id===productsArray[j].product_id){
															productsAmount[i].amount += productsArray[j].amount;
														};
													};
												};
												Product.list(function(compare, err){
													indice = [];
													var overAmount = [];
													for(var i in compare){
														for(var j in productsAmount){
															if(productsAmount[j].id===compare[i].id){
																if(productsAmount[j].amount>compare[i].amount){
																	var over = {
																		id: productsAmount[j].id,
																		type: productsAmount[j].type,
																		name: productsAmount[j].name,
																		color: productsAmount[j].color,
																		amount: productsAmount[j].amount-compare[i].amount
																	};
																	indice.push('.');
																	overAmount.push(over);
																} else {
																	indice.push('.');
																};
															};
														};
													};
													if(overAmount.length>0 && indice.length===compare.length){
														response.send({ overAmount: overAmount });
														return;
													} else if(overAmount.length<1 && indice.length===compare.length){
														productsArray = [];
														for(var i in productsAmount){
															if(productsAmount[i].amount>0){
																productsArray.push(productsAmount[i]);
															};
														};
														// Salva apenas os produtos que tem no pedido através
														// da quantidade acima de 0
														productsArray = [];
														for(var i in productsAmount){
															if(productsAmount[i].amount>0){
																productsArray.push(productsAmount[i]);
															};
														};
														var withdrawal = {
															date: lib.genDate(),
															user: request.cookies.authenticated
														};
														Withdrawal.getId(function(row, err){
															indice = [];
															if(row.length>0){
																if(row[0].status=='0'){
																	indice.push('.');
																	response.send({ msg: "O último pedido de retira ainda não foi confirmado\nfavor tentar novamente após confirmar."});
																	return;
																};
															};
															if(indice.length<1){
																Withdrawal.save(withdrawal, function(done, err){
																	Withdrawal.getId(function(row, err){
																		sales.forEach(function(sale){
																			var info = {
																				withdrawal_id: row[0].id,
																				sale_cod: sale.cod,
																				sale_buyer: sale.name
																			};
																			Withdrawal.saveSales(info, function(done, err){
																				Withdrawal.update(info, function(done, err){
																					indice.push('.');
																					if(indice.length===sales.length){
																						indice = [];
																						productsArray.forEach(function(product){
																							var info = {
																								withdrawal_id: row[0].id,
																								product_id: product.id,
																								product_cod: product.cod,
																								product_info: ""+product.name+" "+product.color,
																								amount: product.amount
																							};
																							Withdrawal.saveProducts(info, function(done, err){
																								indice.push('.');
																								if(indice.length===productsArray.length){
																									var withdrawalCod = {
																										id: row[0].id
																									};
																									Withdrawal.get(withdrawalCod, function(withdrawal, err){
																										Withdrawal.getSales(withdrawalCod, function(withdrawalSales, err){
																											Withdrawal.getProducts(withdrawalCod, function(withdrawalProducts, err){
																												response.send({sales : sales, products: products, withdrawal: withdrawal, withdrawalSales: withdrawalSales, withdrawalProducts: withdrawalProducts });
																												return;
																											});
																										});
																									});
																								};
																							});
																						});
																					};
																				});
																			});
																		});
																	});
																});
															};
														})
													};
												});
											};
										});
									};
								});
							};
						};
					});
				};
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
	filter: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				var withdrawal = {
					id: request.body.withdrawal_id,
					status: request.body.withdrawal_status,
					date: request.body.withdrawal_date
				};
				Withdrawal.filter(withdrawal, function(rows, err){
					response.send({ withdrawals: rows });
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
	show: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		var withdrawal = {
			id: request.body.withdrawal_id
		};

		Withdrawal.get(withdrawal, function(withdrawalRow, err){
			Withdrawal.getSales(withdrawal, function(salesRows, err){
				Withdrawal.getProducts(withdrawal, function(productsRows, err){
					response.send({ withdrawal: withdrawalRow, sales: salesRows, products: productsRows });
				});
			});
		});
	},
	output: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				response.render('factory/storage/output/withdrawal');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	confirm: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				var indice = [];
				var withdrawal = {
					user: request.cookies.authenticated,
					id: request.body.withdrawal_id
				};
				Withdrawal.getProducts(withdrawal, function(withdrawal_products, err){
					Product.list(function(products, err){
						var lower_amount = [];
						for(var i in withdrawal_products){
							for(var j in products){
								if(withdrawal_products[i].product_id==products[j].id && parseInt(products[j].amount) - parseInt(withdrawal_products[i].amount)<0){
									var lower = {
										id: products[j].id,
										type: products[j].type,
										name: products[j].name,
										color: products[j].color,
										amount: products[j].amount-withdrawal_products[i].amount
									};
									lower_amount.push(lower);
								}
							};
							indice.push('.');
						};
						if(indice.length==withdrawal_products.length && lower_amount.length>0){
							if(lower_amount.length>0){
								response.send({ lower_amount: lower_amount});
								return;
							};
						} else if(indice.length==withdrawal_products.length && lower_amount.length<1){
							indice = [];
							for(var i in withdrawal_products){
								for(var j in products){
									if(withdrawal_products[i].product_id==products[j].id && parseInt(products[j].amount) - parseInt(withdrawal_products[i].amount)>=0){
										var withdrawalOutput = {
											product_id: products[j].id,
											total_amount: parseInt(products[j].amount) - parseInt(withdrawal_products[i].amount)
										};
										Product.updateAmount(withdrawalOutput, function(done, err){
										});
										indice.push('.');
									};
								};
							};
							if(indice.length==withdrawal_products.length){
								Withdrawal.approve(withdrawal, function(done, err){
									response.send({ done: 'Pedido de retira confirmada com sucesso!' });
									return;
								});
							};
						};
					});
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	}
};

module.exports = saleWithdrawalController;