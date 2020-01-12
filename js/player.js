"use strict";

function Player(_x, _y, _width, _height) {
	this.paddle = new Paddle(_x, _y, _width, _height);
	
	this.render = function(ctx) {
		this.paddle.render(ctx);
	}
	
	this.update = function(keysDown, deltaTime) {
		var speed = deltaTime * PADDLE_SPEED_PLAYER;
		
		for(var key in keysDown) {
			var value = Number(key);
			
			if(value == 38) {
				this.paddle.move(0, -speed);
			} else if (value == 40) {
				this.paddle.move(0, speed);
			}
		}
	}
}
