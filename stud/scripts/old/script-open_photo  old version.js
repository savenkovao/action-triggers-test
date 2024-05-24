"use strict";

var photoLink = document.querySelectorAll('.image_container');
var photoInLink = document.querySelectorAll('.image_container_inner');
var body = document.getElementsByTagName('body')[0];
var photoBlock;
var createPhotoBlock;
var currentPhoto;
var imageContainer;
var currentWrapperWidth = window.innerWidth;
var currentWrapperHeight = window.innerHeight;
var currentPhotoWidth;
var len;
var btnOpenMore = document.querySelectorAll('.btn_open_more-link')[0];
var photoStep = 20;
var photosOnPage;

setOffPhotos();
	
function setOffPhotos(){
	if(photoLink.length>photoStep){
		btnOpenMore.style.display = "block";
		photosOnPage = photoStep;		
		for (var i = photosOnPage; i < photoLink.length; i++) {
			photoLink[i].style.display = 'none';			
		} 
	} else {
		photosOnPage = photoLink.length;		
	}	
	openPhoto ();			
}

btnOpenMore.onclick = function(){		
	if(photosOnPage<photoLink.length){
		photosOnPage+=photoStep;
		if (photosOnPage>=photoLink.length) {
			photosOnPage=photoLink.length;
			btnOpenMore.style.display = "none";
		}
	}
		
	for (var i = 0; i < photosOnPage; i++) {
		photoLink[i].style.display = 'block';
	}	

	for (var i = photosOnPage; i < photoLink.length; i++) {
		photoLink[i].style.display = 'none';
	}
	openPhoto ();
}


function openPhoto () {

	if (currentWrapperWidth > 768){
		len = photoLink.length;
		var i = 0;
	    for (;photoLink[i].setAttribute("onclick", "createPhotoBlock(" + i + ")"), ++i < len;);

	    createPhotoBlock = function (e) {	    	
			body.style.position = 'relative';
			photoBlock = document.createElement('div');
			photoBlock.classList.add("photoBlock");

			imageContainer = document.createElement('div');			
			imageContainer.classList.add("imageContainer");
		
			var btnRight = document.createElement('div');
			btnRight.classList.add("btn_browse", "btnRight");

			var arrowRight = document.createElement('div');
			arrowRight.classList.add("btn_arrow", "arrowRight");
			btnRight.appendChild(arrowRight);

			var btnLeft = document.createElement('div');			
			btnLeft.classList.add("btn_browse", "btnLeft");
			
			var arrowLeft = document.createElement('div');			
			arrowLeft.classList.add("btn_arrow", "arrowLeft");
			btnLeft.appendChild(arrowLeft);

			var btnClose = document.createElement('div');
			btnClose.classList.add("btnClose");


			var closePic = document.createElement('div');		
			closePic.classList.add("closePic");
			btnClose.appendChild(closePic);

			var photoNumber = document.createElement('div');
			photoNumber.classList.add("photoNumber");
			photoNumber.innerHTML = e+1 + ' / ' + photosOnPage;

			addImage ();

			function addImage (){
				currentPhoto = photoInLink[e].cloneNode(true);		
				getImageSize ();
				currentPhoto.classList.add("currentPhoto");
				imageContainer.appendChild(currentPhoto);
			}

			function getImageSize (){
				if((currentWrapperWidth/currentWrapperHeight)<(photoInLink[e].offsetWidth/photoInLink[e].offsetHeight)){
					currentPhoto.classList.add("wide-image");
					currentPhotoWidth = currentWrapperWidth;
				} else {
					currentPhoto.classList.add("extended-image");
					currentPhotoWidth = (currentWrapperHeight*0.97) * photoInLink[e].offsetWidth/photoInLink[e].offsetHeight;
				}	
			}
			
			if (len>1){
				imageContainer.appendChild(btnRight);
				imageContainer.appendChild(btnLeft);
			}
			
			imageContainer.appendChild(btnClose);
			imageContainer.appendChild(photoNumber);
			photoBlock.appendChild(imageContainer);

			btnRight.onclick = function(event){
				event.stopPropagation();
				currentPhoto.remove();				
				e++;
				if (e>photosOnPage-1){
					e = 0;
				}
				photoNumber.innerHTML = e+1 + ' / ' + photosOnPage;
				addImage ();
			}

			btnLeft.onclick = function(event){
				event.stopPropagation();
				currentPhoto.remove();				
				e--;
				if (e<0){
					e = photosOnPage-1;
				}
				photoNumber.innerHTML = e+1 + ' / ' + photosOnPage;
				addImage ();	
			}

			body.appendChild(photoBlock);
			
			btnClose.onclick = function (){
				photoBlock.remove();
			}
	    };	
	}
};

window.addEventListener("resize", resizeFunction);
	
function resizeFunction (){
	currentWrapperWidth = window.innerWidth;
	currentWrapperHeight = window.innerHeight;

	if (currentWrapperWidth < 768) {
		for(var i = 0; i<photosOnPage; i++){
	    	photoLink[i].removeAttribute("onclick");
	   	}
	}
	openPhoto ();
};






	
