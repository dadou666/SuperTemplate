function lireJSON(name, fn) {
	 $.ajax({
  type: "GET",
  url: name,
  data:{} ,
  success: fn,
  dataType: "json"
});
	
	
	}

function ecrireJSON(name,obj) {
	  $.ajax({
  type: "PUT",
  url: name,
  data: JSON.stringify(obj) ,
  success: function () { 	},
  dataType: "json"
});
	
	
	
	
	}