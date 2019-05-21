var db = require('../../config/app');

var User = function(){
	this.id;
	this.login;
	this.password;
	this.access;
	this.name;
	this.occupation;

	this.save = function(callback){
		User.save(this, callback);
	};
};

User.save = function(user, callback){
	var query = "";
	if(materiaPrima.id) {
		query = "UPDATE lyfesystem.user SET login = '"+ user.login +"', password = '"+ user.password +"', name = '"+ user.name +"', access = '"+ user.access +"', occupation = '"+ user.occupation +"' WHERE (id='"+ this.id +"');";
	} else {
		query = "INSERT INTO lyfesystem.user (login, password, name, occupation) VALUES ('"+ user.login +"', '"+ user.password +"', '"+ user.access +"', '"+ user.name +"', '"+ user.occupation +"');";
	};
	db.cnn.exec(query, callback);
};

User.get = function(user, callback){
	'use strict'

	var query = "";
	query = "select * from user where login='"+ user.login +"';";
	db.cnn.exec(query, callback);
};

User.list = function(callback){
	'use strict'

	var query = "";
	query = "select * from user;";
	db.cnn.exec(query, callback);
};

module.exports = User;