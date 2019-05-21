var sale_products_array = [];
var sale_products_json = "";

$(function(){
	$('#create-store-sale-btn').on('click', function(event){
		document.getElementById("create-store-sale-btn").disabled = true;
		var cashier_id = document.getElementById('cashier-id').innerHTML;
		var customer = document.getElementById('customer').value;
		var payment = document.getElementById('payment').value;
		var installment = document.getElementById('installment').value;
		var discount_full_packs = document.getElementById('sale-total-full-packs-amount').innerHTML;
		var discount_molle_packs = document.getElementById('sale-total-molle-packs-amount').innerHTML;
		var sale_total_value = document.getElementById('sale-total-value').innerHTML;
		var sale_value = document.getElementById('sale-value').innerHTML;

		$.ajax({
			url: '/store-sale-save',
			method: 'post',
			data: {
				customer: customer,
				cashier_id: cashier_id,
				payment: payment,
				installment: installment,
				discount_full_packs: discount_full_packs,
				discount_molle_packs: discount_molle_packs,
				discount: 0,
				sale_total_value: sale_total_value,
				sale_value: sale_value,
				sale_products: JSON.stringify(sale_products_array)
			},
			success: function(response){
				if(response.msg){
					alert(response.msg);
					document.getElementById("create-store-sale-btn").disabled = false;
					return;
				};

				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				alert(response.done);

				printStoreSale(response);

				document.getElementById('customer').value = '';
				document.getElementById('payment').value = '0';
				document.getElementById('installment').value = '1';
				document.getElementById('sale-total-full-packs-amount').innerHTML = 0;
				document.getElementById('sale-total-molle-packs-amount').innerHTML = 0;
				document.getElementById('sale-total-value').innerHTML = 0;
				document.getElementById('sale-value').innerHTML = 0;
				document.getElementById('product-kart-tbody').innerHTML = '';
				sale_products_array = [];

				document.getElementById("create-store-sale-btn").disabled = false;
			}
		});
	});

	$('#filter-store-sale-btn').on('click', function(event){
		document.getElementById("filter-store-sale-btn").disabled = true;
		event.preventDefault();
		var store_sale_cod = document.getElementById('get-store-sale-cod').value;
		var customer_cpf = document.getElementById('get-customer-cpf').value;
		var date = document.getElementById('get-date').value;

		$.ajax({
			url: '/store-sale-filter',
			method: 'post',
			data: {
				store_sale_cod:store_sale_cod,
				customer_cpf:customer_cpf,
				date:lib.convertDate(date)
			},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById('filter-store-sale-btn').disabled = false;
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
							htmlSales += "<td><a id='print-store-sale-btn'>Imprimir</a></td>";
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

				document.getElementById('filter-store-sale-btn').disabled = false;
			}
		});
	});

	$('table').on('click', '#print-store-sale-btn', function(){
		document.getElementById("print-store-sale-btn").disabled = true;

		var rowEl = $(this).closest('tr');
		var sale_cod = rowEl.find('#src-store-sale-cod').text();

		$.ajax({
			url: '/store-sale-get',
			method: 'post',
			data: {	sale_cod: sale_cod },
			success: function(response){
				printStoreSale(response);
				document.getElementById("print-store-sale-btn").disabled = false;
			}
		});
	});

	$('table').on('click', '#show-store-sale-btn', function(){
		document.getElementById("show-store-sale-btn").disabled = true;

		var rowEl = $(this).closest('tr');
		var sale_cod = rowEl.find('#src-store-sale-cod').text();

		$.ajax({
			url: '/store-sale-show',
			method: 'post',
			data: {	sale_cod: sale_cod },
			success: function(response){
				document.getElementById('showStoreSaleBox').style.display = 'block';
				var show = document.getElementById('showStoreSale');
				show.innerHTML = "";

				var html = "<div style='display:inline-block;border-bottom:1px solid black;'>Dados da Venda: "+response.sale[0].cod+"</div>";

				html += "<table>";
				html += "<tr>";
				html += "<td>Data: "+response.sale[0].full_date+"</td>";
				html += "<td>Origem: "+response.sale[0].origin+"</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>Cliente: "+response.sale[0].customer+"</td>";
				html += "<td>CPF: "+response.sale[0].customer_cpf+"</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>Pagamento: "+response.sale[0].payment+"</td>";
				html += "<td>Valor: "+response.sale[0].value+"</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>Descontos: "+response.sale[0].discount_full_packs+"</td>";
				html += "<td>Valor final: "+response.sale[0].total_value+"</td>";
				html += "</tr>";

				html += "<tr>";
				html += "<td>...</td>";
				html += "<td>...</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>Produto</td>";
				html += "<td>Qtd</td>";
				html += "</tr>";
				response.products.forEach(function(product){
					html += "<tr>";
					html += "<td>"+product.product_info+"</td>";
					html += "<td>"+product.amount+"</td>";
					html += "</tr>";
				});
				html += "</table>";
				show.innerHTML = html;
				document.getElementById("show-store-sale-btn").disabled = false;
			}
		});
	});
});

