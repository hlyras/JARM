$(function(){
	$('#create-devolution-btn').on('click', function(event){
		document.getElementById("create-devolution-btn").disabled = true;
		event.preventDefault();

		var devolution_sale_origin = document.getElementById('origin').value;
		var devolution_sale_cod = document.getElementById('cod').value;
		var devolution_sale_name = document.getElementById('name').value;

		if(devolution_sale_cod!='' && devolution_sale_cod!=undefined){

		} else {
			alert('Favor inserir o código da venda');
			document.getElementById("create-devolution-btn").disabled = false;
			return;
		};

		if(devolution_sale_name!='' && devolution_sale_name!=undefined){

		} else {
			alert('Favor inserir o nome do comprador');
			document.getElementById("create-devolution-btn").disabled = false;
			return;
		};

		if(product_array.length<1){
			alert('Favor inserir os produtos');
			document.getElementById("create-devolution-btn").disabled = false;
			return;
		};

		$.ajax({
			url: '/sale-save-devolution',
			method: 'post',
			data: {
				sale_origin: devolution_sale_origin,
				sale_cod: devolution_sale_cod,
				sale_name: devolution_sale_name,
				devolution_products: JSON.stringify(product_array)
			},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById("create-devolution-btn").disabled = false;
					return;
				};

				alert(response.done);

				printSaleDevolution(response);

				product_array = [];
				document.getElementById('cod').value = '';
				document.getElementById('name').value = '';
				document.getElementById('amount').value = '';
				document.querySelector('tbody').innerHTML = '';
				document.getElementById("create-devolution-btn").disabled = false;
			}
		});
	});

	$('#filter-sale-devolution').on('submit', function(event){
		event.preventDefault();
		var devolution_sale_origin = document.getElementById('get-origin').value;
		var devolution_sale_cod = document.getElementById('get-cod').value;
		var devolution_sale_name = document.getElementById('get-name').value;
		var devolution_status = document.getElementById('get-status').value;
		var devolution_date = lib.convertDate(document.getElementById('get-date').value);

		$.ajax({
			url: '/sale-filter-devolution',
			method: 'post',
			data: {devolution_sale_origin: devolution_sale_origin, 
				devolution_sale_cod: devolution_sale_cod, 
				devolution_sale_name: devolution_sale_name, 
				devolution_status: devolution_status, 
				devolution_date: devolution_date
			},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				var dados = response.devolutions;

				var tamanhoPagina = 15;
				var pagina = 0;

				function paginar(){
					var htmlDevolution = "";
				    var tbody = document.getElementById('main-sale-devolution-tbody');

				    if(dados!=""){
						if(dados[0].status==='0'){
					    	for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++){
								htmlDevolution += "<tr>"
								htmlDevolution += "<td id='src-sale-devolution-id' hidden>"+ dados[i].id +"</td>"
								htmlDevolution += "<td><a id='show-sale-devolution-btn'>"+ dados[i].id +"</a></td>"
								htmlDevolution += "<td id='src-sale-devolution-origin'>"+ dados[i].sale_origin +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-cod'>"+ dados[i].sale_cod +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-name'>"+ dados[i].sale_name +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-date'>"+ dados[i].date +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-user'>"+ dados[i].user +"</td>"
								htmlDevolution += "<td><a id='print-sale-devolution-btn'>Imprimir</a></td>"
								htmlDevolution += "</tr>"
					    	};
						} else {
					    	for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++){
								htmlDevolution += "<tr>"
								htmlDevolution += "<td id='src-sale-devolution-id' hidden>"+ dados[i].id +"</td>"
								htmlDevolution += "<td><a id='show-sale-devolution-btn'>"+ dados[i].id +"</a></td>"
								htmlDevolution += "<td id='src-sale-devolution-origin'>"+ dados[i].sale_origin +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-cod'>"+ dados[i].sale_cod +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-name'>"+ dados[i].sale_name +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-date'>"+ dados[i].date +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-user'>"+ dados[i].user +"</td>"
								htmlDevolution += "<td>Confirmado por: "+dados[i].confirmation_user+"</td>"
								htmlDevolution += "<td><a id='print-sale-devolution-btn'>Imprimir</a></td>"
								htmlDevolution += "</tr>"
							};
						};
					} else {
						alert('Não há resultados na busca.');
					};
					tbody.innerHTML = htmlDevolution;
				    $('#saleDevolutionPage').text('' + (pagina + 1) + ' de ' + Math.ceil(dados.length / tamanhoPagina));
				};

				function ajustarBotoes(){
				    $('#saleDevolutionNext').prop('disabled', dados.length <= tamanhoPagina || pagina >= dados.length / tamanhoPagina - 1);
				    $('#saleDevolutionPrevious').prop('disabled', dados.length <= tamanhoPagina || pagina == 0);
				};

				$(function(){
				    $('#saleDevolutionNext').click(function(){
				        if (pagina < dados.length / tamanhoPagina - 1){
				            pagina++;
				            paginar();
				            ajustarBotoes();
				        };
				    });
				    $('#saleDevolutionPrevious').click(function(){
				        if (pagina > 0){
				            pagina--;
				            paginar();
				            ajustarBotoes();
				        };
				    });
				    paginar();
				    ajustarBotoes();
				});
				lib.clearBox('Devolution');
			}
		});
	});
	
	$('#filter-devolution-input').on('submit', function(event){
		event.preventDefault();
		var devolution_sale_origin = document.getElementById('get-origin').value;
		var devolution_sale_cod = document.getElementById('get-cod').value;
		var devolution_sale_name = document.getElementById('get-name').value;
		var devolution_status = document.getElementById('get-status').value;
		var devolution_date = lib.convertDate(document.getElementById('get-date').value);

		$.ajax({
			url: '/sale-filter-devolution',
			method: 'post',
			data: {devolution_sale_origin: devolution_sale_origin, 
				devolution_sale_cod: devolution_sale_cod, 
				devolution_sale_name: devolution_sale_name, 
				devolution_status: devolution_status, 
				devolution_date: devolution_date
			},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				var dados = response.devolutions;

				var tamanhoPagina = 15;
				var pagina = 0;

				function paginar(){
					var htmlDevolution = "";
				    var tbody = document.getElementById('main-sale-devolution-tbody');

				    if(dados!=""){
						if(dados[0].status==='0'){
					    	for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++){
								htmlDevolution += "<tr>"
								htmlDevolution += "<td id='src-sale-devolution-id' hidden>"+ dados[i].id +"</td>"
								htmlDevolution += "<td><a id='show-sale-devolution-btn'>"+ dados[i].id +"</a></td>"
								htmlDevolution += "<td id='src-sale-devolution-origin'>"+ dados[i].sale_origin +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-cod'>"+ dados[i].sale_cod +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-name'>"+ dados[i].sale_name +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-date'>"+ dados[i].date +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-user'>"+ dados[i].user +"</td>"
								htmlDevolution += "<td><a id='confirm-devolution-input-btn'>Confirmar entrada</a></td>"
								htmlDevolution += "<td><a id='print-sale-devolution-btn'>Imprimir</a></td>"
								htmlDevolution += "</tr>"
					    	};
						} else {
					    	for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++){
								htmlDevolution += "<tr>"
								htmlDevolution += "<td id='src-sale-devolution-id' hidden>"+ dados[i].id +"</td>"
								htmlDevolution += "<td><a id='show-sale-devolution-btn'>"+ dados[i].id +"</a></td>"
								htmlDevolution += "<td id='src-sale-devolution-origin'>"+ dados[i].sale_origin +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-cod'>"+ dados[i].sale_cod +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-name'>"+ dados[i].sale_name +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-date'>"+ dados[i].date +"</td>"
								htmlDevolution += "<td id='src-sale-devolution-user'>"+ dados[i].user +"</td>"
								htmlDevolution += "<td>Confirmado por: "+dados[i].confirmation_user+"</td>"
								htmlDevolution += "<td><a id='print-sale-devolution-btn'>Imprimir</a></td>"
								htmlDevolution += "</tr>"
							};
						};
					} else {
						alert('Não há resultados na busca.');
					};
					tbody.innerHTML = htmlDevolution;
				    $('#saleDevolutionPage').text('' + (pagina + 1) + ' de ' + Math.ceil(dados.length / tamanhoPagina));
				};

				function ajustarBotoes(){
				    $('#saleDevolutionNext').prop('disabled', dados.length <= tamanhoPagina || pagina >= dados.length / tamanhoPagina - 1);
				    $('#saleDevolutionPrevious').prop('disabled', dados.length <= tamanhoPagina || pagina == 0);
				};

				$(function(){
				    $('#saleDevolutionNext').click(function(){
				        if (pagina < dados.length / tamanhoPagina - 1){
				            pagina++;
				            paginar();
				            ajustarBotoes();
				        };
				    });
				    $('#saleDevolutionPrevious').click(function(){
				        if (pagina > 0){
				            pagina--;
				            paginar();
				            ajustarBotoes();
				        };
				    });
				    paginar();
				    ajustarBotoes();
				});
				lib.clearBox('Devolution');
			}
		});
	});

	$('table').on('click', '#print-sale-devolution-btn', function(){
		document.getElementById("print-sale-devolution-btn").disabled = true;

		var rowEl = $(this).closest('tr');
		var devolution_id = rowEl.find('#src-sale-devolution-id').text();

		$.ajax({
			url: '/sale-devolution-get',
			method: 'post',
			data: {	devolution_id: devolution_id },
			success: function(response){

				printSaleDevolution(response);

				document.getElementById("print-sale-devolution-btn").disabled = false;
			}
		});
	});

	$('table').on('click', '#show-sale-devolution-btn', function(){
		document.getElementById("show-sale-devolution-btn").disabled = true;

		var rowEl = $(this).closest('tr');
		var devolution_id = rowEl.find('#src-sale-devolution-id').text();

		$.ajax({
			url: '/sale-devolution-get',
			method: 'post',
			data: {	devolution_id: devolution_id },
			success: function(response){
				if(response.msg){
					alert(response.msg);
					document.getElementById("show-sale-devolution-btn").disabled = false;
					return;
				};

				var show = document.getElementById('showDevolution');
				show.innerHTML = "";

				if(response.devolution.length>0){
					console.log(response.devolution[0]);

					var html = "<div style='display:inline-block;border-bottom:1px solid black;'>Dados da Devolução: "+response.devolution[0].id+"</div>";

					html += "<table>";
					html += "<tr>";
					html += "<td>Data: "+response.devolution[0].date+"</td>";
					html += "<td>Origem: "+response.devolution[0].sale_origin+"</td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td>Venda: "+response.devolution[0].sale_cod+"</td>";
					html += "<td>Comprador: "+response.devolution[0].sale_name+"</td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td>Usuário: "+response.devolution[0].user+"</td>";
					html += "<td>Conf: "+response.devolution[0].confirmation_user+"</td>";
					html += "</tr>";

					html += "<tr>";
					html += "<td>...</td>";
					html += "<td>...</td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td>Produto</td>";
					html += "<td>Qtd</td>";
					html += "</tr>";
					response.devolution[0].products.forEach(function(product){
						html += "<tr>";
						html += "<td>"+product.product_info+"</td>";
						html += "<td>"+product.amount+"</td>";
						html += "</tr>";
					});
					html += "</table>";
					document.getElementById('showDevolutionBox').style.display = 'block';
					show.innerHTML = html;
				} else {
					alert('Não há dados.');
				};

				document.getElementById("show-sale-devolution-btn").disabled = false;
			}
		});
	});

	$('table').on('click', '#confirm-devolution-input-btn', function(){
		var rowEl = $(this).closest('tr');
		rowEl.find('#confirm-devolution-input-btn').prop("disabled",true);
		var devolution_id = rowEl.find('#src-sale-devolution-id').text();

		$.ajax({
			url: '/sale-confirm-devolution',
			method: 'post',
			data: { devolution_id: devolution_id },
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				alert(response.done);

				$('#filter-devolution-input').submit();
			}
		});
	});
});

