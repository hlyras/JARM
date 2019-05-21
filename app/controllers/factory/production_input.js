var lib = require('../../../config/lib');
var User = require('../../models/user');
var userController = require('../../controllers/user');
var Product = require('../../models/factory/product');
var Production = require('../../models/factory/production');
var ProductionInput = require('../../models/factory/production_input');

var productionInputController = {
	index: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				response.render('factory/storage/input/production');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
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
				var input = {
					cod: request.body.cod,
					product: request.body.product,
					status: request.body.status, 
					date:request.body.date,
					checked:request.body.inputCheck
				};
				ProductionInput.filter(input, function(rows, err){
					var list = [];
					if(input.cod!='' && input.cod!=undefined){
						var cod = parseInt(input.cod);
						for(var i in rows){
							if(cod===rows[i].production_id){
								list.push(rows[i]);
							};
						};
					} else {
						list = rows;
					};
					response.send({ productions: list });
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
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
				var user = request.cookies.authenticated;
				var production = {
					input_id: request.body.input_id,
					production_id: parseInt(request.body.production_id),
					product_id: request.body.product_id,
					amount: request.body.amount,
					status: request.body.status,
					received_amount: 0,
					total_amount: 0,
					user: user
				};

				Product.get(production.product_id, function(row, err){
					production.total_amount = parseInt(row[0].amount) + parseInt(production.amount);
					console.log(production.totalAmount)
					Product.updateAmount(production, function(r, err){
						Production.getConfirmedAmount(parseInt(production.production_id), function(received, err){
							production.received_amount += parseInt(received[0].confirmed_amount);
							Production.update(production, function(ro, err){
								ProductionInput.approve(production, function(rows, err){
									response.send({ done: "Confirmação de entrada realizada com sucesso." });
								});
							});
						});
					});
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
};

module.exports = productionInputController;