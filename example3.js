function enumererSolution(liste,  idx ,debutSolution, resultat) {
	if (idx >= liste.length) {
		resultat.push({lignes:debutSolution}); 
	} else {
		var length = liste[idx].length ;
		for(var j = 0 ; j < length  ;j++) {
			var val= liste[idx][j];
			var nouveauDebutSolution = debutSolution.slice(0);
			nouveauDebutSolution.push({colonnes:val});
		    var u= idx+1;
			enumererSolution(liste,  u ,nouveauDebutSolution, resultat); 
	
			}
	}
	return resultat;	
}
var tableauFiltre =[];
var listeResultat =[];
var model;
function selectionner(model) {
	if (model.value.option === model.parent.selection) {
				model.dom.find("#option").prop("selected","selected");
				}
}
function listeOption(l) {
	var r=[$$({option:""},selectionner)];
	$.each(l,function (i,a) {r.push($$({option:a},selectionner));});
	return r;
}

function select(idx) {
	
	return function (model) {
	var myModel = model;
		if (tableauFiltre[idx]) {
			model.selection =tableauFiltre[idx] ;
		
	 } else {
	 		model.selection = "";
	 		tableauFiltre[idx]="";
	 	}
		
		model.dom.change(function () {
			var val = myModel.dom.find("option:selected").val();
			tableauFiltre[idx]=val;
			myModel.selection = val;
			initialiserListeAvecFiltre();
			
			});
		
		
		};

	
}
function testerLigne( l ) {
	for(var i=0;i < l.length;i++) {
		var p= tableauFiltre[i];
		if (p!=="" && l[i].colonnes !==p ) {
			return false;
			
			}
		
		}
	return true;	
	
	}
function initialiserListeAvecFiltre() {
	var r=[];
	for(var k=0;k < listeResultat.length;k++) {
		
		var l = listeResultat[k];
		if (testerLigne(l.lignes)) {
			r.push(l);
			
		}

}
	model.tbody = r ;
	$$.render("#solutions");
	}

$(document).ready(function(){
var l1=["Oui","Non","Vide" ];
var l2=["Inconnu","connu"];
var l3=["Vide","Present","Renseigne"];
var l4=["Vide","Renseigne"];
var l5=["Vide","Renseigne"];

listeResultat=enumererSolution([l1,l2,l3,l4,l5],0,[],[]);

var titres={lignes:[{colonnes:"L1"},{colonnes:"L2"},{colonnes:"L3"},{colonnes:"L4"},{colonnes:"L5"}]};
var filtres={lignes:[
				{colonnes:$$({select:listeOption(l1)},select(0))},
				{colonnes:$$({select:listeOption(l2)},select(1))},
				{colonnes:$$({select:listeOption(l3)},select(2))},
				{colonnes:$$({select:listeOption(l4)},select(3))},
				{colonnes:$$({select:listeOption(l5)},select(4))}]};
model = {
	tbodyFiltres:filtres,
	tbodyTitres:titres,
	tbody:listeResultat};
	
$$.create("#solutions",model);
$$.render("#solutions");







	



});
