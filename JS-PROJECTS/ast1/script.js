function CarouselContainer(carouselContainer) {

    var that = this;

    var enable = true;
    var disable = false;

    this.domCarouselContainer = carouselContainer;
    
    this.domCarouselImageWrapper;
    this.domFigures;
    this.domImages = [];
    this.imageIndicatorparent;
    
    this.carouselContainerWidth;
    this.carouselContainerHeight;

    this.domCarouselImageWrapperWidth;
    this.imageWidth;
    this.atImage = 0;
    this.slideTo = 'right';
    this.sliding = enable;
    this.holdTime = 2;  //in seconds
    this.speed = 5;    //in pixels

    this.init = function() {
        this.domCarouselImageWrapper = this.domCarouselContainer.children;
        this.domFigures = this.domCarouselImageWrapper.item(0).children;

        for(var imageNumber = 0; imageNumber < this.domFigures.length; imageNumber++) {
            this.domImages.push(this.domFigures.item(0).children)
        }

        this.carouselContainerHeight = this.initCarouselContainerHeight();
        this.carouselContainerWidth = this.initCarouselContainerWidth();
        this.imageWidth = this.carouselContainerWidth;
        this.domCarouselImageWrapperWidth = this.imageWidth * this.domImages.length;

        this.initSliderButtons();
        this.initImageIndicator();

        this.imageIndicatorParent = this.domCarouselContainer.getElementsByTagName('ul');

        this.initCarouselContainer();
        this.initCarouselImageWrapper();
        this.initDomFigures();
        this.highLightIndicator(this.atImage);
        this.initAutoSlide();
    }

    this.initAutoSlide = function() {
        this.mainSliderId = setInterval(function() {
            if (this.sliding && this.slideTo === 'right' && this.atImage < this.domImages.length - 1) {
                var positionLeft = - this.atImage * this.imageWidth;
                this.atImage ++;
                this.slideTo = this.atImage >= this.domImages.length - 1? 'left':this.slideTo;
                this.slideInSpeed(positionLeft,-this.atImage * this.imageWidth);
            } else if (this.sliding && this.slideTo === 'left' && this.atImage > 0){
                this.atImage --;
                positionLeft = - this.atImage * this.imageWidth;
                this.slideTo = this.atImage <= 0? 'right': this.slideTo;
                this.slideInSpeed(-((this.atImage + 1) * this.imageWidth),positionLeft);
            }
        }.bind(this),(this.holdTime * 1000));
    }

    this.slideInSpeed = function(from,upto,speed) {
        this.sliding = disable;
        this.highLightIndicator(this.atImage);
        var id = setInterval(function(){
            if (from > upto) {
                from -= speed === undefined? this.speed: speed;
                from = from <= upto ? upto : from;
                this.domCarouselImageWrapper.item(0).style.left = from+'px';
            } else if(from < upto){
                from += speed === undefined? this.speed: speed;
                from = from >= upto ? upto : from;
                this.domCarouselImageWrapper.item(0).style.left = from+'px';
            }
            if (from === upto) {
                this.sliding = enable;
                clearInterval(id);
            }
        }.bind(this),5);
    }

    this.highLightIndicator = function() {
        for (var imageIndicatorIndex = 0; imageIndicatorIndex < this.domImages.length; imageIndicatorIndex ++) {
            if (imageIndicatorIndex === this.atImage) {
                this.imageIndicatorParent.item(0).children.item(imageIndicatorIndex).style.background = '#fff';
            } else {
                this.imageIndicatorParent.item(0).children.item(imageIndicatorIndex).style.background = '';
            }
        }
    }

    this.initCarouselContainerHeight = function() {
        return this.domImages[0].item(0).naturalHeight;
    }

    this.initCarouselContainerWidth = function() {
        return this.domImages[0].item(0).naturalWidth;
    }

    this.initCarouselContainer = function() {
        this.domCarouselContainer.style.width = this.carouselContainerWidth+'px';
        this.domCarouselContainer.style.height = this.carouselContainerHeight+'px';
        this.domCarouselContainer.style.position = 'relative';
        this.domCarouselContainer.style.margin = '10px auto';
        this.domCarouselContainer.style.borderRadius = '9px';
        this.domCarouselContainer.style.boxShadow = '0px 0px 10px grey';
        this.domCarouselContainer.style.overflow = 'hidden';
    }

    this.initCarouselImageWrapper = function() {
        this.domCarouselImageWrapper.item(0).style.position = 'absolute';
        this.domCarouselImageWrapper.item(0).style.width = 'max-content';   /*imageWidth * domImages.length+'px';*/
    }

    this.initDomFigures = function() {
        for (var figureCount = 0; figureCount < this.domFigures.length; figureCount++) {
            this.domFigures.item(figureCount).style.float = 'left';
        }
    }

    this.initSliderButtons = function() {
        var leftSliderButton = document.createElement('div');

        leftSliderButton.style.width = '8%';
        leftSliderButton.style.height = '100%';
        leftSliderButton.style.backgroundImage = 'url("./images/left-arrow.svg")';
        leftSliderButton.style.backgroundPosition = 'center left';
        leftSliderButton.style.backgroundRepeat = 'no-repeat';
        leftSliderButton.style.position = 'absolute';
        leftSliderButton.onmouseover = function() {
            leftSliderButton.style.cursor = 'pointer';
        }
        leftSliderButton.onclick = function() {
            clearInterval(this.mainSliderId);
            if (this.sliding && this.atImage > 0) {
                this.atImage --;
                positionLeft = - this.atImage * this.imageWidth;
                this.slideTo = this.atImage <= 0? 'right': this.slideTo;
                this.slideInSpeed(-((this.atImage + 1) * this.imageWidth),positionLeft);
            }
            this.initAutoSlide();
        }.bind(this);

        var rightSliderButton = document.createElement('div');

        rightSliderButton.style.width = '8%';
        rightSliderButton.style.height = '100%';
        rightSliderButton.style.backgroundImage = 'url("./images/right-arrow.svg")';
        rightSliderButton.style.backgroundPosition = 'center right';
        rightSliderButton.style.backgroundRepeat = 'no-repeat';
        rightSliderButton.style.position = 'absolute';
        rightSliderButton.style.right = '0px';
        rightSliderButton.onmouseover = function() {
            rightSliderButton.style.cursor = 'pointer';
        }
        rightSliderButton.onclick = function() {
            clearInterval(this.mainSliderId);
            if (this.sliding && this.atImage < this.domImages.length - 1) {
                var positionLeft = - this.atImage * this.imageWidth;
                this.atImage ++;
                this.slideTo = this.atImage >= this.domImages.length - 1? 'left':this.slideTo;
                this.slideInSpeed(positionLeft,-this.atImage * this.imageWidth);
            }
            this.initAutoSlide();
        }.bind(this);

        this.domCarouselContainer.appendChild(leftSliderButton);
        this.domCarouselContainer.appendChild(rightSliderButton);
    }

    this.initImageIndicator = function () {
        var imageIndicatorWrapper = document.createElement('ul');
        imageIndicatorWrapper.style.display = 'block';
        imageIndicatorWrapper.style.listStyleType = 'none';
        imageIndicatorWrapper.style.position = 'absolute';
        imageIndicatorWrapper.style.bottom = '0px';
        imageIndicatorWrapper.style.left = '0px';
        imageIndicatorWrapper.style.right = '0px';
        imageIndicatorWrapper.style.width = 'max-content';
        imageIndicatorWrapper.style.alignContent='center';
        imageIndicatorWrapper.style.height = '40px';
        imageIndicatorWrapper.style.margin = '0 auto';
        for (var index = 0; index < this.domImages.length; index++) {
            var imageIndicator = document.createElement('li');
            imageIndicator.id = index+'';
            imageIndicator.style.border = '0.5px solid rgba(255, 255, 255, 255)';
            imageIndicator.style.float = 'left';
            imageIndicator.style.margin = '5px';
            imageIndicator.style.padding = this.imageWidth / 200+'px';
            imageIndicator.style.borderRadius = this.imageWidth / 200+'px';
            imageIndicator.onmouseover = function() {
                this.style.cursor = 'pointer';
            };

            imageIndicator.onclick = function() {
                clearInterval(that.mainSliderId);
                var from = -(that.atImage * that.imageWidth);
                var upto = -(this.id * that.imageWidth);
                if (that.sliding && this.id > that.atImage) {
                    var speed = (this.id - that.atImage) * that.speed;
                    that.atImage = parseInt(this.id);
                    that.slideInSpeed(from, upto, speed);
                } else if (that.sliding && this.id < that.atImage) {
                    var speed = (that.atImage - this.id) * that.speed;
                    that.atImage = parseInt(this.id);
                    that.slideInSpeed(from, upto, speed);
                }
                that.slideTo = that.atImage >= that.domImages.length - 1?'left':that.slideTo;
                that.slideTo = that.atImage <= 0?'right':that.slideTo;
                that.initAutoSlide();
            }

            imageIndicatorWrapper.appendChild(imageIndicator);
        };
        
        this.domCarouselContainer.appendChild(imageIndicatorWrapper);
    }
    
}

window.onload = function() {
    var carouselContainers = document.getElementsByClassName('carousel-container');

    var carouselContainersObjects = []

    for (var noOfCarouselContainers = 0; noOfCarouselContainers < carouselContainers.length; noOfCarouselContainers++) {
        carouselContainersObjects.push(new CarouselContainer(carouselContainers.item(noOfCarouselContainers)));
    }

    carouselContainersObjects.forEach(function(obj) {
        obj.init();
    });
}