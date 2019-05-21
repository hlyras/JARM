var db = require('../../../config/app');

var Store_product = function(){
	this.id;
	this.cod;
	this.type;
	this.name;
	this.color;
	this.amount = 0;

	this.save = function(callback){
		Store_product.save(this, callback);
	};
};

Store_product.save = function(product, callback){
	'use strict';

	var query = "";
	if(product.id){
		query = "UPDATE lyfesystem.store_product SET cod='"+product.cod+"', type='"+product.type+"', name='"+product.name+"', color='"+product.color+"' WHERE (id='"+product.id+"');";
	} else {
		query = "INSERT INTO lyfesystem.store_product (cod, type, name, color, amount) VALUES ('"+product.cod+"', '"+product.type+"', '"+product.name+"', '"+product.color+"', '"+parseInt(product.amount)+"');";
	};
	db.cnn.exec(query, callback);
};

Store_product.list = function(callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.store_product ORDER BY cod ASC";
	db.cnn.exec(query, callback);
};

Store_product.filter = function(product, callback){
	'use strict';

	var query = "";
	if(product.type != "0" && product.color != "0"){
		query = "SELECT * FROM lyfesystem.store_product WHERE type='"+product.type+"' AND color='"+product.color+"' ORDER BY cod ASC;";
	} else if(product.type != "0" && product.color === "0"){
		query = "SELECT * FROM lyfesystem.store_product WHERE type='"+product.type+"' ORDER BY cod ASC;";
	} else if(product.color != "0" && product.type === "0"){
		query = "SELECT * FROM lyfesystem.store_product WHERE color='"+product.color+"' ORDER BY cod ASC;";
	} else if(product.type === "0" && product.color === "0"){
		query = "SELECT * FROM lyfesystem.store_product ORDER BY cod ASC";
	}
	db.cnn.exec(query, callback);
};

Store_product.get = function(id, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.store_product WHERE id='"+id+"';";
	db.cnn.exec(query, callback);
};

Store_product.remove = function(id, callback){
	'use strict';

	var query = "";
	query = "DELETE FROM lyfesystem.store_product WHERE id='"+id+"';";
	db.cnn.exec(query, callback);
};

Store_product.updateAmount = function(instance, callback){
	'use strict';

	var query = "";
	query = "UPDATE lyfesystem.store_product SET amount='"+instance.total_amount+"' WHERE id='"+instance.product_id+"';";
	db.cnn.exec(query, callback);
};

module.exports = Store_product;