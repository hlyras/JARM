var lib = require('../../config/lib');
var Portifolio = require('../models/portfolio');

var portfolioController = {
	index: function(request, response, next){
		'use strict'

		Portifolio.list(function(rows, err){
			if(!err){
				response.render('portfolio/index', { products: rows });
			} else {
				response.send('Erro favor entrar em contato com suporte');
			};
		});
	},
	table: function(request, response, next){
		'use strict'

		Portifolio.list(function(rows, err){
			if(!err){
				response.render('portfolio/table', { products: rows });
			} else {
				response.send('Erro favor entrar em contato com suporte');
			};
		});
	},
	press: function(request, response, next){
		'use strict'

		Portifolio.list(function(rows, err){
			if(!err){
				response.render('portfolio/press', { products: rows });
			} else {
				response.send('Erro favor entrar em contato com suporte');
			};
		});
	}
};

module.exports = portfolioController;