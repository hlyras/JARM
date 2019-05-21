var db = require('../../../config/app');

var Store_supply = {
	register:function(sale, callback){
		'use strict';

		var query = "";
		query = "UPDATE lyfesystem.sale SET dev_cod='"+sale.sale_devolution_id+"', status='devolucao', last_update='"+sale.user+"' WHERE cod='"+sale.sale_cod+"';";
		db.cnn.exec(query, callback);
	},
	save:function(input, callback){
		'use strict';

		var query = "";
		query = "INSERT INTO lyfesystem.store_supply (date, user, obs) VALUES ('"+input.date+"', '"+input.user+"', '"+input.obs+"');";
		db.cnn.exec(query, callback);
	},
	saveProducts:function(input, callback){
		'use strict'

		var query = "";
		query = "INSERT INTO lyfesystem.store_supply_product (supply_id, product_id, product_info, amount) VALUES ('"+input.supply_id+"', '"+input.product_id+"', '"+input.product_info+"', '"+input.amount+"');"
		db.cnn.exec(query, callback);
	},
	getLast: function(callback){
		'use strict';
		
		var query = "SELECT * FROM lyfesystem.store_supply order by id desc limit 1;";
		db.cnn.exec(query, callback);
	},
	filter:function(supply, callback){
		'use strict';

		var query = "";
		if(supply.date != ""){
			query = "SELECT * FROM lyfesystem.store_supply WHERE date='"+supply.date+"'AND status='"+supply.status+"' ORDER BY id DESC;";
		} else if(supply.date == ""){
			query = "SELECT * FROM lyfesystem.store_supply WHERE status='"+supply.status+"' ORDER BY id DESC;";
		};
		db.cnn.exec(query, callback);
	},
	get:function(supply, callback){
		'use strict';

		var query = "";
		query = "SELECT * FROM lyfesystem.store_supply WHERE id='"+supply.id+"';";
		db.cnn.exec(query, callback);
	},
	getProducts:function(supply, callback){
		'use strict';

		var query = "";
		query = "SELECT * FROM lyfesystem.store_supply_product WHERE supply_id='"+supply.id+"' ORDER BY product_id ASC;";
		db.cnn.exec(query, callback);
	},
	approve:function(supply, callback){
		'use strict';
		
		var query = "";
		query = "UPDATE lyfesystem.store_supply SET status='1', confirmation_user='"+supply.user+"' WHERE id='"+supply.id+"';";
		db.cnn.exec(query, callback);
	}
	// list: function(callback){
	// 	'use strict';

	// 	var query = "";
	// 	query = "SELECT * FROM lyfesystem.store_supply;";
	// 	db.cnn.exec(query, callback);
	// },
	// getByStatus: function(ínput, callback){
	// 	'use strict';

	// 	var query = "";
	// 	query = "SELECT * FROM lyfesystem.store_supply WHERE status='"+input.devolution_status+"';";
	// 	db.cnn.exec(query, callback);
	// },
	// getId: function(callback){
	// 	'use strict';
	// 	var query = "SELECT * FROM lyfesystem.store_supply order by id desc limit 1;";
	// 	db.cnn.exec(query, callback);
	// },
	// approve:function(devolution, callback){
	// 	'use strict';
		
	// 	var query = "";
	// 	query = "UPDATE lyfesystem.store_supply SET status='1', confirmation_user='"+devolution.user+"' WHERE id='"+devolution.id+"';";
	// 	db.cnn.exec(query, callback);
	// }
};

module.exports = Store_supply;