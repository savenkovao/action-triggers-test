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
var imageСontainer = [];
var image_containerInner = [];
var imageСontainerbackground = [];
var imageMob = [];
var photoStep = 20;
var photosOnPage = 0;
var currentWrapperWidth = window.innerWidth;
var currentWrapperHeight = window.innerHeight;
var body = document.getElementsByTagName('body')[0];
var btnOpenMoreLink;
var btnOpenMore;
var sourceInformation = document.querySelectorAll('.source-information')[0];
var imageQuantity = +sourceInformation.getAttribute('name');
var source = sourceInformation.getAttribute('src');
var contentGallery = document.querySelectorAll('.content-gallery')[0];
var contentHeader =  document.querySelectorAll('.content-description-header')[0].innerHTML;
var btnMoreContainer =  document.querySelectorAll('.btn_more_container')[0];

createButtonOpenMore();
uploadImages();

function uploadImages(){
	if(imageQuantity<=photoStep){
		photosOnPagePrevious = photosOnPage;
		photosOnPage = imageQuantity;
		for(var i = photosOnPagePrevious+1; i<=photosOnPage;i++){
			addImage (i);
		}
	} else {
		btnOpenMoreLink.style.display = "block";	
		photosOnPagePrevious = photosOnPage;
		photosOnPage += photoStep;
		if(photosOnPage>=imageQuantity){
			photosOnPage = imageQuantity;
			btnOpenMore.style.display = "none";
		}
		for(var i = photosOnPagePrevious+1; i<=photosOnPage;i++){
			addImage (i);
		}
	}
}

function createButtonOpenMore(){
	btnOpenMoreLink = document.createElement('a');
	btnOpenMoreLink.className = "btn_open_more-link";
	btnOpenMore = document.createElement('div');
	btnOpenMore.className = "btn_open_more";
	btnOpenMore.innerHTML = "Открыть больше фотографий";
	btnOpenMoreLink.appendChild(btnOpenMore);
	btnMoreContainer.appendChild(btnOpenMoreLink);
}

function addImage (num){
	imageСontainer[num] = document.createElement('div');
	imageСontainer[num].className ="content-gallery-block image_container short";
	imageСontainer[num].style.position = "relative";

	imageСontainerbackground[num] = document.createElement('div');
	imageСontainerbackground[num].style.backgroundImage ="url("+source+num+".jpg)";
	imageСontainerbackground[num].className ="content-image image_container_inner desktop_img image_container-background";

	imageMob[num] = document.createElement('img');	
	imageMob[num].setAttribute("src", source+num+".jpg");
	imageMob[num].className= "content-image mobile_img";


	imageСontainer[num].appendChild(imageMob[num]);
	imageСontainer[num].appendChild(imageСontainerbackground[num]);
	contentGallery.appendChild(imageСontainer[num]);
}

setOclickEvent ();	

btnOpenMoreLink.onclick = function(){
	uploadImages();
	setOclickEvent ();
}


function setOclickEvent (){
	if (currentWrapperWidth > 768){
	    for(var i = photosOnPagePrevious+1;i<=photosOnPage;i++){
	    	imageСontainer[i].setAttribute("onclick", "createPhotoBlock(" + i + ")");
	    }
	} else {
		for(var i = photosOnPagePrevious+1;i<=photosOnPage;i++){
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

	if (imageQuantity>1){
		imageOpenContainer.appendChild(btnRight);
		imageOpenContainer.appendChild(btnLeft);
	}	

	imageOpenContainer.appendChild(btnClose);
	imageOpenContainer.appendChild(photoNumber);
	photoBlock.appendChild(imageOpenContainer);
	body.appendChild(photoBlock);
}


createPhotoBlock = function (e) {    	
	photoNumber.innerHTML = e + ' / ' + photosOnPage;
	setNavigation(e);
	addPhBlImage (e);
	photoBlock.style.display = "block";
}

function addPhBlImage (e){
	currentPhoto = document.createElement('img');	
	getImageSize (e);

	currentPhoto.setAttribute("src", source + e + ".jpg");
	currentPhoto.setAttribute("alt", contentHeader+ ' - фото_' + e);				
	currentPhoto.classList.add("currentPhoto");
	imageOpenContainer.appendChild(currentPhoto);
}

function getImageSize (e){
	var img = new Image();
	img.src = source + e + ".jpg";

	if((currentWrapperWidth/currentWrapperHeight)<(img.width/img.height)){					
		currentPhoto.classList.add("wide-image");
		currentPhotoWidth = currentWrapperWidth;
	} else {
		currentPhoto.classList.add("extended-image");
		currentPhotoWidth = (currentWrapperHeight*0.97) * (img.width/img.height);
	}
		
}

function setNavigation(e){
	btnRight.onclick = function(event){
		event.stopPropagation();
		currentPhoto.remove();				
		e++;
		if (e>photosOnPage){
			e = 1;
		}
		photoNumber.innerHTML = e + ' / ' + photosOnPage;
		addPhBlImage (e);
	}

	btnLeft.onclick = function(event){
		event.stopPropagation();
		currentPhoto.remove();				
		e--;
		if (e<1){
			e = photosOnPage;
		}
		photoNumber.innerHTML = e + ' / ' + photosOnPage;
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

	
