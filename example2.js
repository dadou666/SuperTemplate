function ihm(model) {
	if (!model.value) {
		model.value= {
			groupes:[],
			choixNom:$$(changeNom),
			choixPrenom:$$(changePrenom),
			ajoutPersonne:$$(ajoutPersonne),
			ajoutGroupe:$$(ajouterGroupe)
		};
	}
}
function  cacherAfficher(model){
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
function selectionner(model){
	if (!model.value) {
		model.value="O";	}
	model.dom.text(model.value);
	model.dom.click(function ()					{
		if (model.root.selection) 
		{
			model.root.selection.dom.text("O");
			model.root.selection.value="O";
			model.root.groupeSelection = undefined;		
		}
		if (model.root.selection !== model) 
		{
			model.root.selection= model;
			model.dom.text("X");
			model.value="X";
			model.root.groupeSelection=model.parent;

			
		} else 
		{
		model.root.selection = undefined;				
		}
	});
}
			
function inputGroupe(model){
		if (!model.value) {
			model.value ="";
			}
		model.dom.val(model.value); 
		model.dom.focusout(function () 
		{
			model.value = model.dom.val();
		});
 	}			
function changeNom(model) {
	model.value=[{valeur:"Dadou"},{valeur:"Nini"},{valeur:"Killer"}];
	model.dom.click(function () {
	model.root.nom = $("#choixNom option:selected").text(); });
}


function changePrenom(model) {
	model.value=[{valeur:"Zihm.odiac"},{valeur:"Patibular"},{valeur:"Zone"},{valeur:"Alcool"}];
	model.dom.click(function () {
	model.root.prenom = $("#choixPrenom option:selected").text();});
}	
function ajouterGroupe(model) 
{
	model.value = "Ajouter groupe";	
	model.dom.click( function () 
	{
		var groupeModel = {holder: {}};
		groupeModel.holder.groupe=$$(inputGroupe);
		groupeModel.holder.cacherAfficher=$$(cacherAfficher);
		groupeModel.holder.personnes = [] ;
		groupeModel.holder.selectionner = $$(selectionner);
		model.root.value.groupes.push(groupeModel);
		$$.render("#ihm");		
	});	
}

function ajouterPersonne(model,nom,prenom) {
	var g= model.root.groupeSelection;
	if (!g) {
		return;
		}
	var personnes = g.personnes;
personnes.push({tr:{nom:nom,prenom:prenom,supprimer:{ action:$$(supprimer(g,nom,prenom))}}});

	}
function ajoutPersonne(model) {
	model.value = "Ajouter personne";
	model.dom.click(function () {
		if (model.root.nom!= undefined && model.root.prenom != undefined) {
 			ajouterPersonne(model,model.root.nom,model.root.prenom);
			$$.render("#ihm");	
		}
	});
}
	
function supprimer(g,nom,prenom) {
	var groupeModel = g;
	return function ( model ) 
	{
		model.value="Supprimer";	
		model.dom.click(function () 
		{
			var newListePersonnes = [];
			$.each(groupeModel.personnes,function (i,val) 
				{
					if (!(val.tr.nom === nom && val.tr.prenom === prenom)) 
					{
						newListePersonnes.push(val);
					}
							
				});
			groupeModel.personnes= newListePersonnes;
			$$.render("#ihm");		
		});
		
	};
	
}
$(document).ready(function(){
$$.create("#ihm",$$(ihm));
$$.render("#ihm");			

});
