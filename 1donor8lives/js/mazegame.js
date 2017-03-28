//Variables
console.log("mazegame.js found and loaded");
var canvas = document.querySelector("#mazeCanvas");
var ctx = canvas.getContext("2d");
var x = 244; // x value of player character's position in the maze 
var y = 244; //y value of player character's position in the maze 
var movex = 5; //number of pixles the player moves horazontaly when they hit the up or down
var movey = 5; //number of pixles the player moves verticly when they hit the left or right
//making these variables lets you easily change the movment speed
var mazeWidth = 500;
var mazeHeight = 500;
var img = new Image();
var collision = 0; //ether 1 or 0, used to check if the player is trying to move into a wall

var timer = document.querySelector("#gameTime"),
score = document.querySelector("#gameScore"),
time = 120,
points = 0;

var gamecon = document.querySelector("#game"),
startScreen = document.querySelector("#gameStart"),
endScreen = document.querySelector("#gameEnd"),
start = document.querySelector("#startBtn");

var dpad = document.querySelectorAll(".dpad");
/*
var Aup = document.querySelector("#a_up"),
Adown = document.querySelector("#a_down"),
Aleft = document.querySelector("#a_left"),
Aright = document.querySelector("#a_right");
*/
//Functions
function init(){
	img.src = "images/maze.gif";
	return setInterval(draw, 10); //redraws the player charecter every 10 miliseconds
}

function gameStart(){
	startScreen.classList.add("hide");
	gamecon.classList.remove("hide");
	var interval = setInterval(updateTimer, 1000);
}

function drawRect(x,y,w,h){
	ctx.beginPath();//canvas function begins a new shape
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}

function clear(){
	ctx.clearRect(0,0,mazeWidth,mazeHeight);
	ctx.drawImage(img,0,0);
}

function move(e){
	key = e.keyCode;
	mover(key);
}

function noZoom(e) {
  	e.preventDefault();
  	e.target.click();
}

function dmove(e){
	if (e.target.id == "a_left"){
		key = 65;
	} else if (e.target.id == "a_up"){
		key = 87;
	} else if (e.target.id == "a_right"){
		key = 68;
	} else {
		key = 83;
	} 
	mover(key);
}

function mover(key){
	//console.log(e.keyCode);
	//console.log(key);
	switch(key){//finds whitch key was pressed, runs diferent block of code for each
		case 65: // left arrow
			if (x-movex>0){ //if this dosnt bring the player off the left side of the screen
				x -= movex; //change the position of the player by 5 pixles
				checkGet();
				clear();
				checkCollision();
				if (collision == 1){
					x += movex; //if the player hit a wall move them back to there previous position
					collision = 0; //reset the collision value to 0 so this dosn't trigger again next time through
				}
			}
			break;
		case 87: //up arrow
			if (y-movey>0){ //if this dosnt bring the player lower than the bottom of the maze
				y -= movey; //change the position of the player by 5 pixles
				checkGet();
				clear();
				checkCollision();
				if (collision == 1){
					y += movey; //if the player hit a wall move them back to there previous position
					collision = 0; //reset the collision valu to 0 so this dosn't trigger again next time through
				}
			}
			break;
		case 68: //right arrow
			if (x+movex<mazeWidth){//if this dosnt bring the player off the right side of the maze
				x += movex;
				checkGet();
				clear();
				checkCollision();
				if (collision == 1){
					x -= movex;
					collision = 0;
				}
			}
			break;
		case 83: //down arrow
			if (y+movey<mazeHeight){//if this dosnt bring the player higher than the top of the maze
				y += movey;
				checkGet();
				clear();
				checkCollision();
				if (collision == 1){
					y -= movey;
					collision = 0;
				}
			}
			break;
	}
}

function checkCollision(){
	var imgData = ctx.getImageData(x,y,10,10); //get info about the pixles surounding the player character in a 15 px grid
	var pix = imgData.data;
	for (var i=0; i<pix.length;i+=4){
		if (pix[i] == 0){ //checkes if the selected pixle is black by reading every 4th hex value
			collision = 1;
		}
	}
}

function checkGet(){
	if(x>265 && x<285 && y>290 && y<310 && points==0){
		points = 1;
	} else if (x>280 && x<300 && y>190 && y<210 && points==1){
		points = 2;
	} else if (x>195 && x<215 && y>150 && y<170 && points==2){
		points = 3;
	} else if (x>110 && x<130 && y>265 && y<285 && points==3){
		points = 4;
	} else if (x>140 && x<160 && y>410 && y<430 && points==4){
		points = 5;
	} else if (x>290 && x<310 && y>390 && y<410 && points==5){
		points = 6;
	} else if (x>390 && x<410 && y>360 && y<380 && points==6){
		points = 7;
	} else if (x>250 && x<270 && y>65 && y<85 && points==7){
		points = 8;
		gameOver();
	} 
	score.innerHTML = points;
}

function draw(){
	clear();
	ctx.fillStyle = "#FF0000";
	drawRect(x,y,10,10);
	ctx.fillStyle = "#333333";
	if (points == 0){
		drawRect(275, 300, 10, 10);
	} else if(points == 1){
		drawRect(290, 200, 10, 10);
	} else if(points == 2){
		drawRect(205, 160, 10, 10);
	} else if(points == 3){
		drawRect(120, 275, 10, 10);
	} else if(points == 4){
		drawRect(150, 420, 10, 10);
	} else if(points == 5){
		drawRect(300, 400, 10, 10);
	} else if(points == 6){
		drawRect(400, 370, 10, 10);
	}else if(points == 7){
		drawRect(260, 75, 10, 10);
	}
}

function updateTimer(){
	if (time > 0){
		timer.innerHTML = time;
		time = time-1;
	} else {
		gameOver();
	}
}

function gameOver(){
	if (gameOver){
		//console.log("gameOver");
		gamecon.classList.add("hide");
		endScreen.classList.remove("hide");
	}
}

init();
//Listeners
window.addEventListener("keydown",move,true);
start.addEventListener("click",gameStart,false);
for (var i = 0; i < dpad.length; i++) {
	dpad[i].addEventListener("touchstart", noZoom, false);
	dpad[i].addEventListener("click",dmove,false);
};
