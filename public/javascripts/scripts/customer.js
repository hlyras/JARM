$(function(){
	$('#filter-customer-btn').on('click', function(event){
		event.preventDefault();
		document.getElementById('filter-customer-btn').disabled = true;
		var cpf = document.getElementById('get-customer-cpf').value;
		var customer = document.getElementById('get-customer-name').value;
		$.ajax({
			url: '/customer-filter',
			method: 'post',
			data: {
				customer_cpf:cpf, 
				customer_name:customer
			},
			success: function(response) {
				var customer_select = document.getElementById('customer');
				var html = "";
				response.customers.forEach(function(customer){
					html += '<option value="'+customer.cpf+'">'+ customer.name +' / '+ customer.cpf +'</option>';
				});
				customer_select.innerHTML = html;
				document.getElementById('filter-customer-btn').disabled = false;
			}
		});
	});

	$('#create-customer-btn').on('click', function(event){
		event.preventDefault();
		document.getElementById('create-customer-btn').disabled = true;
		var name = document.getElementById('create-customer-name').value;
		var cpf = document.getElementById('create-customer-cpf').value;
		var phone = document.getElementById('create-customer-phone').value;

		if(name=='' || name=='0'){
			alert('É necessário preencher o nome do cliente.');
			document.getElementById('create-customer-btn').disabled = false;
			return;
		};

		if(cpf=='' || cpf=='0'){
			alert('É necessário preencher o cpf do cliente.');
			document.getElementById('create-customer-btn').disabled = false;
			return;
		};

		$.ajax({
			url: '/customer-save',
			method: 'post',
			data: {
				customer_name:name,
				customer_cpf:cpf, 
				customer_phone:phone, 
			},
			success: function(response) {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById('create-customer-btn').disabled = false;
					return;
				};

				alert(response.done);

				console.log(response.customer);

				var customer_select = document.getElementById('customer');
				var html = "";

				html += '<option value="'+response.customer.cpf+'">'+ response.customer.name +' / '+ response.customer.cpf +'</option>';
				
				customer_select.innerHTML = html;
				document.getElementById('create-customer-btn').disabled = false;
			}
		});
	});

	$('table').on('click', '#show-customer-btn', function(){
		document.getElementById("show-customer-btn").disabled = true;

		var rowEl = $(this).closest('tr');
		var customer_cpf = rowEl.find('#src-customer-cpf').text();

		console.log(customer_cpf);

		$.ajax({
			url: '/customer-show',
			method: 'post',
			data: {	customer_cpf: customer_cpf },
			success: function(response){
				document.getElementById('showCustomerBox').style.display = 'block';
				var show = document.getElementById('showCustomer');
				show.innerHTML = "";

				var html = "<div style='display:inline-block;border-bottom:1px solid black;'>"+response.customer[0].name+"</div>";

				html += "<table>";
				html += "<tr>";
				html += "<td>CPF: "+response.customer[0].cpf+"</td>";
				html += "<td>Tel.: "+response.customer[0].phone+"</td>";
				html += "<td>Nasc.: "+response.customer[0].born+"</td>";
				html += "</tr>";
				// html += "<tr>";
				// html += "<td>Clinte: "+response.customer[0].customer+"</td>";
				// html += "<td>CPF: "+response.customer[0].customer_cpf+"</td>";
				// html += "</tr>";
				// html += "<tr>";
				// html += "<td>Status: "+response.sale[0].status+"</td>";
				// html += "<td>Ult.at: "+response.sale[0].last_update+"</td>";
				// html += "</tr>";

				html += "<tr>";
				html += "<td>...</td>";
				html += "<td>...</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>Cód</td>";
				html += "<td>Data</td>";
				html += "<td>Valor</td>";
				html += "</tr>";
				response.customer[0].sales.forEach(function(sale){
					html += "<tr>";
					html += "<td>"+sale.cod+"</td>";
					html += "<td>"+sale.full_date+"</td>";
					html += "<td>"+sale.total_value+"</td>";
					html += "</tr>";
				});
				html += "</table>";
				show.innerHTML = html;
				document.getElementById("show-customer-btn").disabled = false;
			}
		});
	});
});