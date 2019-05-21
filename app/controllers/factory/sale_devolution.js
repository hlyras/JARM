var lib = require('../../../config/lib');
var User = require('../../models/user');
var userController = require('../../controllers/user');
var Product = require('../../models/factory/product');
var Sale = require('../../models/factory/sale');
var Devolution = require('../../models/factory/sale_devolution');

var saleDevolutionController = {
	index: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				response.render('factory/sale/devolution/index');
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
				var sale = {
					sale_cod:request.body.sale_cod, 
					sale_devolution_id: parseInt(request.body.sale_devolution_id),
					user: request.cookies.authenticated 
				};
				Sale.list(function(rows, err){
					for(var i in rows){
						if(sale.sale_devolution_id===rows[i].dev_cod){
							response.send({ msg:'Esse código de devolução já pertence a outro pedido' });
							return;
						};
					};
					Devolution.list(function(rows, err){
						var indice = [];
						for(var i in rows){
							if(sale.sale_devolution_id==rows[i].cod){
								Devolution.register(sale, function(done, err){
									response.send({ done: 'Devolução finalizada com sucesso!' });
								});
							} else {
								indice.push('.');
							};
						};
						if(indice.length==rows.length);{
							response.send({ msg: "Código de devolução inválido" });
							return;
						};
					});
				});
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
				var indice = [];
				var devolution = {
					date: lib.genDate(),
					sale_origin: request.body.sale_origin,
					sale_cod: request.body.sale_cod,
					sale_name: request.body.sale_name,
					user: request.cookies.authenticated,
					products: JSON.parse(request.body.devolution_products)
				};

				Sale.list(function(sales, err){
					indice = [];
					for(var i in sales){
						if(sales[i].cod==devolution.sale_cod && sales[i].dev_cod==0 && sales[i].status=='em-devolucao'){
							Devolution.save(devolution, function(done, err){
								Devolution.getId(function(last_devolution, err){
									indice = [];
									for(var i in devolution.products){
										var devolution_product = {
											devolution_id: last_devolution[0].id,
											sale_cod: devolution.sale_cod,
											product_id: devolution.products[i].product_id,
											product_info: devolution.products[i].product,
											amount: devolution.products[i].amount
										};
										Devolution.saveProducts(devolution_product, function(done, err){
										});
										indice.push('.');
									};
									if(indice.length==devolution.products.length){
										var input = {
											sale_cod: devolution.sale_cod,
											sale_new_status: 'devolucao',
											sale_devolution_id: last_devolution[0].id,
											user: request.cookies.authenticated
										};
										Sale.updateStatus(input, function(done, err){
											response.send({ done: 'Devolução registrada com sucesso.', devolution: devolution });
											return;
										});
									};
								});

							});
						} else {
							indice.push('.');
							if(indice.length==sales.length){
								response.send({ msg: "Esta venda não está em devolução."});
							};
						};
					};
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
				var devolution = {
					sale_origin:request.body.devolution_sale_origin,
					sale_cod:request.body.devolution_sale_cod,
					sale_name: request.body.devolution_sale_name,
					status: request.body.devolution_status,
					date:request.body.devolution_date
				};
				Devolution.filter(devolution, function(rows, err){
					if(devolution.sale_cod!=""){
						var array = [];
						for(var i in rows){
							if(rows[i].sale_cod===devolution.sale_cod){
								array.push(rows[i]);
							};
						};
						response.send({ devolutions: array });
					} else {
						response.send({ devolutions: rows });
					};
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
	get: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		var sale_devolution = {
			id: request.body.devolution_id
		};

		if(sale_devolution.id=='0' || sale_devolution.id=='null'){
			response.send({ msg: 'Não há devolução para este pedido.' });
			return;
		} else {
			Devolution.get(sale_devolution, function(devolution, err){
				Devolution.getProducts(sale_devolution, function(products, err){
					devolution[0].products = products;
					response.send({ devolution: devolution });
				});
			});
		};
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
	confirm: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				var indice = [];
				var devolution = {
					user: request.cookies.authenticated,
					id: request.body.devolution_id
				};
				Devolution.getProducts(devolution, function(devolution_products, err){
					Product.list(function(products, err){
						for(var i in devolution_products){
							for(var j in products){
								if(devolution_products[i].product_id===products[j].id){
									var devolution_input = {
										product_id: products[j].id,
										total_amount: parseInt(products[j].amount) + parseInt(devolution_products[i].amount)
									};
									Product.updateAmount(devolution_input, function(done, err){
									});
									indice.push('.');
								};
							};
							if(indice.length==devolution_products.length){
								Devolution.approve(devolution, function(done, err){
									response.send({ done: 'Devolução confirmada com sucesso!' });
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

module.exports = saleDevolutionController;