$(function(){
	$('#create-store-supply-btn').on('click', function(event){
		document.getElementById("create-store-supply-btn").disabled = true;
		event.preventDefault();

		$.ajax({
			url: '/store-supply-save',
			method: 'post',
			data: {
				obs:document.getElementById('obs').value,
				products: JSON.stringify(product_array)
			},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById('create-store-supply-btn').disabled = false;
					return;
				};

				if(response.overAmount!=undefined){
					var alertHTML = 'Faltam\n\n';
					response.overAmount.forEach(function(product){
						alertHTML += ''+product.amount+' '+product.type+'(s) '+product.name+' '+product.color+'\n\n';
					});
					alertHTML += 'para completar pedido.';
					alert(alertHTML);
					document.getElementById('create-store-supply-btn').disabled = false;
					return;
				};

				alert(response.done);

				product_array = [];
				document.getElementById('main-supply-tbody').innerHTML = "";
				document.getElementById('create-store-supply-btn').disabled = false;
			}
		});
	});

	
	$('#filter-store-supply-btn').on('click', function(event){
		document.getElementById("filter-store-supply-btn").disabled = true;
		event.preventDefault();
		var status = document.getElementById('get-status').value;
		var date = document.getElementById('get-date').value;

		$.ajax({
			url: '/store-supply-filter',
			method: 'post',
			data: {
				status:status, 
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
					document.getElementById('filter-store-supply-btn').disabled = false;
					return;
				};

				var supplyPageSize = 15;
				var supplyPage = 0;
				var supplyData = response.supplys;
				var showSupply = document.getElementById('main-supply-tbody');

				function supplyPaging(){
					htmlSupplys = "";
					htmlSupplys += "<table>";
					if(response.supplyData!=""){
					    for (var i = supplyPage * supplyPageSize; i < supplyData.length && i < (supplyPage + 1) *  supplyPageSize; i++) {
							if(supplyData[0].status==='0'){
								htmlSupplys += "<tr>";
								htmlSupplys += "<td id='src-store-supply-id' hidden>"+ supplyData[i].id +"</td>";
								htmlSupplys += "<td><a id='show-store-supply-btn'>"+ supplyData[i].id +"</a></td>";
								htmlSupplys += "<td id='src-store-supply-date'>"+ supplyData[i].date +"</td>";
								htmlSupplys += "<td id='src-store-supply-user'>"+ supplyData[i].user +"</td>";
								htmlSupplys += "<td id='src-store-supply-status'>Não confirmado</td>";
								htmlSupplys += "<td id='src-store-supply-confirmation_user'>"+ supplyData[i].confirmation_user +"</td>";
								htmlSupplys += "</tr>";
							} else {
								htmlSupplys += "<tr>";
								htmlSupplys += "<td id='src-store-supply-id' hidden>"+ supplyData[i].id +"</td>";
								htmlSupplys += "<td><a id='show-store-supply-btn'>"+ supplyData[i].id +"</a></td>";
								htmlSupplys += "<td id='src-store-supply-date'>"+ supplyData[i].date +"</td>";
								htmlSupplys += "<td id='src-store-supply-user'>"+ supplyData[i].user +"</td>";
								htmlSupplys += "<td id='src-store-supply-status'>Confirmado</td>";
								htmlSupplys += "<td id='src-store-supply-confirmation_user'>"+ supplyData[i].confirmation_user +"</td>";
								htmlSupplys += "</tr>";
							};
						};
						htmlSupplys += "</table>";
						showSupply.innerHTML = htmlSupplys;
					} else {
						showSupply.innerHTML = htmlSupplys;
						alert('Nenhum dado encontrado.');
					};
				    $('#supplyPageNumber').text('' + (supplyPage + 1) + ' de ' + Math.ceil(supplyData.length / supplyPageSize));
				};

				function supplyButtonsPaging(){
				    $('#supplyNext').prop('disabled', supplyData.length <= supplyPageSize || supplyPage >= supplyData.length / supplyPageSize - 1);
				    $('#supplyPrevious').prop('disabled', supplyData.length <= supplyPageSize || supplyPage == 0);
				};

				$(function(){
				    $('#supplyNext').click(function(){
				        if (supplyPage < supplyData.length / supplyPageSize - 1) {
				            supplyPage++;
				            supplyPaging();
				            supplyButtonsPaging();
				        };
				    });
				    $('#supplyPrevious').click(function(){
				        if (supplyPage > 0) {
				            supplyPage--;
				            supplyPaging();
				            supplyButtonsPaging();
				        };
				    });
				    supplyPaging();
				    supplyButtonsPaging();
				});

				document.getElementById('filter-store-supply-btn').disabled = false;
			}
		});
	});

	$('#filter-storage-supply-btn').on('click', function(event){
		document.getElementById("filter-storage-supply-btn").disabled = true;
		event.preventDefault();
		var status = document.getElementById('get-status').value;
		var date = document.getElementById('get-date').value;

		$.ajax({
			url: '/store-supply-filter',
			method: 'post',
			data: {
				status:status, 
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
					document.getElementById('filter-storage-supply-btn').disabled = false;
					return;
				};

				var supplyPageSize = 15;
				var supplyPage = 0;
				var supplyData = response.supplys;
				var showSupply = document.getElementById('main-supply-tbody');

				function supplyPaging(){
					htmlSupplys = "";
					htmlSupplys += "<table>";
					if(response.supplyData!=""){
					    for (var i = supplyPage * supplyPageSize; i < supplyData.length && i < (supplyPage + 1) *  supplyPageSize; i++) {
							if(supplyData[0].status==='0'){
								htmlSupplys += "<tr>";
								htmlSupplys += "<td id='src-store-supply-id' hidden>"+ supplyData[i].id +"</td>";
								htmlSupplys += "<td><a id='show-store-supply-btn'>"+ supplyData[i].id +"</a></td>";
								htmlSupplys += "<td id='src-store-supply-date'>"+ supplyData[i].date +"</td>";
								htmlSupplys += "<td id='src-store-supply-user'>"+ supplyData[i].user +"</td>";
								htmlSupplys += "<td><a id='update-store-supply'>Confirmar</a></td>";
								htmlSupplys += "<td id='src-store-supply-confirmation_user'>Ag.confirmação</td>";
								htmlSupplys += "</tr>";
							} else {
								htmlSupplys += "<tr>";
								htmlSupplys += "<td id='src-store-supply-id' hidden>"+ supplyData[i].id +"</td>";
								htmlSupplys += "<td><a id='show-store-supply-btn'>"+ supplyData[i].id +"</a></td>";
								htmlSupplys += "<td id='src-store-supply-date'>"+ supplyData[i].date +"</td>";
								htmlSupplys += "<td id='src-store-supply-user'>"+ supplyData[i].user +"</td>";
								htmlSupplys += "<td id='src-store-supply-status'>Confirmado</td>";
								htmlSupplys += "<td id='src-store-supply-confirmation_user'>"+ supplyData[i].confirmation_user +"</td>";
								htmlSupplys += "</tr>";
							};
						};
						htmlSupplys += "</table>";
						showSupply.innerHTML = htmlSupplys;
					} else {
						showSupply.innerHTML = htmlSupplys;
						alert('Nenhum dado encontrado.');
					};
				    $('#supplyPageNumber').text('' + (supplyPage + 1) + ' de ' + Math.ceil(supplyData.length / supplyPageSize));
				};

				function supplyButtonsPaging(){
				    $('#supplyNext').prop('disabled', supplyData.length <= supplyPageSize || supplyPage >= supplyData.length / supplyPageSize - 1);
				    $('#supplyPrevious').prop('disabled', supplyData.length <= supplyPageSize || supplyPage == 0);
				};

				$(function(){
				    $('#supplyNext').click(function(){
				        if (supplyPage < supplyData.length / supplyPageSize - 1) {
				            supplyPage++;
				            supplyPaging();
				            supplyButtonsPaging();
				        };
				    });
				    $('#supplyPrevious').click(function(){
				        if (supplyPage > 0) {
				            supplyPage--;
				            supplyPaging();
				            supplyButtonsPaging();
				        };
				    });
				    supplyPaging();
				    supplyButtonsPaging();
				});

				lib.clearBox('StoreSupply');
				document.getElementById('filter-storage-supply-btn').disabled = false;
			}
		});
	});

	$('table').on('click', '#update-store-supply', function(event){
		document.getElementById("update-store-supply").disabled = true;
		event.preventDefault();

		var rowEl = $(this).closest('tr');
		var id = rowEl.find('#src-store-supply-id').text();

		$.ajax({
			url: '/store-supply-confirm',
			method: 'post',
			data: {
				store_supply_id:id
			},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					$('#filter-storage-supply-btn').click();
					return;
				};

				if(response.overAmount!=undefined){
					var alertHTML = 'Faltam\n\n';
					response.overAmount.forEach(function(product){
						alertHTML += ''+product.amount+' '+product.type+'(s) '+product.name+' '+product.color+'\n\n';
					});
					alertHTML += 'para completar pedido.';
					alert(alertHTML);
					$('#filter-storage-supply-btn').click();
					return;
				};

				alert(response.done);

				$('#filter-storage-supply-btn').click();
			}
		});
	});

	$('table').on('click', '#show-store-supply-btn', function(){
		document.getElementById("show-store-supply-btn").disabled = true;

		var rowEl = $(this).closest('tr');
		var store_supply_id = rowEl.find('#src-store-supply-id').text();

		$.ajax({
			url: '/store-supply-show',
			method: 'post',
			data: {	store_supply_id: store_supply_id },
			success: function(response){
				document.getElementById('showStoreSupplyBox').style.display = 'block';
				var show = document.getElementById('showStoreSupply');
				show.innerHTML = "";

				var html = "<div style='display:inline-block;border-bottom:1px solid black;'>Dados do Abastecimento: "+response.supply[0].id+"</div>";

				html += "<table>";
				html += "<tr>";
				html += "<td>Cód: "+response.supply[0].id+"</td>";
				html += "<td>Data: "+response.supply[0].date+"</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>User: "+response.supply[0].user+"</td>";
				html += "<td>Status: "+response.supply[0].status+"</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>Conf.: "+response.supply[0].confirmation_user+"</td>";
				html += "<td>obs: "+response.supply[0].obs+"</td>";
				html += "</tr>";

				html += "<tr>";
				html += "<td>...</td>";
				html += "<td>...</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>Produto</td>";
				html += "<td>Qtd</td>";
				html += "</tr>";
				response.supply[0].products.forEach(function(product){
					html += "<tr>";
					html += "<td>"+product.product_info+"</td>";
					html += "<td>"+product.amount+"</td>";
					html += "</tr>";
				});
				html += "</table>";
				show.innerHTML = html;
				document.getElementById("show-store-supply-btn").disabled = false;
			}
		});
	});
});

