var HEIGHT = 900;
var WIDTH = 900;

var MAX_DIRECTION = 4;

function getRandomNumber(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) ) + min;
}

function Ball(diameter, x, y) {

    this.x = x;
    this.y = y;

    this.diameter = diameter;

    this.ballElement = null;

    this.dx = 0;
    this.dy = 0;

    this.setDirections = function(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }

    this.reverseXDirection = function(){
        this.dx *= -1;
    }

    this.reverseYDirection = function(){
        this.dy *= -1;
    }

    this.checkWallCollisionX = function(){
        if(this.x +  this.diameter >= WIDTH || this.x <= 0){
            return true;
        }
        else{
            return false;
        }
    }

    this.checkWallCollisionY = function(){
        if(this.y + this.diameter >= HEIGHT || this.y <= 0){
            return true;
        }
        else{
            return false;
        }
    }

    this.changeBoxDirection = function(box){
        var change = this.dx;
        this.dx = box.dx;
        box.dx = change;

        change = this.dy;
        this.dy = box.dy;
        box.dy = change;

        this.move();
        box.move();
    }

    this.move = function(){
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        this.x = this.x >= WIDTH - this.ballDiameter? WIDTH - this.ballDiameter: this.x;
        this.y = this.y >= HEIGHT - this.ballDiameter? HEIGHT - this.ballDiameter: this.y;
        this.draw();
    }

    this.make = function() {
        this.ballElement = document.createElement('div');
        this.ballElement.style.width = this.diameter + 'px';
        this.ballElement.style.height = this.diameter + 'px';
        this.ballElement.style.backgroundColor = "#"+((1<<24)*Math.random()|0).toString(16);
        this.ballElement.style.borderRadius = '100%';
        this.ballElement.style.position = 'absolute';
        this.ballElement.onmouseover = function() {
            this.ballElement.style.cursor = 'pointer';
        }.bind(this);
        return this;
    }

    this.draw = function() {
        this.ballElement.style.left = this.x + 'px';
        this.ballElement.style.top = this.y + 'px';
    }
}

function Box(width, height, ballCount, ballDiameter) {
    this.MAX_HEIGHT = height - ballDiameter;
    this.MAX_WIDTH = width - ballDiameter;

    this.balls = [];

    this.ballCount = ballCount;

    this.boxElement = null;

    this.make = function() {
        this.boxElement = document.createElement('div');
        this.boxElement.style.position = 'relative';
        this.boxElement.style.width = width+'px';
        this.boxElement.style.height = height+'px';
        this.boxElement.style.backgroundColor = '#fff';
        this.boxElement.style.border = '1px solid red';
        this.boxElement.style.margin = '20px auto';
        this.createBalls();
        return this;
    }

    this.createBalls = function() {
        for (var i = 0; i < ballCount ; i++) {
            var collision = false;
            var x = getRandomNumber(0, this.MAX_HEIGHT);
            var y = getRandomNumber(0, this.MAX_WIDTH);
            var ball = new Ball(ballDiameter, x, y);
            for (var j = 0; j < this.balls.length; j++) {
                if(this.detectboxCollision(ball,this.balls[j])) {
                    i--;
                    collision = true;
                }
            }
            if (collision === true) continue;
            var dx = getRandomNumber(2, 3);
            var dy = getRandomNumber(2, 3);
            ball.setDirections(dx, dy);
            this.balls.push(ball.make());
            ball.draw();
            this.boxElement.appendChild(ball.ballElement);
        }
    }

    this.detectboxCollision = function(box1, box2){
        var sumOfRadius = (box1.diameter/2 + box2.diameter/2);
        var x1 = box1.x + (box1.diameter/2);
        var x2 = box2.x + (box2.diameter/2);
        var y1 = box1.y + (box1.diameter/2);
        var y2 = box2.y + (box2.diameter/2);

        var distance =  Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);

        if (distance <= (Math.pow(sumOfRadius,2))){
            return true;
        }
        else{
            return false;
        }
    }

    this.detectAllCollision = function(){
        for(var j = 0; j < (this.balls.length); j++){
            for(var k = 0; k < (this.balls.length); k++){
                if(j != k){
                    if(this.detectboxCollision(this.balls[j],this.balls[k])){
                        this.balls[j].changeBoxDirection(this.balls[k]);
                    }
                }
            }
        }
    }

    this.moveBoxes = function() {
        var that = this;
        
        var interval = setInterval(function(){
            for(var i = 0; i < that.ballCount; i++){
                if(that.balls[i].checkWallCollisionX()){
                    that.balls[i].reverseXDirection();
                }
                if(that.balls[i].checkWallCollisionY()){
                    that.balls[i].reverseYDirection();
                }
                that.balls[i].move();
            }
            that.detectAllCollision();
        },10)
    }

}

window.onload = function() {
    var app = this.document.getElementsByClassName('app');

    var box = new Box(900,900,20,30);
    box.moveBoxes();
    app.item(0).appendChild(box.make().boxElement);
    var box = new Box(900,900,50,30);
    box.moveBoxes();
    app.item(0).appendChild(box.make().boxElement);

    
}