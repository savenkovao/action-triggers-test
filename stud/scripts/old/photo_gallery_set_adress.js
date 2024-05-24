"use strict";

var imageQuantity = 196;
var contentGallery = document.querySelectorAll('.content-gallery')[0];
var imageСontainer = [];
var image_containerInner = [];

for(var i = 1; i<=imageQuantity;i++){
	imageСontainer[i] = document.createElement('div');
	imageСontainer[i].className ="content-gallery-block image_container short";
	image_containerInner[i] = document.createElement('img');
	image_containerInner[i].setAttribute("src", "../../images/content/events/first-stud-party/" + i + ".jpg");
	image_containerInner[i].className ="content-image image_container_inner";
	if(i>20){
		imageСontainer.style.display = 'none';
	}	
	imageСontainer[i].appendChild(image_containerInner[i]);
	contentGallery.appendChild(imageСontainer[i]);
}



