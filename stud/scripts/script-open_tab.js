"use strict";

var tab = document.querySelectorAll('.tab');
var tabBlockInformation = document.querySelectorAll('.tab_block-information');
var counter = [];

setOnClickEvent ();

function setOnClickEvent (){
	for(var i = 0; i < tab.length;i++){
		tab[i].setAttribute("onclick","enableInformationBlock_("+i+")");
		tabBlockInformation[i].style.display = "none";
		counter[i] = 0;			
	}
}



function enableInformationBlock_(i){
	counter[i]++;
	if(counter[i]%2==0){
		tabBlockInformation[i].style.display = "none";
		tab[i].classList.remove("tab-chosen");		
	} else {
		tabBlockInformation[i].style.display = "block";
		tab[i].classList.add("tab-chosen");
		
	}
}