function openCashier(){
	return;
};

function printStoreSale(response){
	var print_div = "";

	// var html = "<div style='display:inline-block;border-bottom:1px solid black;'>Dados da Venda: "+response.store_sale.cod+"</div>";
	var html = "<div style='display:inline-block;text-align:center;page-break-inside:avoid;page-break-after:auto;border-top:1px solid black;border-bottom:1px solid black;width:650px;margin-right:15px;padding:10px;'>";
	html += "<img src='https://cdn.minestore.com.br/media/W1siZiIsImotYS1yaW8tbWlsaXRhci90aGVtZV9pbWFnZXMvODJhYWNkZTEtMTRiOS00ZDg0LTk3OTMtN2MxMWM4ZWY1OGI0Il0sWyJwIiwidGh1bWIiLCIyMTB4Il1d'><br>"
	html += "<p style='font-size:8px'>Nome da empresa e CNPJ: 123.200101023123.3</p><br>"

	html += "<table border=1 cellspacing=0 cellpadding=2 style='text-align:center;width:100%;font-size:12px;'>";
	html += "<tr>";
	html += "<td>Data: "+response.store_sale.full_date+"</td>";
	html += "<td>Cliente: "+response.store_sale.customer+"</td>";
	html += "<td>CPF: "+response.store_sale.customer_cpf+"</td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td>Pag: "+response.store_sale.payment+"</td>";
	html += "<td>Parc: "+response.store_sale.installment+"</td>";
	html += "<td>Vendedor: "+response.store_sale.user+"</td>";
	html += "</tr>";
	html += "</table>";

	html += "<br>";
	
	html += "<table border=1 cellspacing=0 cellpadding=2 style='text-align:center;width:100%;font-size:12px;'>";
	html += "<tr>";
	html += "<td>Produto</td>";
	html += "<td>Qtd</td>";
	html += "<td>Val.un.</td>";
	html += "<td></td>";
	html += "<td></td>";
	html += "</tr>";
	response.store_sale.products.forEach(function(product){
		html += "<tr>";
		html += "<td>"+product.product_info+"</td>";
		html += "<td>"+product.amount+"</td>";
		html += "<td>"+product.value+"</td>";
		html += "<td></td>";
		html += "<td>"+(product.value*product.amount)+"</td>";
		html += "</tr>";
	});
	html += "<tr>";
	html += "<td><br></td>";
	html += "<td><br></td>";
	html += "<td><br></td>";
	html += "<td><br></td>";
	html += "<td>-----</td>";
	html += "</tr>";

	html += "<tr>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td>Valor total:</td>";
	html += "<td>"+response.store_sale.value+"</td>";
	html += "</tr>";

	html += "<tr>";
	html += "<td></td>";
	html += "<td>Descontos</td>";
	html += "<td>kit mod.</td>";
	html += "<td>outros</td>";
	html += "<td></td>";
	html += "</tr>";

	html += "<tr>";
	html += "<td></td>";
	html += "<td>"+response.store_sale.discount_full_packs+"</td>";
	html += "<td>"+response.store_sale.discount_molle_packs+"</td>";
	html += "<td>"+response.store_sale.discount+"</td>";
	html += "<td>-"+(parseInt(response.store_sale.discount_full_packs)+
			parseInt(response.store_sale.discount_molle_packs)+
			parseInt(response.store_sale.discount))+
			"</td>";
	html += "</tr>";

	html += "<tr>";
	html += "<td><br></td>";
	html += "<td><br></td>";
	html += "<td><br></td>";
	html += "<td><br></td>";
	html += "</tr>";
	
	html += "<tr>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td></td>";
	html += "<td>valor:</td>";
	html += "<td style='font-weight:bold;font-weight:15px;'>"+response.store_sale.total_value+"</td>";
	html += "</tr>";

	html += "</table>";

	print_div = html;
	
	var conteudo = print_div,
	    tela_impressao = window.open('about:blank');
	
	tela_impressao.document.write(conteudo);
	tela_impressao.window.print();
	tela_impressao.window.close();
	
	print_div.innerHTML = '';
};

