$(function(){
	$('#filter-production-input-btn').on('click', function(event){
		event.preventDefault();
		document.getElementById("filter-production-input-btn").disabled = true;
		var cod = document.getElementById('get-cod').value;
		var status = document.getElementById('get-status').value;
		var product = document.getElementById('product').value;
		var inputCheck = document.getElementById('get-input-check').value;
		var date = document.getElementById('get-date').value;
		var str = date.split('-');
		if(str!=""){
			var convertedDate = str[2]+"-"+str[1]+"-"+str[0];
		} else {
			var convertedDate = "";
		};

		$.ajax({
			url: '/input-filter-production',
			method: 'post',
			data: {cod: cod, date:convertedDate, status: status, product: product, inputCheck: inputCheck},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				var dados = response.productions;

				var tamanhoPagina = 15;
				var pagina = 0;

				function paginar(){
				    $('table > tbody > tr').remove();
				    var tbody = $('table > tbody');
				    if(response.productions!=""){
						if(dados[0].checked===0){
					    	for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++){
								tbody.append('\
									<tr>\
										<td id="src-production-input-id">'+ dados[i].id +'</td>\
										<td id="src-production-date">'+ dados[i].date +'</td>\
										<td id="src-production-id">'+ dados[i].production_id +'</td>\
										<td id="src-production-product-id" hidden>'+ dados[i].product_id +'</td>\
										<td id="src-production-product-info">'+ dados[i].product +'</td>\
										<td id="src-production-amount">'+ dados[i].amount +'</td>\
										<td id="src-production-status">'+ dados[i].status +'</td>\
										<td id="src-production-user">'+ dados[i].user +'</td>\
										<td><a id="update-production-input-btn">Confirmar entrada</a></td>\
									</tr>\
								');
					    	};
						} else if(dados[0].checked===1){
					    	for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++){
								tbody.append('\
									<tr>\
										<td id="src-production-input-id">'+ dados[i].id +'</td>\
										<td id="src-production-date">'+ dados[i].date +'</td>\
										<td id="src-production-id">'+ dados[i].production_id +'</td>\
										<td id="src-production-product-id" hidden>'+ dados[i].product_id +'</td>\
										<td id="src-production-product-info">'+ dados[i].product +'</td>\
										<td id="src-production-amount">'+ dados[i].amount +'</td>\
										<td id="src-production-status">'+ dados[i].status +'</td>\
										<td id="src-production-user">'+ dados[i].user +'</td>\
										<td>Confirmado por: '+dados[i].confirmation_user+'</td>\
									</tr>\
								');
					    	};
						};
						document.getElementById("filter-production-input-btn").disabled = false;
					} else {
						alert('Não há resultados na busca.');
						document.getElementById("filter-production-input-btn").disabled = false;
					};
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
				        }
				    });
				    $('#anterior').click(function(){
				        if (pagina > 0) {
				            pagina--;
				            paginar();
				            ajustarBotoes();
				        }
				    });
				    paginar();
				    ajustarBotoes();
				});
			}
		});
	});

	$('table').on('click', '#update-production-input-btn', function(){
		var rowEl = $(this).closest('tr');
		rowEl.find('#update-production-input-btn').prop("disabled",true)
		
		var input_id = rowEl.find('#src-production-input-id').text();
		var production_id = rowEl.find('#src-production-id').text();
		var product_id = rowEl.find('#src-production-product-id').text();
		var amount = rowEl.find('#src-production-amount').text();
		var status = rowEl.find('#src-production-status').text();

		$.ajax({
			url: '/input-confirm-production',
			method: 'post',
			data: { input_id: input_id, production_id: production_id, product_id: product_id, amount: amount, status: status },
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				alert(response.done);
				
				$('#filter-production-input-btn').click();
			}
		});
	});
	// END OF PRODUTION INPUT
});