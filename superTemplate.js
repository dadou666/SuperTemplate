/*<objSimple> = { <nom>: <obj> | $$(<obj>, fonction  )  | $$(function) | $$(<obj>)}
<objArray> = [ <objSimple> *]
<obj> =  <objSimple> | <objArray> | chaine 


$$.create (IdObjDom,<objSimple> |<objArray>)
$$.render(IdObjDom)


 */
function $$Model(a0,a1) {
	if (typeof a0 === "function") {
		this.builder = a0;
		return;
	}
	this.value = a0;
	this.builder = a1;
	this.parent = undefined;
	this.dom = undefined;
	this.root = undefined;
}

	
$$Model.isArray = function (value) {
	return Array.isArray(value);
	};
$$Model.isString = function (value) {
	return (typeof value)==="string";	
	
};
$$Model.isObject = function (value) {
	if ($$Model.isArray(value)) {
		return false; }
	if ($$Model.isString(value)) {
		return false;
		}
	return (typeof value )==='object';
};

$$Model.prototype.initAttributes = function (objDom) {
	if (!this.builder) {
		return;
		}
		this.dom= objDom;
		this.builder(this);
};
	

var $$= function (obj,builder) {
	return new $$Model(obj,builder);
	
	};
	

$$.htmlSourceById =	 {}

$$.create = function(uniqueId,model)	 {
	var objDom = $(uniqueId);
    $$.htmlSourceById[uniqueId]={html:objDom.html(),model:model}

	
	
	
	};
$$.renderDomRec = function (objDom,model,parent,root)	 {
	var srcHtml =objDom.html(); 

	if (!model) {
		return;	}
	var value= model;	

	if (value instanceof $$Model ) {

		value = model.value ;
		model.parent = parent;
		if (model !== root) {
			model.root = root; }
		model.initAttributes(objDom);
		

		} else {
	model =parent;		
	}
	if ($$Model.isString(value)) {
		objDom.empty();
		objDom.text(value);
		
		return objDom;
		}
	if ($$Model.isArray(value)) {
		objDom.empty();
		
		$.each(value,function(idx,val) {
			var div=$("<div>");
			div.attr("id",idx);
			div.html(srcHtml);
			$$.renderDomRec(div,val,model,root);
			if (srcHtml.trim()==="") {
				if (typeof val ==="string"){
					objDom.text(val);
				}
			}else {
				$.each(div.children(), function (i,o){
				objDom.append($(o));
				});
			}
			});	
		return;
		
	}
	
	if ($$Model.isObject(value)) {
		
		$.each(Object.keys(value),function(idx,val) {
			var m = value[val];
			var o=objDom.find("#"+val);
			if (o.length === 0) {
				alert("Pas trouve "+val);
			}
			$$.renderDomRec(o,m,model,root);
			
			});}
	
	
	
	
	
	
}

$$.render = function (uniqueId) {
		var objDom = $(uniqueId);
		var o = $$.htmlSourceById[uniqueId];
        objDom.html(o.html); 
        $$.renderDomRec(objDom, o.model,undefined,o.model);
	
	}