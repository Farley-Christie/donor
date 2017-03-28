// JavaScript Doc
(function(){
"use strict";
console.log("main.js is working");

// --------------------------------------------- Variables ---------------------------------------------

var headerNav= document.querySelector("#topNav"),
burger = document.querySelector("#burger"),
burgIcon = document.querySelector("#burger img"),
reg = document.querySelector("#menulink"),
scrollBtns = document.querySelectorAll(".scrollNav"),
splash = document.querySelector("#splash");

var playBtn = document.querySelector("#vidStarter"),
video = document.querySelector("video");

var factNav = document.querySelectorAll(".factNav"),
factholder = document.querySelector("#factholder"),
//fact = document.querySelectorAll(".fact");
fact = [
	"<span class='hashred'>By registering consent for organ and tissue donation, you give hope to the thousands of Ontarians waiting for a transplant.</span> Individuals on the transplant wait list are suffering from organ failure and without the generous gift of life from an organ donor, they will die.Tissue donors can also enhance the lives of recovering burn victims, help restore sight, and allow people to walk again. Transplants not only save lives, they return recipients to productive lives","<span class='hashred'>place holder,</span> they will die. Tissue donors can also enhance the lives of recovering burn victims, help restore sight, and allow people to walk again. Transplants not only save lives, they return recipients to productive lives","<span class='hashred'>place holder 2 burn victims, help restore sight, and allow people to walk</span> Individuals on the transplant wait list are suffering from organ failure and without the generous gift of life from an organ donor, they will die. Tissue donors can also enhance the again. Transplants not only save lives, they return recipients to productive lives"
];

var imgs = document.querySelectorAll(".imgholder"),
x = 0,
factnum = 0;

// --------------------------------------------- Functions ---------------------------------------------

function showMenu(){
	if(headerNav.style.display=="block"){
		headerNav.style.display="none";
		reg.style.top="3.4em";
		burgIcon.src="images/burger.png";
	}else{
		headerNav.style.display="block";
		reg.style.top="12em";
		burgIcon.src="images/ex.png";
	}
}

function startVideo(){
	playBtn.classList.add("hide");
	video.classList.remove("hide");
	video.play();
}

function newFact(e){
	//console.log(fact[factnum]);
	if(e.target.id=="next"){
		//TweenMax.to(fact[factnum],0.4, {opacity:0});
		if(factnum < fact.length-1){
			factnum++;			
		} else {
			factnum = 0;
		}
		factholder.innerHTML=fact[factnum];
		//TweenMax.to(fact[factnum],0.4, {opacity:1});
	} else {
		TweenMax.to(fact[factnum],0.4, {opacity:0});
		
		if(factnum < 1){
			factnum = fact.length-1;
		} else {
			factnum = factnum-1;
		}
		factholder.innerHTML=fact[factnum];
		TweenMax.to(fact[factnum],0.4, {opacity:1});
	}
}

function scroll(e){
	if(e.target.innerHTML == "Gallery") {
		TweenMax.to(window, 1, {scrollTo:{y:"#gallery", offsetY:40}});
	}else if (e.target.innerHTML == "Video") {
		TweenMax.to(window, 1, {scrollTo:{y:"#videozone", offsetY:35}});
	}else if (e.target.innerHTML == "Game") {
		TweenMax.to(window, 1, {scrollTo:{y:"#gamecon", offsetY:50}});
	}else if (e.target.innerHTML == "Facts") {
		TweenMax.to(window, 1, {scrollTo:{y:"#facts", offsetY:55}});
	}else{
		TweenMax.to(window, 1, {scrollTo:{y:"#social", offsetY:50}});
	}
}

function fade(e){
	e.target.style.opacity="0.8";
}
function unfade(e){
	e.target.style.opacity="1";
}

function init(){
	splash.style.height = (window.innerHeight)+"px";
	splash.style.paddingTop = ((window.innerHeight)/3)+"px";
	factholder.innerHTML=fact[factnum];
	if (window.innerWidth > 1270){
		setTimeout(function(){
			imgs[x].style.display = "block";
			imgs[x].style.opacity = 1;
			x ++;
			if (x < imgs.length){
				init();
			}
		}, 150)
	} else {
		setTimeout(function(){
			imgs[x+14].style.opacity = 1;
			imgs[x+14].style.display = "block";
			x ++;
			if (x+14 < 20){
				init();
			}
		}, 150)
	}
}

init();

// --------------------------------------------- Listeners ---------------------------------------------

factNav[0].addEventListener("click",newFact,false);
factNav[1].addEventListener("click",newFact,false);
burger.addEventListener("click",showMenu,false);
for(var i = 0; i < scrollBtns.length; i++){
	scrollBtns[i].addEventListener("click",scroll,false);
}
playBtn.addEventListener("click",startVideo,false);
for (var i = 0; i < imgs.length; i++) {
	imgs[i].addEventListener("mouseenter",fade,false);
	imgs[i].addEventListener("mouseleave",unfade,false);
};
})();