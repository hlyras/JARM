var lib = require('../../../config/lib');
var User = require('../../models/user');
var userController = require('../../controllers/user');
var Product = require('../../models/factory/product');
var Sale = require('../../models/factory/sale');
var Devolution = require('../../models/factory/sale_devolution');

var saleController = {
	index: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				response.render('factory/sale/index');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	register: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				response.render('factory/sale/register');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	manage: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				response.render('factory/sale/manage');
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
				var sale = new Sale();
				sale.date = lib.genDate();
				sale.origin = request.body.sale_origin;
				sale.cod = request.body.sale_cod;
				sale.name = request.body.sale_name;
				sale.user = request.cookies.authenticated;
				sale.status = 'preparacao';

				var sale_products = JSON.parse(request.body.sale_products);

				Sale.list(function(rows, err){
					for(var i in rows){
						if(rows[i].cod===sale.cod){
							response.send({ msg: 'Este código já está cadastrado' });
							return;
						};
					};
					Sale.save(sale, function(done, err){
						var indice = [];
						for(var i in sale_products){
							var sale_product = {
								sale_cod: sale.cod,
								product_id: sale_products[i].product_id,
								product_info: sale_products[i].product,
								amount: sale_products[i].amount
							};
							Sale.saveProducts(sale_product, function(done, err){
							});
							indice.push('.');
						};
						if(indice.length==sale_products.length){
							response.send({ done: 'Venda cadastrada com sucesso!'});
							return;
						};
					});
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
	filter: function(request, response, next){
		'use strict'

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				var sale = {
					date: request.body.sale_date, 
					origin: request.body.sale_origin, 
					cod: request.body.sale_cod, 
					name: request.body.sale_name,
					status: request.body.sale_status
				};
				Sale.filter(sale, function(sales, err){
					response.send({ sales: sales });
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

		Sale.get(request.body.sale_cod, function(sale, err){
			Sale.getProducts(request.body.sale_cod, function(products, err){
				response.send({ sale: sale, products: products });
			});
		});
	},
	print: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		var sales_cod = JSON.parse(request.body.sales);
		var sales = [];
		var products = [];

		for(var i in sales_cod){
			Sale.get(sales_cod[i], function(sale, err){
				sales.push(sale[0]);
				if(sales.length===sales_cod.length){
					for(var j in sales_cod){
						Sale.getProducts(sales_cod[j], function(product, err){
							products.push(product);
							if(products.length===sales_cod.length){
								response.send({sales : sales, products: products});
								return;
							}
						});
					};
				};
			});
		};
	},
	update: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				var indice = [];
				var sale = {
					date:lib.genDate(),
					sale_origin:request.body.sale_origin,
					sale_cod:request.body.sale_cod,
					sale_name:request.body.sale_name,
					sale_withdrawal_id: request.body.sale_withdrawal_id,
					sale_devolution_id: request.body.sale_devolution_id,
					sale_new_status: request.body.sale_new_status,
					user: request.cookies.authenticated,
					devolution_create: request.body.devolution_create
				};

				if(sale.sale_new_status=='enviado' && sale.sale_withdrawal_id=='0'){
					response.send({ msg: 'Não é possível atualizar pedidos sem retira.' });
					return;
				} else if(sale.sale_new_status=='enviado' && sale.sale_withdrawal_id!='0' && sale.sale_withdrawal_id>0){
					sale.sale_devolution_id = 0;
					Sale.updateStatus(sale, function(done, err){
						response.send({ msg: 'Pedido enviado com sucesso.' });
						return;
					});
				} else if(sale.sale_new_status=='cancelado' && sale.sale_withdrawal_id=='0'){
					sale.sale_devolution_id = 0;
					Sale.updateStatus(sale, function(done, err){
						response.send({ done: 'Pedido cancelado com sucesso!' });
						return;
					});
				} else if(sale.sale_new_status=='cancelado' && sale.sale_withdrawal_id>0){
					Devolution.save(sale, function(done, err){
						Devolution.getId(function(last_devolution, err){
							sale.sale_devolution_id = last_devolution[0].id;
							Sale.updateStatus(sale, function(done, err){
								Sale.getProducts(sale.sale_cod, function(sale_products, err){
									for(var i in sale_products){
										var devolution_product = {
											devolution_id: last_devolution[0].id,
											sale_cod: sale.sale_cod,
											product_id: sale_products[i].product_id,
											product_info: sale_products[i].product_info,
											amount: sale_products[i].amount
										};
										Devolution.saveProducts(devolution_product, function(done, err){
										});
										indice.push('.');
									};
									if(indice.length==sale_products.length){
										var sale_devolution = {
											id: sale.sale_devolution_id
										};
										Devolution.get(sale_devolution, function(devolution, err){
											Devolution.getProducts(sale_devolution, function(products, err){
												devolution[0].products = products;
												response.send({ done_devolution: 'Pedido atualizado para cancelado e \ngerado o código de devolução: '+last_devolution[0].id, devolution: devolution });
												return;
											});
										});
									};
								});
							});
						});
					});
				} else if(sale.sale_new_status=='cancelado' && sale.sale_withdrawal_id<0){
					response.send({ msg: 'O código de retira é invalido.'})
					return;
				} else if(sale.sale_new_status=='em-devolucao' && sale.sale_withdrawal_id>0){
					sale.sale_devolution_id = 0;
					Sale.updateStatus(sale, function(done, err){
						response.send({ done: 'Devolução registrada.' });
						return;
					});
				} else if(sale.sale_new_status=='devolucao' && sale.sale_devolution_id>0){
					Sale.list(function(rows, err){
						var indice = [];
						for(var i in rows){
							if(rows[i].dev_cod==sale.sale_devolution_id){
								response.send({ msg: 'O código de devolução informado pertence a outra venda.'})
								return;
							} else {
								indice.push('.');
								if(indice.length==rows.length){
									Devolution.list(function(rows, err){
										var indice = [];
										for(var i in rows){
											if(rows[i].id==sale.sale_devolution_id){
												Sale.updateStatus(sale, function(done, err){
													response.send({ done: 'Devolução registrada.' });
													return;
												});
											} else {
												indice.push('.');
												if(indice.length==rows.length){
													response.send({ msg: "Código de devolução não existe." });
													return;
												};
											};
										};
									});
								}
							};
						};
					});
				}
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
	filterUnwithdrawal: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				Sale.filterUnwithdrawal(function(rows, err){
					var unwithdrawals = [];
					for(var i in rows){
						if(rows[i].status!='cancelado'){
							unwithdrawals.push(rows[i]);
						};
					};
					response.send({ sales: unwithdrawals });
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
	report: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		var indice = [];
		var products_reported = [];
		var salesReported = [];
		var sale = {
			product_id: request.body.id,
			month: request.body.month,
			status: request.body.status
		};
		userController.permission(request, response, ['a1'], function(done){
			if(done){
				if(sale.product_id!=undefined){
					Sale.filterSituation(sale, function(rows, err){
						Sale.filterProducts(sale, function(sale_products, err){
							Product.list(function(products, err){
								if(sale.month!='0'){
									var sales = lib.colectByMonth(sale.month, rows);
								} else {
									var sales = rows;
								};
								for(var i in sales){
									for(var j in sale_products){
										if(sales[i].cod==sale_products[j].sale_cod){
											salesReported.push(sales[i]);
										};
									};
								};
								response.send({ sales: salesReported, products: sale_products });
							});
						});
					});
				} else {
					Sale.filterSituation(sale, function(rows, err){
						Sale.listProducts(function(sale_products, err){
							Product.list(function(products, err){
								for(var i in products){
									var input = {
										id:products[i].id,
										cod:products[i].cod,
										name:products[i].name,
										color:products[i].color,
										status:sale.status,
										month:sale.month,
										amount:0
									};
									products_reported.push(input);
								};
								if(sale.month!='0'){
									var sales = lib.colectByMonth(sale.month, rows);
								} else {
									var sales = rows;
								};
								products = [];
								for(var i in sales){
									for(var j in sale_products){
										if(sales[i].cod==sale_products[j].sale_cod){
											products.push(sale_products[j]);
										};
									};
								};
								for(var i in products_reported){
									for(var j in products){
										if(products_reported[i].id==products[j].product_id){
											products_reported[i].amount += products[j].amount;
										};
									};
								};
								products = [];
								for(var i in products_reported){
									if(products_reported[i].amount>0){
										products.push(products_reported[i]);
									};
								};
								response.send({ sales: sales, products: products });
							});
						});
					});
				};
			} else {
				response.send({ unauthorized: "Usuário não autorizado." });
			};
		});
	}
};

module.exports = saleController;