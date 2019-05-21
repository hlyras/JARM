$(function(){
	//Criação de produto
	$('#create-product-btn').on('click', function(event){
		document.getElementById("create-product-btn").style.pointerEvents = "none";
		event.preventDefault();
		var id = document.getElementById('id').value;
		var cod = document.getElementById('cod').value;
		var type = document.getElementById('type').value;
		var color = document.getElementById('color').value;
		var name = ""+document.getElementById('name').value.replace(/^\s+|\s+$/g, '');
		var size = ""+document.getElementById('size').value;
		
		if(id===""){
			id=0;
		};
		
		if(cod==="" || cod==0){
			alert('cod vazio');
			document.getElementById("create-product-btn").style.pointerEvents = "";
			return;
		};

		if(type==="0"){
			alert('type vazio');
			document.getElementById("create-product-btn").style.pointerEvents = "";
			return;
		};

		if(color==="0"){
			alert('color vazio');
			document.getElementById("create-product-btn").style.pointerEvents = "";
			return;
		};

		if(name===""){
			alert('name vazio');
			document.getElementById("create-product-btn").style.pointerEvents = "";
			return;
		};

		if(size===""){
			alert('size vazio');
			document.getElementById("create-product-btn").style.pointerEvents = "";
			return;
		};

		$.ajax({
			url: '/product-save',
			method: 'post',
			data: {id:id, cod:cod, type:type, name:name, size:size, color:color},
			success: function(response) {
				if(response.msg){
					alert(response.msg);
					document.getElementById("create-product-btn").style.pointerEvents = "";
					return;
				};

				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				alert(response.done);

				document.getElementById('id').value = "";
				document.getElementById('cod').value = "";
				document.getElementById('type').value = "0";
				document.getElementById('name').value = "";
				document.getElementById('size').value = "";
				document.getElementById('color').value = "0";
				$( "#product-storage-filter" ).submit();
				document.getElementById("create-product-btn").style.pointerEvents = "";
			}
		});
	});

	//Filtro de produtos
	$('#product-storage-filter').on('submit', function(event){
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
				//paginação

				function paginar() {
				    $('table > tbody > tr').remove();
				    var tbody = $('table > tbody');
				    for (var i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) *  tamanhoPagina; i++) {
				        tbody.append('\
							<tr>\
								<td>'+ dados[i].cod +'</td>\
								<td>'+ dados[i].name +'</td>\
								<td>'+ dados[i].color +'</td>\
								<td>'+ dados[i].amount +'</td>\
								<td><a id="edit-product" onclick="edit('+ dados[i].id +')">edit</a></td>\
								<td><a id="del-product" onclick="del('+ dados[i].id +')">del</a></td>\
							</tr>\
						');
				    };
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
			}
		});
	});
});

function edit(id){
	$.ajax({
		url:'/product-get',
		method: 'post',
		data: {id: id},
		success: function(response){
			document.getElementById('id').value = response.product[0].id;
			document.getElementById('cod').value = response.product[0].cod;
			document.getElementById('type').value = response.product[0].type;
			document.getElementById('name').value = response.product[0].name;
			document.getElementById('color').value = response.product[0].color;
		}
	});
};

function del(id){
	var r = confirm('Não será possível recuperar este produto\nDeseja mesmo excluir?');
	if(r==true){

	} else {
		return;
	};
	$.ajax({
		url:'/product-remove',
		method: 'post',
		data: {id: id},
		success: function(response){
			if(response.unauthorized){
				alert(response.unauthorized);
				window.location.href = '/login';
				return;
			};

			alert(response.done);

			$( "#product-storage-filter" ).submit();
		}
	});
};