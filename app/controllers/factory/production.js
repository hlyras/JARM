var lib = require('../../../config/lib');
var User = require('../../models/user');
var userController = require('../../controllers/user');
var Product = require('../../models/factory/product');
var Production = require('../../models/factory/production');
var ProductionInput = require('../../models/factory/production_input');

var productionController = {
	index: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				response.render('factory/production/index');
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
				response.render('factory/production/register');
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
				response.render('factory/production/manage');

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
				if(request.body.origin!=""&& request.body.provider!="" && request.body.product!="" && request.body.amount!="" && request.body.status!=""){
					var production = new Production();
					production.date = lib.genDate();
					production.origin = request.body.origin;
					production.provider = request.body.provider;
					production.product = request.body.product;
					production.amount = request.body.amount;
					production.status = request.body.status;
					production.obs = request.body.obs;
					production.save(function(done, err){
						response.send({ done: 'Pedido de produção registrado com sucesso.' });
					});
				} else {
					response.send({ msg: 'É necessário completar todos os campos'});
				}
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
				response.render('login', { warn: 'Usuário não autorizado.' });
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
				var production = {
					date:request.body.date, 
					origin:request.body.origin, 
					provider: request.body.provider, 
					status: request.body.status,
					product: request.body.product
				};
				Production.filter(production, function(productions, err){
					Product.list(function(products, err){
						for(var i in productions){
							for(var j in products){
								if(parseInt(productions[i].product)===products[j].id){
									productions[i].product_name = products[j].cod+" "+products[j].name+" "+products[j].color;
								};
							};
						};
						response.send({ productions: productions });
					});
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado." });
			};
		});
	},
	show: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		Production.get(request.body.production_id, function(row, err){
			ProductionInput.get(request.body.production_id, function(rows, err){
				Product.get(request.body.product_id, function(product, err){
					row[0].product = product[0].name;
					for(var i in rows){
						if(rows[i].checked=='0'){
							rows[i].checked = 'Ag.confirmação';
						} else {
							rows[i].checked = 'Confirmado';
						};
						rows[i].product_id = row[0].product;
					};
					response.send({production:row, productionInputs: rows});
				});
			});
		});
	},
	remove: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				Production.remove(request.body.production_id, function(){
					response.send({ done: "Pedido excluído com sucesso" });
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
	send: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				Production.send(request.body.production_id, function(rows, err){
					response.send({ done: "Atualizado com sucesso" });
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
	update: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				var production = {
					date: lib.genDate(),
					production_id: request.body.production_id,
					product_id: request.body.product_id,
					product: request.body.product,
					amount: request.body.amount,
					received_amount: request.body.received_amount,
					status: request.body.status,
					checked: request.body.checked,
					user: request.cookies.authenticated,
					obs: request.body.obs,
					done: request.body.done
				};
				ProductionInput.save(production, function(rows, err){
					Production.checked(production, function(row, err){
						Production.updateObs(production, function(done, err){
							if(production.done=='1'){
								Production.done(production, function(done, err){
									response.send({ done: "Atualização feita com sucesso, aguarde até conferência." });
								});
							} else {
								response.send({ done: "Atualização feita com sucesso, aguarde até conferência." });
							};
						});
					});
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

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				var indice = [];
				var productsReported = [];
				var production = {
					product_id:request.body.product_id,
					status:request.body.status,
					done:request.body.done,
					month:request.body.month
				};
				console.log(production);
				Production.filterSituation(production, function(rows, err){
					console.log(rows);
					Product.list(function(products, err){
						for(var i in products){
							var productInstance = {
								id:products[i].id,
								cod:products[i].cod,
								name:products[i].name,
								color:products[i].color,
								status:production.status,
								done:production.done,
								month:production.month,
								requestedAmount:0,
								deliveredAmount:0
							};
							productsReported.push(productInstance);
						};
						if(production.month!='0'){
							var productions = lib.colectByMonth(production.month, rows);
						} else {
							var productions = rows;
						};
						for(var i in productions){
							for(var j in productsReported){
								if(productions[i].product==productsReported[j].id){
									productsReported[j].requestedAmount += productions[i].amount;
									productsReported[j].deliveredAmount += productions[i].confirmed_amount;
									productions[i].productName = productsReported[j].name;
								};
							};
						};
						products = [];
						for(var i in productsReported){
							if(productsReported[i].requestedAmount>0){
								products.push(productsReported[i]);
							};
						};
						response.send({productions: productions, products: products });
					});
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	}
};

module.exports = productionController;