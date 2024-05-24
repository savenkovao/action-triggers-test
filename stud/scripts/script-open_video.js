"use strict";
var body = document.getElementsByTagName('body')[0];
var currentWrapperWidth = window.innerWidth;
var currentWrapperHeight = window.innerHeight;
var video = document.querySelectorAll('.content-section-container');
var videoBlock;
var videoOpenContainer;
var iFrame;
var videoResponsiveContainer;

for(var i = 0; i<video.length;i++){
	video[i].setAttribute("onclick", "createVideoBlock(" + i + ")");
}

function createVideoBlock(i) {
	body.style.position = 'relative';
	videoBlock = document.createElement('div');
	videoBlock.classList.add("videoBlock");
	videoOpenContainer = document.createElement('div');			
	videoOpenContainer.classList.add("videoContainer");
	videoResponsiveContainer = document.createElement('div');			
	videoResponsiveContainer.classList.add("video-responsive");
	
	var source = video[i].getAttribute("src");

	iFrame = document.createElement('iframe');
	iFrame.setAttribute("frameborder","0");
	iFrame.setAttribute("src", source);
	iFrame.setAttribute("allowfullscreen","");
	iFrame.setAttribute("width","607");	
	iFrame.setAttribute("height","360");
	iFrame.classList.add("video-item");
	iFrame.setAttribute("seamless","");	

	var btnClose = document.createElement('div');
	btnClose.classList.add("btnClose");

	var closePic = document.createElement('div');		
	closePic.classList.add("closePic");
	btnClose.appendChild(closePic);

	btnClose.onclick = function (){
		videoBlock.remove();
	}
	
	videoResponsiveContainer.appendChild(iFrame);
	videoOpenContainer.appendChild(videoResponsiveContainer);	
	videoBlock.appendChild(videoOpenContainer);
	videoBlock.appendChild(btnClose);
	body.appendChild(videoBlock);
	setMargin();

	function setMargin(){
		currentWrapperHeight = window.innerHeight;	
		videoOpenContainer.style.paddingTop = ((currentWrapperHeight - iFrame.clientHeight)/2+'px');
	}

	window.addEventListener("resize", resizeFunction);
		
	function resizeFunction (){
		setMargin();
	}
}

