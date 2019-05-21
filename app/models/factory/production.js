var db = require('../../../config/app');

var Production = function(){
	this.id;
	this.date;
	this.origin;
	this.provider;
	this.product;
	this.amount;
	this.status;
	this.obs;

	this.save = function(callback){
		Production.save(this, callback);
	};
};

Production.save = function(production, callback){
	'use strict';

	var query = "";
	query = "INSERT INTO lyfesystem.production (date, origin, provider, product, amount, status, obs) VALUES ('"+production.date+"', '"+production.origin+"', '"+production.provider+"', '"+production.product+"', '"+production.amount+"', '"+production.status+"', '"+production.obs+"');";
	db.cnn.exec(query, callback);
};

Production.filter = function(production, callback){
	'use strict';

	var query = "";
	if(production.provider != "0" && production.product != "0" && production.date != ""){
		query = "SELECT * FROM lyfesystem.production WHERE origin='"+production.origin+"' AND provider='"+production.provider+"' AND product='"+production.product+"' AND status='"+production.status+"' AND date='"+production.date+"' ORDER BY id DESC";
	} else if(production.provider === "0" && production.product != "0" && production.date != ""){
		query = "SELECT * FROM lyfesystem.production WHERE origin='"+production.origin+"' AND product='"+production.product+"' AND status='"+production.status+"' AND date='"+production.date+"' ORDER BY id DESC";
	} else if(production.provider === "0" && production.product === "0" && production.date != ""){
		query = "SELECT * FROM lyfesystem.production WHERE origin='"+production.origin+"' AND status='"+production.status+"' AND date='"+production.date+"' ORDER BY id DESC";
	} else if(production.provider === "0" && production.product != "0" && production.date === ""){
		query = "SELECT * FROM lyfesystem.production WHERE origin='"+production.origin+"' AND product='"+production.product+"' AND status='"+production.status+"' ORDER BY id DESC";
	} else if(production.provider != "0" && production.product === "0" && production.date != ""){
		query = "SELECT * FROM lyfesystem.production WHERE origin='"+production.origin+"' AND provider='"+production.provider+"' AND status='"+production.status+"' AND date='"+production.date+"' ORDER BY id DESC";
	} else if(production.provider != "0" && production.product === "0" && production.date === ""){
		query = "SELECT * FROM lyfesystem.production WHERE origin='"+production.origin+"' AND provider='"+production.provider+"' AND status='"+production.status+"' ORDER BY id DESC";
	} else if(production.provider != "0" && production.product != "0" && production.date === ""){
		query = "SELECT * FROM lyfesystem.production WHERE origin='"+production.origin+"' AND provider='"+production.provider+"' AND product='"+production.product+"' AND status='"+production.status+"' ORDER BY id DESC";
	} else if(production.provider === "0" && production.product === "0" && production.date === ""){
		query = "SELECT * FROM lyfesystem.production WHERE origin='"+production.origin+"'AND status='"+production.status+"' ORDER BY id DESC";
	};
	db.cnn.exec(query, callback);
};

Production.get = function(id, callback){
	'use strict'

	var query = "";
	query = "select * FROM production WHERE id='"+id+"';";
	db.cnn.exec(query, callback);
};

Production.remove = function(id, callback){
	'use strict'

	var query = "";

	query = "DELETE FROM lyfesystem.production WHERE id='"+id+"';";
	db.cnn.exec(query, callback);
};

Production.getConfirmedAmount = function(id, callback){
	'use strict'

	var query = "";
	query = "select confirmed_amount FROM production WHERE id='"+id+"';";
	db.cnn.exec(query, callback);
};

Production.send = function(id, callback){
	'use strict';
	var query = "";
	query = "UPDATE lyfesystem.production SET status='produzindo' WHERE (id = '"+id+"');";
	db.cnn.exec(query, callback);
};

Production.update = function(production, callback){
	'use strict';
	var query = "";
	if(production.status==='parcial'){
		query = "UPDATE lyfesystem.production SET confirmed_amount = '"+(parseInt(production.amount)+parseInt(production.received_amount))+"', status = '"+production.status+"', checked='0' WHERE (id='"+production.production_id+"');";
	} else {
		query = "UPDATE lyfesystem.production SET confirmed_amount = '"+(parseInt(production.amount)+parseInt(production.received_amount))+"', status = '"+production.status+"' WHERE (id = '"+production.production_id+"');";
	};
	db.cnn.exec(query, callback);
};

Production.updateObs = function(production, callback){
	'use strict';
	var query = "UPDATE lyfesystem.production SET obs='"+production.obs+"' WHERE id='"+production.production_id+"';";
	db.cnn.exec(query, callback);
};

Production.checked = function(production, callback){
	'use strict';
	var query = "";
	if(production.checked==='0'){
		query = "UPDATE lyfesystem.production SET checked='1' WHERE id='"+production.production_id+"';";
	} else if(production.checked==='1' && production.status==='parcial'){
		query = "UPDATE lyfesystem.production SET checked='0' WHERE id='"+production.production_id+"';";
	} else {
		query = "SELECT * FROM lyfesystem.production WHERE id='"+production.production_id+"';";
	};
	db.cnn.exec(query, callback);
};

Production.done = function(production, callback){
	'use strict';
	var query = "UPDATE lyfesystem.production SET done='"+production.done+"' WHERE id='"+production.production_id+"';";
	db.cnn.exec(query, callback);
};

Production.filterSituation = function(production, callback){
	'use strict';

	var query = "";
	if(production.status!="" && production.done!="" && production.product_id!=undefined){
		query = "SELECT * FROM lyfesystem.production WHERE status='"+production.status+"' AND done='"+production.done+"' AND product='"+production.product_id+"' ORDER BY id DESC;";
	} else if(production.status!="" && production.done!="" && production.product_id==undefined){
		query = "SELECT * FROM lyfesystem.production WHERE status='"+production.status+"' AND done='"+production.done+"' ORDER BY id DESC;";
	} else if(production.status=="" && production.done=="" && production.product_id!=undefined){
		query = "SELECT * FROM lyfesystem.production WHERE (status='parcial' OR status='finalizado') AND product='"+production.product_id+"' ORDER BY id DESC;";
	} else if(production.status=="" && production.done=="" && production.product_id==undefined){
		console.log(production);
		query = "SELECT * FROM lyfesystem.production WHERE status='parcial' OR status='finalizado' ORDER BY id DESC;";
	};
	db.cnn.exec(query, callback);
};

module.exports = Production;