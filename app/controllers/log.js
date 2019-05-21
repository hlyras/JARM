var lib = require('../../config/lib');
var User = require('../models/user');
var Log = require('../models/log');

var logController = {
	login: function(request, response, next){
		'use strict';

		response.render('login', { warn: 'Para sua segurança nunca salve sua senha.' });
	},
	authenticate: function(request, response, next){
		'use strict';

		var user = new User();
		var indice = [];
		User.list(function(rows, err){
			for(var i in rows){
				if(rows[i].login === request.body.user && rows[i].password === request.body.password){
					response.cookie('authenticated', rows[i].login, { maxAge:1800000, httpOnly: true });
					var login = new Log();
					login.date = lib.genFullDate();
					login.user = request.body.user;
					login.status = "in";
					Log.save(login, function(done, err){
						response.redirect('/');
						return;
					});
				} else {
					indice.push('.');
				};
			};
			if(indice.length===rows.length){
				response.render('login', { warn: 'Usuário ou senha inválidos.' });
			};
		});
	},
	logout: function(request, response, next){
		'use strict';

		var login = new Log();
		login.date = lib.genFullDate();
		login.user = request.cookies.authenticated;
		login.status = "out";
		Log.save(login, function(done, err){
			response.clearCookie('authenticated');
			response.redirect('/');
		})
	}
};

module.exports = logController;