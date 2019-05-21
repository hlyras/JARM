var lib = {
	genDate: function(){
		var d = new Date();
		var date = "";
		if(d.getDate()<10 && parseInt(d.getMonth())+1>9){
			date = "0"+d.getDate()+"-"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear();
		} else if(d.getDate()>9 && parseInt(d.getMonth())+1<10){
			date = ""+d.getDate()+"-0"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear();
		} else if(parseInt(d.getDate())<10 && parseInt(d.getMonth())+1<10){
			date = "0"+d.getDate()+"-0"+(parseInt(d.getMonth())+1)+"-"+d.getFullYear();
		} else {
			date = ""+d.getDate()+"-"+parseInt(d.getMonth()+1)+"-"+d.getFullYear();
		};
		return date;
	},
	genFullDate: function(){
		var d = new Date();
		var date = "";
		if(d.getDate()<10 && parseInt(d.getMonth())+1>9){
			date = "0"+d.getDate()+"/"+(parseInt(d.getMonth())+1)+"/"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		} else if(d.getDate()>9 && parseInt(d.getMonth())+1<10){
			date = ""+d.getDate()+"/0"+(parseInt(d.getMonth())+1)+"/"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		} else if(parseInt(d.getDate())<10 && parseInt(d.getMonth())+1<10){
			date = "0"+d.getDate()+"/0"+(parseInt(d.getMonth())+1)+"/"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		} else {
			date = ""+d.getDate()+"/"+parseInt(d.getMonth()+1)+"/"+d.getFullYear()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		};
		return date;
	},
	colectByMonth: function(month, dates){
		var array = [];
		var str = [];
		for(var i in dates){
			var str = dates[i].date.split('-');
			if(parseInt(str[1])==parseInt(month)){
				array.push(dates[i]);
			};
		};
		return array;
	},
	verifyAmount: function(input, storage, callback){
		var indice = [];
		var overAmount = [];
		for(var i in input){
			for(var j in storage){
				if(input[i].product_id==storage[j].id){
					if(input[i].amount>storage[j].amount){
						var over = {
							id: storage[j].id,
							type: storage[j].type,
							name: storage[j].name,
							color: storage[j].color,
							amount: (storage[j].amount-input[i].amount)*-1
						};
						overAmount.push(over);
					};
				};
			};
			indice.push('.');
		};
		if(indice.length==input.length && overAmount.length < 1){
			callback(false, []);
			return;
		} else if(indice.length==input.length && overAmount.length > 0){
			callback(true, overAmount);
			return;
		}
	}
};

// var infos = [{
// 	id:1,
// 	date:"02-02-2019"
// },
// {
// 	id:2,
// 	date:"02-03-2019"
// },
// {
// 	id:3,
// 	date:"02-04-2019"
// },
// {
// 	id:4,
// 	date:"02-11-2019"
// }];

// function colectMonth(month, dates){
// 	var array = [];
// 	var str = [];
// 	for(var i in dates){
// 		var str = dates[i].date.split('-');
// 		if(str[1]==month){
// 			array.push(dates[i]);
// 		};
// 	};
// 	console.log(array);
// };

// colectMonth('11', infos);

module.exports = lib;