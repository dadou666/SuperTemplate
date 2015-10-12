/*<objSimple> = { <nom>: <obj> | $$(<obj>, fonction | map ) }
<objArray> = [ <objSimple> *]
<obj> =  <objSimple> | <objArray> | chaine | fonction


$$.install (objDom,<objSimple> |<objArray>)

{ nom:$$("toto") , prenom:$$("momo") }

 */
function $$Model(mapOrFct) {
	this.mapOrFct = mapOrFct ;
	
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
	if (!this.mapOrFct) {
		return;
		}
	if (typeof this.mapOrFct === 'function') {
		this.dom= objDom;
		this.mapOrFct(this);
		
		} else {
	$.each(Object.keys(this.mapOrFct),function (i ,val) {
		objDom.attr(val,this.mapOrFct[val]);			
		});
			
			
	}
	
	
	};
	

var $$= function (obj,mapOrFct) {
	return new $$Model(obj,mapOrFct);
	
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
		value.initAttributes(objDom);
		value = model.value ;
		model.parent = parent;
		if (model !== root) {
			model.root = root; }
		

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
			$.each(div.children(), function (i,o){
			objDom.append($(o));
			});
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