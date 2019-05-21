var db = require('../../../config/app');

var Withdrawal = {
	save:function(withdrawal, callback){
		'use strict';

		var query = "";
		query = "INSERT INTO lyfesystem.withdrawal (date, user) VALUES ('"+withdrawal.date+"','"+withdrawal.user+"');";
		db.cnn.exec(query, callback);
	},
	saveSales:function(info, callback){
		'use strict';

		var query = "";
		query = "INSERT INTO lyfesystem.withdrawal_sale (withdrawal_id, sale_cod, sale_buyer) VALUES ('"+info.withdrawal_id+"', '"+info.sale_cod+"', '"+info.sale_buyer+"');";
		db.cnn.exec(query, callback);
	},
	saveProducts:function(info, callback){
		'use strict';

		var query = "";
		query = "INSERT INTO lyfesystem.withdrawal_product (withdrawal_id, product_id, product_cod, product_info, amount) VALUES ('"+info.withdrawal_id+"', '"+info.product_id+"', '"+info.product_cod+"', '"+info.product_info+"', '"+info.amount+"');";
		db.cnn.exec(query, callback);
	},
	filter:function(withdrawal, callback){
		'use strict';

		var query = "";
		if(withdrawal.id != '' && withdrawal.date != ''){
			query = "SELECT * FROM lyfesystem.withdrawal WHERE id='"+withdrawal.id+"' AND date='"+withdrawal.date+"' AND status='"+withdrawal.status+"' ORDER BY id DESC;";
		} else if(withdrawal.id == '' && withdrawal.date != ''){
			query = "SELECT * FROM lyfesystem.withdrawal WHERE date='"+withdrawal.date+"' AND status='"+withdrawal.status+"' ORDER BY id DESC;";
		} else if(withdrawal.id != '' && withdrawal.date == ''){
			query = "SELECT * FROM lyfesystem.withdrawal WHERE id='"+withdrawal.id+"' AND status='"+withdrawal.status+"' ORDER BY id DESC;";
		} else if(withdrawal.id == '' && withdrawal.date == ''){
			query = "SELECT * FROM lyfesystem.withdrawal WHERE status='"+withdrawal.status+"' ORDER BY id DESC;";
		};
		db.cnn.exec(query, callback);
	},
	get:function(withdrawal, callback){
		'use strict';

		var query = "";
		query = "SELECT * FROM lyfesystem.withdrawal WHERE id='"+withdrawal.id+"';";
		db.cnn.exec(query, callback);
	},
	getId:function(callback){
		'use strict';
		var query = "SELECT * FROM lyfesystem.withdrawal order by id desc limit 1;";
		db.cnn.exec(query, callback);
	},
	getSales:function(withdrawal, callback){
		'use strict';
		var query = "";
		query = "SELECT * FROM lyfesystem.withdrawal_sale WHERE withdrawal_id='"+withdrawal.id+"';";
		db.cnn.exec(query, callback);
	},
	getProducts:function(withdrawal, callback){
		'use strict';
		var query = "";
		query = "SELECT * FROM lyfesystem.withdrawal_product WHERE withdrawal_id='"+withdrawal.id+"';";
		db.cnn.exec(query, callback);
	},
	update:function(info, callback){
		'use strict';

		var query = "";
		query = "UPDATE lyfesystem.sale SET withdrawal='"+info.withdrawal_id+"' WHERE cod='"+info.sale_cod+"';";
		db.cnn.exec(query, callback);
	},
	approve:function(withdrawal, callback){
		'use strict';
		var query = "";
		query = "UPDATE lyfesystem.withdrawal SET status='1', confirmation_user='"+withdrawal.user+"' WHERE id='"+withdrawal.id+"';";
		db.cnn.exec(query, callback);
	},
	remove:function(withdrawal, callback){
		'use strict';

		var query = "";
		query = "delete from withdrawal where id="+withdrawal.id+";";
		db.cnn.exec(query, callback);
	}
};

module.exports = Withdrawal;