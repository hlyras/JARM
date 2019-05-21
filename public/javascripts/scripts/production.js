$(function(){
	// START OF PRODUCTION
	$('#create-production-btn').on('click', function(event){
		document.getElementById("create-production-btn").disabled = true;
		event.preventDefault();
		var origin = document.getElementById('origin').value;
		var provider = document.getElementById('provider').value;
		var status = ""+document.getElementById('status').value;
		var product = document.getElementById('product').value;
		var amount = document.getElementById('amount').value;
		var obs = document.getElementById('obs').value;

		if(product==0 || product==undefined){
			alert('É necessário selecionar um produto');
			document.getElementById("create-production-btn").disabled = false;
			return;
		};

		if(amount<1||amount==""){
			alert('É necessário preencher a quantidade de produtos.');
			document.getElementById("create-production-btn").disabled = false;
			return;
		}

		$.ajax({
			url: '/production-save',
			method: 'post',
			data: {origin:origin, provider:provider, status:status, product:product, amount:amount, obs:obs},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById("create-production-btn").disabled = false;
					return;
				};

				alert(response.done);

				document.getElementById('status').value = "preparacao";
				document.getElementById('amount').value = "";
				document.getElementById('obs').value = "";
				$( "#filter-form" ).submit();
				document.getElementById("create-production-btn").disabled = false;
			}
		});
	});

	//Filtro de produção
	$('#filter-production-btn').on('click', function(event){
		event.preventDefault();
		document.getElementById('filter-production-btn').disabled = true;

		var date = document.getElementById('get-date').value;
		var str = date.split('-');
		if(str!=""){
			var convertDate = str[2]+"-"+str[1]+"-"+str[0];
		} else {
			var convertDate = "";
		};
		var origin = document.getElementById('get-origin').value;
		var provider = document.getElementById('get-provider').value;
		var status = document.getElementById('get-status').value;
		var product = document.getElementById('product').value;
		$.ajax({
			url: '/production-filter',
			method: 'post',
			data: {date:convertDate, origin:origin, provider: provider, status: status, product: product},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				var dados = response.productions;

				var tamanhoPagina = 15;
				var pagina = 0;

				//paginação
				function paginar() {
				    $('table > tbody > tr').remove();
				    var tbody = document.getElementById('main-production-tbody');
				    var html = "";
				        
				    if(dados!=""){
						if(dados[0].status==='preparacao'){
							for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++) {
								html += "<tr>";
								html += "<td id='src-production-id'>"+ dados[i].id +"</td>";
								html += "<td>"+ dados[i].origin +"</td>";
								html += "<td>"+ dados[i].provider +"</td>";
								html += "<td id='src-product-id' hidden>"+ dados[i].product +"</td>";
								html += "<td id='src-product'>"+ dados[i].product_name +"</td>";
								html += "<td id='src-total-amount'>"+ dados[i].amount +"</td>";
								html += "<td id='src-storage-amount'>"+ dados[i].confirmed_amount +"</td>";
								html += "<td id='src-received-amount' hidden>"+ dados[i].received_amount +"</td>";
								html += "<td>"+ dados[i].date +"</td>";
								html += "<td>"+ dados[i].status +"</td>";
								html += "<td><a id='send-production-btn'>Env.p/produção</a></td>";
								html += "<td><a id='show-production-btn'>Mostrar</a></td>";
								html += "<td><a id='remove-production-btn'>Excluir</a></td>";
				    		};
						} else if(dados[0].status==='produzindo'){
							for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++) {
								if(dados[i].checked==="1"){
									html += "<tr>";
									html += "<td id=src-production-id>"+ dados[i].id +"</td>";
									html += "<td>"+ dados[i].origin +"</td>";
									html += "<td>"+ dados[i].provider +"</td>";
									html += "<td id='src-product-id' hidden>"+ dados[i].product +"</td>";
									html += "<td id='src-product'>"+ dados[i].product_name +"</td>";
									html += "<td id='src-total-amount'>"+ dados[i].amount +"</td>";
									html += "<td id='src-storage-amount'>"+ dados[i].confirmed_amount +"</td>";
									html += "<td id='src-received-amount' hidden>"+ dados[i].received_amount +"</td>";
									html += "<td>"+ dados[i].date +"</td>";
									html += "<td>"+ dados[i].status +"</td>";
									html += "<td><select id='src-new-status'><option value='parcial'>Recebido parcial</option><option value='finalizado'>Recebido finalizado</option></select></td>";
									html += "<td><input type='number' id='src-amount' class='button small alt' placeholder='Recebido'></td>";
									html += "<td>Em análise</td>";
									html += "<td><a id='show-production-btn'>Mostrar</a></td>";
									html += "</tr>";
								} else {
									html += "<tr>";
									html += "<td id='src-production-id'>"+ dados[i].id +"</td>";
									html += "<td>"+ dados[i].origin +"</td>";
									html += "<td>"+ dados[i].provider +"</td>";
									html += "<td id='src-product-id' hidden>"+ dados[i].product +"</td>";
									html += "<td id='src-product'>"+ dados[i].product_name +"</td>";
									html += "<td id='src-total-amount'>"+ dados[i].amount +"</td>";
									html += "<td id='src-storage-amount'>"+ dados[i].confirmed_amount +"</td>";
									html += "<td id='src-received-amount' hidden>"+ dados[i].received_amount +"</td>";
									html += "<td>"+ dados[i].date +"</td>";
									html += "<td>"+ dados[i].status +"</td>";
									html += "<td><select id='src-new-status'><option value='parcial'>Recebido parcial</option><option value='finalizado'>Recebido finalizado</option></select></td>";
									html += "<td><input type='number' id='src-amount' class='button small alt' placeholder='Recebido'></td>";
									html += "<td><a id='update-production-btn'>Update</a></td>";
									html += "<td><a id='show-production-btn'>Mostrar</a></td>";
									// html += "<td><a id='remove-production-btn'>Excluir</a></td>";
									html += "</tr>";
								};
					    	};
						} else if(dados[0].status==='parcial'){
							for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++) {
								if(dados[i].checked==="1"){
									html += "<tr>";
									html += "<td id='src-production-id'>"+ dados[i].id +"</td>";
									html += "<td>"+ dados[i].origin +"</td>";
									html += "<td>"+ dados[i].provider +"</td>";
									html += "<td id='src-product-id' hidden>"+ dados[i].product +"</td>";
									html += "<td id='src-product'>"+ dados[i].product_name +"</td>";
									html += "<td id='src-total-amount'>"+ dados[i].amount +"</td>";
									html += "<td id='src-storage-amount'>"+ dados[i].confirmed_amount +"</td>";
									html += "<td id='src-received-amount' hidden>"+ dados[i].received_amount +"</td>";
									html += "<td>"+ dados[i].date +"</td>";
									html += "<td>"+ dados[i].status +"</td>";
									html += "<td><select id='src-new-status'><option value='parcial'>Recebido parcial</option><option value='finalizado'>Recebido finalizado</option></select></td>";
									html += "<td><input type='number' id='src-amount' class='button small alt' placeholder='Recebido'></td>";
									html += "<td>Em análise</td>";
									html += "<td><a id='show-production-btn'>Mostrar</a></td>";
									html += "</tr>";
								} else {
									html += "<tr>";
									html += "<td id='src-production-id'>"+ dados[i].id +"</td>";
									html += "<td>"+ dados[i].origin +"</td>";
									html += "<td>"+ dados[i].provider +"</td>";
									html += "<td id='src-product-id' hidden>"+ dados[i].product +"</td>";
									html += "<td id='src-product'>"+ dados[i].product_name +"</td>";
									html += "<td id='src-total-amount'>"+ dados[i].amount +"</td>";
									html += "<td id='src-storage-amount'>"+ dados[i].confirmed_amount +"</td>";
									html += "<td id='src-received-amount' hidden>"+ dados[i].received_amount +"</td>";
									html += "<td>"+ dados[i].date +"</td>";
									html += "<td>"+ dados[i].status +"</td>";
									html += "<td><select id='src-new-status'><option value='parcial'>Recebido parcial</option><option value='finalizado'>Recebido finalizado</option></select></td>";
									html += "<td><input type='number' id='src-amount' class='button small alt' placeholder='Recebido'></td>";
									html += "<td><a id='update-production-btn'>Update</a></td>";
									html += "<td><a id='show-production-btn'>Mostrar</a></td>";
									html += "</tr>";
								};
					    	};
						} else if(dados[0].status==='finalizado'){
							for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++) {
					        	html += "<tr>";
					        	html += "<td id='src-production-id'>"+ dados[i].id +"</td>";
					        	html += "<td>"+ dados[i].origin +"</td>";
					        	html += "<td>"+ dados[i].provider +"</td>";
					        	html += "<td id='src-product-id' hidden>"+ dados[i].product +"</td>";
					        	html += "<td id='src-product'>"+ dados[i].product_name +"</td>";
					        	html += "<td id='src-total-amount'>"+ dados[i].amount +"</td>";
					        	html += "<td id='src-storage-amount'>"+ dados[i].confirmed_amount +"</td>";
					        	html += "<td id='src-received-amount' hidden>"+ dados[i].received_amount +"</td>";
					        	html += "<td>"+ dados[i].date +"</td>";
					        	html += "<td>"+ dados[i].status +"</td>";
					        	html += "<td><a id='show-production-btn'>Mostrar</a></td>";
					        	html += "</tr>";
					    	};
						};
					} else {
						alert('Não há resultados na busca');
						document.getElementById('filter-production-btn').disabled = false;
					};
					tbody.innerHTML = html;
				    $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dados.length / tamanhoPagina));
				};

				function ajustarBotoes() {
				    $('#proximo').prop('disabled', dados.length <= tamanhoPagina || pagina >= dados.length / tamanhoPagina - 1);
				    $('#anterior').prop('disabled', dados.length <= tamanhoPagina || pagina == 0);
				}

				$(function() {
				    $('#proximo').click(function() {
				        if (pagina < dados.length / tamanhoPagina - 1) {
				            pagina++;
				            paginar();
				            ajustarBotoes();
				        }
				    });
				    $('#anterior').click(function() {
				        if (pagina > 0) {
				            pagina--;
				            paginar();
				            ajustarBotoes();
				        }
				    });
				    paginar();
				    ajustarBotoes();
				});
				lib.clearBox("Production");
				document.getElementById('filter-production-btn').disabled = false;
			}
		});
	});

	$('table').on('click', '#show-production-btn', function(){
		document.getElementById("show-production-btn").style.pointerEvents = "none";
		var rowEl = $(this).closest('tr');
		var production_id = rowEl.find('#src-production-id').text();
		var product_id = rowEl.find('#src-product-id').text();

		$.ajax({
			url: '/production-show',
			method: 'post',
			data: { production_id: production_id, product_id: product_id },
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				document.getElementById('showProductionBox').style.display = 'block';
				var show = document.getElementById('showProduction');
				show.innerHTML = "";
				var html = "<div style='display:inline-block;border-bottom:1px solid black;margin-right:15px;padding:10px;'>Entradas do pedido</div><br><br>";
																			
				html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>id: "+response.production[0].id+"</div>";
				html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Data: "+response.production[0].date+"</div>";
				html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Origem: "+response.production[0].origin+"</div>";
				html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Fornecedor: "+response.production[0].provider+"</div>";
				html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Produto: "+response.production[0].product+"</div>";
				html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Status: "+response.production[0].status+"</div>";
				html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Pedido: "+response.production[0].amount+"</div>";
				html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Recebido: "+response.production[0].confirmed_amount+"</div>";
				html += "<div style='display:inline-block;border:1px solid black;margin-right:15px;padding:10px;'>Obs: "+response.production[0].obs+"</div>";
				
				html += "<br>";
				html += "<br>";

				html += "<table>";
				html += "<tr>";
				html += "<td>id</td>";
				html += "<td>Data</td>";
				html += "<td>Produção</td>";
				html += "<td>Produto</td>";
				html += "<td>Quantidade</td>";
				html += "<td>Status</td>";
				html += "<td>Confirmação</td>";
				html += "<td>Obs</td>";
				html += "</tr>";
				response.productionInputs.forEach(function(input){
					html += "<tr>";
					html += "<td>"+input.id+"</td>";
					html += "<td>"+input.date+"</td>";
					html += "<td>"+input.production_id+"</td>";
					html += "<td>"+input.product_id+"</td>";
					html += "<td>"+input.amount+"</td>";
					html += "<td>"+input.status+"</td>";
					html += "<td>"+input.confirmation_user+"</td>";
					html += "<td>"+input.obs+"</td>";
					html += "</tr>";
				});
				html += "</table>";
				show.innerHTML = html;
				document.getElementById("show-production-btn").style.pointerEvents = "";
			}
		});
	});

	$('table').on('click', '#remove-production-btn', function(){
		document.getElementById("remove-production-btn").style.pointerEvents = "none";
		
		var rowEl = $(this).closest('tr');
		var production_id = rowEl.find('#src-production-id').text();

		$.ajax({
			url: '/production-remove',
			method: 'post',
			data: { production_id: production_id },
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				alert(response.done);

				document.getElementById("remove-production-btn").style.pointerEvents = "";
				$( "#filter-production-btn" ).click();
			}
		});
	});

	$('table').on('click', '#send-production-btn', function(){
		document.getElementById("send-production-btn").style.pointerEvents = "none";
		var rowEl = $(this).closest('tr');
		var production_id = rowEl.find('#src-production-id').text();
		var r = confirm("O pedido: "+production_id+" está sendo enviado para produção?");
		if(r==true){

		} else {
			document.getElementById("send-production-btn").style.pointerEvents = "none";
			return;
		};

		$.ajax({
			url: '/production-send',
			method: 'post',
			data: { production_id: production_id },
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				alert(response.done);

				$('#filter-production-btn').click();
			}
		});
	});

	$('table').on('click', '#update-production-btn', function(){
		document.getElementById("update-production-btn").style.pointerEvents = "none";
		var rowEl = $(this).closest('tr');
		var production_id = rowEl.find('#src-production-id').text();
		var product_id = rowEl.find('#src-product-id').text();
		var product = rowEl.find('#src-product').text();
		var totalAmount = rowEl.find('#src-total-amount').text();
		var status = rowEl.find('#src-new-status').val();
		var amount = rowEl.find('#src-amount').val();
		var receivedAmount = rowEl.find('#src-received-amount').text();
		var storageAmount = rowEl.find('#src-storage-amount').text();
		var obs = "";
		var done = '0';

		if(parseInt(amount) + parseInt(storageAmount) > parseInt(totalAmount)){
			alert("Quantidade acima do pedido");
			$('#filter-production-btn').click();
			return;	
		};

		if(parseInt(amount)<=0 && status=="parcial" || amount==='' || parseInt(amount)<0 && status=="finalizado"){
			alert('Favor inserir a quantidade recebida');
			$('#filter-production-btn').click();
			return;
		};

		if(parseInt(amount) + parseInt(storageAmount) == parseInt(totalAmount) && status=='parcial'){
			alert("Pedido deve ser atualizado para finalizado.");
			$('#filter-production-btn').click();
			return;
		};

		if(status=='parcial'){
			// var input = prompt('Descreva o motivo da falta de produtos').replace(/^\s+|\s+$/g, '');
			var input = prompt('Descreva o motivo do recebimento parcial.');
			if(input==null){
				alert('É necessário registrar uma observação para recebimentos parciais.')
				document.getElementById("update-production-btn").style.pointerEvents = "";
				return;
			} else {
				while(input>25){
					input = prompt('Relatar observação?');
				}
				obs = input;
			};
		};

		if(parseInt(amount) + parseInt(storageAmount) < parseInt(totalAmount) && status=='finalizado' || amount==0 && status=='finalizado'){
			var r = confirm('Deseja finalizar com quantidade recebida\ninferior ao pedido?');
			if(r==true){
				// var input = prompt('Descreva o motivo da falta de produtos').replace(/^\s+|\s+$/g, '');
				var input = prompt('Qual o motivo do recebimento incompleto?');
				if(input==null){
					alert('É necessário registrar uma observação')
					document.getElementById("update-production-btn").style.pointerEvents = "";
					return;
				} else {
					while(input>25){
						input = prompt('Relatar observação?');
					}
					obs = input;
				};
			} else {
				$('#filter-production-btn').click();
				return;
			};
		} else if(parseInt(amount) + parseInt(storageAmount) == parseInt(totalAmount) && status=='finalizado'){
			done = '1';
			// var input = prompt('Descreva o motivo da falta de produtos').replace(/^\s+|\s+$/g, '');
			var input = prompt('Relatar observação?');
			if(input==null){
				document.getElementById("update-production-btn").style.pointerEvents = "";
				return;
			} else {
				while(input>25){
					input = prompt('Relatar observação?');
				}
				obs = input;
			};
		};

		console.log(amount);

		$.ajax({
			url: '/production-update',
			method: 'post',
			data: { production_id: production_id, product_id: product_id, product: product, amount: amount, status: status, checked: '0', obs: obs, done: done },
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				alert(response.done);

				$('#filter-production-btn').click();
			}
		});
	});

	$(document).on('change', '#origin', function() {
	  var selectbox = document.getElementById('provider');
	  if(document.getElementById('origin').value==='interna'){
    	selectbox.innerHTML = "";
    	selectbox.innerHTML += "<option value='compartilhado'>Compartilhado</option>";
    	selectbox.innerHTML += "<option value='João'>João Victor</option>";
    	selectbox.innerHTML += "<option value='Fabiano'>Fabiano</option>";
	  } else if(document.getElementById('origin').value==='externa'){
	  	selectbox.innerHTML = "";
    	selectbox.innerHTML += "<option value='cost1'>Costureira1</option>";
    	selectbox.innerHTML += "<option value='cost2'>Costureira2</option>";
    	selectbox.innerHTML += "<option value='cost3'>Costureira3</option>";
    	selectbox.innerHTML += "<option value='cost4'>Costureira4</option>";
	  };
	});

	$(document).on('change', '#get-origin', function() {
		var selectbox = document.getElementById('get-provider');
		if(document.getElementById('get-origin').value==='interna'){
		selectbox.innerHTML = "";
		selectbox.innerHTML += "<option value='0'>Todos</option>";
		selectbox.innerHTML += "<option value='compartilhado'>Compartilhado</option>";
		selectbox.innerHTML += "<option value='João'>João Victor</option>";
		selectbox.innerHTML += "<option value='Fabiano'>Fabiano</option>";
		} else if(document.getElementById('get-origin').value==='externa'){
		selectbox.innerHTML = "";
		selectbox.innerHTML += "<option value='0'>Todos</option>";
		selectbox.innerHTML += "<option value='cost1'>Costureira1</option>";
		selectbox.innerHTML += "<option value='cost2'>Costureira2</option>";
		selectbox.innerHTML += "<option value='cost3'>Costureira3</option>";
		selectbox.innerHTML += "<option value='cost4'>Costureira4</option>";
		} else if(document.getElementById('get-origin').value==='0'){
			selectbox.innerHTML = "";
			selectbox.innerHTML = "<option value='0'>Fornecedor</option>";
		};
	});
});