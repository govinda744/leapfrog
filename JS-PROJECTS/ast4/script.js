function getRandomNumber(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) ) + min;
}

function Pedestrian(height, width ,parentClass) {
    this.height = height;
    this.width = width;

    this.intervalId;

    this.pedestrialElement;

    this.genrateInLane = getRandomNumber(1, 4);

    this.top = 0;
    this.left = this.genrateInLane === 1 ? parentClass.racerClass.MIN_LEFT : ((this.genrateInLane - 1) * parentClass.racerClass.offSetValue) + parentClass.racerClass.MIN_LEFT;

    this.init = function() {
        this.pedestrianElement = document.createElement('div');

        this.pedestrianElement.style.height = this.height+'px';
        this.pedestrianElement.style.width = this.width+'px';

        this.pedestrianElement.style.backgroundImage = 'url(./images/car'+getRandomNumber(1, 4)+'.png)';
        this.pedestrianElement.style.backgroundRepeat = 'no-repeat';
        this.pedestrianElement.style.backgroundSize = '100% 100%';

        this.pedestrianElement.style.position = 'absolute';
        this.pedestrianElement.style.top = this.top+'px';
        this.pedestrianElement.style.left = this.left+'px';

        this.move();

        return this.pedestrianElement;
    }

    this.detectCollisionY = function() {
        if (this.top >= parentClass.height) {
            return true;
        } else {
            return false;
        }
    }

    this.move = function() {
        this.intervalId = setInterval(function() {
            this.top += parentClass.backgroundClass.dx;
            if (this.detectCollisionY()) {
                parentClass.gameElement.removeChild(this.pedestrianElement);
                parentClass.removePedestrian(this.pedestrianElement);
                clearInterval(this.intervalId);
            }
            this.draw();
        }.bind(this), parentClass.backgroundClass.increaseInInterval);
    }

    this.draw = function() {
        this.pedestrianElement.style.top = this.top+'px';
    }
    
}

function Racer(height, width, parentClass) {
    this.height = height;
    this.width = width;

    this.MIN_LEFT = 25;

    this.top = (parentClass.height - this.height);
    this.left = this.MIN_LEFT;

    this.offSetValue = 170;

    this.racerElement;

    this.init = function() {
        this.racerElement = document.createElement('div');

        this.racerElement.style.height = this.height+'px';
        this.racerElement.style.width = this.width+'px';

        this.racerElement.style.backgroundImage = 'url(./images/car-run.png)';
        this.racerElement.style.backgroundRepeat = 'no-repeat';
        this.racerElement.style.backgroundSize = '100% 100%';

        this.racerElement.style.position = 'absolute';
        this.racerElement.style.top = this.top+'px';
        this.racerElement.style.left = this.left+'px';

        return this.racerElement;
    }

    this.detectCollisionX = function() {
        if (this.left <= 0 || this.left >= parentClass.width - this.width) {
            return true;
        } else {
            return false;
        }
    }

    this.moveRight = function() {
        this.left += this.offSetValue;
        if (this.detectCollisionX()) {
            this.left -= this.offSetValue;
        } else {
            this.draw();
        }
    }

    this.moveLeft = function() {
        this.left -= this.offSetValue;
        if(this.detectCollisionX()) {
            this.left += this.offSetValue;
        } else {
            this.draw();
        }
    }

    this.draw = function() {
        this.racerElement.style.left = this.left+'px';
    }
}

function GameBackground(height, width, scaleFactor, parentClass) {
    this.height = scaleFactor *  height;
    this.width = width;

    this.intervalId;

    this.scaleFactor = scaleFactor;

    this.MAX_VELOCITY = 10;
    this.increaseRate = 0.0009;

    this.top = - (this.scaleFactor - 1) * parentClass.height;

    this.dx = 1;

    this.increaseInInterval = 10;

    this.gameBackgroundElement;

    this.init = function() {
        this.gameBackgroundElement = document.createElement('div');

        this.gameBackgroundElement.style.width = this.width+'px';
        this.gameBackgroundElement.style.height = this.height+'px';

        this.gameBackgroundElement.style.position = 'absolute';

        this.gameBackgroundElement.style.backgroundImage = 'url(./images/lane.png)';
        this.gameBackgroundElement.style.backgroundPosition = 'top -left';
        this.gameBackgroundElement.style.backgroundRepeat = 'repeat-y';
        this.gameBackgroundElement.style.backgroundSize = '100%';

        this.gameBackgroundElement.style.top = this.top+'px';

        this.move();
        return this.gameBackgroundElement;
    }

    this.move = function() {
        this.intervalId = setInterval(function() {
            this.dx = this.dx >= this.MAX_VELOCITY ? this.MAX_VELOCITY : this.dx;
            this.top += this.dx;
            this.dx += this.increaseRate;
            this.top = this.top >= 0 ? - (this.scaleFactor - 1) * parentClass.height : this.top;
            this.draw();
        }.bind(this),this.increaseInInterval);
    }

    this.draw = function() {
        this.gameBackgroundElement.style.top = this.top+'px';
    }

}

function Game(width, height) {

    var that = this;

    this.carHeight = 180;
    this.carWidth = 90;

    this.width = width;
    this.height = height;

    this.pedestrians = [];
    this.pedestriansGeneratingIntervalId;
    this.pedestriansGeneratingDelay = 1000;

    this.backgroundScale = 10;

    this.gameElement;

    this.backgroundClass;
    this.racerClass;

    this.initGame = function() {
        this.gameElement = document.createElement('div');

        this.gameElement.style.height = this.height+'px';
        this.gameElement.style.width = this.width+'px';
        this.gameElement.style.position = 'relative';
        this.gameElement.style.margin = '10px auto';
        this.gameElement.style.overflow = 'hidden';

        this.initBackground();
        this.initRacer();
        this.initInputsRead();
        this.initPedestrains();

        return this.gameElement;
    }

    this.initBackground = function() {
        this.backgroundClass = new GameBackground(this.height, this.width, this.backgroundScale, this);
        this.gameElement.appendChild(this.backgroundClass.init());
    }

    this.initRacer = function() {
        this.racerClass = new Racer(this.carHeight, this.carWidth, this);
        this.gameElement.appendChild(this.racerClass.init());
    }

    this.initPedestrains = function() {
        this.pedestriansGeneratingIntervalId = setInterval(function() {
            var pedestrian = new Pedestrian(this.carHeight, this.carWidth ,this);
            this.pedestrians.push(pedestrian);
            this.gameElement.appendChild(pedestrian.init());
        }.bind(this),this.pedestriansGeneratingDelay);
    }

    this.removePedestrian = function(pedestrianElement) {
        this.pedestrians = this.pedestrians.filter(function(pedestrian) {
            return pedestrian.pedestrianElement != pedestrianElement;
        });
    }

    this.initInputsRead = function() {
        document.addEventListener('keyup',function(event) {
            if (event.code === 'ArrowRight') {
                that.racerClass.moveRight();
            } else if (event.code === 'ArrowLeft') {
                that.racerClass.moveLeft();
            }
        });
    }
}

window.onload = function() {
    var app = this.document.getElementsByClassName('app');

    app.item(0).style.overflow = 'auto';
    app.item(0).style.border = '5px solid green';

    app.item(0).appendChild(new Game(500, 1200).initGame());

}