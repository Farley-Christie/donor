// JavaScript Doc
(function(){
"use strict";
console.log("main.js is working");

// --------------------------------------------- Variables ---------------------------------------------

var headerNav= document.querySelector("#topNav"),
burger = document.querySelector("#burger"),
scrollBtns = document.querySelectorAll(".scrollNav");

var factNav = document.querySelectorAll(".factNav"),
fact = document.querySelector("#fact");

var imgs = document.querySelectorAll(".imgholder"),
x = 0;

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
		fact.style.opacity = 0;
		//next fact
		console.log("next");
		fact.style.opacity = 1;
	} else {
		fact.style.opacity = 0;
		//prev fact
		console.log("previous");
		fact.style.opacity = 1;
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
	setTimeout(function(){
		imgs[x].style.opacity = 1;
		x ++;
		if (x < imgs.length){
			loadimg();
		}
	}, 150)
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