function printSaleDevolution(response){
	var print_div = "";

	console.log(response.devolution);

	var html = "<div style='display:inline-block;text-align:center;page-break-inside:avoid;page-break-after:auto;border-top:1px solid black;border-bottom:1px solid black;width:650px;margin-right:15px;padding:10px;'>";
	html += "<p style='font-size:20px'>Devolução: "+response.devolution[0].id+"</p><br>"

	html += "<table border=1 cellspacing=0 cellpadding=2 style='text-align:center;width:100%;font-size:12px;'>";
	html += "<tr>";
	html += "<td>Data: "+response.devolution[0].date+"</td>";
	html += "<td>Origem: "+response.devolution[0].sale_origin+"</td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td>Venda: "+response.devolution[0].sale_cod+"</td>";
	html += "<td>Comprador: "+response.devolution[0].sale_name+"</td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td>Usuário: "+response.devolution[0].user+"</td>";
	if(response.devolution[0].confirmation_user!=null){
		html += "<td>Conf: "+response.devolution[0].confirmation_user+"</td>";
	} else {
		html += "<td>Ass: ___________________</td>";
	};
	html += "</tr>";
	html += "</table>";

	html += "<br>";
	
	html += "<table border=1 cellspacing=0 cellpadding=2 style='text-align:center;width:100%;font-size:12px;'>";
	html += "<tr>";
	html += "<td>Produto</td>";
	html += "<td>Qtd</td>";
	html += "</tr>";
	response.devolution[0].products.forEach(function(product){
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