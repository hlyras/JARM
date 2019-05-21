var db = require('../../../config/app');

var ProductionInput = {
	save:function(input, callback){
		'use strict';

		var query = "";
		query = "INSERT INTO lyfesystem.production_input (date, production_id, product_id, product, amount, status, user, obs) VALUES ('"+input.date+"', '"+input.production_id+"', '"+input.product_id+"', '"+input.product+"', '"+input.amount+"', '"+input.status+"', '"+input.user+"', '"+input.obs+"');"
		db.cnn.exec(query, callback);
	},
	get: function(id, callback){
		'use strict';

		var query = "";
		query = "SELECT * FROM lyfesystem.production_input WHERE production_id='"+id+"' ORDER BY id DESC;";
		db.cnn.exec(query, callback);
	},
	filter:function(input, callback){
		'use strict';

		var query = "";
		if( input.product != "0" && input.date != ""){
			query = "SELECT * FROM lyfesystem.production_input WHERE product_id='"+input.product+"' AND date='"+input.date+"' AND status='"+input.status+"' AND checked='"+parseInt(input.checked)+"' ORDER BY id DESC;";
		} else if(input.product != "0" && input.date === ""){
			query = "SELECT * FROM lyfesystem.production_input WHERE product_id='"+input.product+"' AND status='"+input.status+"' AND checked='"+parseInt(input.checked)+"' ORDER BY id DESC;";
		} else if(input.product === "0" && input.date != ""){
			query = "SELECT * FROM lyfesystem.production_input WHERE date='"+input.date+"' AND status='"+input.status+"' AND checked='"+parseInt(input.checked)+"' ORDER BY id DESC;";
		} else if(input.product === "0" && input.date === ""){
			query = "SELECT * FROM lyfesystem.production_input WHERE status='"+input.status+"' AND checked='"+parseInt(input.checked)+"' ORDER BY id DESC;";
		};
		db.cnn.exec(query, callback);
	},
	approve:function(production, callback){
		'use strict';

		var query = "";
		query = "UPDATE lyfesystem.production_input SET checked='"+1+"', confirmation_user='"+production.user+"' WHERE id='"+production.input_id+"';";
		db.cnn.exec(query, callback);
	}
};

module.exports = ProductionInput;