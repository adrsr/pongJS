"use strict";

function Ball(_x, _y) {
	this.x = _x;
	this.y = _y;
	this.x_speed = 3;
	this.y_speed = 1;
	this.radius = BALL_RADIUS;
	
	this.render = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
		ctx.fillStyle = "#FFFFFF";
		ctx.fill();
	};
	
	this.update = function(leftPaddle, rightPaddle, deltaTime) {
		var speed = deltaTime * BALL_SPEED;
		
		var x_delta = this.x + (this.x_speed * speed);
		var y_delta = this.y + (this.y_speed * speed);
		
		var leftBB = x_delta - BALL_RADIUS;
		var rightBB = x_delta + BALL_RADIUS;
		var topBB = y_delta - BALL_RADIUS;
		var bottomBB = y_delta + BALL_RADIUS;
		
		// hit paddle
		if (leftBB < leftPaddle.x + leftPaddle.width && leftBB > leftPaddle.x
		&& y_delta <= leftPaddle.y + leftPaddle.height && y_delta >= leftPaddle.y) {
			// hit the left paddle
			this.x_speed = -this.x_speed;
			this.y_speed = this.getYSpeed(y_delta, leftPaddle.y); 
			x_delta = leftPaddle.x + leftPaddle.width + BALL_RADIUS;
		} else if (rightBB > rightPaddle.x && rightBB < rightPaddle.x + rightPaddle.width
		&& y_delta <= rightPaddle.y + rightPaddle.height && y_delta >= rightPaddle.y) {
			// hit the right paddle
			this.x_speed = -this.x_speed;
			this.y_speed = this.getYSpeed(y_delta, rightPaddle.y);
			x_delta = rightPaddle.x - BALL_RADIUS;
		}
		
		// hit wall
		if(topBB < WALL_SIZE) {
			// upper wall
			this.y_speed = -this.y_speed;
			y_delta = WALL_SIZE + BALL_RADIUS;
		} else if(bottomBB > WINDOWS_HEIGHT - WALL_SIZE) {
			this.y_speed = -this.y_speed;
			y_delta = WINDOWS_HEIGHT - WALL_SIZE - BALL_RADIUS;
		}
		
		// move the ball
		this.x = x_delta;
		this.y = y_delta;
	}
	
	this.isOutOfBound = function() {
		if(this.x < 0) {
			this.resetPosition();
			return -1;
		} else if(this.x > WINDOWS_WITDH) {
			this.resetPosition();
			return 1;
		}
		
		return 0;
	}
	
	this.resetPosition = function() {
		this.x = WINDOWS_WITDH / 2;
		this.y = WINDOWS_HEIGHT / 2;
		this.x_speed = 3;
		this.y_speed = 0;
	}
	
	this.getYSpeed = function (yBall, yPaddle) {
		if(yBall - yPaddle < PADDLE_HEIGHT / 6) {
			return -5;
		} else if(yBall - yPaddle < PADDLE_HEIGHT / 6 * 2) {
			return -3;
		} else if(yBall - yPaddle < PADDLE_HEIGHT / 6 * 3) {
			return -1;
		} else if(yBall - yPaddle < PADDLE_HEIGHT / 6 * 4) {
			return 1;
		} else if(yBall - yPaddle < PADDLE_HEIGHT / 6 * 5) {
			return 3;
		} else {
			return 5;
		}
	}
}
