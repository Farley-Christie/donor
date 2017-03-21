// JavaScript Doc
(function(){
"use strict";
console.log("main.js is working");

// --------------------------------------------- Variables ---------------------------------------------

var headerNav= document.querySelector("#topNav"),
burger = document.querySelector("#burger"),
scrollBtns = document.querySelectorAll(".scrollNav"),
splash = document.querySelector("#splash");

var factNav = document.querySelectorAll(".factNav"),
fact = document.querySelectorAll(".fact");

var imgs = document.querySelectorAll(".imgholder"),
x = 0,
factnum = 0;

// --------------------------------------------- Functions ---------------------------------------------

function showMenu(){
	if(headerNav.style.display=="block"){
		headerNav.style.display="none";
	}else{
		headerNav.style.display="block";
	}
}
function newFact(e){
	if(e.target.id=="next"){
		TweenMax.to(fact[factnum],0.4, {opacity:0});
		fact[factnum].classList.add("hide");
		if(factnum < fact.length-1){
			factnum++;			
		} else {
			factnum = 0;
		}
		fact[factnum].classList.remove("hide");
		TweenMax.to(fact[factnum],0.4, {opacity:1});
	} else {
		TweenMax.to(fact[factnum],0.4, {opacity:0});
		fact[factnum].classList.add("hide");
		if(factnum < 1){
			factnum = fact.length-1;
		} else {
			factnum = factnum-1;
		}
		fact[factnum].classList.remove("hide");
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


function loadimg(){
	splash.style.height = (window.innerHeight)+"px";
	splash.style.paddingTop = ((window.innerHeight)/3)+"px";
	if (window.innerWidth > 1270){
		setTimeout(function(){
			imgs[x].style.opacity = 1;
			imgs[x].style.display = "block";
			x ++;
			if (x < imgs.length){
				loadimg();
			}
		}, 150)
	} else {
		setTimeout(function(){
			imgs[x].style.opacity = 1;
			imgs[x].style.display = "block";
			x ++;
			if (x < 6){
				loadimg();
			}
		}, 150)
	}
}

loadimg();

// --------------------------------------------- Listeners ---------------------------------------------

factNav[0].addEventListener("click",newFact,false);
factNav[1].addEventListener("click",newFact,false);
burger.addEventListener("click",showMenu,false);
for(var i = 0; i < scrollBtns.length; i++){
	scrollBtns[i].addEventListener("click",scroll,false);
}
})();