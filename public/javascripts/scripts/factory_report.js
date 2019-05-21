$(function(){
	$(document).on('change', '#selectFactoryReport', function() {
	  if(document.getElementById('selectFactoryReport').value==='production'){
    	document.getElementById('productionBox').style.display = "block";
    	document.getElementById('saleBox').style.display = "none";
	  } else if(document.getElementById('selectFactoryReport').value==='sale'){
    	document.getElementById('saleBox').style.display = "block";
    	document.getElementById('productionBox').style.display = "none";
	  };
	});

	$(document).on('click', '#report-production-filter-btn', function() {
		document.getElementById('report-production-filter-btn').disabled = true;
		if(document.getElementById('production-report-status').value==='concluido'){
			var month = document.getElementById('production-report-month').value;
			var status = "finalizado";
			var done = "1";
		} else if(document.getElementById('production-report-status').value==='n-concluido'){
			var month = document.getElementById('production-report-month').value;
			var status = "finalizado";
			var done = "0";
		} else if(document.getElementById('production-report-status').value==='a-concluir'){
			var month = document.getElementById('production-report-month').value;
			var status = "parcial";
			var done = "0";
		} else if(document.getElementById('production-report-status').value==='todos'){
			var month = document.getElementById('production-report-month').value;
			var status = "";
			var done = "";
			var r = confirm("Esta busca pode ser demorada, deseja continuar?");
			if(r==true){

			} else {
				document.getElementById('report-production-filter-btn').disabled = false;
				return;
			}
		};
		console.log(status, done, month);
		$.ajax({
			url: '/production-report',
			method: 'post',
			data: { status: status, done: done, month: month},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				var productProductionPageSize = 15;
				var productProductionPage = 0;

				var productProductionData = response.products;
				var tbodyProductsProduction = document.getElementById('report-product-production-tbody');
				var htmlProductsProduction = "";
			    
				function productProductionPaging(){
					htmlProductsProduction = "";
			    	if(response.products!=""){
					    for (var i = productProductionPage * productProductionPageSize; i < productProductionData.length && i < (productProductionPage + 1) *  productProductionPageSize; i++) {
							htmlProductsProduction += "<tr>";
							htmlProductsProduction += "<td id='src-product-id' hidden>"+ productProductionData[i].id +"</td>";
							htmlProductsProduction += "<td id='src-product-status' hidden>"+ productProductionData[i].status +"</td>";
							htmlProductsProduction += "<td id='src-product-done' hidden>"+ productProductionData[i].done +"</td>";
							htmlProductsProduction += "<td id='src-product-month' hidden>"+ productProductionData[i].month +"</td>";
							htmlProductsProduction += "<td>"+ productProductionData[i].cod +"</td>";
							htmlProductsProduction += "<td>"+ productProductionData[i].name +"</td>";
							htmlProductsProduction += "<td>"+ productProductionData[i].color +"</td>";
							htmlProductsProduction += "<td>"+ productProductionData[i].requestedAmount +"</td>";
							htmlProductsProduction += "<td>"+ productProductionData[i].deliveredAmount +"</td>";
							htmlProductsProduction += "<td><a id='report-production-btn'>ver</a></td>";
							htmlProductsProduction += "</tr>";
					    };
					    tbodyProductsProduction.innerHTML = htmlProductsProduction;
					} else {
					    tbodyProductsProduction.innerHTML = htmlProductsProduction;
						alert('Busca sem resultados.');
					};
				    $('#productProductionPageNumber').text('' + (productProductionPage + 1) + ' de ' + Math.ceil(productProductionData.length / productProductionPageSize));
				};

				function productButtonsPaging(){
				    $('#productNext').prop('disabled', productProductionData.length <= productProductionPageSize || productProductionPage >= productProductionData.length / productProductionPageSize - 1);
				    $('#productPrevious').prop('disabled', productProductionData.length <= productProductionPageSize || productProductionPage == 0);
				};

				$(function(){
				    $('#productNext').click(function(){
				        if (productProductionPage < productProductionData.length / productProductionPageSize - 1) {
				            productProductionPage++;
				            productProductionPaging();
				            productButtonsPaging();
				        };
				    });
				    $('#productPrevious').click(function(){
				        if (productProductionPage > 0) {
				            productProductionPage--;
				            productProductionPaging();
				            productButtonsPaging();
				        };
				    });
				    productProductionPaging();
				    productButtonsPaging();
				});

				//-------------------------------------------------------------------------------------

				var productionPageSize = 15;
				var productionPage = 0;

				var productionData = response.productions;
				var tbodyProductions = document.getElementById('main-production-tbody');
				var htmlProductions = "";
				function productionPaging(){
					htmlProductions = "";
					if(response.productions!=""){
					    for (var i = productionPage * productionPageSize; i < productionData.length && i < (productionPage + 1) *  productionPageSize; i++) {
							htmlProductions += "<tr>";
						    htmlProductions += "<td id='src-product-id' hidden>"+ productionData[i].product +"</td>";
							htmlProductions += "<td id='src-production-id'>"+ productionData[i].id +"</td>";
							htmlProductions += "<td>"+ productionData[i].date +"</td>";
							htmlProductions += "<td>"+ productionData[i].origin +"</td>";
							htmlProductions += "<td>"+ productionData[i].provider +"</td>";
							htmlProductions += "<td>"+ productionData[i].productName +"</td>";
							htmlProductions += "<td>"+ productionData[i].amount +"</td>";
							htmlProductions += "<td>"+ productionData[i].confirmed_amount +"</td>";
						    htmlProductions += "<td><a id='show-production-btn'>Mostrar</a></td>";
							htmlProductions += "</tr>";
						};
						tbodyProductions.innerHTML = htmlProductions;
					} else {
						tbodyProductions.innerHTML = htmlProductions;
						alert('Busca sem resultados.');
					};
				    $('#productionPageNumber').text('' + (productionPage + 1) + ' de ' + Math.ceil(productionData.length / productionPageSize));
				};

				function productionButtonsPaging(){
				    $('#productionNext').prop('disabled', productionData.length <= productionPageSize || productionPage >= productionData.length / productionPageSize - 1);
				    $('#productionPrevious').prop('disabled', productionData.length <= productionPageSize || productionPage == 0);
				};

				$(function(){
				    $('#productionNext').click(function(){
				        if (productionPage < productionData.length / productionPageSize - 1) {
				            productionPage++;
				            productionPaging();
				            productionButtonsPaging();
				        };
				    });
				    $('#productionPrevious').click(function(){
				        if (productionPage > 0) {
				            productionPage--;
				            productionPaging();
				            productionButtonsPaging();
				        };
				    });
				    productionPaging();
				    productionButtonsPaging();
				});

				lib.clearBox("Production");
				document.getElementById('report-production-filter-btn').disabled = false;
			}
		});
	});

	$('table').on('click', '#report-production-btn', function(){
		document.getElementById("report-production-btn").style.pointerEvents = "none";

		var rowEl = $(this).closest('tr');
		var product_id = rowEl.find('#src-product-id').text();
		var status = rowEl.find('#src-product-status').text();
		var done = rowEl.find('#src-product-done').text();
		var month = rowEl.find('#src-product-month').text();

		console.log(product_id);

		$.ajax({
			url: '/production-report',
			method: 'post',
			data: {	product_id: product_id, status: status, done: done, month: month},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				var productionPageSize = 15;
				var productionPage = 0;

				var productionData = response.productions;
				var tbodyProductions = document.getElementById('main-production-tbody');
				var htmlProductions = "";
				function productionPaging(){
					htmlProductions = "";
					if(response.productions!=""){
					    for (var i = productionPage * productionPageSize; i < productionData.length && i < (productionPage + 1) *  productionPageSize; i++) {
							htmlProductions += "<tr>";
						    htmlProductions += "<td id='src-product-id' hidden>"+ productionData[i].product +"</td>";
							htmlProductions += "<td id='src-production-id'>"+ productionData[i].id +"</td>";
							htmlProductions += "<td>"+ productionData[i].date +"</td>";
							htmlProductions += "<td>"+ productionData[i].origin +"</td>";
							htmlProductions += "<td>"+ productionData[i].provider +"</td>";
							htmlProductions += "<td>"+ productionData[i].productName +"</td>";
							htmlProductions += "<td>"+ productionData[i].amount +"</td>";
							htmlProductions += "<td>"+ productionData[i].confirmed_amount +"</td>";
						    htmlProductions += "<td><a id='show-production-btn'>Mostrar</a></td>";
							htmlProductions += "</tr>";
						};
						tbodyProductions.innerHTML = htmlProductions;
					} else {
						tbodyProductions.innerHTML = htmlProductions;
						alert('Busca sem resultados.');
					};
				    $('#productionPageNumber').text('' + (productionPage + 1) + ' de ' + Math.ceil(productionData.length / productionPageSize));
				};

				function productionButtonsPaging(){
				    $('#productionNext').prop('disabled', productionData.length <= productionPageSize || productionPage >= productionData.length / productionPageSize - 1);
				    $('#productionPrevious').prop('disabled', productionData.length <= productionPageSize || productionPage == 0);
				};

				$(function(){
				    $('#productionNext').click(function(){
				        if (productionPage < productionData.length / productionPageSize - 1) {
				            productionPage++;
				            productionPaging();
				            productionButtonsPaging();
				        };
				    });
				    $('#productionPrevious').click(function(){
				        if (productionPage > 0) {
				            productionPage--;
				            productionPaging();
				            productionButtonsPaging();
				        };
				    });
				    productionPaging();
				    productionButtonsPaging();
				});

				tbodyProductions.innerHTML = htmlProductions;
				lib.clearBox("Production");
				document.getElementById("report-production-btn").style.pointerEvents = "";
			}
		});
	});

	// END OF PRODUCTION REPORT
	//----------------------------------------------
	// START OF SALE REPORT

	$(document).on('click', '#report-sale-filter-btn', function() {
		document.getElementById('report-sale-filter-btn').disabled = true;
		if(document.getElementById('sale-report-status').value==='enviado'){
			var month = document.getElementById('sale-report-month').value;
			var status = "enviado";
		} else if(document.getElementById('sale-report-status').value==='cancelado'){
			var month = document.getElementById('sale-report-month').value;
			var status = "cancelado";
		} else if(document.getElementById('sale-report-status').value==='devolucao'){
			var month = document.getElementById('sale-report-month').value;
			var status = "devolucao";
		} else if(document.getElementById('sale-report-status').value==='em-devolucao'){
			var month = document.getElementById('sale-report-month').value;
			var status = "em-devolucao";
		} else if(document.getElementById('sale-report-status').value==='preparacao'){
			var month = document.getElementById('sale-report-month').value;
			var status = "preparacao";
		} else if(document.getElementById('sale-report-status').value==='todos'){
			var month = document.getElementById('sale-report-month').value;
			var status = "";
		};
		$.ajax({
			url: '/sale-report',
			method: 'post',
			data: { month: month, status: status },
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				var productSalePageSize = 15;
				var productSalePage = 0;

				var productSaleData = response.products;
				var tbodyProductsSale = document.getElementById('report-product-sale-tbody');
				var htmlProductsSale = "";
			    
				function productSalePaging(){
					htmlProductsSale = "";
			    	if(response.products!=""){
					    for (var i = productSalePage * productSalePageSize; i < productSaleData.length && i < (productSalePage + 1) *  productSalePageSize; i++) {
							htmlProductsSale += "<tr>";
							htmlProductsSale += "<td id='src-product-id' hidden>"+ productSaleData[i].id +"</td>";
							htmlProductsSale += "<td id='src-product-status' hidden>"+ productSaleData[i].status +"</td>";
							htmlProductsSale += "<td id='src-product-month' hidden>"+ productSaleData[i].month +"</td>";
							htmlProductsSale += "<td>"+ productSaleData[i].cod +"</td>";
							htmlProductsSale += "<td>"+ productSaleData[i].name +"</td>";
							htmlProductsSale += "<td>"+ productSaleData[i].color +"</td>";
							htmlProductsSale += "<td>"+ productSaleData[i].amount +"</td>";
							htmlProductsSale += "<td><a id='report-sale-btn'>ver</a></td>";
							htmlProductsSale += "</tr>";
					    };
					    tbodyProductsSale.innerHTML = htmlProductsSale;
					} else {
					    tbodyProductsSale.innerHTML = htmlProductsSale;
						alert('Busca sem resultados.');
					};
				    $('#productSalePageNumber').text('' + (productSalePage + 1) + ' de ' + Math.ceil(productSaleData.length / productSalePageSize));
				};

				function productSaleButtonsPaging(){
				    $('#productSaleNext').prop('disabled', productSaleData.length <= productSalePageSize || productSalePage >= productSaleData.length / productSalePageSize - 1);
				    $('#productSalePrevious').prop('disabled', productSaleData.length <= productSalePageSize || productSalePage == 0);
				};

				$(function(){
				    $('#productSaleNext').click(function(){
				        if (productSalePage < productSaleData.length / productSalePageSize - 1) {
				            productSalePage++;
				            productSalePaging();
				            productSaleButtonsPaging();
				        };
				    });
				    $('#productSalePrevious').click(function(){
				        if (productSalePage > 0) {
				            productSalePage--;
				            productSalePaging();
				            productSaleButtonsPaging();
				        };
				    });
				    productSalePaging();
				    productSaleButtonsPaging();
				});


				//-------------------------------------------------------------------------------------

				var salePageSize = 15;
				var salePage = 0;

				var saleData = response.sales;
				var tbodySales = document.getElementById('main-sale-tbody');
				var htmlSales = "";
				function salePaging(){
					htmlSales = "";
					if(response.productions!=""){
					    for (var i = salePage * salePageSize; i < saleData.length && i < (salePage + 1) *  salePageSize; i++) {
							htmlSales += "<tr>";
							htmlSales += "<td id='src-sale-cod'>"+ saleData[i].cod +"</td>";
							htmlSales += "<td>"+ saleData[i].date +"</td>";
							htmlSales += "<td>"+ saleData[i].origin +"</td>";
							htmlSales += "<td>"+ saleData[i].name +"</td>";
							htmlSales += "<td>"+ saleData[i].status +"</td>";
							htmlSales += "<td id='src-sale-withdrawal-id' hidden>"+ saleData[i].withdrawal +"</a></td>";
						    htmlSales += "<td><a id='show-sale-withdrawal-btn'>"+ saleData[i].withdrawal +"</a></td>";
							htmlSales += "<td>"+ saleData[i].last_update +"</td>";
						    htmlSales += "<td id='src-sale-devolution-id' hidden>"+ saleData[i].dev_cod +"</a></td>";
						    htmlSales += "<td><a id='show-sale-devolution-btn'>"+ saleData[i].dev_cod +"</a></td>";
						    htmlSales += "<td><a id='show-sale-btn'>Mostrar</a></td>";
							htmlSales += "</tr>";
						};
						tbodySales.innerHTML = htmlSales;
					} else {
						tbodySales.innerHTML = htmlSales;
						alert('Busca sem resultados.');
					};
				    $('#salePageNumber').text('' + (salePage + 1) + ' de ' + Math.ceil(saleData.length / salePageSize));
				};

				function saleButtonsPaging(){
				    $('#saleNext').prop('disabled', saleData.length <= salePageSize || salePage >= saleData.length / salePageSize - 1);
				    $('#salePrevious').prop('disabled', saleData.length <= salePageSize || salePage == 0);
				};

				$(function(){
				    $('#saleNext').click(function(){
				        if (salePage < saleData.length / salePageSize - 1) {
				            salePage++;
				            salePaging();
				            saleButtonsPaging();
				        };
				    });
				    $('#salePrevious').click(function(){
				        if (salePage > 0) {
				            salePage--;
				            salePaging();
				            saleButtonsPaging();
				        };
				    });
				    salePaging();
				    saleButtonsPaging();
				});

				lib.clearBox("Sale");
				lib.clearBox("Devolution");
				lib.clearBox("Withdrawal");
				document.getElementById('report-sale-filter-btn').disabled = false;
			}
		});
	});

	$('table').on('click', '#report-sale-btn', function(){
		document.getElementById("report-sale-btn").style.pointerEvents = "none";

		var rowEl = $(this).closest('tr');
		var id = rowEl.find('#src-product-id').text();
		var status = rowEl.find('#src-product-status').text();
		var month = rowEl.find('#src-product-month').text();

		$.ajax({
			url: '/sale-report',
			method: 'post',
			data: {	id: id, status: status, month: month },
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				var salePageSize = 15;
				var salePage = 0;

				var saleData = response.sales;
				var tbodySales = document.getElementById('main-sale-tbody');
				var htmlSales = "";
				function salePaging(){
					htmlSales = "";
					if(response.productions!=""){
					    for (var i = salePage * salePageSize; i < saleData.length && i < (salePage + 1) *  salePageSize; i++) {
							htmlSales += "<tr>";
							htmlSales += "<td id='src-sale-cod'>"+ saleData[i].cod +"</td>";
							htmlSales += "<td>"+ saleData[i].date +"</td>";
							htmlSales += "<td>"+ saleData[i].origin +"</td>";
							htmlSales += "<td>"+ saleData[i].name +"</td>";
							htmlSales += "<td>"+ saleData[i].status +"</td>";
							htmlSales += "<td id='src-sale-withdrawal-id' hidden>"+ saleData[i].withdrawal +"</a></td>";
						    htmlSales += "<td><a id='show-sale-withdrawal-btn'>"+ saleData[i].withdrawal +"</a></td>";
							htmlSales += "<td>"+ saleData[i].last_update +"</td>";
						    htmlSales += "<td id='src-sale-devolution-id' hidden>"+ saleData[i].dev_cod +"</a></td>";
						    htmlSales += "<td><a id='show-sale-devolution-btn'>"+ saleData[i].dev_cod +"</a></td>";
						    htmlSales += "<td><a id='show-sale-btn'>Mostrar</a></td>";
							htmlSales += "</tr>";
						};
						tbodySales.innerHTML = htmlSales;
					} else {
						tbodySales.innerHTML = htmlSales;
						alert('Busca sem resultados.');
					};
				    $('#salePageNumber').text('' + (salePage + 1) + ' de ' + Math.ceil(saleData.length / salePageSize));
				};

				function saleButtonsPaging(){
				    $('#saleNext').prop('disabled', saleData.length <= salePageSize || salePage >= saleData.length / salePageSize - 1);
				    $('#salePrevious').prop('disabled', saleData.length <= salePageSize || salePage == 0);
				};

				$(function(){
				    $('#saleNext').click(function(){
				        if (salePage < saleData.length / salePageSize - 1) {
				            salePage++;
				            salePaging();
				            saleButtonsPaging();
				        };
				    });
				    $('#salePrevious').click(function(){
				        if (salePage > 0) {
				            salePage--;
				            salePaging();
				            saleButtonsPaging();
				        };
				    });
				    salePaging();
				    saleButtonsPaging();
				});

				lib.clearBox("Sale");
				lib.clearBox("Devolution");
				lib.clearBox("Withdrawal");
				document.getElementById("report-sale-btn").style.pointerEvents = "";
			}
		});
	});
});