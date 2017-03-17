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
time = 120;

var score = document.querySelector("#gameScore"),
points = 0;
//Functions
function init(){
	img.src = "images/maze.gif";
	return setInterval(draw, 10); //redraws the player charecter every 10 miliseconds
}

function gameStart(){
	time = 120;
	var myVar = setInterval(updateTimer, 1000);
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

function mover(key){
	//console.log(e.keyCode);
	//console.log(collision);
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
/*
function checkGet(){
	var imgData = ctx.getImageData(x,y,10,10); //get info about the pixles surounding the player character in a 15 px grid
	var pix = imgData.data;
	for (var i=0; i<pix.length;i+=4){
		console.log(pix[i]);
		if (pix[i] == 3){ //checkes if the selected pixle is gray by reading every 4th hex value
			points = points + 1;
			console.log("check confirm");
			score.innerHTML = points;
		}
	}
}
*/

function checkGet(){
	if(x>315 && x<335 && y>290 && y<310 && points==0){
		points = 1;
		score.innerHTML = points;
	} else if (x>140 && x<160 && y>190 && y<210 && points==1){
		points = 2;
		score.innerHTML = points;
	} else if (x>390 && x<410 && y>350 && y<370 && points==2){
		points = 3;
		score.innerHTML = points;
	} else if (x>190 && x<210 && y>420 && y<440 && points==3){
		points = 4;
		score.innerHTML = points;
	} else if (x>115 && x<135 && y>140 && y<160 && points==4){
		points = 5;
		score.innerHTML = points;
	} else if (x>290 && x<310 && y>170 && y<190 && points==5){
		points = 6;
		score.innerHTML = points;
	} else if (x>390 && x<410 && y>290 && y<310 && points==6){
		points = 7;
		score.innerHTML = points;
	} else if (x>275 && x<295 && y>110 && y<130 && points==7){
		points = 8;
		score.innerHTML = points;
		gameOver();
	} 


}
function draw(){
	clear();
	ctx.fillStyle = "#FF0000";
	drawRect(x,y,10,10);
	ctx.fillStyle = "#333333";
	if (points == 0){
		drawRect(325, 300, 10, 10);
	} else if(points == 1){
		drawRect(150, 200, 10, 10);
	} else if(points == 2){
		drawRect(400, 360, 10, 10);
	} else if(points == 3){
		drawRect(200, 430, 10, 10);
	} else if(points == 4){
		drawRect(125, 150, 10, 10);
	} else if(points == 5){
		drawRect(300, 180, 10, 10);
	} else if(points == 6){
		drawRect(400, 300, 10, 10);
	}else if(points == 7){
		drawRect(285, 120, 10, 10);
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
	}
}

init();
gameStart();
//Listeners
window.addEventListener('keydown',move,true);