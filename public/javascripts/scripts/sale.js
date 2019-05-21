$(function(){
	$('#create-sale-btn').on('click', function(event){
		document.getElementById("create-sale-btn").disabled = true;
		event.preventDefault();

		var sale_origin = document.getElementById('origin').value;
		var sale_cod = document.getElementById('cod').value.replace(/^\s+|\s+$/g, '');
		var sale_name = document.getElementById('name').value.replace(/^\s+|\s+$/g, '');

		if(sale_cod!='' && sale_cod!=undefined){

		} else {
			alert('Favor inserir o código da venda');
			document.getElementById("create-sale-btn").disabled = false;
			return;
		};

		if(sale_name!='' && sale_name!=undefined){

		} else {
			alert('Favor inserir o nome do comprador');
			document.getElementById("create-sale-btn").disabled = false;
			return;
		};

		if(product_array.length<1){
			alert('Favor inserir os produtos');
			document.getElementById("create-sale-btn").disabled = false;
			return;
		};

		$.ajax({
			url: '/sale-save',
			method: 'post',
			data: {
				sale_origin: sale_origin,
				sale_cod: sale_cod,
				sale_name: sale_name,
				sale_products: JSON.stringify(product_array)
			},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById("create-sale-btn").disabled = false;
					return;
				};

				alert(response.done);

				product_array = [];
				document.getElementById('cod').value = '';
				document.getElementById('name').value = '';
				document.getElementById('amount').value = '';
				document.querySelector('tbody').innerHTML = '';
				document.getElementById("create-sale-btn").disabled = false;
			}
		});
	});

	//Filtro de venda
	$('#filterUnwithdrawal').on('click', function(event){
		document.getElementById('filterUnwithdrawal').disabled = true;
		event.preventDefault();
		$.ajax({
			url: '/sale-filter-unwithdrawal',
			method: 'post',
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				var dados = response.sales;
				var tbody = document.getElementById("main-sale-tbody");
				var html = "";
			    if(response.sales!=""){
			    	response.sales.forEach(function(sale){
						html += "<tr>";
                      	html += "<td><input type='checkbox' class='cod' id='"+sale.cod+"' checked></td>";
						html += "<td id='src-sale-origin'>"+ sale.origin +"</td>";
						html += "<td id='src-sale-cod' hidden>"+ sale.cod +"</td>";
						html += "<td><a id='show-sale-btn'>"+ sale.cod +"</a></td>";
						html += "<td id='src-sale-name'>"+ sale.name +"</td>";
						html += "<td id='src-sale-date'>"+ sale.date +"</td>";
						html += "<td id='src-sale-status'>"+ sale.status +"</td>";
						html += "<td id='src-sale-user'>"+ sale.user +"</td>";
						html += "<td id='src-sale-withdrawal-id' hidden>"+ sale.withdrawal +"</td>";
						html += "<td><a id='show-sale-withdrawal-btn'>"+ sale.withdrawal +"</a></td>";
						html += "<td id='src-sale-devolution-id' hidden>"+ sale.dev_cod +"</td>";
						html += "<td><a id='show-sale-devolution-btn'>"+ sale.dev_cod +"</a></td>";
						html += "</tr>";
			    	});
				} else {
					alert('Não há resultados na busca');
				};
				document.getElementById('filterUnwithdrawal').disabled = false;
				tbody.innerHTML = html;
				lib.clearBox('Sale');
			}
		});
	});

	$('#filter-sale-form').on('submit', function(event){
		event.preventDefault();
		var sale_date = lib.convertDate(document.getElementById('get-date').value);
		var sale_origin = document.getElementById('get-origin').value;
		var sale_cod = document.getElementById('get-cod').value.replace(/^\s+|\s+$/g, '');
		var sale_name = document.getElementById('get-name').value.replace(/^\s+|\s+$/g, '');
		var sale_status = document.getElementById('get-status').value;
		$.ajax({
			url: '/sale-filter',
			method: 'post',
			data: {sale_date:sale_date, sale_origin:sale_origin, sale_cod: sale_cod, sale_name: sale_name, sale_status: sale_status},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};


				var salePageSize = 15;
				var salePage = 0;
				var saleData = response.sales;
				var showSale = document.getElementById('main-sale-tbody');

				function salePaging(){
					htmlSales = "";
					htmlSales += "<table>";
					if(response.saleData!=""){
						console.log(saleData);
					    for (var i = salePage * salePageSize; i < saleData.length && i < (salePage + 1) *  salePageSize; i++) {
							if(saleData[0].status==='preparacao'){
								htmlSales += "<tr>";
								htmlSales += "<td><input type='checkbox' class='cod' id='"+saleData[i].cod+"'></td>";
								htmlSales += "<td id='src-sale-origin'>"+ saleData[i].origin +"</td>";
								htmlSales += "<td id='src-sale-cod' hidden>"+ saleData[i].cod +"</td>";
								htmlSales += "<td><a id='show-sale-btn'>"+ saleData[i].cod +"</a></td>";
								htmlSales += "<td id='src-sale-name'>"+ saleData[i].name +"</td>";
								htmlSales += "<td id='src-sale-date'>"+ saleData[i].date +"</td>";
								htmlSales += "<td id='src-sale-status'>"+ saleData[i].status +"</td>";
								htmlSales += "<td id='src-sale-user'>"+ saleData[i].user +"</td>";
								htmlSales += "<td id='src-sale-withdrawal-id' hidden>"+ saleData[i].withdrawal +"</td>";
								htmlSales += "<td><a id='show-sale-withdrawal-btn'>"+ saleData[i].withdrawal +"</a></td>";
								htmlSales += "<td id='src-sale-devolution-id' hidden>"+ saleData[i].dev_cod +"</td>";
								htmlSales += "<td><a id='show-sale-devolution-btn'>"+ saleData[i].dev_cod +"</a></td>";
								htmlSales += "</tr>";
							} else {
								htmlSales += "<tr>";
								htmlSales += "<td></td>";
								htmlSales += "<td id='src-sale-origin'>"+ saleData[i].origin +"</td>";
								htmlSales += "<td id='src-sale-cod' hidden>"+ saleData[i].cod +"</td>";
								htmlSales += "<td><a id='show-sale-btn'>"+ saleData[i].cod +"</a></td>";
								htmlSales += "<td id='src-sale-name'>"+ saleData[i].name +"</td>";
								htmlSales += "<td id='src-sale-date'>"+ saleData[i].date +"</td>";
								htmlSales += "<td id='src-sale-status'>"+ saleData[i].status +"</td>";
								htmlSales += "<td id='src-sale-user'>"+ saleData[i].user +"</td>";
								htmlSales += "<td id='src-sale-withdrawal-id' hidden>"+ saleData[i].withdrawal +"</td>";
								htmlSales += "<td><a id='show-sale-withdrawal-btn'>"+ saleData[i].withdrawal +"</a></td>";
								htmlSales += "<td id='src-sale-devolution-id' hidden>"+ saleData[i].dev_cod +"</td>";
								htmlSales += "<td><a id='show-sale-devolution-btn'>"+ saleData[i].dev_cod +"</a></td>";
								htmlSales += "</tr>";
							};
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
			}
		});
	});

	$('table').on('click', '#show-sale-btn', function(){
		document.getElementById("show-sale-btn").disabled = true;

		var rowEl = $(this).closest('tr');
		var sale_cod = rowEl.find('#src-sale-cod').text();

		$.ajax({
			url: '/sale-show',
			method: 'post',
			data: {	sale_cod: sale_cod },
			success: function(response){
				document.getElementById('showSaleBox').style.display = 'block';
				var show = document.getElementById('showSale');
				show.innerHTML = "";

				var html = "<div style='display:inline-block;border-bottom:1px solid black;'>Dados da Venda: "+response.sale[0].cod+"</div>";

				html += "<table>";
				html += "<tr>";
				html += "<td>Data: "+response.sale[0].date+"</td>";
				html += "<td>Origem: "+response.sale[0].origin+"</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>Comprador: "+response.sale[0].name+"</td>";
				html += "<td>User: "+response.sale[0].user+"</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>Status: "+response.sale[0].status+"</td>";
				html += "<td>Ult.at: "+response.sale[0].last_update+"</td>";
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
				document.getElementById("show-sale-btn").disabled = false;
			}
		});
	});

	$('#sale-filter-form').on('submit', function(event){
		event.preventDefault();
		var sale_date = lib.convertDate(document.getElementById('get-date').value);
		var sale_origin = document.getElementById('get-origin').value;
		var sale_cod = document.getElementById('get-cod').value.replace(/^\s+|\s+$/g, '');
		var sale_name = document.getElementById('get-name').value.replace(/^\s+|\s+$/g, '');
		var sale_status = document.getElementById('get-status').value;
		$.ajax({
			url: '/sale-filter',
			method: 'post',
			data: {sale_date:sale_date, sale_origin:sale_origin, sale_cod: sale_cod, sale_name: sale_name, sale_status: sale_status},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				console.log(response.sales)

				var salePageSize = 15;
				var salePage = 0;
				var saleData = response.sales;
				var showSale = document.getElementById('main-sale-tbody');

				function salePaging(){
					htmlSales = "";
					htmlSales += "<table>";
					if(saleData!=""){
						if(saleData[0].status==='preparacao'){
					    	for (var i = salePage * salePageSize; i < saleData.length && i < (salePage + 1) *  salePageSize; i++) {
								htmlSales += "<tr>";
								htmlSales += "<td id='src-sale-origin'>"+ saleData[i].origin +"</td>";
								htmlSales += "<td id='src-sale-cod' hidden>"+ saleData[i].cod +"</td>";
								htmlSales += "<td><a id='show-sale-btn'>"+ saleData[i].cod +"</a></td>";
								htmlSales += "<td id='src-sale-name'>"+ saleData[i].name +"</td>";
								htmlSales += "<td id='src-sale-date'>"+ saleData[i].date +"</td>";
								htmlSales += "<td id='src-sale-status'>"+ saleData[i].status +"</td>";
								htmlSales += "<td id='src-sale-user'>"+ saleData[i].user +"</td>";
								htmlSales += "<td id='src-sale-withdrawal-id' hidden>"+ saleData[i].withdrawal +"</td>";
								htmlSales += "<td><a id='show-sale-withdrawal-btn'>"+ saleData[i].withdrawal +"</a></td>";
								htmlSales += "<td id='src-sale-devolution-id' hidden>"+ saleData[i].dev_cod +"</td>";
								htmlSales += "<td><a id='show-sale-devolution-btn'>"+ saleData[i].dev_cod +"</a></td>";
								htmlSales += "<td><select id='src-sale-new_status'><option value='enviado'>Enviado</option><option value='cancelado'>Cancelado</option></select></td>";
								htmlSales += "<td><a id='update-sale-btn'>Update</a></td>";
								htmlSales += "</tr>";
					        };
					        lib.clearBox('Sale');
						} else if(saleData[0].status==='enviado'){
					    	for (var i = salePage * salePageSize; i < saleData.length && i < (salePage + 1) *  salePageSize; i++) {
								htmlSales += "<tr>";
								htmlSales += "<td id='src-sale-origin'>"+ saleData[i].origin +"</td>";
								htmlSales += "<td id='src-sale-cod' hidden>"+ saleData[i].cod +"</td>";
								htmlSales += "<td><a id='show-sale-btn'>"+ saleData[i].cod +"</a></td>";
								htmlSales += "<td id='src-sale-name'>"+ saleData[i].name +"</td>";
								htmlSales += "<td id='src-sale-date'>"+ saleData[i].date +"</td>";
								htmlSales += "<td id='src-sale-status'>"+ saleData[i].status +"</td>";
								htmlSales += "<td id='src-sale-user'>"+ saleData[i].user +"</td>";
								htmlSales += "<td id='src-sale-withdrawal-id' hidden>"+ saleData[i].withdrawal +"</td>";
								htmlSales += "<td><a id='show-sale-withdrawal-btn'>"+ saleData[i].withdrawal +"</a></td>";
								htmlSales += "<td id='src-sale-devolution-id' hidden>"+ saleData[i].dev_cod +"</td>";
								htmlSales += "<td><a id='show-sale-devolution-btn'>"+ saleData[i].dev_cod +"</a></td>";
								htmlSales += "<td>enviado por "+ saleData[i].last_update +"</td>";
								htmlSales += "<td hidden><select id='src-sale-new_status'><option value='em-devolucao'></option></td>";
								htmlSales += "<td><a id='update-sale-btn'>Devolução</a></td>";
								htmlSales += "</tr>";
					        };
					        lib.clearBox('Sale');
						} else if(saleData[0].status==='cancelado'){
					    	for (var i = salePage * salePageSize; i < saleData.length && i < (salePage + 1) *  salePageSize; i++) {
								htmlSales += "<tr>";
								htmlSales += "<td id='src-sale-origin'>"+ saleData[i].origin +"</td>";
								htmlSales += "<td id='src-sale-cod' hidden>"+ saleData[i].cod +"</td>";
								htmlSales += "<td><a id='show-sale-btn'>"+ saleData[i].cod +"</a></td>";
								htmlSales += "<td id='src-sale-name'>"+ saleData[i].name +"</td>";
								htmlSales += "<td id='src-sale-date'>"+ saleData[i].date +"</td>";
								htmlSales += "<td id='src-sale-status'>"+ saleData[i].status +"</td>";
								htmlSales += "<td id='src-sale-user'>"+ saleData[i].user +"</td>";
								htmlSales += "<td id='src-sale-withdrawal-id' hidden>"+ saleData[i].withdrawal +"</td>";
								htmlSales += "<td><a id='show-sale-withdrawal-btn'>"+ saleData[i].withdrawal +"</a></td>";
								htmlSales += "<td id='src-sale-devolution-id' hidden>"+ saleData[i].dev_cod +"</td>";
								htmlSales += "<td><a id='show-sale-devolution-btn'>"+ saleData[i].dev_cod +"</a></td>";
								htmlSales += "<td>cancelado por "+ saleData[i].last_update +"</td>";
								htmlSales += "</tr>";
					        };
					        lib.clearBox('Sale');
						} else if(saleData[0].status==='em-devolucao'){
					    	for (var i = salePage * salePageSize; i < saleData.length && i < (salePage + 1) *  salePageSize; i++) {
								htmlSales += "<tr>";
								htmlSales += "<td id='src-sale-origin'>"+ saleData[i].origin +"</td>";
								htmlSales += "<td id='src-sale-cod' hidden>"+ saleData[i].cod +"</td>";
								htmlSales += "<td><a id='show-sale-btn'>"+ saleData[i].cod +"</a></td>";
								htmlSales += "<td id='src-sale-name'>"+ saleData[i].name +"</td>";
								htmlSales += "<td id='src-sale-date'>"+ saleData[i].date +"</td>";
								htmlSales += "<td id='src-sale-status'>"+ saleData[i].status +"</td>";
								htmlSales += "<td id='src-sale-user'>"+ saleData[i].user +"</td>";
								htmlSales += "<td id='src-sale-withdrawal-id' hidden>"+ saleData[i].withdrawal +"</td>";
								htmlSales += "<td><a id='show-sale-withdrawal-btn'>"+ saleData[i].withdrawal +"</a></td>";
								htmlSales += "<td id='src-sale-devolution-id' hidden>"+ saleData[i].dev_cod +"</td>";
								htmlSales += "<td><a id='show-sale-devolution-btn'>"+ saleData[i].dev_cod +"</a></td>";
								htmlSales += "<td hidden><select id='src-sale-new_status'><option value='devolucao'></option></td>";
								htmlSales += "<td>devolvido por "+ saleData[i].last_update +"</td>";
								htmlSales += "<td><a id='update-sale-btn' hidden>Salvar</a></td>";
								htmlSales += "</tr>";
					        };
					        lib.clearBox('Sale');
						} else if(saleData[0].status==='devolucao'){
					    	for (var i = salePage * salePageSize; i < saleData.length && i < (salePage + 1) *  salePageSize; i++) {
								htmlSales += "<tr>";
								htmlSales += "<td id='src-sale-origin'>"+ saleData[i].origin +"</td>";
								htmlSales += "<td id='src-sale-cod' hidden>"+ saleData[i].cod +"</td>";
								htmlSales += "<td><a id='show-sale-btn'>"+ saleData[i].cod +"</a></td>";
								htmlSales += "<td id='src-sale-name'>"+ saleData[i].name +"</td>";
								htmlSales += "<td id='src-sale-date'>"+ saleData[i].date +"</td>";
								htmlSales += "<td id='src-sale-status'>"+ saleData[i].status +"</td>";
								htmlSales += "<td id='src-sale-user'>"+ saleData[i].user +"</td>";
								htmlSales += "<td id='src-sale-withdrawal-id' hidden>"+ saleData[i].withdrawal +"</td>";
								htmlSales += "<td><a id='show-sale-withdrawal-btn'>"+ saleData[i].withdrawal +"</a></td>";
								htmlSales += "<td id='src-sale-devolution-id' hidden>"+ saleData[i].dev_cod +"</td>";
								htmlSales += "<td><a id='show-sale-devolution-btn'>"+ saleData[i].dev_cod +"</a></td>";
								htmlSales += "<td>confirmado por "+ saleData[i].last_update +"</td>";
								htmlSales += "</tr>";	
					        };
					        lib.clearBox('Sale');
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
			}
		});
	});

	$('table').on('click', '#update-sale-btn', function(){
		document.getElementById("update-sale-btn").style.pointerEvents = "none";
		var r = confirm('confirmar alteração de status');
		if(r==true){
		

		} else {
			document.getElementById("update-sale-btn").style.pointerEvents = "";
			return;
		};

		var rowEl = $(this).closest('tr');
		var sale_origin = rowEl.find('#src-sale-origin').text();
		var sale_cod = rowEl.find('#src-sale-cod').text();
		var sale_name = rowEl.find('#src-sale-name').text();
		var sale_new_status = rowEl.find('#src-sale-new_status').val();
		var sale_withdrawal_id = rowEl.find('#src-sale-withdrawal-id').text();
		var devolution_create = false;
		
		if(sale_new_status=='devolucao'){
			var sale_devolution_id = rowEl.find('#src-sale-devolution-id').val();
		} else {
			var sale_devolution_id = rowEl.find('#src-sale-devolution-id').text();
		};

		if(sale_new_status=='enviado' && sale_withdrawal_id==0){
			alert("Não é possível atualizar pedidos sem retira.");
			document.getElementById("update-sale-btn").style.pointerEvents = "";
			return;
		};

		// if(sale_new_status=='devolucao' && sale_devolution_id<=0 || sale_new_status=='devolucao' && sale_devolution_id==""){
		// 	alert("Código de devolução inválido");
		// 	document.getElementById("update-sale-btn").style.pointerEvents = "";
		// 	return;
		// };

		$.ajax({
			url: '/sale-update',
			method: 'post',
			data: {
				sale_origin: sale_origin,
				sale_cod: sale_cod,
				sale_name: sale_name,
				sale_new_status: sale_new_status,
				sale_devolution_id: sale_devolution_id,
				sale_withdrawal_id: sale_withdrawal_id,
				devolution_create: devolution_create,
			},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById("update-sale-btn").style.pointerEvents = "";
					$( "#sale-filter-form" ).submit();
					return;
				};

				if(response.done_devolution){
					alert(response.done_devolution);
					printSaleDevolution(response);
					document.getElementById("update-sale-btn").style.pointerEvents = "";
					$( "#sale-filter-form" ).submit();
					return;
				};

				alert(response.done);

				$( "#sale-filter-form" ).submit();
				document.getElementById("update-sale-btn").style.pointerEvents = "";
			}
		});
	});

	// $('table').on('click', '#confirm-sale-btn', function(){
	// 	document.getElementById("confirm-sale-btn").style.pointerEvents = "none";

	// 	var rowEl = $(this).closest('tr');
	// 	var sale_cod = rowEl.find('#src-sale-cod').text();
	// 	var sale_devolution_id = rowEl.find('#src-sale-devolution-id').val();

	// 	if(parseInt(sale_devolution_id)<=0 || sale_devolution_id==''){
	// 		alert('Favor inserir o código da devolução');
	// 		$('#sale-filter-form').submit();
	// 		return;
	// 	} else {
			
	// 	};

	// 	$.ajax({
	// 		url: '/sale-devolution',
	// 		method: 'post',
	// 		data: {
	// 			sale_cod: sale_cod,
	// 			sale_devolution_id: sale_devolution_id
	// 		},
	// 		success: function(response) {
	// 			if(response.unauthorized){
	// 				alert(response.unauthorized);
	// 				window.location.href = '/login';
	// 				return;
	// 			};

	// 			if(response.msg){
	// 				alert(response.msg);
	// 				document.getElementById("confirm-sale-btn").style.pointerEvents = "";
	// 				return;
	// 			};

	// 			alert(response.done);

	// 			document.getElementById("confirm-sale-btn").style.pointerEvents = "";
	// 			$( "#sale-filter-form" ).submit();
	// 		}
	// 	});
	// });

	// $(document).on('change', '#patern-select', function() {
	// 	if(document.getElementById('patern-select').value==='p-p-pp'){
	// 	selectbox.innerHTML = "";
	// 	console.log(product_array);
		
	// 	} else if(document.getElementById('patern-select').value==='externa'){
	// 	selectbox.innerHTML = "";
	// 	selectbox.innerHTML += "<option value='0'>Todos</option>";
	// 	selectbox.innerHTML += "<option value='cost1'>Costureira1</option>";
	// 	selectbox.innerHTML += "<option value='cost2'>Costureira2</option>";
	// 	selectbox.innerHTML += "<option value='cost3'>Costureira3</option>";
	// 	selectbox.innerHTML += "<option value='cost4'>Costureira4</option>";
	// 	} else if(document.getElementById('patern-select').value==='0'){
	// 		selectbox.innerHTML = "";
	// 		selectbox.innerHTML = "<option value='0'>Fornecedor</option>";
	// 	};
	// });
});

