var lib = require('../../../config/lib');
var User = require('../../models/user');
var userController = require('../../controllers/user');
var Store_product = require('../../models/store/store_product');
var Store_sale = require('../../models/store/store_sale');
var Customer = require('../../models/customer');
var Cashier = require('../../models/store/cashier');

var storeSaleController = {
	manage: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				response.render('store/manage');
			} else {
				response.render('login', { warn: 'Usuário não autorizado.' });
			};
		});
	},
	save: function(request, response, next){
		'use strict';

		if(!userController.verifyAcess(request, response)){
			return;
		};

		userController.permission(request, response, ['a1','a2'], function(done){
			if(done){
				var store_sale = {
					date: lib.genDate(),
					cashier_id: parseInt(request.body.cashier_id),
					origin: 'ja1',
					customer: request.body.customer,
					payment: request.body.payment,
					installment: request.body.installment,
					discount_full_packs: request.body.discount_full_packs,
					discount_molle_packs: request.body.discount_molle_packs,
					discount: request.body.discount,
					value: request.body.sale_value,
					total_value: request.body.sale_total_value,
					products: JSON.parse(request.body.sale_products),
					user: request.cookies.authenticated,
					full_date: lib.genFullDate(),
					status: '1'
				};

				if(store_sale.customer=='' || store_sale.customer=='0'){
					response.send({ msg: 'É necessário selecionar um cliente' });
					return;
				};

				if(store_sale.payment=='' || store_sale.payment=='0'){
					response.send({ msg: 'É necessário selecionar um método de pagamento' });
					return;
				};

				if(store_sale.products.length<1){
					response.send({ msg: 'Não é possível realizar vendas sem produtos.' });
					return;	
				};

				Customer.getByCPF(store_sale.customer, function(row, err){
					var indice = [];
					store_sale.customer = row[0].name;
					store_sale.customer_cpf = row[0].cpf;
					Store_sale.save(store_sale, function(done, err){
						if(store_sale.payment=='dinheiro'){
							Cashier.get(store_sale.cashier_id, function(cashier, err){
								var cashier_value = parseFloat(cashier[0].value) + parseFloat(store_sale.total_value);
								var cashier_total_value = parseFloat(cashier[0].total_value) + parseFloat(store_sale.total_value);
								Cashier.filterDrain(store_sale.cashier_id, function(drains, err){
									var total_drain = 0;
									drains.forEach(function(drain){
										total_drain += drain.value;
									});
									Cashier.updateValue(cashier_value, function(done, err){
									});
									Cashier.updateTotalValue(cashier_total_value, function(done, err){
									});
								});
							});
						};
						Store_sale.getLastSale(function(last_sale, err){
							store_sale.cod = last_sale[0].cod;
							Store_product.list(function(store_products, err){
								for(var i in store_sale.products){
									var sale_product = {
										sale_cod: store_sale.cod,
										product_id: store_sale.products[i].product_id,
										product_info: store_sale.products[i].product_info,
										amount: parseInt(store_sale.products[i].amount),
										value: store_sale.products[i].value
									};
									for(var j in store_products){
										if(store_sale.products[i].product_id==store_products[j].id){
											var product = {
												product_id: store_sale.products[i].product_id,
												total_amount: parseInt(store_products[j].amount) - parseInt(store_sale.products[i].amount)
											};
											Store_product.updateAmount(product, function(done, err){
											});
										};
									};
									Store_sale.saveProducts(sale_product, function(done, err){
									});
									indice.push('.');
								};
								if(indice.length==store_sale.products.length){
									response.send({ done: 'Venda cadastrada com sucesso!', store_sale: store_sale });
								};
							})
						});
					});
				});
			} else {
				response.send({ unauthorized: "Usuário não autorizado." });
				return;
			};
		});
	},
	filter: function(request, response, next){
		'use strict'

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				var store_sale = {
					cod: request.body.store_sale_cod,
					customer_cpf: request.body.customer_cpf,
					date: request.body.date
				};

				if(store_sale.cod!=''){
					Store_sale.get(store_sale.cod, function(row, err){
						response.send({ store_sales: row });
						return;
					});
				} else {
					Store_sale.filter(store_sale, function(rows, err){
						response.send({ store_sales: rows });
						return;
					});
				}
			} else {
				response.send({ unauthorized: "Usuário não autorizado."});
			};
		});
	},
	show: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		Store_sale.get(request.body.sale_cod, function(sale, err){
			Store_sale.getProducts(request.body.sale_cod, function(products, err){
				response.send({ sale: sale, products: products });
			});
		});
	},
	get: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		Store_sale.get(request.body.sale_cod, function(store_sale, err){
			Store_sale.getProducts(request.body.sale_cod, function(products, err){
				store_sale[0].products = products;
				response.send({ store_sale: store_sale[0] });
			});
		});
	},
	report: function(request, response, next){
		'use strict';

		if(!userController.verify(request, response)){
			return;
		};

		userController.permission(request, response, ['a1'], function(done){
			if(done){
				
			} else {
				response.send({ unauthorized: "Usuário não autorizado." });
			};
		});
	}
};

module.exports = storeSaleController;