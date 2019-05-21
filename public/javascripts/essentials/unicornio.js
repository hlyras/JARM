 var Unicornio = function(id, nome){
 	this.id = id;
 	this.nome = nome;
 	this.save = function(callback){
 		Unicornio.create(this, callback);
 	}
 }

//mysql
Unicornio.database = [];
//estático -'push'
//mysql - 'insert'
Unicornio.id = 0;

Unicornio.createId = function(){
	console.log(Unicornio.id);
	Unicornio.id++;
	return Unicornio.id;
};

//model
Unicornio.create = function(unicornio, callback){
	
	Unicornio.database.push(unicornio);
	callback(unicornio)
};

Unicornio.list = function(callback){
	var dados = Unicornio.database;
	callback(dados);
}

Unicornio.get = function(id, callback){
	for(i in Unicornio.database){
		if(Unicornio.database[i].id==id){
			var dados = Unicornio.database[i];
		}
	}
	callback(dados);
}

Unicornio.update = function(){

}

Unicornio.remove = function(id, callback){
	var UnicornioBackUp = [];
	for(i in Unicornio.database){
		if(Unicornio.database[i].id!=id){
			UnicornioBackUp.push(Unicornio.database[i]);
		} else {
			var dados = Unicornio.database[i];
		}
	};

	Unicornio.database = UnicornioBackUp;

	callback(dados);
}

//controller
Unicornio.controller = {
	index:function(){
		console.log('bem vindo aos unicornios');
	},
	create:function(idgen){
		var id = Unicornio.createId();
		var nome = document.getElementById('nomeUnicornio').value;
		var unicornio = new Unicornio(id,nome);
		if(unicornio.id!="" && unicornio.id!=null & unicornio.nome!="" && unicornio.nome!=null ){
			unicornio.save(function(dados){
				alert("Id: "+dados.id+"\nNome: "+dados.nome);
			});
			document.getElementById('nomeUnicornio').value = "";
			document.getElementById('nomeUnicornio').focus();
		};
		Unicornio.controller.list();
	},
	list:function(){
		Unicornio.list(function(dados){
			var table = document.getElementById('unicorniosTbl');
			var html = "<tr><th>Código</th><th>Nome</th></tr>";
			for(i in dados){
				html += "<tr>"
				html += "<td>"+dados[i].id+"</td>"
				html += "<td>"+dados[i].nome+"</td>"
				html += "<td><button class='button fit small' onclick=Unicornio.controller.update('"+dados[i].id+"')>alt</button></td>"
				html += "<td><button class='button fit small' onclick=Unicornio.controller.remove('"+dados[i].id+"')>del</button></td>"
				html += "</tr>"
			}
			table.innerHTML = html
		});
	},
	update:function(id){
		Unicornio.get(id, function(dados){
			console.log(dados);
		})
	},
	remove:function(id){
		Unicornio.remove(id, function(dados){
			console.log(dados);
		})
		Unicornio.controller.list();
	}
};

//routes
// router.get('/unicornio', Unicornio.controller.index);
// router.post('/unicornio/cadastrar', Unicornio.controller.create);
// router.post('/unicornio/list', Unicornio.controller.list);