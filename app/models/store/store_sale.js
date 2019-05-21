var db = require('../../../config/app');

var Store_sale = function(){
	this.id;
	this.date;
	this.cod;
	this.name;
	this.origin;
	this.user;
	this.status;
	this.save = function(callback){
		Store_sale.save(this, callback);
	};
};

Store_sale.save = function(sale, callback){
	'use strict';

	var query = "";
	query = "INSERT INTO lyfesystem.store_sale (date, cashier_id, origin, customer, customer_cpf, payment, installment, discount_full_packs, discount_molle_packs, discount, value, total_value, full_date, status, user) VALUES ('"+sale.date+"', '"+sale.cashier_id+"', '"+sale.origin+"', '"+sale.customer+"',  '"+sale.customer_cpf+"', '"+sale.payment+"', '"+sale.installment+"', '"+sale.discount_full_packs+"', '"+sale.discount_molle_packs+"', '"+sale.discount+"', '"+sale.value+"', '"+sale.total_value+"', '"+sale.full_date+"', '"+sale.status+"', '"+sale.user+"');";
	db.cnn.exec(query, callback);
};

Store_sale.saveProducts = function(sale_product, callback){
	'use strict';

	var query = "";
	query = "INSERT INTO lyfesystem.store_sale_product (store_sale_cod, product_id, product_info, amount, value) VALUES ('"+sale_product.sale_cod+"', '"+parseInt(sale_product.product_id)+"', '"+sale_product.product_info+"', '"+sale_product.amount+"', '"+sale_product.value+"');";
	db.cnn.exec(query, callback);
};

Store_sale.getByCPF = function(cpf, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.store_sale WHERE customer_cpf='"+cpf+"';";
	db.cnn.exec(query, callback);
};

Store_sale.getByCashier = function(cashier_id, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.store_sale WHERE cashier_id='"+cashier_id+"';";
	db.cnn.exec(query, callback);
};

Store_sale.getLastSale = function(callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.store_sale order by cod desc limit 1;";
	db.cnn.exec(query, callback);
};

Store_sale.filter = function(store_sale, callback){
	'use strict';

	var query = "";
	if(store_sale.customer_cpf!='' && store_sale.date!=''){
		query = "SELECT * FROM lyfesystem.store_sale WHERE customer_cpf='"+store_sale.customer_cpf+"' AND date='"+store_sale.date+"' ORDER BY cod DESC;";
	} else if(store_sale.customer_cpf!='' && store_sale.date==''){
		query = "SELECT * FROM lyfesystem.store_sale WHERE customer_cpf='"+store_sale.customer_cpf+"' ORDER BY cod DESC;";
	} else if(store_sale.customer_cpf=='' && store_sale.date!=''){
		query = "SELECT * FROM lyfesystem.store_sale WHERE date='"+store_sale.date+"' ORDER BY cod DESC;";
	} else if(store_sale.customer_cpf=='' && store_sale.date==''){
		query = "SELECT * FROM lyfesystem.store_sale ORDER BY cod DESC;";
	};

	db.cnn.exec(query, callback);
};

Store_sale.get = function(cod, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.store_sale WHERE cod='"+cod+"';";
	db.cnn.exec(query, callback);
};

Store_sale.getProducts = function(cod, callback){
	'use strict';

	var query = "";
	query = "SELECT * FROM lyfesystem.store_sale_product WHERE store_sale_cod='"+cod+"' ORDER BY product_id ASC;";
	db.cnn.exec(query, callback);
};

module.exports = Store_sale;