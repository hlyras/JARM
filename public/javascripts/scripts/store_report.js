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

	//----------------------------------------------
	// START OF SALE REPORT

	// $(document).on('click', '#report-sale-filter-btn', function() {
	// 	document.getElementById('report-sale-filter-btn').disabled = true;
	// 	if(document.getElementById('sale-report-status').value==='enviado'){
	// 		var month = document.getElementById('sale-report-month').value;
	// 		var status = "enviado";
	// 	} else if(document.getElementById('sale-report-status').value==='cancelado'){
	// 		var month = document.getElementById('sale-report-month').value;
	// 		var status = "cancelado";
	// 	} else if(document.getElementById('sale-report-status').value==='devolucao'){
	// 		var month = document.getElementById('sale-report-month').value;
	// 		var status = "devolucao";
	// 	} else if(document.getElementById('sale-report-status').value==='em-devolucao'){
	// 		var month = document.getElementById('sale-report-month').value;
	// 		var status = "em-devolucao";
	// 	} else if(document.getElementById('sale-report-status').value==='preparacao'){
	// 		var month = document.getElementById('sale-report-month').value;
	// 		var status = "preparacao";
	// 	} else if(document.getElementById('sale-report-status').value==='todos'){
	// 		var month = document.getElementById('sale-report-month').value;
	// 		var status = "";
	// 	};
	// 	$.ajax({
	// 		url: '/sale-report',
	// 		method: 'post',
	// 		data: { month: month, status: status },
	// 		success: function(response) {
	// 			if(response.unauthorized){
	// 				alert(response.unauthorized);
	// 				window.location.href = '/login';
	// 				return;
	// 			};

	// 			var productSalePageSize = 15;
	// 			var productSalePage = 0;

	// 			var productSaleData = response.products;
	// 			var tbodyProductsSale = document.getElementById('report-product-sale-tbody');
	// 			var htmlProductsSale = "";
			    
	// 			function productSalePaging(){
	// 				htmlProductsSale = "";
	// 		    	if(response.products!=""){
	// 				    for (var i = productSalePage * productSalePageSize; i < productSaleData.length && i < (productSalePage + 1) *  productSalePageSize; i++) {
	// 						htmlProductsSale += "<tr>";
	// 						htmlProductsSale += "<td id='src-product-id' hidden>"+ productSaleData[i].id +"</td>";
	// 						htmlProductsSale += "<td id='src-product-status' hidden>"+ productSaleData[i].status +"</td>";
	// 						htmlProductsSale += "<td id='src-product-month' hidden>"+ productSaleData[i].month +"</td>";
	// 						htmlProductsSale += "<td>"+ productSaleData[i].cod +"</td>";
	// 						htmlProductsSale += "<td>"+ productSaleData[i].name +"</td>";
	// 						htmlProductsSale += "<td>"+ productSaleData[i].color +"</td>";
	// 						htmlProductsSale += "<td>"+ productSaleData[i].amount +"</td>";
	// 						htmlProductsSale += "<td><a id='report-sale-btn'>ver</a></td>";
	// 						htmlProductsSale += "</tr>";
	// 				    };
	// 				    tbodyProductsSale.innerHTML = htmlProductsSale;
	// 				} else {
	// 				    tbodyProductsSale.innerHTML = htmlProductsSale;
	// 					alert('Busca sem resultados.');
	// 				};
	// 			    $('#productSalePageNumber').text('' + (productSalePage + 1) + ' de ' + Math.ceil(productSaleData.length / productSalePageSize));
	// 			};

	// 			function productSaleButtonsPaging(){
	// 			    $('#productSaleNext').prop('disabled', productSaleData.length <= productSalePageSize || productSalePage >= productSaleData.length / productSalePageSize - 1);
	// 			    $('#productSalePrevious').prop('disabled', productSaleData.length <= productSalePageSize || productSalePage == 0);
	// 			};

	// 			$(function(){
	// 			    $('#productSaleNext').click(function(){
	// 			        if (productSalePage < productSaleData.length / productSalePageSize - 1) {
	// 			            productSalePage++;
	// 			            productSalePaging();
	// 			            productSaleButtonsPaging();
	// 			        };
	// 			    });
	// 			    $('#productSalePrevious').click(function(){
	// 			        if (productSalePage > 0) {
	// 			            productSalePage--;
	// 			            productSalePaging();
	// 			            productSaleButtonsPaging();
	// 			        };
	// 			    });
	// 			    productSalePaging();
	// 			    productSaleButtonsPaging();
	// 			});

	// 			lib.clearBox("Sale");
	// 			lib.clearBox("Devolution");
	// 			lib.clearBox("Withdrawal");
	// 			document.getElementById('report-sale-filter-btn').disabled = false;
	// 		}
	// 	});
	// });

	$('table').on('click', '#report-store-sale-btn', function(){
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

				document.getElementById("report-sale-btn").style.pointerEvents = "";
			}
		});
	});
});