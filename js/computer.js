"use strict";

function Computer(_x, _y, _width, _height) {
	this.paddle = new Paddle(_x, _y, _width, _height);
	
	this.render = function(ctx) {
		this.paddle.render(ctx);
	}
	
	this.update = function(ball, deltaTime) {
		var speed = deltaTime * PADDLE_SPEED_COMPUTER;
		
		if(ball.y < this.paddle.y + PADDLE_HEIGHT/5) {
			this.paddle.move(0, -speed);
		} else if (ball.y > this.paddle.y + PADDLE_HEIGHT - PADDLE_HEIGHT/5) {
			this.paddle.move(0, speed);
		}
	};
}
