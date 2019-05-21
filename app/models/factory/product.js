var db = require('../../../config/app');

var Product = function(){
	this.id;
	this.cod;
	this.type;
	this.name;
	this.color;
	this.amount = 0;

	this.save = function(callback){
		Product.save(this, callback);
	};
};

Product.save = function(product, callback){
	'use strict';

	var query = "";
	if(product.id){
		query = "UPDATE lyfesystem.product SET cod='"+product.cod+"', type='"+product.type+"', name='"+product.name+"', color='"+product.color+"' WHERE (id='"+product.id+"');";
	} else {
		query = "INSERT INTO lyfesystem.product (cod, type, name, color, amount) VALUES ('"+product.cod+"', '"+product.type+"', '"+product.name+"', '"+product.color+"', '"+parseInt(product.amount)+"');";
	};
	db.cnn.exec(query, callback);
};

Product.list = function(callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.product ORDER BY cod ASC";
	db.cnn.exec(query, callback);
};

Product.filter = function(product, callback){
	'use strict';

	var query = "";

	if(product.type != "0" && product.color != "0"){
		query = "SELECT * FROM lyfesystem.product WHERE type='"+product.type+"' AND color='"+product.color+"' ORDER BY cod ASC;";
	} else if(product.type != "0" && product.color === "0"){
		query = "SELECT * FROM lyfesystem.product WHERE type='"+product.type+"' ORDER BY cod ASC;";
	} else if(product.color != "0" && product.type === "0"){
		query = "SELECT * FROM lyfesystem.product WHERE color='"+product.color+"' ORDER BY cod ASC;";
	} else if(product.type === "0" && product.color === "0"){
		query = "SELECT * FROM lyfesystem.product ORDER BY cod ASC";
	}
	db.cnn.exec(query, callback);
};

Product.get = function(id, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.product WHERE id='"+id+"';";
	db.cnn.exec(query, callback);
};

Product.remove = function(id, callback){
	'use strict';

	var query = "";
	query = "DELETE FROM lyfesystem.product WHERE id='"+id+"';";
	db.cnn.exec(query, callback);
};

Product.updateAmount = function(instance, callback){
	'use strict';

	var query = "";
	query = "UPDATE lyfesystem.product SET amount='"+instance.total_amount+"' WHERE id='"+instance.product_id+"';";
	db.cnn.exec(query, callback);
};

module.exports = Product;