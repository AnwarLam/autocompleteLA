
/**
*@title : plugin d'autoCompletion: autoCompleteLA
*@author : Lemkarane Anouar
*
* @params : (string) cibleId id de l input cible 
* @params : (array) liste tableau javascript de string
*/



/**
*fonction à lancer 	contient les listener et la gestion des evenement
* @params : (string) cibleId id de l input cible 
* @params : (array) liste tableau javascript de string
*/
function autoCompletion(cibleId,liste)
{
	var styleCss ='.AutoCompleteDivListeStyle{font-size: 13px; font-family: arial,sans-serif; word-wrap:break-word;visibility: visible;z-index:999;position:absolute;border:1px solid #000000;}';
	styleCss = styleCss+'.AutoCompleteDiv{ padding-left: 3px; padding-right: 3px; height: 16px; overflow: hidden; background-color: white;}';
	styleCss = styleCss+'.AutoCompleteDivAct{background-color: #c0392b !important; color: white ! important; }';
	styleCss = '<style>'+styleCss+'</style>';
	
	$('body').prepend(styleCss);
	var touche = 0;
    $('#'+cibleId).keyup(function(e){
    	 touche = e.keyCode || e.which;
    	if (touche == 40 || touche == 38 ){
    		
    		walkInListe(touche , cibleId);
    	}else if(touche == 13 || touche == 9){
    		
    		enterActiveValListe(cibleId);
    		
    	}else{
    		generateDivOptions(cibleId,liste);
    	}
    });
     $('#'+cibleId).keydown(function(e){
    	 touche = e.keyCode || e.which;
    	 if(touche == 9)
    	 {
     		enterActiveValListe(cibleId);
    	}
    });
	
    $(document).on({
	    mouseenter: function() {
	        $('.AutoCompleteDiv').removeClass('AutoCompleteDivAct');
	    	$(this).addClass('AutoCompleteDivAct');
	    },
	    mouseleave: function() {
	       $(this).removeClass('AutoCompleteDivAct');
	    }
	}, '.AutoCompleteDiv');


    $(document).on({
	    click: function() {
	        enterActiveValListe(cibleId);
	    },
	}, '.AutoCompleteDivAct');



    $('#'+cibleId).blur(function(){
    	//
    	if (!$("div#autoComplete_"+cibleId).focus() && !$('.AutoCompleteDiv').focus()) {
    		$("div#autoComplete_"+cibleId).remove();
    	};
    });

      $(document).mouseup(function (e){
		    var container = $("div#autoComplete_"+cibleId);
		    if (container.has(e.target).length === 0)
		        $("div#autoComplete_"+cibleId).remove();
		});
}




/**
*rentre la valeur seléctionner dans l'input
* @params : (string) cibleId id de l input cible 
*/


function enterActiveValListe(cibleId)
{
	
	var value = $('.AutoCompleteDivAct span').text();
	$('#'+cibleId).val(value);
	$("div#autoComplete_"+cibleId).remove();
}


/**
*function permettant de parcourir l'autoCompletion
* @params : (string) cibleId id de l input cible 
* @params : (array) liste tableau javascript de string
*/

function walkInListe(e,cibleId)
{	
	var debut = $('#'+cibleId).val();
	var nbListe = $('.AutoCompleteDiv').length;
	var indice = 0;
	if (!debut || !nbListe) {
		return;
	}
	
	if (!$('.AutoCompleteDivAct').length) 
	{
		if (e == 40) {
			$('.AutoCompleteDiv').eq(0).addClass('AutoCompleteDivAct');
		}else{
			$('.AutoCompleteDiv').eq(nbListe-1).addClass('AutoCompleteDivAct');
		}
	}
	else
	{
		indice = $('.AutoCompleteDivAct input').val();
		if (indice == nbListe-1 && e == 40) 
		{
			indice = -1;
		}
		if (indice < 1  && e == 38) 
		{
			indice = -2;
		}
		$('.AutoCompleteDiv').removeClass('AutoCompleteDivAct');
		if (e == 40) {
			indice = indice - (0 - 1);
		}
		else
		{
			indice = indice - 1;
		}
		$('.AutoCompleteDiv input[value='+indice+']').parent('.AutoCompleteDiv').addClass('AutoCompleteDivAct');
	}
}





/**
*function génerant la liste d'autocomplétion
* @params : (string) cibleId id de l input cible 
* @params : (array) liste tableau javascript de string
*/




function generateDivOptions(cibleId,liste)
{
	var MAX_RETURN = liste.length - 1;
    var i = 0;
    var reponse = '';
    var numAuto = 0;
    var debut = $('#'+cibleId).val();
    $("div#autoComplete_"+cibleId).remove();
    $("<div id='autoComplete_"+cibleId+"' class='AutoCompleteDivListeStyle'></div>").insertAfter('#'+cibleId);
    $("div#autoComplete_"+cibleId).css('width' , $('#'+cibleId).width() );
    $("div#autoComplete_"+cibleId).css('left' , $('#'+cibleId).position().left);
    $("div#autoComplete_"+cibleId).css('top' , $('#'+cibleId).position().top + $('#'+cibleId).outerHeight() );

    if (debut.length) 
    {	
    	liste = liste.sort();
	    for (var i = 0; liste.length - 1 >= i; i++) 
	    {
	    	if (i < MAX_RETURN && liste[i].substr(0, debut.length) == debut) 
	    	{
	            reponse +="<div class='AutoCompleteDiv'><input type='hidden' value='"+numAuto+"'><span>"+liste[i]+"</span></div>";    
	            numAuto = numAuto + 1;  
	        }
	    }
	}
	if (reponse) 
	{
		$("div#autoComplete_"+cibleId).html(reponse);
	}else
	{
		$("div#autoComplete_"+cibleId).remove();
	}
	
    return reponse;
}


