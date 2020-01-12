
/*
*	PONG in javascript 
*	v1.0.1 - 2015
*	Adrien Pasteur - https://github.com/adrsr
*/


"use strict";


function Pong() {
	var animate;
	var canvas;
	var ctx;
	
	var player;
	var computer;
	var ball;
	
	var keysDown;
	var lastTime;
	
	var playerScore, computerScore;

	this.run = function() {
		init();
		document.body.appendChild(canvas);
		animate(step);
	}
	
	function init() {
		// init canvas & requestAnimationFrame
		animate = window.requestAnimationFrame;
		
		canvas = document.createElement('canvas');
		canvas.width = WINDOWS_WITDH;
		canvas.height = WINDOWS_HEIGHT;
		ctx = canvas.getContext('2d');
		
		// init paddles and ball
		player = new Player(PADDLE_GAP, WINDOWS_HEIGHT/2-PADDLE_HEIGHT/2, PADDLE_WIDTH, PADDLE_HEIGHT);
		computer = new Computer(WINDOWS_WITDH-PADDLE_WIDTH-PADDLE_GAP, WINDOWS_HEIGHT/2-PADDLE_HEIGHT/2, PADDLE_WIDTH, PADDLE_HEIGHT);
		ball = new Ball(WINDOWS_WITDH/2, WINDOWS_HEIGHT/2);
		
		computerScore = 0;
		playerScore = 0;
		
		// init keyDownListener
		keysDown = {};
		window.addEventListener("keydown", function(event) {
			keysDown[event.keyCode] = true;
		});
		window.addEventListener("keyup", function(event) {
			delete keysDown[event.keyCode];
		});
	}

	function step() {
		if(lastTime == undefined)
			lastTime = performance.now();
		
		update();
		render();
		animate(step);
	};

	function update() {
		
		// delta = Math.min(delta, 0.25); // maximum delta of 250 ms
		
		var currentTime = performance.now();
		var deltaTime = currentTime - lastTime;
		lastTime = currentTime;
		
		player.update(keysDown, deltaTime);
		computer.update(ball, deltaTime);
		ball.update(player.paddle, computer.paddle, deltaTime);
		
		checkBallOutOfBound();
	};
	
	function checkBallOutOfBound() {
		var point = ball.isOutOfBound();
		
		if(point === -1) {
			computerScore++;
		} else if(point === 1) {
			playerScore++;
		}
	}

	function render() {
		// background
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, WINDOWS_WITDH, WINDOWS_HEIGHT);
		
		// middle
		ctx.fillStyle = "#33AA11";
		ctx.fillRect(WINDOWS_WITDH/2-2, 0, 4, WINDOWS_HEIGHT);
		
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.arc(WINDOWS_WITDH/2, WINDOWS_HEIGHT/2, 60, 2 * Math.PI, false);
		ctx.strokeStyle = "#33AA11";
		ctx.stroke();
		
		// wall
		ctx.fillStyle = "#33AA11";
		ctx.fillRect(0, 0, WINDOWS_WITDH, WALL_SIZE);
		ctx.fillRect(0, WINDOWS_HEIGHT-WALL_SIZE, WINDOWS_WITDH, WINDOWS_HEIGHT);
		
		// score
		var playerScoreText = playerScore.toString();
		ctx.font = "30pt Verdana";
		ctx.textAlign = "right";
		ctx.textBaseline = "top";
		ctx.fillStyle = "#33AA11"; 
		ctx.fillText(playerScoreText, WINDOWS_WITDH/2-20, 60);
		
		var computerScoreText = computerScore.toString();
		ctx.font = "30pt Verdana";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "#33AA11"; 
		ctx.fillText(computerScoreText, WINDOWS_WITDH/2+20, 60);
		
		// paddles and ball
		player.render(ctx);
		computer.render(ctx);
		ball.render(ctx);
	};
}

window.onload = function() {
	var pong = new Pong();
	pong.run();
};
