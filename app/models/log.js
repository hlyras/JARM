var db = require('../../config/app');

var Log = function(){
	this.date;
	this.user;
	this.status;

	this.save = function(callback){
		Login.save(this, callback);
	};
};

Log.save = function(login, callback){
	'use strict'

	var query = "";
	query = "INSERT INTO lyfesystem.logins (date, user, status) VALUES ('"+ login.date +"', '" + login.user + "', '" + login.status + "');";
	db.cnn.exec(query, callback);
};

module.exports = Log;