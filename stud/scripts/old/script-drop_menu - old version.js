"use strict";

//Dropdown menu (mobile)
var currentScreenWidth = document.documentElement.clientWidth;
var previousScreenWidth;
var menuItemExpand = document.querySelectorAll('.menu-item.expand');
var subMenu = document.querySelectorAll('.submenu');
var mobileMenu = document.querySelectorAll('.mobile-menu')[0];
var headerMenu = document.querySelectorAll('.header-menu')[0];
var headerLogo = document.querySelectorAll('.header-logo')[0];
var counter = [];
var mainCounter;
setSubmenuDisplay ();

function setSubmenuDisplay (){
	if(currentScreenWidth<768){
		for(var i = 0; i<menuItemExpand.length;i++){		
			// subMenu[i].style.display = "none";
		}
	}
}


mobileMenu.onclick = function (){
	

	mainCounter++;
	if (mainCounter%2 == 0){
		headerMenu.style.display = "none";
		headerLogo.style.Zindex = "11";
		headerLogo.style.backgroundColor= "rgba(255,255,255,0.9)";
		mobileMenu.style.backgroundImage = "url(images/design/burger-menu-icon.png)";

	} else {
		headerMenu.style.display = "block";
		headerLogo.style.zIndex = "13";
		headerLogo.style.backgroundColor= "transparent";
		mobileMenu.style.backgroundImage = "url(images/design/burger-menu-white.png)";
	}
}

enableDropMenu ();

function enableDropMenu (){
	if(currentScreenWidth<768){
		setOnClickEvent ();
		headerMenu.style.display = "none";
	} else {
		removeOnClickEvent();
		headerMenu.style.display = "flex";
	}
}

function setOnClickEvent (){	
	for(var i = 0; i<menuItemExpand.length;i++){
		menuItemExpand[i].setAttribute("onclick", "expandBlock(" + i + ")");
		counter[i]=0;
		mainCounter=0;		
		if(previousScreenWidth>768){
			subMenu[i].style.display = "none";
		} 
	}
}

function removeOnClickEvent(){
	for(var i = 0; i<menuItemExpand.length;i++){
		menuItemExpand[i].removeAttribute("onclick");
		subMenu[i].removeAttribute("style");
	}
}

function expandBlock (i){
	counter[i]++;
	if (counter[i]%2 == 0){
		subMenu[i].style.display = "none";
		// menuItemExpand[i].style.backgroundColor = "rgb(255,255,255)";
		// menuItemExpand[i].style.borderColor = "rgb(255,255,255)";
	} else {
		// menuItemExpand[i].style.backgroundColor = "rgba(22, 95, 67, 0.23)";
		// menuItemExpand[i].style.borderColor = "rgba(0, 0, 0,0.03)";
		subMenu[i].style.display = "block";
	}		
}

window.addEventListener("resize", resizeFunction);
	
function resizeFunction (){
	previousScreenWidth = currentScreenWidth;
	currentScreenWidth = document.documentElement.clientWidth;
	enableDropMenu ();

}

