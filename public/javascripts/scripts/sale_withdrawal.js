$(function(){
	$('#filter-sale-withdrawal-btn').on('click', function(event){
		document.getElementById("filter-sale-withdrawal-btn").disabled = true;
		event.preventDefault();

		var withdrawal_date = lib.convertDate(document.getElementById('get-date').value);
		var withdrawal_id = document.getElementById('get-cod').value;
		var withdrawal_status = document.getElementById('get-status').value;

		if(withdrawal_id<0){
			alert('Código inválido!');
			document.getElementById("filter-sale-withdrawal-btn").disabled = false;
			return;
		};

		$.ajax({
			url: '/sale-filter-withdrawal',
			method: 'post',
			data: {
				withdrawal_id: withdrawal_id,
				withdrawal_status: withdrawal_status,
				withdrawal_date: withdrawal_date
			},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.withdrawals.length<1){
					alert('A busca não encontrou resultados.');
					document.querySelector('tbody').innerHTML = "";
					lib.clearBox("Withdrawal");
					document.getElementById("filter-sale-withdrawal-btn").disabled = false;
					return;
				};

				var dados = response.withdrawals;

				var tamanhoPagina = 15;
				var pagina = 0;

				var table = document.querySelector('tbody');
				var html = "";
				function paginar() {
					html = "";
					table.innerHTML = "";
				    if(dados[0].status==='0'){
					    for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++) {
							html += "<tr>";
							html += "<td id='src-sale-withdrawal-id' hidden>"+dados[i].id+"</td>";
							html += "<td><a id='show-sale-withdrawal-btn'>"+dados[i].id+"</a></td>";
							html += "<td id='src-sale-withdrawal-date'>"+dados[i].date+"</td>";
							html += "<td id='src-sale-withdrawal-user'>"+dados[i].user+"</td>";
							html += "<td>aguardando confirmação</td>";
							html += "<td><a id='show-sale-withdrawal-btn'>Mostrar</a></td>";
							html += "<td><a id='print-sale-withdrawal-btn'>Imprimir</a></td>";
							html += "</tr>";
					    };
					} else {
					    for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++) {
							html += "<tr>";
							html += "<td id='src-sale-withdrawal-id' hidden>"+dados[i].id+"</td>";
							html += "<td><a id='show-sale-withdrawal-btn'>"+dados[i].id+"</a></td>";
							html += "<td id='src-sale-withdrawal-date'>"+dados[i].date+"</td>";
							html += "<td id='src-sale-withdrawal-user'>"+dados[i].user+"</td>";
							html += "<td>Confirmado por "+dados[i].user+"</td>";
							html += "<td><a id='show-sale-withdrawal-btn'>Mostrar</a></td>";
							html += "<td><a id='print-sale-withdrawal-btn'>Imprimir</a></td>";
							html += "</tr>";
					    };
					};
					table.innerHTML = html;
				    $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dados.length / tamanhoPagina));
				};

				function ajustarBotoes() {
				    $('#proximo').prop('disabled', dados.length <= tamanhoPagina || pagina >= dados.length / tamanhoPagina - 1);
				    $('#anterior').prop('disabled', dados.length <= tamanhoPagina || pagina == 0);
				};

				$(function() {
				    $('#proximo').click(function() {
				        if (pagina < dados.length / tamanhoPagina - 1) {
				            pagina++;
				            paginar();
				            ajustarBotoes();
				        };
				    });
				    $('#anterior').click(function() {
				        if (pagina > 0) {
				            pagina--;
				            paginar();
				            ajustarBotoes();
				        };
				    });
				    paginar();
				    ajustarBotoes();
				});
				lib.clearBox("Withdrawal");
				document.getElementById("filter-sale-withdrawal-btn").disabled = false;
			}
		});
	});


	$('#filter-storage-withdrawal-btn').on('click', function(event){
		document.getElementById("filter-storage-withdrawal-btn").disabled = true;
		event.preventDefault();

		var withdrawal_id = document.getElementById('get-cod').value;
		var withdrawal_status = document.getElementById('get-status').value;
		var withdrawal_date = lib.convertDate(document.getElementById('get-date').value);

		if(withdrawal_id<0){
			alert('Código inválido!');
			document.getElementById("filter-storage-withdrawal-btn").disabled = false;
			return;
		};

		$.ajax({
			url: '/sale-filter-withdrawal',
			method: 'post',
			data: {
				withdrawal_id: withdrawal_id,
				withdrawal_status: withdrawal_status,
				withdrawal_date: withdrawal_date
			},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.withdrawals.length<1){
					alert('A busca não encontrou resultados.');
					document.querySelector('tbody').innerHTML = "";
					lib.clearBox("Withdrawal")
					document.getElementById("filter-storage-withdrawal-btn").disabled = false;
					return;
				};

				//javascript
				var dados = response.withdrawals;

				var tamanhoPagina = 15;
				var pagina = 0;

				var html = "";
				function paginar(){
					html = "";
					document.querySelector('tbody').innerHTML = "";
				    if(dados[0].status==='0'){
					    for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++){
							html += "<tr>";
							html += "<td id='src-sale-withdrawal-id' hidden>"+dados[i].id+"</td>";
							html += "<td><a id='show-sale-withdrawal-btn'>"+dados[i].id+"</a></td>";
							html += "<td id='src-sale-withdrawal-date'>"+dados[i].date+"</td>";
							html += "<td id='src-sale-withdrawal-user'>"+dados[i].user+"</td>";
							html += "<td>aguardando confirmação</td>";
							html += "<td><a id='confirm-sale-withdrawal-btn'>Confirmar saída</a></td>";
							html += "</tr>";
					    };
					} else {
					    for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++){
							html += "<tr>";
							html += "<td id='src-sale-withdrawal-id' hidden>"+dados[i].id+"</td>";
							html += "<td><a id='show-sale-withdrawal-btn'>"+dados[i].id+"</a></td>";
							html += "<td id='src-sale-withdrawal-date'>"+dados[i].date+"</td>";
							html += "<td id='src-sale-withdrawal-user'>"+dados[i].user+"</td>";
							html += "<td>Confirmado por "+dados[i].user+"</td>";
							html += "</tr>";
					    };
					};
					document.querySelector('tbody').innerHTML = html;
				    $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dados.length / tamanhoPagina));
				};

				function ajustarBotoes(){
				    $('#proximo').prop('disabled', dados.length <= tamanhoPagina || pagina >= dados.length / tamanhoPagina - 1);
				    $('#anterior').prop('disabled', dados.length <= tamanhoPagina || pagina == 0);
				};

				$(function(){
				    $('#proximo').click(function(){
				        if (pagina < dados.length / tamanhoPagina - 1) {
				            pagina++;
				            paginar();
				            ajustarBotoes();
				        };
				    });
				    $('#anterior').click(function(){
				        if (pagina > 0) {
				            pagina--;
				            paginar();
				            ajustarBotoes();
				        };
				    });
				    paginar();
				    ajustarBotoes();
				});
				lib.clearBox("Withdrawal");
				document.getElementById("filter-storage-withdrawal-btn").disabled = false;
			}
		});
	});

	$('table').on('click', '#show-sale-withdrawal-btn', function(){
		document.getElementById("show-sale-withdrawal-btn").style.pointerEvents = "none";

		var rowEl = $(this).closest('tr');
		var withdrawal_id = rowEl.find('#src-sale-withdrawal-id').text();

		if(withdrawal_id<=0){
			alert('Não há dados');
			document.getElementById("show-sale-withdrawal-btn").style.pointerEvents = "";
			return;
		} else {

		};


		$.ajax({
			url: '/sale-show-withdrawal',
			method: 'post',
			data: {	withdrawal_id: withdrawal_id },
			success: function(response){
				document.getElementById('showWithdrawalBox').style.display = 'block';
				var show = document.getElementById('showWithdrawal');
				var html = "<div style='display:inline-block;border-bottom:1px solid black;'>Dados da retira: "+response.withdrawal[0].id+"</div>";
				html += "<table>";
				html += "<tr>";
				html += "<td>Data: "+response.withdrawal[0].date+"</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>Usuário: "+response.withdrawal[0].user+"</td>";
				html += "<tr>";
				html += "<td>Aguardando conf.</td>";
				html += "</tr>";
				html += "</tr>";

				if(response.withdrawal[0].status==='0'){
					// html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Data: "+response.withdrawal[0].date+"</div>";
					// html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Usuário: "+response.withdrawal[0].user+"</div>";
					// html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Aguardando conf.</div>";
				} else {
					// html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Data: "+response.withdrawal[0].date+"</div>";
					// html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Usuário: "+response.withdrawal[0].user+"</div>";
					// html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Conf: "+response.withdrawal[0].confirmation_user+"</div>";
				};

				html += "<table><tr><td>Venda</td><td>Comprador</td></tr>";
				response.sales.forEach(function(sale){
					html += "<tr>";
					html += "<td><div>"+sale.sale_cod+"</div></td>";
					html += "<td><div>"+sale.sale_buyer+"</div></td>";
					html += "</tr>";
				});
				html += "</table>";
				html += "</div>";

				html += "<div style='display:inline-block;border:1px solid black;vertical-align: top;'>";
				html += "<table><tr><td>Código</td><td>Produto</td><td>Qtd</td></tr>";
				response.products.forEach(function(product){
					html += "<tr>";
					html += "<td><div>"+product.product_cod+"</div></td>";
					html += "<td><div>"+product.product_info+"</div></td>";
					html += "<td><div>"+product.amount+"</div></td>";
					html += "</tr>";
				});
				html += "</table>";
				html += "</div>";
				show.innerHTML = html;
				document.getElementById("show-sale-withdrawal-btn").style.pointerEvents = "";
			}
		});
	});

	$('table').on('click', '#print-sale-withdrawal-btn', function(){
		document.getElementById("print-sale-withdrawal-btn").disabled = true;

		var rowEl = $(this).closest('tr');
		var withdrawal_id = rowEl.find('#src-sale-withdrawal-id').text();

		$.ajax({
			url: '/sale-show-withdrawal',
			method: 'post',
			data: {	withdrawal_id: withdrawal_id },
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				var print_div = document.getElementById('print-div');
				document.getElementById('showWithdrawalBox').style.display = 'block';
				var show = document.getElementById('showWithdrawal');

				var html = "<div style='display:inline-block;text-align:center;page-break-inside:avoid;page-break-after:auto;border:1px solid black;width:650px;margin-right:15px;padding:10px;'>Dados do pedido<br><br>";
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
				html += "Vendas"
				html += "<table><tr><td>Código</td><td>Comprador</td></tr>";
				response.sales.forEach(function(sale){
					html += "<products>";
					html += "<td><div>"+sale.sale_cod+"</div></td>";
					html += "<td><div>"+sale.sale_buyer+"</div></td>";
					html += "</tr>";
				});
				html += "</table>";
				html += "</div>";

				html += "<div style='display:inline-block;border:1px solid black;vertical-align: top;'>";
				html += "Produtos"
				html += "<table><tr><td>Código</td><td>Produto</td><td>Qtd</td></tr>";
				response.products.forEach(function(product){
					html += "<tr>";
					html += "<td><div>"+product.product_cod+"</div></td>";
					html += "<td><div>"+product.product_info+"</div></td>";
					html += "<td><div>"+product.amount+"</div></td>";
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
				
				print_div.innerHTML = '';
				document.getElementById("print-sale-withdrawal-btn").disabled = false;
			}
		});
	});

	$('table').on('click', '#confirm-sale-withdrawal-btn', function(){
		var rowEl = $(this).closest('tr');
		rowEl.find('#confirm-sale-withdrawal-btn').prop("disabled",true);
		var withdrawal_id = rowEl.find('#src-sale-withdrawal-id').text();

		console.log(withdrawal_id);

		$.ajax({
			url: '/sale-confirm-withdrawal',
			method: 'post',
			data: { withdrawal_id: withdrawal_id },
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.lower_amount!=undefined){
					var alertHTML = 'Faltam\n\n';
					response.lower_amount.forEach(function(product){
						alertHTML += ''+product.amount+' '+product.type+'(s) '+product.name+' '+product.color+'\n\n';
					});
					alertHTML += 'para confirmar o pedido de retira.';
					alert(alertHTML);
					$('#filter-storage-withdrawal-btn').click();
					return;
				};
				
				alert(response.done);

				lib.clearBox("Withdrawal");
				$('#filter-storage-withdrawal-btn').click();
			}
		});
	});
});