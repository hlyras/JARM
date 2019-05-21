var lib = require('../../config/lib');
var User = require('../models/user');

var userController = {
	verify: function(request, response, next){
		'use strict';
		
		if(request.cookies == undefined || request.cookies.authenticated == undefined){
			response.render('login', { warn: 'Usuário não autorizado.' });
			return false;
		}
		return true;
	},
	verifyAcess: function(request, response, next){
		'use strict';
		
		if(request.cookies == undefined || request.cookies.authenticated == undefined){
			response.send({ unauthorized: 'Usuário não autorizado.' });
			return false;
		}
		return true;
	},
	permission: function(request, response, array, callback){
		'use strict';
		
		var user = {login:request.cookies.authenticated};
		var indice = [];
		User.get(user, function(row, err){
			for(var i in array){
				if(row[0].access!=array[i]){
					indice.push('.');
				} else {
					callback(true);
				};
			};
			if(array.length==indice.length){
				callback(false);
			};
		});
	},
	index: function(request, response, next){
		'use strict'
		
		if(!userController.verify(request, response)){
			return;
		};
		
		var user = new User();
		user.login = request.cookies.authenticated;
		User.get(user, function(rows, err){
			response.render('users/index', { userId: rows[0].id, userLogin: rows[0].login, userAccess: rows[0].access, userName: rows[0].name, userOccupation: rows[0].occupation });
		});
	}
};

// userController.permission(request, response, ['a1'], function(done){
// 	if(done){

// 	} else {
// 		response.send({ unauthorized: "Usuário não autorizado."});
// 		response.render('login', { warn: 'Usuário não autorizado.' });
// 	};
// });

module.exports = userController;