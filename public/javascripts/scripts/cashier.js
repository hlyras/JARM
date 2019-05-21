$(function(){
	// open cashier
	$('#open-cashier-btn').on('click', function(event){
		document.getElementById('open-cashier-btn').disabled = true;

		var user = document.getElementById('open-cashier-user').value;
		var password = document.getElementById('open-cashier-password').value;

		console.log(user, password);

		$.ajax({
			url: '/cashier-open',
			method: 'post',
			data: {
				user: user,
				password: password
			},
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById('open-cashier-btn').disabled = false;
					return;
				};

				alert(response.done)
				
				window.location.href = '/loja-caixa';
				
				document.getElementById('open-cashier-btn').disabled = false;
			}
		});
	});

	$('#close-cashier-btn').on('click', function(event){
		document.getElementById('close-cashier-btn').disabled = true;

		var user = document.getElementById('close-cashier-user').value;
		var password = document.getElementById('close-cashier-password').value;

		$.ajax({
			url: '/cashier-close',
			method: 'post',
			data: {
				user: user,
				password: password
			},
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById('close-cashier-btn').disabled = false;
					return;
				};

				alert(response.done);

				window.location.href = '/loja-caixa';

				document.getElementById('close-cashier-btn').disabled = true;
			}
		});
	});

	$('#drain-cashier-btn').on('click', function(event){
		document.getElementById('drain-cashier-btn').disabled = true;

		var drain_value = document.getElementById('drain-cashier-value').value;
		var user = document.getElementById('drain-cashier-user').value;
		var password = document.getElementById('drain-cashier-password').value;

		if(drain_value!=''){
			console.log(drain_value);
		} else {
			alert('Valor da sangria é inválido.');
			document.getElementById('drain-cashier-btn').disabled = false;
			return;
		};
		
		$.ajax({
			url: '/cashier-drain',
			method: 'post',
			data: {
				drain_value: drain_value,
				user: user,
				password: password
			},
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById('drain-cashier-btn').disabled = false;
					return;
				};

				alert(response.done);

				document.getElementById('drain-cashier-value').value = 0;
				document.getElementById('drain-cashier-user').value = "";
				document.getElementById('drain-cashier-password').value = "";

				var tbody = document.getElementById('cashier-info-tbody');
				var html = "";
				
				tbody.innerHTML = "";
				
				html += "<tr>";
				html += "<td>"+response.last_cashier.id+"</td>";
				html += "<td>"+response.last_cashier.date+"</td>";
				html += "<td>"+response.last_cashier.total_value+"</td>";
				html += "<td>"+response.total_drain+"</td>";
				html += "<td>"+response.last_cashier.value+"</td>";
				html += "</tr>";

				tbody.innerHTML = html;

				document.getElementById('drain-cashier-btn').disabled = false;
			}
		});
	});

	$('#list-cashier-drain-btn').on('click', function(event){
		document.getElementById('list-cashier-drain-btn').disabled = true;

		if(document.getElementById('showCashierDrainContent').style.display == 'none'){
			document.getElementById('showCashierDrainContent').style.display = 'block';
		} else if(document.getElementById('showCashierDrainContent').style.display == 'block'){
			document.getElementById('showCashierDrainContent').style.display = 'none';
		};

		document.getElementById('list-cashier-drain-btn').disabled = false;

		$.ajax({
			url: '/cashier-list-drain',
			method: 'get',
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById('list-cashier-drain-btn').disabled = false;
					return;
				};

				var drainPageSize = 15;
				var drainPage = 0;
				var drainData = response.drains;
				var showDrain = document.getElementById('main-cashier-drain-tbody');

				function drainPaging(){
					htmlDrains = "";
					htmlDrains += "<table>";
					if(response.drainData!=""){
					    for (var i = drainPage * drainPageSize; i < drainData.length && i < (drainPage + 1) *  drainPageSize; i++) {
							htmlDrains += "<tr>";
							htmlDrains += "<td id='src-drain-id'>"+ drainData[i].id +"</td>";
							htmlDrains += "<td id='src-drain-cashier'>"+ drainData[i].cashier_id +"</td>";
							htmlDrains += "<td id='src-drain-date'>"+ drainData[i].full_date +"</td>";
							htmlDrains += "<td id='src-drain-value'>"+ drainData[i].value +"</td>";
							htmlDrains += "<td id='src-drain-user'>"+drainData[i].user+"</td>";
							htmlDrains += "</tr>";
						};
						htmlDrains += "</table>";
						showDrain.innerHTML = htmlDrains;
					} else {
						showDrain.innerHTML = htmlDrains;
						alert('Nenhum dado encontrado.');
					};
				    $('#drainPageNumber').text('' + (drainPage + 1) + ' de ' + Math.ceil(drainData.length / drainPageSize));
				};

				function drainButtonsPaging(){
				    $('#drainNext').prop('disabled', drainData.length <= drainPageSize || drainPage >= drainData.length / drainPageSize - 1);
				    $('#drainPrevious').prop('disabled', drainData.length <= drainPageSize || drainPage == 0);
				};

				$(function(){
				    $('#drainNext').click(function(){
				        if (drainPage < drainData.length / drainPageSize - 1) {
				            drainPage++;
				            drainPaging();
				            drainButtonsPaging();
				        };
				    });
				    $('#drainPrevious').click(function(){
				        if (drainPage > 0) {
				            drainPage--;
				            drainPaging();
				            drainButtonsPaging();
				        };
				    });
				    drainPaging();
				    drainButtonsPaging();
				});
				document.getElementById('list-cashier-drain-btn').disabled = false;
			}
		});
	});

	$('#list-cashier-store-sale-btn').on('click', function(event){
		document.getElementById('list-cashier-store-sale-btn').disabled = true;

		if(document.getElementById('showStoreSaleContent').style.display == 'none'){
			document.getElementById('showStoreSaleContent').style.display = 'block';
		} else if(document.getElementById('showStoreSaleContent').style.display == 'block'){
			document.getElementById('showStoreSaleContent').style.display = 'none';
		};

		$.ajax({
			url: '/cashier-list-store-sale',
			method: 'get',
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById('list-cashier-store-sale-btn').disabled = false;
					return;
				};

				var salePageSize = 15;
				var salePage = 0;
				var saleData = response.store_sales;
				var showSale = document.getElementById('main-store-sale-tbody');

				function salePaging(){
					htmlSales = "";
					htmlSales += "<table>";
					if(response.saleData!=""){
					    for (var i = salePage * salePageSize; i < saleData.length && i < (salePage + 1) *  salePageSize; i++) {
							htmlSales += "<tr>";
							htmlSales += "<td id='src-store-sale-cod' hidden>"+ saleData[i].cod +"</td>";
							htmlSales += "<td><a id='show-store-sale-btn'>"+ saleData[i].cod +"</a></td>";
							htmlSales += "<td id='src-sale-date'>"+ saleData[i].date +"</td>";
							htmlSales += "<td id='src-sale-customer-name'>"+ saleData[i].customer +"</td>";
							htmlSales += "<td id='src-customer-cpf' hidden>"+saleData[i].customer_cpf+"</td>";
							htmlSales += "<td><a id='show-customer-btn'>"+saleData[i].customer_cpf+"</a></td>";
							htmlSales += "<td id='src-sale-user'>"+ saleData[i].total_value +"</td>";
							htmlSales += "</tr>";
						};
						htmlSales += "</table>";
						showSale.innerHTML = htmlSales;
					} else {
						showSale.innerHTML = htmlSales;
						alert('Nenhum dado encontrado.');
					};
				    $('#salePageNumber').text('' + (salePage + 1) + ' de ' + Math.ceil(saleData.length / salePageSize));
				};

				function saleButtonsPaging(){
				    $('#storeSaleNext').prop('disabled', saleData.length <= salePageSize || salePage >= saleData.length / salePageSize - 1);
				    $('#storeSalePrevious').prop('disabled', saleData.length <= salePageSize || salePage == 0);
				};

				$(function(){
				    $('#storeSaleNext').click(function(){
				        if (salePage < saleData.length / salePageSize - 1) {
				            salePage++;
				            salePaging();
				            saleButtonsPaging();
				        };
				    });
				    $('#storeSalePrevious').click(function(){
				        if (salePage > 0) {
				            salePage--;
				            salePaging();
				            saleButtonsPaging();
				        };
				    });
				    salePaging();
				    saleButtonsPaging();
				});
				document.getElementById('list-cashier-store-sale-btn').disabled = false;
			}
		});
	});


	// cashier
	$(document).on('change', '#change-customer-sale-form', function() {
		if(document.getElementById('change-customer-sale-form').value==='search-customer-box'){
			document.getElementById('create-customer-div').style.display = "none";
			document.getElementById('search-customer-div').style.display = "block";
		} else if(document.getElementById('change-customer-sale-form').value==='create-customer-box'){
			document.getElementById('search-customer-div').style.display = "none";
			document.getElementById('create-customer-div').style.display = "block";
		} else if(document.getElementById('change-customer-sale-form').value=='0'){
			document.getElementById('search-customer-div').style.display = "none";
			document.getElementById('create-customer-div').style.display = "none";
		};
	});

	$('#product-form-filter').on('submit', function(event){
		event.preventDefault();
		var type = document.getElementById('get-type').value;
		var color = document.getElementById('get-color').value;
		$.ajax({
			url: '/product-filter',
			method: 'post',
			data: {type:type, color:color},
			success: function(response) {
				var product_select = document.getElementById('product');
				var html = '<option value="0">Produto</option>';
				response.products.forEach(function(product){
					html += '<option value="'+product.id+'">'+ product.name +'/'+ product.color +'</option>';
				});
				product_select.innerHTML = html;
			}
		});
	});

	$('#add-product-sale-btn').on('click', function(event){
		document.getElementById("add-product-sale-btn").disabled = true;

		var product_id = document.getElementById('product').value;
		
		sale_products_array.forEach(function(prod){
			if(prod.product_id==product_id){
				product_id = '';
				alert('Produto já inserido');
			};
		});

		if(product_id!='' && product_id!='0'){

		} else {
			alert('Favor selecionar um produto');
			document.getElementById("add-product-sale-btn").disabled = false;
			return;
		};

		var event = document.getElementById("product");
		var product = event.options[event.selectedIndex].text;
		var amount = document.getElementById('amount').value;

		if(amount!='' && amount>0){

		} else {
			alert('Favor inserir a quantidade');
			document.getElementById("add-product-sale-btn").disabled = false;
			return;
		};

		$.ajax({
			url: '/store-product-get',
			method: 'post',
			data: { id:product_id },
			success: function(response){
				if(response.product[0].amount<amount){
					alert('Quantidade em estoque é menor que da venda.');
					document.getElementById("add-product-sale-btn").disabled = false;
					return;
				};

				var p = {
					product_id: response.product[0].id,
					product_cod: response.product[0].cod,
					product_type: response.product[0].type,
					product_info: response.product[0].name+"/"+response.product[0].color,
					amount: amount,
					value: response.product[0].value,
					total_value: response.product[0].value*amount
				};

				sale_products_array.push(p);

				sale_products_json = JSON.stringify(sale_products_array);

				var kart_tbody = document.getElementById('product-kart-tbody');
				var htmlKart = "<tr><td id='p-id' hidden>"+ p.product_id +"</td>\
									<td>"+ p.product_info +"</td>\
									<td id='rem-product-amount-btn'><a>-</a></td>\
									<td id='p-amount'>"+ p.amount +"</td>\
									<td id='add-product-amount-btn'><a>+</a></td>\
									<td id='p-value'>"+ p.value +"</td>\
									<td id='p-total-value'>"+ p.total_value +"</td>\
									<td><a id='rem-product-sale-btn'>Remove</a></td>\
								</tr>";
				kart_tbody.innerHTML += htmlKart;

				// var sale_screen_tbody = document.getElementById('sale-screen-tbody');

				document.getElementById('sale-value').innerHTML = parseFloat(getTotalValue(sale_products_array));
				document.getElementById('sale-total-value').innerHTML = parseFloat(getTotalValue(sale_products_array)) - parseFloat(document.getElementById('sale-total-full-packs-amount').innerHTML);

				// htmlSaleScreen = "<tr>\
				// 					<td id='sale-total-full-packs-amount'>"+ getMollePacksAmount(sale_products_array)[0] * 115+"</td>\
				// 					<td id='sale-total-molle-packs-amount'>"+ getMollePacksAmount(sale_products_array)[1] * 75 +"</td>\
				// 					<td id='sale-value'>"+ getTotalValue(sale_products_array) +"</td>\
				// 					<td id='sale-total-value' style='font-weight:bold;color:green;font-size:20px;'>"+ (getTotalValue(sale_products_array) - (getMollePacksAmount(sale_products_array)[0] * 115) - (getMollePacksAmount(sale_products_array)[1] * 75)) +"</td>\
				// 				</tr>";
				// sale_screen_tbody.innerHTML = htmlSaleScreen;
				document.getElementById('amount').value = '';
				document.getElementById("add-product-sale-btn").disabled = false;
			}
		});
	});

	$('table').on('click', '#rem-product-sale-btn', function(){
		var rowEl = $(this).closest('tr');
		var id = rowEl.find('#p-id').text();
		rowEl[0].parentNode.removeChild(rowEl[0]);

		var newArray = [];
		for(var i in sale_products_array){
			if(id!=sale_products_array[i].product_id){
				newArray.push(sale_products_array[i]);
			};
		};
		sale_products_array = newArray;

		var total_value = 0;
		sale_products_array.forEach(function(sale_product){
			total_value += sale_product.total_value;
		});

		document.getElementById('sale-value').innerHTML = parseFloat(getTotalValue(sale_products_array));
		document.getElementById('sale-total-value').innerHTML = parseFloat(getTotalValue(sale_products_array)) - parseFloat(document.getElementById('sale-total-full-packs-amount').innerHTML);

		// var sale_screen_tbody = document.getElementById('sale-screen-tbody');
		// htmlSaleScreen = "<tr>\
		// 					<td id='sale-total-full-packs-amount'>"+ getMollePacksAmount(sale_products_array)[0] * 115+"</td>\
		// 					<td id='sale-total-molle-packs-amount'>"+ getMollePacksAmount(sale_products_array)[1] * 75 +"</td>\
		// 					<td id='sale-value'>"+ getTotalValue(sale_products_array) +"</td>\
		// 					<td id='sale-total-value' style='font-weight:bold;color:green;font-size:20px;'>"+ (getTotalValue(sale_products_array) - (getMollePacksAmount(sale_products_array)[0] * 115) - (getMollePacksAmount(sale_products_array)[1] * 75)) +"</td>\
		// 				</tr>";
		// sale_screen_tbody.innerHTML = htmlSaleScreen;
	});

	$('table').on('click', '#add-product-amount-btn', function(){
		var rowEl = $(this).closest('tr');
		var id = rowEl.find('#p-id').text();
		$.ajax({
			url: '/store-product-get',
			method: 'post',
			data: { id: id },
			success: function(response){
				if(response.product[0].amount>=parseInt(rowEl.find('#p-amount').text())+1){
					rowEl.find('#p-amount').text(parseInt(rowEl.find('#p-amount').text())+1);
					rowEl.find('#p-total-value').text(parseInt(rowEl.find('#p-value').text())*parseInt(rowEl.find('#p-amount').text()));
					sale_products_array.forEach(function(product){
						if(product.product_id==id){
							product.amount = parseInt(rowEl.find('#p-amount').text());
							product.total_value = parseInt(rowEl.find('#p-total-value').text());
						};
					});

					document.getElementById('sale-value').innerHTML = parseFloat(getTotalValue(sale_products_array));
					document.getElementById('sale-total-value').innerHTML = parseFloat(getTotalValue(sale_products_array)) - parseFloat(document.getElementById('sale-total-full-packs-amount').innerHTML);
				} else {
					alert('Não há mais deste produto em estoque.');
					return;
				};
			}
		});
	});

	$('table').on('click', '#rem-product-amount-btn', function(){
		var rowEl = $(this).closest('tr');
		var id = rowEl.find('#p-id').text();
		if(parseInt(rowEl.find('#p-amount').text())>1){
			rowEl.find('#p-amount').text(parseInt(rowEl.find('#p-amount').text())-1);
			rowEl.find('#p-total-value').text(parseInt(rowEl.find('#p-value').text())*parseInt(rowEl.find('#p-amount').text()));
			sale_products_array.forEach(function(product){
				if(product.product_id==id){
					product.amount = parseInt(rowEl.find('#p-amount').text());
					product.total_value = parseInt(rowEl.find('#p-total-value').text());
				};
			});
		};

		document.getElementById('sale-value').innerHTML = parseFloat(getTotalValue(sale_products_array));
		document.getElementById('sale-total-value').innerHTML = parseFloat(getTotalValue(sale_products_array)) - parseFloat(document.getElementById('sale-total-full-packs-amount').innerHTML);
	});

	$('#insert-discount-btn').on('click', function(event){
		document.getElementById('insert-discount-btn').disabled = true;

		var discount = document.getElementById('src-discount-value').value;

		if(discount<0 || discount==''){
			alert('Desconto não pode ser inferior a $0.00 ou diferente de um número.');
			document.getElementById('insert-discount-btn').disabled = false;
			return;
		};

		document.getElementById('sale-total-full-packs-amount').innerHTML = parseFloat(discount);
		document.getElementById('sale-total-value').innerHTML = parseFloat(getTotalValue(sale_products_array)) - parseFloat(document.getElementById('sale-total-full-packs-amount').innerHTML);
		
		document.getElementById('insert-discount-btn').disabled = false;
	});
});