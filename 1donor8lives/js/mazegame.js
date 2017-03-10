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

//Functions
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

function init(){
	img.src = "images/maze.gif"
	return setInterval(draw, 10); //redraws the player charecter every 10 miliseconds
}

function move(e){
	console.log(e.keyCode);
	console.log(collision);
	switch(e.keyCode){//finds whitch key was pressed, runs diferent block of code for each
		case 37: // left arrow
			if (x-movex>0){ //if this dosnt bring the player off the left side of the screen
				x -= movex; //change the position of the player by 5 pixles
				clear();
				checkCollision();
				if (collision == 1){
					x += movex; //if the player hit a wall move them back to there previous position
					collision = 0; //reset the collision value to 0 so this dosn't trigger again next time through
				}
			}
			break;
		case 38: //up arrow
			if (y-movey>0){ //if this dosnt bring the player lower than the bottom of the maze
				y -= movey; //change the position of the player by 5 pixles
				clear();
				checkCollision();
				if (collision == 1){
					y += movey; //if the player hit a wall move them back to there previous position
					collision = 0; //reset the collision valu to 0 so this dosn't trigger again next time through
				}
			}
			break;
		case 39: //right arrow
			if (x+movex<mazeWidth){//if this dosnt bring the player off the right side of the maze
				x += movex;
				clear();
				checkCollision();
				if (collision == 1){
					x -= movex;
					collision = 0;
				}
			}
			break;
		case 40: //down arrow
			if (y+movey<mazeHeight){//if this dosnt bring the player higher than the top of the maze
				y += movey;
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
	var imgData = ctx.getImageData(x,y,15,15); //get info about the pixles surounding the player character in a 15 px grid
	var pix = imgData.data;
	for (var i=0; i<pix.length;i+=4){
		if (pix[i] == 0){ //checkes if the selected pixle is black by reading every 4th hex value
			collision = 1;
		}
	}
}

function draw(){
	clear();
	ctx.fillStyle = "#FF0000";
	drawRect(x,y,15,15);
}

init();
//Listeners
window.addEventListener('keydown',move,true);