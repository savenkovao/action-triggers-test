"use strict";

var contentSectionWrapper= document.querySelectorAll('.gallery_item');
var btnMoreContainer =  document.querySelectorAll('.btn_more_container')[0];
var galleryStep = 12;
var itemsOnPage = 0;
var itemsOnPagePrevious = 0;
var btnOpenMoreLink;
var btnOpenMore;

createButtonOpenMore();
setOnItems();

function setOnItems(){
	if(contentSectionWrapper.length>galleryStep){
		btnOpenMoreLink.style.display = "block";
		itemsOnPage += galleryStep;

		if(itemsOnPage>=contentSectionWrapper.length){
			itemsOnPage = contentSectionWrapper.length;
			btnOpenMore.style.display = "none";
		}
		for(var i = itemsOnPagePrevious; i<itemsOnPage;i++){
			contentSectionWrapper[i].style.display = "inline-block";
			itemsOnPagePrevious = itemsOnPage;
		}
		for(var i = itemsOnPage; i<contentSectionWrapper.length;i++){
			contentSectionWrapper[i].style.display = "none";
		}
	}
}

function createButtonOpenMore(){
	btnOpenMoreLink = document.createElement('a');
	btnOpenMoreLink.className = "btn_open_more-link";
	btnOpenMore = document.createElement('div');
	btnOpenMore.className = "btn_open_more";
	btnOpenMore.innerHTML = "Показать больше";
	btnOpenMoreLink.appendChild(btnOpenMore);
	btnMoreContainer.appendChild(btnOpenMoreLink);
}

btnOpenMoreLink.onclick = function(){
	setOnItems();
}






	
