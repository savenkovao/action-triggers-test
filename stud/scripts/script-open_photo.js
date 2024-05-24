"use strict";

var photoBlock;
var createPhotoBlock;
var currentPhoto;
var imageOpenContainer;
var currentPhotoWidth;
var photosOnPagePrevious;
var photoNumber;
var btnRight;
var arrowRight;
var btnLeft;
var arrowLeft;
var btnClose;
var closePic;
var imageСontainer = document.querySelectorAll('.image_container');
var imageСontainerInner = document.querySelectorAll('.image_container_inner');
var currentWrapperWidth = window.innerWidth;
var currentWrapperHeight = window.innerHeight;
var body = document.getElementsByTagName('body')[0];
var btnOpenMoreLink;
var btnOpenMore;

setOclickEvent ();	

function setOclickEvent (){
	if (currentWrapperWidth > 768){
	    for(var i = 0;i<imageСontainer.length;i++){
	    	imageСontainer[i].setAttribute("onclick", "createPhotoBlock(" + i + ")");
	    }
	} else {
		for(var i = 0;i<imageСontainer.length;i++){
	    	imageСontainer[i].removeAttribute("onclick");
	   	}
	}
}

createPhotoBlock_1 ();

function createPhotoBlock_1 (){
	body.style.position = 'relative';
	photoBlock = document.createElement('div');
	photoBlock.classList.add("photoBlock");

	imageOpenContainer = document.createElement('div');			
	imageOpenContainer.classList.add("imageContainer");

	btnRight = document.createElement('div');
	btnRight.classList.add("btn_browse", "btnRight");

	arrowRight = document.createElement('div');
	arrowRight.classList.add("btn_arrow", "arrowRight");
	btnRight.appendChild(arrowRight);

	btnLeft = document.createElement('div');			
	btnLeft.classList.add("btn_browse", "btnLeft");
	
	arrowLeft = document.createElement('div');			
	arrowLeft.classList.add("btn_arrow", "arrowLeft");
	btnLeft.appendChild(arrowLeft);

	btnClose = document.createElement('div');
	btnClose.classList.add("btnClose");


	closePic = document.createElement('div');		
	closePic.classList.add("closePic");
	btnClose.appendChild(closePic);

	photoNumber = document.createElement('div');
	photoNumber.classList.add("photoNumber");

	if (imageСontainer.length>1){
		imageOpenContainer.appendChild(btnRight);
		imageOpenContainer.appendChild(btnLeft);
	}	

	imageOpenContainer.appendChild(btnClose);
	imageOpenContainer.appendChild(photoNumber);
	photoBlock.appendChild(imageOpenContainer);
	body.appendChild(photoBlock);
}


createPhotoBlock = function (e) {    	
	photoNumber.innerHTML = (e + 1) + ' / ' + imageСontainer.length;
	setNavigation(e);
	addPhBlImage (e);
	photoBlock.style.display = "block";
}


function addPhBlImage (e){
	currentPhoto = imageСontainerInner[e].cloneNode(true);	
	getImageSize (e);
	currentPhoto.classList.add("currentPhoto");
	imageOpenContainer.appendChild(currentPhoto);
}

function getImageSize (e){

	if((currentWrapperWidth/currentWrapperHeight)<(imageСontainerInner[e].offsetWidth/imageСontainerInner[e].offsetHeight)){					
		currentPhoto.classList.add("wide-image");
		currentPhotoWidth = currentWrapperWidth;
	} else {
		currentPhoto.classList.add("extended-image");
		currentPhotoWidth = (currentWrapperHeight*0.97) * (imageСontainerInner[e].offsetWidth/imageСontainerInner[e].offsetHeight);
	}
		
}

function setNavigation(e){
	btnRight.onclick = function(event){
		event.stopPropagation();
		currentPhoto.remove();				
		e++;
		if (e>imageСontainer.length-1){
			e = 0;
		}
		photoNumber.innerHTML = (e+1) + ' / ' + imageСontainer.length;
		addPhBlImage (e);
	}

	btnLeft.onclick = function(event){
		event.stopPropagation();
		currentPhoto.remove();				
		e--;
		if (e<0){
			e = imageСontainer.length-1;
		}
		photoNumber.innerHTML = (e+1) + ' / ' + imageСontainer.length;
		addPhBlImage (e);	
	}

	body.appendChild(photoBlock);
	
	btnClose.onclick = function (){
		currentPhoto.remove();
		photoBlock.style.display = "none";
	}

	photoBlock.onclick = function (){
		currentPhoto.style.zIndex = "-1";
	}
	photoBlock.oncontextmenu = function (){
		currentPhoto.style.zIndex = "1";
	}
}

window.addEventListener("resize", resizeFunction);
	
function resizeFunction (){
	currentWrapperWidth = window.innerWidth;
	currentWrapperHeight = window.innerHeight;
	setOclickEvent ();
	resizeHeightWidth();
};

function resizeHeightWidth(){
	if(currentPhoto != undefined){
		if((currentWrapperWidth/currentWrapperHeight)<(currentPhoto.offsetWidth/currentPhoto.offsetHeight)){					
			currentPhoto.classList.remove("extended-image");
			currentPhoto.classList.add("wide-image");
			currentPhotoWidth = currentWrapperWidth;
		} else {
			currentPhoto.classList.remove("wide-image");
			currentPhoto.classList.add("extended-image");
			currentPhotoWidth = (currentWrapperHeight*0.97) * (currentPhoto.offsetWidth/currentPhoto.offsetHeight);
		}
	}	
}

// window.onkeydown = function(event){
// 	alert(event.keyCode);
// }
