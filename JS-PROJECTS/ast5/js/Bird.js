function Bird(height, width, parentClass) {
    this.height = height;
    this.width = width;

    this.top = (parentClass.height - this.height) / 2;
    this.left = (parentClass.width - this.width) / 2;

    this.hitAudio = new Audio('../audio/hit.wav');
    this.dieAudio = new Audio('../audio/die.wav');

    this.birdMoveOffset = 80;
    this.birdAnimationSpeed = 4;

    this.gravityEffectIntervalId;
    this.dropByGravity = 0.01;
    this.dropIncreaseBy = 0.09;
    this.MAX_DROP_RATE = 
    this.gravityEffectIntervalTime = 10;

    this.zIndex = 20;

    this.animateId; 

    this.birdElement;

    this.init = function() {
        this.birdElement = document.createElement('div');

        this.birdElement.style.position = 'absolute';

        this.birdElement.id = 'bird';

        this.birdElement.style.top = this.top+'px';
        this.birdElement.style.left = this.left +'px';

        this.birdElement.style.zIndex = this.zIndex;

        this.birdElement.style.height = this.height +'px';
        this.birdElement.style.width = this.width +'px';

        this.birdElement.style.backgroundImage = 'url(./images/flappy_bird.gif)';
        this.birdElement.style.backgroundSize = '100% 100%';

        this.gravityEffect();

        return this.birdElement;
    }

    this.resetGravity = function() {
        this.dropByGravity = 0.1;
        clearInterval(this.gravityEffectIntervalId);
    }

    this.stopAnyPriorMovement = function() {
        if (this.animateId) {
            clearInterval(this.animateId);
        }
    }

    this.move = function() {
        this.stopAnyPriorMovement();
        this.resetGravity();
        this.animateMoveTo(this.top - this.birdMoveOffset);
    }

    this.animateMoveTo = function(to) {
        this.animateId = setInterval(function() {
            if (this.top >= to) {
                this.top -= this.birdAnimationSpeed;
                if (this.top < 0) {
                    this.hitAudio.play();
                    parentClass.gameOver();
                }
                this.draw();
            } else {
                this.gravityEffect();
                clearInterval(this.animateId);
            }
        }.bind(this), 10);
    }

    this.fallToGround = function() {
        var id = setInterval(function() {
            this.dieAudio.play();
            if (this.top + this.height < parentClass.height - parentClass.gameBackgroundClass.height) {
                this.top += 4;
                this.draw();
            } else {
                clearInterval(id);
            }
        }.bind(this), 1);
    }

    this.gravityEffect = function() {
        this.gravityEffectIntervalId = setInterval(function() {
            if (parentClass.gameBackgroundClass.top < this.top + this.height) {
                this.hitAudio.play();
                parentClass.gameOver();
            }
            this.dropByGravity = this.dropByGravity > this.MAX_DROP_RATE ? this.MAX_DROP_RATE : this.dropByGravity;
            this.top += this.dropByGravity;
            this.dropByGravity += this.dropIncreaseBy;
            this.draw();
        }.bind(this),this.gravityEffectIntervalTime);
    }

    this.draw = function() {
        this.birdElement.style.top = this.top+'px';
    }
}