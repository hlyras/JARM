var lib = require('../../../config/lib');
var User = require('../../models/user');
var userController = require('../../controllers/user');
var Product = require('../../models/factory/product');
var Store_product = require('../../models/store/store_product');

var productController = {
	index: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				response.render('factory/products/index');
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

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				var indice = [];
				var product = new Product();
				product.id = parseInt(request.body.id);
				product.cod = parseInt(request.body.cod);
				product.type = request.body.type;
				product.name = "";
				product.color = request.body.color;
				if(request.body.size!=" "){
					product.name = ""+request.body.name+" "+request.body.size;
				} else {
					product.name = request.body.name;
				};
				Product.list(function(products, err){
					for(var i in products){
						if(products[i].cod==product.cod && product.id==0){
							response.send({ msg: "O código "+product.cod+" já está cadastrado." });
							return;
						} else {
							indice.push('.');
						};
						if(indice.length===products.length){
							Product.save(product, function(done, err){
								Store_product.save(product, function(done, err){
									response.send({ done: ""+product.name+" foi salvo com sucesso." });
								});
							});
						};
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
				var product = {
					type: request.body.type,
					color: request.body.color,
				};
				Product.filter(product, function(rows, err){
					response.send({ products: rows });
				});
			} else {
				response.send({ unauthorized: 'Usuário não tem permissão.'});
			};
		});
	},
	get: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		Product.get(request.body.id, function(row, err){
			response.send({ product: row })
		});
	},
	remove: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				Product.remove(request.body.id, function(done, err){
					Store_product.remove(request.body.id, function(done, err){
						response.send({ done: "Produto excluído com sucesso" })
					});
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	}
};

module.exports = productController;