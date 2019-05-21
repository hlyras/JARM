var lib = require('../../config/lib');
var User = require('../models/user');
var userController = require('../controllers/user');

var homeController = {
	index: function(request, response, next){
		'use strict';

		if(request.cookies == undefined || request.cookies.authenticated == undefined){
			response.render('index');
			return;
		} else {
			userController.permission(request, response, ['a1'], function(done){
				if(done){
					response.render('home');
				} else {
					response.render('home');
				};
			});
		};
	},
	store: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				response.render('store/index');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	factory: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				response.render('factory/index');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	}
};

module.exports = homeController;