var db = require('../../config/app');

var Portfolio = function(){
	this.cod;
	this.name;
	this.color;
	this.value1;
	this.value3;
	this.value5;
	this.value10;
	this.pic1;
	this.pic2;
	this.pic3;
	this.pic4;
	this.pic5;
	this.adress;

	this.save = function(callback){
		Portfolio.save(this, callback);
	};
};

Portfolio.save = function(portfolio, callback){
	'use strict';

	var query = "";
	if(portfolio.id){
		query = "UPDATE lyfesystem.portfolio SET cod = '"+portfolio.cod+"', name = '"+portfolio.name+"', color = '"+portfolio.color+"', type = '"+portfolio.type+"', value1 = '"+portfolio.value1+"', value3 = '"+portfolio.value3+"', value5 = '"+portfolio.value5+"', value10 = '"+portfolio.value10+"', pic1 = '"+portfolio.pic1+"', pic2 = '"+portfolio.pic2+"', pic3 = '"+portfolio.pic3+"', pic4 = '"+portfolio.pic4+"', pic5 = '"+portfolio.pic5+"', adress = '"+portfolio.adress+"' WHERE (id = '"+portfolio.id+"');"
	} else {
		query = "INSERT INTO lyfesystem.portfolio (cod, name, color, type, value1, value3, value5, value10, pic1, pic2, pic3, pic4, pic5, adress) VALUES ('"+ portfolio.cod +"', '"+ portfolio.name +"', '"+ portfolio.color +"', '"+ portfolio.type +"', '"+ portfolio.value1 +"', '"+ portfolio.value3 +"', '"+ portfolio.value5 +"', '"+ portfolio.value10 +"', '"+ portfolio.pic1 +"', '"+ portfolio.pic2 +"', '"+ portfolio.pic3 +"', '"+ portfolio.pic4 +"', '"+ portfolio.pic5 +"', '"+ portfolio.adress +"');";
	};
	db.cnn.exec(query, callback);
};

Portfolio.list = function(callback){
	'use strict'

	var query = "";
	query = "select * from portfolio";
	db.cnn.exec(query, callback);
}

module.exports = Portfolio;