var db = require('../../../config/app');

var Sale = function(){
	this.id;
	this.date;
	this.cod;
	this.name;
	this.origin;
	this.user;
	this.status;
	this.save = function(callback){
		Sale.save(this, callback);
	};
};

Sale.save = function(sale, callback){
	'use strict';

	var query = "";
	query = "INSERT INTO lyfesystem.sale (date, origin, cod, name, user, status) VALUES ('"+sale.date+"', '"+sale.origin+"', '"+sale.cod+"', '"+sale.name+"', '"+sale.user+"', '"+sale.status+"');";
	db.cnn.exec(query, callback);
};

Sale.saveProducts = function(sale_product, callback){
	'use strict'

	var query = "";
	query = "INSERT INTO lyfesystem.sale_product (sale_cod, product_id, product_info, amount) VALUES ('"+sale_product.sale_cod+"', '"+parseInt(sale_product.product_id)+"', '"+sale_product.product_info+"', '"+sale_product.amount+"');"
	db.cnn.exec(query, callback);
};

Sale.list = function(callback){
	'use strict';
	
	var query = "";
	query = "SELECT * FROM lyfesystem.sale ORDER BY id DESC;";
	db.cnn.exec(query, callback);
};

Sale.listProducts = function(callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.sale_product ORDER BY product_id ASC;";
	db.cnn.exec(query, callback);
};

Sale.filterProducts = function(sale, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.sale_product WHERE product_id='"+sale.product_id+"';";
	db.cnn.exec(query, callback);
};

Sale.filterUnwithdrawal = function(callback){
	'use strict';
	
	var query = "";
	query = "SELECT * FROM lyfesystem.sale WHERE withdrawal=0 ORDER BY id DESC;";
	db.cnn.exec(query, callback);
};

Sale.get = function(cod, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.sale WHERE cod='"+cod+"';";
	db.cnn.exec(query, callback);
};

Sale.getProducts = function(cod, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.sale_product WHERE sale_cod='"+cod+"' ORDER BY product_id ASC;";
	db.cnn.exec(query, callback);
};

Sale.filter = function(sale, callback){
	'use strict';

	var query = "";
	if(sale.cod != "" && sale.name != "" && sale.date != ""){
		query = "SELECT top 20 * FROM lyfesystem.sale WHERE origin='"+sale.origin+"' AND cod='"+sale.cod+"' AND name='"+sale.name+"' AND status='"+sale.status+"' AND date='"+sale.date+"' ORDER BY id DESC";
	} else if(sale.cod === "" && sale.name != "" && sale.date != ""){
		query = "SELECT * FROM lyfesystem.sale WHERE origin='"+sale.origin+"' AND name='"+sale.name+"' AND status='"+sale.status+"' AND date='"+sale.date+"' ORDER BY id DESC";
	} else if(sale.cod === "" && sale.name === "" && sale.date != ""){
		query = "SELECT * FROM lyfesystem.sale WHERE origin='"+sale.origin+"' AND status='"+sale.status+"' AND date='"+sale.date+"' ORDER BY id DESC";
	} else if(sale.cod === "" && sale.name != "" && sale.date === ""){
		query = "SELECT * FROM lyfesystem.sale WHERE origin='"+sale.origin+"' AND name='"+sale.name+"' AND status='"+sale.status+"' ORDER BY id DESC";
	} else if(sale.cod != "" && sale.name === "" && sale.date != ""){
		query = "SELECT * FROM lyfesystem.sale WHERE origin='"+sale.origin+"' AND cod='"+sale.cod+"' AND status='"+sale.status+"' AND date='"+sale.date+"' ORDER BY id DESC";
	} else if(sale.cod != "" && sale.name === "" && sale.date === ""){
		query = "SELECT * FROM lyfesystem.sale WHERE origin='"+sale.origin+"' AND cod='"+sale.cod+"' AND status='"+sale.status+"' ORDER BY id DESC";
	} else if(sale.cod != "" && sale.name != "" && sale.date === ""){
		query = "SELECT * FROM lyfesystem.sale WHERE origin='"+sale.origin+"' AND cod='"+sale.cod+"' AND name='"+sale.name+"' AND status='"+sale.status+"' ORDER BY id DESC";
	} else if(sale.cod === "" && sale.name === "" && sale.date === ""){
		query = "SELECT * FROM lyfesystem.sale WHERE origin='"+sale.origin+"'AND status='"+sale.status+"' ORDER BY id DESC";
	};
	db.cnn.exec(query, callback);
};

Sale.updateStatus = function(input, callback){
	'use strict';

	var query = "";
	query = "UPDATE lyfesystem.sale SET status='"+input.sale_new_status+"', dev_cod='"+ input.sale_devolution_id +"' , last_update='"+ input.user +"' WHERE cod='"+ input.sale_cod +"';";
	db.cnn.exec(query, callback);
};

Sale.filterSituation = function(sale, callback){
	'use strict';

	var query = "";
	if(sale.status != ""){
		query = "SELECT * FROM lyfesystem.sale WHERE status='"+sale.status+"' ORDER BY id DESC;";
	} else {
		query = "SELECT * FROM lyfesystem.sale ORDER BY id DESC;";
	};
	db.cnn.exec(query, callback);
};

module.exports = Sale;