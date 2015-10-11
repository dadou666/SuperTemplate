


var nom="Dadou";
function changeNom(model) {
	model.value=[{valeur:"Dadou"},{valeur:"Nini"},{valeur:"Killer"}];
	model.dom.click(function () {
	nom = $("#choixNom option:selected").text(); });
	}
var prenom="Zodiac";

function changePrenom(model) {
	model.value=[{valeur:"Zodiac"},{valeur:"Patibular"},{valeur:"Zone"},{valeur:"Alcool"}];
	model.dom.click(function () {
	prenom = $("#choixPrenom option:selected").text();});
	}	

var groupeSelection  ;
var groupes = [];
var selection;

		
function ajouterGroupe(model) 
{
	model.value = "Ajouter groupe";	
	model.dom.click( function () 
	{
		var groupeModel = {holder: {}};
		var selectionner=function (model) 
			{
				if (!model.value) {
					model.value="O";	}
				model.dom.text(model.value);
				model.dom.click(function () 
				{
					if (selection) 
					{
						selection.dom.text("O");
						selection.value="O";
						groupeSelection = undefined;		
					}
					if (selection !== model) 
					{
						selection= model;
						model.dom.text("X");
						model.value="X";
						groupeSelection=groupeModel;
					} else 
					{
					selection = undefined;				
					}
				});
			}
		var inputGroupe=function (model) 
			{
				if (!model.value) {
					model.value ="";
					}
				model.dom.val(model.value); 
				model.dom.focusout(function () 
				{
					model.value = model.dom.val();
				});
		 	}	

		var cacherAfficher=function  (model) 
				{
					var md=model;
					if (!model.value) {
					model.value="Cacher";
					model.estCacher = false;} else {
					if (md.estCacher) 
						{
							md.dom.parent().find("#personnes").hide();
							md.dom.text("Afficher");
						} else 
						{
							md.dom.parent().find("#personnes").show();
							md.dom.text("Cacher");	
						}	
						}
					
					model.dom.click(function ()
					{
						if (md.estCacher) 
						{
							md.dom.parent().find("#personnes").show();
							md.dom.text("Cacher");
						} else 
						{
							md.dom.parent().find("#personnes").hide();
							md.dom.text("Afficher");	
						}
						md.estCacher = !md.estCacher;
				
					});	
				}
				

		

groupeModel.holder.groupe=$$(inputGroupe);
groupeModel.holder.cacherAfficher=$$(cacherAfficher);
groupeModel.holder.personnes = [] ;
groupeModel.holder.selectionner = $$(selectionner);
groupes.push(groupeModel);
$$.render("#ihm");		
});	
}

function ajouterPersonne(nom,prenom) {
	var g= groupeSelection;
	if (!g) {
		return;
		}
	var personnes = g.holder.personnes;
personnes.push({tr:{nom:nom,prenom:prenom,supprimer:{ action:$$(supprimer(g,nom,prenom))}}});

	}
	


	
function ajouter(model) {
model.value = "Ajouter personne";
model.dom.click(function () {
	if (nom!= undefined && prenom != undefined) {
 ajouterPersonne(nom,prenom);
$$.render("#ihm");	
}});
	}
	
function supprimer(g,nom,prenom) {
	var groupeModel = g;
	return function ( model ) 
	{
		model.value="Supprimer";	
		model.dom.click(function () 
		{
			var newListePersonnes = [];
			$.each(groupeModel.holder.personnes,function (i,val) 
				{
					if (!(val.tr.nom === nom && val.tr.prenom === prenom)) 
					{
						newListePersonnes.push(val);
					}
							
				});
			groupeModel.holder.personnes= newListePersonnes;
			$$.render("#ihm");		
		});
		
	};
	
}
$(document).ready(function(){


$$.create("#ihm",{
		groupes:groupes,
			
		choixNom:$$(changeNom),
		choixPrenom:$$(changePrenom),
		ajoutPersonne:$$(ajouter),
		ajoutGroupe:$$(ajouterGroupe)
				
				});
$$.render("#ihm");			
	



});
