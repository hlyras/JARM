var db = require('../../../config/app');

var Cashier = function(){
	this.id;
	this.date;
	this.value;
	this.open_date;
	this.close_date;
	this.open_value;
	this.close_value;
	this.status;
	this.user;

	this.save = function(callback){
		Cashier.save(this, callback);
	};
};

Cashier.open = function(cashier, callback){
	'use strict';

	var query = "";
	query = "INSERT INTO lyfesystem.store_cashier (date, value, open_date, status, user) VALUES ('"+cashier.date+"', '"+cashier.value+"', '"+cashier.open_date+"', '"+cashier.status+"', '"+cashier.login+"');";
	db.cnn.exec(query, callback);
};

Cashier.close = function(cashier, callback){
	'use strict';

	var query = "";
	query = "UPDATE lyfesystem.store_cashier SET close_date='"+cashier.close_date+"', status='"+cashier.status+"' WHERE id='"+cashier.id+"';";
	db.cnn.exec(query, callback);
};

Cashier.updateValue = function(value, callback){
	'use strict';

	var query = "";
	query = "UPDATE lyfesystem.store_cashier SET value='"+value+"';";
	db.cnn.exec(query, callback);
};

Cashier.updateTotalValue = function(value, callback){
	'use strict';

	var query = "";
	query = "UPDATE lyfesystem.store_cashier SET total_value='"+value+"';";
	db.cnn.exec(query, callback);
};

Cashier.get = function(id, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.store_cashier WHERE id='"+id+"';";
	db.cnn.exec(query, callback);
};

Cashier.getLast = function(callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.store_cashier order by id desc limit 1;";
	db.cnn.exec(query, callback);
};

Cashier.drain = function(drain, callback){
	'use strict';

	var query = "";
	query = "INSERT INTO lyfesystem.store_cashier_drain (cashier_id, full_date, value, user) VALUES ('"+drain.cashier_id+"', '"+drain.full_date+"', '"+drain.value+"', '"+drain.user+"');";
	db.cnn.exec(query, callback);
};

Cashier.filterDrain = function(id, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.store_cashier_drain WHERE cashier_id='"+id+"';";
	db.cnn.exec(query, callback);
};

module.exports = Cashier;