// JavaScript Doc
(function(){
"use strict";
console.log("main.js is working");

// --------------------------------------------- Variables ---------------------------------------------

var headerNav= document.querySelector("#topNav"),
burger = document.querySelector("#burger");

var factNav = document.querySelectorAll(".factNav");

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
		//next fact
		console.log("next");
	} else {
		//prev fact
		console.log("previous");
	}
}

// --------------------------------------------- Listeners ---------------------------------------------

factNav[0].addEventListener("click",newFact,false);
factNav[1].addEventListener("click",newFact,false);
burger.addEventListener("click",showMenu,false);

})();