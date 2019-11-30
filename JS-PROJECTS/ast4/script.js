function Racer(height, width, parentClass) {
    this.height = height;
    this.width = width;

    this.racerElement;

    this.init = function() {
        this.racerElement = document.createElement('div');

        this.racerElement.style.height = this.height+'px';
        this.racerElement.style.width = this.width+'px';

        this.racerElement.style.margin = '0px 70px';

        this.racerElement.style.background = 'red';

        this.racerElement.style.position = 'absolute';

        return this.racerElement;
    }
}

function GameBackground(height, width, parentClass) {
    this.height = height;
    this.width = width;

    this.MAX_VELOCITY = 10;

    this.top = -parentClass.height;

    this.dx = 1;

    this.increaseInterval = 10;

    this.gameBackgroundElement;

    this.init = function() {
        this.gameBackgroundElement = document.createElement('div');

        this.gameBackgroundElement.style.width = this.width+'px';
        this.gameBackgroundElement.style.height = this.height+'px';

        this.gameBackgroundElement.style.position = 'absolute';

        this.gameBackgroundElement.style.backgroundImage = 'url(./images/lane.png)';
        this.gameBackgroundElement.style.backgroundRepeat = 'no-repeat';
        this.gameBackgroundElement.style.backgroundSize = '100% 100%';

        this.gameBackgroundElement.style.top = this.top+'px';

        this.move();
        return this.gameBackgroundElement;
    }

    this.move = function() {
        setInterval(function() {
            this.dx = this.dx >= this.MAX_VELOCITY ? this.MAX_VELOCITY : this.dx;
            this.top += this.dx;
            this.dx += 0.001;
            this.top = this.top >= 0 ? - parentClass.height : this.top;
            this.draw();
        }.bind(this),this.increaseInterval);
    }

    this.draw = function() {
        this.gameBackgroundElement.style.top = this.top+'px';
    }

}

function Game(width, height) {
    this.width = width;
    this.height = height;

    this.gameElement;

    this.backgroundClass;

    this.initGame = function() {
        this.gameElement = document.createElement('div');

        this.gameElement.style.height = this.height+'px';
        this.gameElement.style.width = this.width+'px';
        this.gameElement.style.position = 'relative';
        this.gameElement.style.background = 'blue';
        this.gameElement.style.margin = '50px auto';
        this.gameElement.style.overflow = 'hidden';

        this.initBackground();
        this.initRacer();

        return this.gameElement;
    }

    this.initBackground = function() {
        this.backgroundClass = new GameBackground(2 * this.height, this.width, this);
        this.gameElement.appendChild(this.backgroundClass.init());
    }

    this.initRacer = function() {
        this.gameElement.appendChild(new Racer(465, 182, this).init());
    }
}

window.onload = function() {
    var app = this.document.getElementsByClassName('app');

    app.item(0).style.overflow = 'auto';

    app.item(0).appendChild(new Game(900, 900).initGame());

}