// discount

function getMollePacksAmount(array){
	var vests_amount = 0;
	var molle_itens_amount = 0;
	var packs = [];
	var full_packs = 0;
	var molle_packs = 0;
	for(var i in array){
		if(array[i].product_type=='colete'){
			vests_amount += parseInt(array[i].amount);
		};
		if(array[i].product_type=='pecamodular'){
			molle_itens_amount += parseInt(array[i].amount);
		};
	};

	if(Math.floor(molle_itens_amount / 9) > vests_amount){
		full_packs = vests_amount;
		molle_packs = Math.floor(molle_itens_amount / 9) - vests_amount;
	} else if(Math.floor(molle_itens_amount / 9) <= vests_amount){
		full_packs = Math.floor(molle_itens_amount / 9);
	};

	packs.push(full_packs);
	packs.push(molle_packs);

	return packs;
};

function getTotalValue(array){
	var total_value = 0;

	array.forEach(function(sale_product){
		total_value += parseInt(sale_product.total_value);
	});

	return total_value;
};

// function updateSaleProducts(products_sale, products_pack){
// 	var inserted_product = [];
// 	var not_inserted_product = [];

// 	var myPack = products_pack;

// 	//verifica se o produto do pack já está no pedido e separa os que estão ou n inseridos.
// 	if(products_sale.length>0){
// 		for(var i in myPack){
// 			var indice = [];
// 			for(var j in products_sale){
// 				if(myPack[i].product_id==products_sale[j].product_id){
// 					inserted_product.push(myPack[i]);
// 				} else if(myPack[i].product_id!=products_sale[j].product_id){
// 					indice.push('.');
// 				};
// 				if(indice.length==products_sale.length){
// 					not_inserted_product.push(myPack[i]);
// 				};
// 			};
// 		};
// 	} else if(products_sale.length<1){
// 		console.log('<1')
// 		for(var i in myPack){
// 			products_sale.push(myPack[i]);
// 		};
// 	};

// 	console.log('inserted_product');
// 	console.log(inserted_product);
// 	for(var i in inserted_product){
// 		for(j in products_sale){
// 			if(inserted_product[i].product_id==products_sale[j].product_id){
// 				products_sale[j].amount += parseInt(inserted_product[i].amount);
// 				// products_sale[j].total_value = products_sale[j].value * products_sale[j].amount;
// 			};
// 		};
// 	};

// 	// for(var i in not_inserted_product){
// 	// 	products_sale.push(not_inserted_product[i]);
// 	// };

// 	// var kart_tbody = document.getElementById('product-kart-tbody');
// 	// kart_tbody.innerHTML = "";
// 	// for(var i in products_sale){
// 	// 	var htmlKart = "<tr><td id='src-id' hidden>"+ products_sale[i].product_id +"</td>\
// 	// 						<td>"+ products_sale[i].product +"</td>\
// 	// 						<td>"+ products_sale[i].amount +"</td>\
// 	// 						<td>"+ products_sale[i].value +"</td>\
// 	// 						<td>"+ products_sale[i].total_value +"</td>\
// 	// 						<td><a id='rem-product-sale-btn'>Remove</a></td>\
// 	// 					</tr>";
// 	// 	kart_tbody.innerHTML += htmlKart;
// 	// };

// 	// var sale_screen_tbody = document.getElementById('sale-screen-tbody');
// 	// sale_screen_tbody.innerHTML = "";
// 	// htmlSaleScreen = "<tr>\
// 	// 						<td></td>\
// 	// 						<td></td>\
// 	// 						<td>packs: "+ getMollePacksAmount(products_sale) +" - desconto: "+ getMollePacksAmount(products_sale) * 115 +"</td>\
// 	// 						<td>"+ getMollePacksAmount(products_sale) * 115 +"</td>\
// 	// 						<td>"+ getTotalValue(products_sale) +"</td>\
// 	// 					</tr>";
// 	// sale_screen_tbody.innerHTML = htmlSaleScreen;

// 	// console.log(inserted_product);
// 	// console.log(not_inserted_product);
// };