// função chamada pelo botão printOnly views/sale/index
function getPrintData(){
	document.getElementById("printOnly").disabled = true;
   var sales_cod = document.getElementsByClassName('cod');
   printSales(sales_cod);
};

function printSales(sales_cod){
   var array_cods = sales_cod; 
   var newArray = [];
   for(var i = 0; i <= array_cods.length; i++){     
        if(typeof array_cods[i] == 'object'){
			if(array_cods[i].checked){
				newArray.push(array_cods[i].id);          
			};
        };
   };
   console.log(newArray);
  if(newArray.length <= 0){
    alert("Selecione um pelo menos 1 item!");
	document.getElementById("printOnly").disabled = false;
  } else {
    $.ajax({
		url: '/sale-print',
		method: 'post',
		data: { sales: JSON.stringify(newArray) },
		success: function(response) {
			if(response.unauthorized){
				alert(response.unauthorized);
				window.location.href = '/login';
				return;
			};

			var print_div = document.getElementById('print-div');
			var html = "";

			response.sales.forEach(function(sale){
				html += '\
					<div style="display: inline-block;margin:0px;padding:0px;page-break-inside:avoid;page-break-after:auto;width:218px;height:240px;border-style: solid;border-width: 1px;">\
					<div style="float:left;margin:0px;padding:0px;font-size:10px;width:106.3px;height:20px;border-style: solid;border-width: 1px;line-height:20px;text-align:center;">\
						'+sale.date+'\
					</div>\
					<div style="float:left;margin:0px;padding:0px;font-size:8px;width:106.3px;height:20px;border-style: solid;border-width: 1px;line-height:20px;text-align:center;">\
						'+sale.origin.toUpperCase()+'\
					</div>\
					<div style="float:left;margin:0px;padding:0px;font-size:8px;width:106.3px;height:20px;border-style: solid;border-width: 1px;line-height:20px;text-align:center;">\
						'+sale.cod+'\
					</div>\
					<div style="float:left;margin:0px;padding:0px;font-size:7px;width:106.3px;height:20px;border-style: solid;border-width: 1px;line-height:20px;text-align:center;">\
						'+sale.name+'\
					</div>\
					<div style="float:left;margin:0px;padding:0px;font-size:8px;width:216px;height:15px;border-style: solid;border-width: 1px;line-height:15px;text-align:left;">\
						Assinatura:\
					</div>';
				response.products.forEach(function(product_array){
					product_array.forEach(function(product){
						if(product.sale_cod===sale.cod){
							html += '\
								<div style="float:left;margin:0px;padding:0px;font-size:7px;width:12px;height:15px;border-style: solid;border-width: 1px;line-height:15px;text-align:center;">\
									'+product.amount+'\
								</div>\
								<div style="float:left;margin:0px;padding:0px;font-size:7px;width:91.6px;height:15px;border-style: solid;border-width: 1px;line-height:15px;text-align:center;">\
									'+ product.product_info.toLowerCase()+'\
								</div>';
						};
					});
				});
				html += '</div>';
			});
			html += "<div style='display:inline-block;text-align:center;page-break-inside:avoid;page-break-after:auto;width:650px;margin-right:15px;padding:7px;'>";
			html += '</div>';

			print_div.innerHTML = html;
			
			var conteudo = print_div.innerHTML,
			    tela_impressao = window.open('about:blank');
			
			tela_impressao.document.write(conteudo);
			tela_impressao.window.print();
			tela_impressao.window.close();
			document.getElementById("printOnly").disabled = false;
			print_div.innerHTML = '';
		}
	});
  };
};

