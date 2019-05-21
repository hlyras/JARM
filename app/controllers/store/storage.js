var lib = require('../../../config/lib');
var User = require('../../models/user');
var userController = require('../../controllers/user');

var storeStorageController = {
	index: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				response.render('store/storage/index');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	input: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				response.render('store/storage/input/index');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	output: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				response.render('store/storage/output/index');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	}
};

module.exports = storeStorageController;