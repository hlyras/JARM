var db = require('../../../config/app');

var Devolution = {
	register:function(sale, callback){
		'use strict';

		var query = "";
		query = "UPDATE lyfesystem.sale SET dev_cod='"+sale.sale_devolution_id+"', status='devolucao', last_update='"+sale.user+"' WHERE cod='"+sale.sale_cod+"';";
		db.cnn.exec(query, callback);
	},
	save:function(input, callback){
		'use strict';

		var query = "";
		query = "INSERT INTO lyfesystem.devolution (date, sale_origin, sale_cod, sale_name, user) VALUES ('"+input.date+"', '"+input.sale_origin+"', '"+input.sale_cod+"', '"+input.sale_name+"', '"+input.user+"');";
		db.cnn.exec(query, callback);
	},
	saveProducts:function(devolutionProduct, callback){
		'use strict'

		var query = "";
		query = "INSERT INTO lyfesystem.devolution_product (devolution_id, sale_cod, product_id, product_info, amount) VALUES ('"+devolutionProduct.devolution_id+"', '"+devolutionProduct.sale_cod+"', '"+parseInt(devolutionProduct.product_id)+"', '"+devolutionProduct.product_info+"', '"+devolutionProduct.amount+"');"
		db.cnn.exec(query, callback);
	},
	list: function(callback){
		'use strict';

		var query = "";
		query = "SELECT * FROM lyfesystem.devolution;";
		db.cnn.exec(query, callback);
	},
	filter:function(devolution, callback){
		'use strict';

		var query = "";
		if( devolution.sale_name != "" && devolution.date != ""){
			query = "SELECT * FROM lyfesystem.devolution WHERE sale_name='"+devolution.sale_name+"' AND date='"+devolution.date+"' AND sale_origin='"+devolution.sale_origin+"' AND status='"+devolution.status+"' ORDER BY id DESC;";
		} else if( devolution.sale_name === "" && devolution.date != ""){
			query = "SELECT * FROM lyfesystem.devolution WHERE date='"+devolution.date+"' AND sale_origin='"+devolution.sale_origin+"' AND status='"+devolution.status+"' ORDER BY id DESC;";
		} else if( devolution.sale_name != "" && devolution.date === ""){
			query = "SELECT * FROM lyfesystem.devolution WHERE sale_name='"+devolution.sale_name+"' AND sale_origin='"+devolution.sale_origin+"' AND status='"+devolution.status+"' ORDER BY id DESC;";
		} else if( devolution.sale_name === "" && devolution.date === ""){
			query = "SELECT * FROM lyfesystem.devolution WHERE sale_origin='"+devolution.sale_origin+"' AND status='"+devolution.status+"' ORDER BY id DESC;";
		};
		db.cnn.exec(query, callback);
	},
	getByStatus: function(ínput, callback){
		'use strict';

		var query = "";
		query = "SELECT * FROM lyfesystem.devolution WHERE status='"+input.devolution_status+"';";
		db.cnn.exec(query, callback);
	},
	get:function(devolution, callback){
		'use strict';

		var query = "";
		query = "SELECT * FROM lyfesystem.devolution WHERE id='"+devolution.id+"';";
		db.cnn.exec(query, callback);
	},
	getId: function(callback){
		'use strict';
		var query = "SELECT * FROM lyfesystem.devolution order by id desc limit 1;";
		db.cnn.exec(query, callback);
	},
	getProducts:function(devolution, callback){
		'use strict';

		var query = "";
		query = "SELECT * FROM lyfesystem.devolution_product WHERE devolution_id='"+devolution.id+"';";
		db.cnn.exec(query, callback);
	},
	approve:function(devolution, callback){
		'use strict';
		
		var query = "";
		query = "UPDATE lyfesystem.devolution SET status='1', confirmation_user='"+devolution.user+"' WHERE id='"+devolution.id+"';";
		db.cnn.exec(query, callback);
	}
};

module.exports = Devolution;