// função chamada pelo botão printWithdrawal views/sale/index
function getWithdrawalData(){
	document.getElementById("printWithdrawal").disabled = true;
	var sales_cod = document.getElementsByClassName('cod');
	printWithdrawal(sales_cod);
};

function printWithdrawal(sales_cod){
	var array_cods = sales_cod; 
	var newArray = [];
	for(var i = 0; i <= array_cods.length; i++){
	    if(typeof array_cods[i] == 'object'){
			if(array_cods[i].checked){
				newArray.push(array_cods[i].id);
			};
	    };
	};
	if(newArray.length <= 0){
		alert("Selecione um pelo menos 1 item!");
		document.getElementById("printWithdrawal").disabled = false;
	} else {
	    $.ajax({
			url: '/sale-save-withdrawal',
			method: 'post',
			data: { sales: JSON.stringify(newArray) },
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg!=undefined){
					alert(response.msg);
					document.getElementById("printWithdrawal").disabled = false;
					return;
				};

				if(response.overAmount!=undefined){
					var alertHTML = 'Faltam\n\n';
					response.overAmount.forEach(function(product){
						alertHTML += ''+product.amount+' '+product.type+'(s) '+product.name+' '+product.color+'\n\n';
					});
					alertHTML += 'para completar pedido de retira.';
					alert(alertHTML);
					document.getElementById("printWithdrawal").disabled = false;
					return;
				};
				
				var print_div = document.getElementById('print-div');
				var html = '';

				response.sales.forEach(function(sale){
					html += '\
					<div style="display: inline-block;margin:0px;padding:0px;page-break-inside:avoid;page-break-after:auto;width:218px;height:240px;border-style: solid;border-width: 1px;">\
						<div style="float:left;margin:0px;padding:0px;font-size:10px;width:106.3px;height:20px;border-style: solid;border-width: 1px;line-height:20px;text-align:center;">\
							'+sale.date+'\
						</div>\
						<div style="float:left;margin:0px;padding:0px;font-size:8px;width:106.3px;height:20px;border-style: solid;border-width: 1px;line-height:20px;text-align:center;">\
							'+sale.origin.toUpperCase()+'\
						</div>\
						<div style="float:left;margin:0px;padding:0px;font-size:8px;width:106.3px;height:20px;border-style: solid;border-width: 1px;line-height:20px;text-align:center;">\
							'+sale.cod+'\
						</div>\
						<div style="float:left;margin:0px;padding:0px;font-size:7px;width:106.3px;height:20px;border-style: solid;border-width: 1px;line-height:20px;text-align:center;">\
							'+sale.name+'\
						</div>\
						<div style="float:left;margin:0px;padding:0px;font-size:8px;width:216px;height:15px;border-style: solid;border-width: 1px;line-height:15px;text-align:left;">\
							Assinatura:\
						</div>\
						<div style="float:left;margin:0px;padding:0px;width:216px;height:5px;border-style: solid;border-width: 1px;line-height:20px;text-align:center;">\
						</div>';
					response.products.forEach(function(product_array){
						product_array.forEach(function(product){
							if(product.sale_cod===sale.cod){
								html += '\
									<div style="float:left;margin:0px;padding:0px;font-size:7px;width:12px;height:15px;border-style: solid;border-width: 1px;line-height:15px;text-align:center;">\
										'+product.amount+'\
									</div>\
									<div style="float:left;margin:0px;padding:0px;font-size:7px;width:91.6px;height:15px;border-style: solid;border-width: 1px;line-height:15px;text-align:center;">\
										'+ product.product_info.toLowerCase()+'\
									</div>';
							};
						});
					});
					html += '</div>';
				});
				
				html += "<div style='display:inline-block;text-align:center;page-break-inside:avoid;page-break-after:auto;border:1px solid black;width:650px;margin-right:15px;padding:10px;'>Dados do pedido<br><br>";
				if(response.withdrawal[0].status==='0'){
					html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Cod: "+response.withdrawal[0].id+"</div>";
					html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Data: "+response.withdrawal[0].date+"</div>";
					html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Usuário: "+response.withdrawal[0].user+"</div>";
					html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Ass:_______________</div>";
				} else {
					html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Cod: "+response.withdrawal[0].id+"</div>";
					html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Data: "+response.withdrawal[0].date+"</div>";
					html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Usuário: "+response.withdrawal[0].user+"</div>";
					html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Conf: "+response.withdrawal[0].confirmation_user+"</div>";
				};
				html += "<br>";
				html += "<br>";

				html += "<div style='display:inline-block;text-align:center;margin-right:15px;border:1px solid black;vertical-align:top;'>";
				html += "Vendas";
				html += "<table><tr><td>Código</td><td>Comprador</td></tr>";
				response.withdrawalSales.forEach(function(withdrawalSale){
					html += "<tr>";
					html += "<td><div>"+withdrawalSale.sale_cod+"</div></td>";
					html += "<td><div>"+withdrawalSale.sale_buyer+"</div></td>";
					html += "</tr>";
				});
				html += "</table>";
				html += "</div>";


				html += "<div style='display:inline-block;border:1px solid black;vertical-align: top;'>";
				html += "Produtos";
				html += "<table><tr><td>Código</td><td>Produto</td><td>Qtd</td></tr>";
				response.withdrawalProducts.forEach(function(withdrawalProduct){
					html += "<tr>";
					html += "<td><div>"+withdrawalProduct.product_cod+"</div></td>";
					html += "<td><div>"+withdrawalProduct.product_info+"</div></td>";
					html += "<td><div>"+withdrawalProduct.amount+"</div></td>";
					html += "</tr>";
				});
				html += "</table>";
				html += "</div>";
				html += "</div>";

				print_div.innerHTML = html;
				
				var conteudo = print_div.innerHTML,
				    tela_impressao = window.open('about:blank');
				
				tela_impressao.document.write(conteudo);
				tela_impressao.window.print();
				tela_impressao.window.close();
				
				document.getElementById("printWithdrawal").disabled = false;
				print_div.innerHTML = '';
			}
		});
	};
};