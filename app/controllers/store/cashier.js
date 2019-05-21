var lib = require('../../../config/lib');
var User = require('../../models/user');
var userController = require('../../controllers/user');
// var Product = require('../../models/factory/product');
var Store_product = require('../../models/store/store_product');
var Store_sale = require('../../models/store/store_sale');
var Customer = require('../../models/customer');
var Cashier = require('../../models/store/cashier');

var cashierController = {
	index: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				Cashier.getLast(function(last_cashier, err){
					if(last_cashier[0]==undefined){
						response.render('store/cashier/open', { msg: 'Digite seu login e senha para abrir o caixa.' });
						return;
					} else {
						if(last_cashier[0].status=='1'){
							response.render('store/cashier/index', { cashier: last_cashier[0] });
						} else if(last_cashier[0].status=='2'){
							response.render('store/cashier/open', { msg: 'Digite seu login e senha para abrir o caixa.' });
						};
					};
				});
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	open: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};
		// (date, value, open_date, close_date, status, user)
		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				var cashier = {
					date: lib.genDate(),
					value: 0,
					open_date: lib.genFullDate(),
					status: '1',
					login: request.cookies.authenticated
				};

				User.get(cashier, function(user, err){
					if(user[0].login===request.body.user && user[0].password===request.body.password){
						Cashier.open(cashier, function(done, err){
							response.send({ done: 'Caixa aberto.' });
						});
					} else {
						response.send({ msg: 'Login ou senha incorreto(s).' });
					};
				});
			} else {
				response.send({ unauthorized: 'Usuário não autorizado.' });
			};
		});
	},
	close: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};
		// (date, value, open_date, close_date, status, user)
		userController.permission(request, response, ['a1', 'a2'], function(done){
			if(done){
				var cashier = {
					close_date: lib.genFullDate(),
					status: '2',
					login: request.cookies.authenticated
				};

				User.get(cashier, function(user, err){
					if(user[0].login===request.body.user && user[0].password===request.body.password){
						Cashier.getLast(function(last_cashier, err){
							if(last_cashier[0].value==0){
								cashier.id = last_cashier[0].id;
								Cashier.close(cashier, function(done, err){
									response.send({ done: 'Caixa '+cashier.id+' fechado com sucesso!' });
								});
							} else {
								response.send({ msg: 'Valor do caixa deve ser zerado antes do fechamento.' })
							};
						});
					} else {
						response.send({ msg: 'Usuário não autorizado.' });
					};
				});
			} else {
				response.send({ unauthorized: 'Usuário não autorizado.' });
			};
		});
	},
	menu: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				Cashier.getLast(function(last_cashier, err){
					if(last_cashier[0]==undefined){
						response.render('store/cashier/open', { msg: 'Digite seu login e senha para abrir o caixa.' });
						return;
					} else {
						Cashier.filterDrain(last_cashier[0].id, function(drains, err){
							var total_drain = 0;
							drains.forEach(function(drain){
								total_drain += drain.value;
							});
							if(last_cashier[0].status=='1'){
								response.render('store/cashier/close', { cashier: last_cashier[0], total_drain: total_drain });
							} else if(last_cashier[0].status=='2'){
								response.render('store/cashier/open', { msg: 'Digite seu login e senha para abrir o caixa.' });
							};
						});
					};
				});
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	drain: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		var drain = {
			value: request.body.drain_value,
			full_date: lib.genFullDate(),
			login: request.cookies.authenticated,
			status: '0',
			user: request.body.user,
			password: request.body.password
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				User.list(function(users, err){
					var indice = [];
					users.forEach(function(user){
						if(drain.user==user.login&&drain.password==user.password){
							Cashier.getLast(function(last_cashier, err){
								drain.cashier_id = last_cashier[0].id;
								if(last_cashier[0].value<drain.value){
									response.send({ msg: 'Valor da sangria não pode ser maior que o valor do caixa.' });
									return;
								} else if(last_cashier[0].value>=drain.value){
									if(drain.value>0){
										Cashier.drain(drain, function(done, err){
											Cashier.filterDrain(drain.cashier_id, function(drains, err){
												var total_drain = 0;
												drains.forEach(function(drain){
													total_drain += drain.value;
												});
												last_cashier[0].value = parseFloat(last_cashier[0].total_value) - parseFloat(total_drain);
												Cashier.updateValue(last_cashier[0].value, function(done, err){
													response.send({ done: 'Sangramento concluído.', total_drain: total_drain, last_cashier: last_cashier[0] });
													return;
												});
											});
										});
									} else {
										response.send({ msg: 'Sangrias sem valor não são permitidas.' });
									};
								};
							});
						} else {
							indice.push('.');
							if(indice.length==users.length){
								response.send({ msg: 'Usuário não autorizado' });
								return;
							};
						};
					});
				});
			} else {
				response.send({ unauthorized: 'Usuário não autorizado.' });
			};
		});
	},
	listStoreSale: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				Cashier.getLast(function(last_cashier, err){
					if(last_cashier[0]==undefined){
						response.render('store/cashier/open', { msg: 'Digite seu login e senha para abrir o caixa.' });
						return;
					} else {
						if(last_cashier[0].status=='1'){
							Store_sale.getByCashier(last_cashier[0].id, function(store_sales, err){
								response.send({ store_sales: store_sales });
							});
						} else if(last_cashier[0].status=='2'){
							response.render('store/cashier/open', { msg: 'Digite seu login e senha para abrir o caixa.' });
						};
					};
				});
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	listDrain: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				Cashier.getLast(function(last_cashier, err){
					if(last_cashier[0]==undefined){
						response.render('store/cashier/open', { msg: 'Digite seu login e senha para abrir o caixa.' });
						return;
					} else {
						if(last_cashier[0].status=='1'){
							Cashier.filterDrain(last_cashier[0].id, function(drains, err){
								response.send({ drains: drains });
							});
						} else if(last_cashier[0].status=='2'){
							response.render('store/cashier/open', { msg: 'Digite seu login e senha para abrir o caixa.' });
						};
					};
				});
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	}
};

module.exports = cashierController;