"use strict";

function Paddle(_x, _y, _width, _height) {
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	this.x_speed = 0;
	this.y_speed = 0;
	
	this.render = function(ctx) {
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	
	this.move = function(x, y) {
		this.y = this.y + y;
		
		if(this.y < WALL_SIZE) {
			this.y = WALL_SIZE;
		} else if(this.y + this.height > WINDOWS_HEIGHT - WALL_SIZE) {
			this.y = WINDOWS_HEIGHT - WALL_SIZE - this.height;
		}
	}
}
