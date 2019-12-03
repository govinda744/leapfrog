function getRandomNumber(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) ) + min;
}

function GameContainer(height, width, parentElement) {
    this.height = height;
    this.width = width;

    this.gameBackgroundScale = 10;

    this.margin = 20;

    this.gameContainerElement;

    this.birdClass;

    this.pipes = [];
    this.pipeGapping; 
    this.birdHeight = 40;
    this.birdWidth = 40;

    this.pipeGenrationIntervalId;
    this.pipeGenrationIntervalTime = 2800;   //in milliseconds

    this.gameBackgroundClass;
    this.backgroundHeight = 60;
    
    this.SHOW_MIN_PIPE = 50;
    this.pipeWidth = 100;

    this.init = function() {
        this.gameContainerElement = document.createElement('div');

        this.gameContainerElement.id = 'game-controller';

        this.gameContainerElement.style.position = 'relative';

        this.gameContainerElement.style.height = this.height + 'px';
        this.gameContainerElement.style.width = this.width + 'px';

        this.gameContainerElement.style.backgroundImage = 'url(./images/bg.png)';
        this.gameContainerElement.style.backgroundRepeat = 'no-repeat';
        this.gameContainerElement.style.backgroundSize = '100% 100%';

        this.gameContainerElement.style.overflow = 'hidden';

        this.gameContainerElement.style.margin = this.margin + 'px';

        this.startGame();

        return this.gameContainerElement;
    }

    this.startGame = function() {
        this.initBird();
        this.initBackground();
        this.initInputs();
        this.initPipes();
    }

    this.gameOver = function() {
        clearInterval(this.gameBackgroundClass.moveIntervalId);
        clearInterval(this.pipeGenrationIntervalId);

    }

    this.initInputs = function() {
        document.addEventListener('keydown',this.readInputs);
    }

    this.readInputs = function(event) {
        if (event.code === 'ArrowUp') {
            console.log('space')
            this.birdClass.move();
        }
    }.bind(this);

    this.initBird = function() {
        this.birdClass = new Bird(40, 40, this);
        this.pipeGapping = this.birdClass.birdMoveOffset + 70;
        this.gameContainerElement.appendChild(this.birdClass.init());
    }

    this.removePipe = function(pipeElement) {
        this.pipes = this.pipes.filter(function(element) {
            return element.pipeElement !== pipeElement;
        });
        console.log(this.pipes.length);
    }

    this.initPipes = function() {
        this.pipeGenrationIntervalId = setInterval(function() {
            var flipImage = false;
            var min = this.height - this.gameBackgroundClass.height - this.SHOW_MIN_PIPE;
            var max = this.pipeGapping + this.SHOW_MIN_PIPE;
            var top = getRandomNumber(min, max);
            var length = this.pipes.push(new Pipe(this.height, this.pipeWidth, top, flipImage, this));
            this.gameContainerElement.appendChild(this.pipes[length - 1].init());
            flipImage = true;
            top = (top - this.pipeGapping - this.height);
            length = this.pipes.push(new Pipe(this.height,this.pipeWidth, top, flipImage, this));
            this.gameContainerElement.appendChild(this.pipes[length - 1].init());
        }.bind(this),this.pipeGenrationIntervalTime);
    }

    this.initBackground = function() {
        this.gameBackgroundClass = new GameBackground(this.width, this.backgroundHeight,this.gameBackgroundScale, this);
        this.gameContainerElement.appendChild(this.gameBackgroundClass.init());
    }
}