function printStoreSupply(response){
	var print_div = "";

	// var html = "<div style='display:inline-block;border-bottom:1px solid black;'>Dados da Venda: "+response.store_sale.cod+"</div>";
	var html = "<div style='display:inline-block;text-align:center;page-break-inside:avoid;page-break-after:auto;border-top:1px solid black;border-bottom:1px solid black;width:650px;margin-right:15px;padding:10px;'>";
	html += "<p style='font-size:20px'>"+response.store_supply.id+"</p><br>"

	html += "<table border=1 cellspacing=0 cellpadding=2 style='text-align:center;width:100%;font-size:12px;'>";
	html += "<tr>";
	html += "<td>Data: "+response.store_supply.full_date+"</td>";
	html += "<td>Cliente: "+response.store_supply.customer+"</td>";
	html += "<td>CPF: "+response.store_supply.customer_cpf+"</td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td>Pag: "+response.store_supply.payment+"</td>";
	html += "<td>Parc: "+response.store_supply.installment+"</td>";
	html += "<td>Vendedor: "+response.store_supply.user+"</td>";
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
	response.store_supply.products.forEach(function(product){
		html += "<tr>";
		html += "<td>"+product.product_info+"</td>";
		html += "<td>"+product.amount+"</td>";
		html += "</tr>";
	});

	html += "</table>";

	print_div = html;
	
	var conteudo = print_div,
	    tela_impressao = window.open('about:blank');
	
	tela_impressao.document.write(conteudo);
	tela_impressao.window.print();
	tela_impressao.window.close();
	
	print_div.innerHTML = '';
};