var lib = require('../../../config/lib');
var User = require('../../models/user');
var userController = require('../../controllers/user');
var Product = require('../../models/factory/product');
var Store_product = require('../../models/store/store_product');
var Store_supply = require('../../models/store/store_supply');

var storeSupplyController = {
	index: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				response.render('store/storage/input/supply/index');
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
				response.render('store/storage/input/supply/register');
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
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
				response.render('store/storage/input/supply/manage');
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
	output: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				response.render('factory/storage/output/store_supply');
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
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

				var supply = {
					date: lib.genDate(),
					user: request.cookies.authenticated,
					obs: request.body.obs,
					products: JSON.parse(request.body.products)
				};

				Product.list(function(products, err){
					lib.verifyAmount(supply.products, products, function(done, overAmount){
						if(done){
							response.send({ overAmount: overAmount });
							return;
						} else {
							Store_supply.save(supply, function(done, err){
								Store_supply.getLast(function(last_supply, err){
									var indice = [];
									console.log(last_supply)
									console.log(last_supply[0]);
									for(var i in supply.products){
										var input = {
											supply_id:last_supply[0].id,
											product_id:supply.products[i].product_id,
											product_info:supply.products[i].product,
											amount:supply.products[i].amount
										};
										console.log(input);
										Store_supply.saveProducts(input, function(done, err){
										});
										indice.push('.');
									};
									if(indice.length==supply.products.length){
										response.send({ done: "Pedido cadastrado com sucesso."});
										return;
									};
								});
							});
						}
					});
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado." });
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
				var supply = {
					status: request.body.status,
					date:request.body.date
				};
				Store_supply.filter(supply, function(rows, err){
					response.send({ supplys: rows });
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

		var supply = {
			id: parseInt(request.body.store_supply_id)
		};

		console.log(supply);
		Store_supply.get(supply, function(row, err){
			Store_supply.getProducts(supply, function(rows, err){
				row[0].products = rows;
				response.send({ supply: row });
			});
		});
	},
	input: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				response.render('factory/storage/input/devolution');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	approve: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				var indice = [];
				var store_supply = {
					user: request.cookies.authenticated,
					id: request.body.store_supply_id,
					products: []
				};

				Store_supply.getProducts(store_supply, function(supply_products, err){
					Product.list(function(products, err){
						lib.verifyAmount(supply_products, products, function(done, overAmount){
							if(done){
								response.send({ overAmount: overAmount });
								return;
							} else {
								for(var i in supply_products){
									for(var j in products){
										if(supply_products[i].product_id===products[j].id){
											var supply_output = {
												product_id: products[j].id,
												total_amount: parseInt(products[j].amount) - parseInt(supply_products[i].amount)
											};
											Product.updateAmount(supply_output, function(done, err){
											});
											indice.push('.');
										};
									};
								};
								if(indice.length==supply_products.length){
									indice = [];
									Store_product.list(function(store_products, err){
										for(var i in supply_products){
											for(var j in store_products){
												if(supply_products[i].product_id===store_products[j].id){
													var supply_input = {
														product_id: store_products[j].id,
														total_amount: parseInt(store_products[j].amount) + parseInt(supply_products[i].amount)
													};
													Store_product.updateAmount(supply_input, function(done, err){
													});
													indice.push('.');
												};
											};
										};
										if(indice.length==supply_products.length){
											Store_supply.approve(store_supply, function(done, err){
												console.log('confirmado');
												response.send({ done: 'Abastecimento confirmado com sucesso!' });
											});
										};
									});
								};
							};
						});
					});
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	}
};

module.exports = storeSupplyController;