var db = require('../../config/app');

var Customer = function(){
	this.id;
	this.name;
	this.cpf;
	this.born;
	this.phone;

	this.save = function(callback){
		Customer.save(this, callback);
	};
};

Customer.save = function(customer, callback){
	'use strict';

	var query = "";
	query = "INSERT INTO lyfesystem.customer (name, cpf, born, phone) VALUES ('"+ customer.name +"', '" + customer.cpf + "', '" + customer.born + "', '" + customer.phone + "');";
	db.cnn.exec(query, callback);
};

Customer.get = function(id, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.customer WHERE id='"+id+"';";
	db.cnn.exec(query, callback);
};

Customer.getByName = function(name, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.customer WHERE name='"+name+"';";
	db.cnn.exec(query, callback);
};

Customer.getByCPF = function(cpf, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.customer WHERE cpf='"+cpf+"';";
	db.cnn.exec(query, callback);
};

Customer.filter = function(customer, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.customer WHERE cpf='"+customer.cpf+"';";
	db.cnn.exec(query, callback);
};

module.exports = Customer;