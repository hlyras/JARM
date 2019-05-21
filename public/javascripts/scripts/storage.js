$(function(){
	$('#storage-filter').on('submit', function(event){
		event.preventDefault();
		var type = document.getElementById('get-type').value;
		var color = document.getElementById('get-color').value;
		$.ajax({
			url: '/product-filter',
			method: 'post',
			data: {type:type, color:color},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				var dados = response.products;

				var tamanhoPagina = 15;
				var pagina = 0;

				function paginar(){
				    $('table > tbody > tr').remove();
				    var tbody = $('table > tbody');
				    for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++){
				        tbody.append('\
							<tr>\
								<td>'+ dados[i].cod +'</td>\
								<td>'+ dados[i].type +'</td>\
								<td>'+ dados[i].name +'</td>\
								<td>'+ dados[i].color +'</td>\
								<td>'+ dados[i].amount +'</td>\
							</tr>\
						');
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
			}
		});
	});
});