var lib = require('../../config/lib');
var User = require('../models/user');
var userController = require('../controllers/user');
var Customer = require('../models/customer');
var Store_sale = require('../models/store/store_sale');

var customerController = {
	index: function(request, response, next){

	},
	save: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				var customer = {
					name: request.body.customer_name,
					cpf: request.body.customer_cpf,
					phone: request.body.customer_phone 
				};
				
				console.log(customer);

				Customer.getByCPF(customer.cpf, function(row, err){
					if(row.length>0){
						response.send({ msg: 'este CPF já está cadastraddo' });
						return;	
					} else if(row.length<1){
						Customer.save(customer, function(done, err){
							response.send({ done: 'Cadastro realizado com sucesso', customer: customer });
							return;
						});
					};
				});
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

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				var customer = {
					name: request.body.customer_name,
					cpf: request.body.customer_cpf 
				};
				console.log(customer);
				Customer.filter(customer, function(rows, err){
					response.send({ customers: rows });
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

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				var customer = {
					cpf: request.body.customer_cpf,
					sales: []
				};
				Customer.getByCPF(customer.cpf, function(row, err){
					Store_sale.getByCPF(customer.cpf, function(rows, err){
						row[0].sales = rows;

						response.send({ customer: row });
					});
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
}

module.exports = customerController;