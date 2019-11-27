var carouselContainer = document.getElementsByClassName('carousel-container');
var carouselImageWrapper = document.getElementsByClassName('carousel-image-wrapper');
var totalImages = document.getElementsByTagName('figure');

var imageIndex = 0;
var imageWidth = totalImages.item(imageIndex).offsetWidth;
var slideTo = 'right';
var from = 0;
var speed = 17;
var carouselImageWrapperWidth = (totalImages.length) * imageWidth;

carouselContainer.item(0).style.position = 'relative';
carouselContainer.item(0).style.margin = '0 auto';
carouselContainer.item(0).style.overflow = 'hidden';

carouselImageWrapper.item(0).style.position = 'absolute';
carouselImageWrapper.item(0).style.width = 'max-content';

Array.from(totalImages).forEach(function(figureObj) {
    figureObj.style.float = 'left';
});

function calculateOffsetLeft() {
    return Math.abs(parseInt(carouselImageWrapper.item(0).offsetLeft/imageWidth));
}

setInterval(function() {
    var offSet = calculateOffsetLeft() + 1;
    console.log(offSet)
    offSet = offSet >= totalImages.length ? 0 :offSet;
    slideImage(offSet,slideTo,imageWidth);
    slideTo = imageIndex == totalImages.length - 1?'reset':'right';
},2000);

function slideImage(offSet,slideTo,imageWidth) {
    if (slideTo === 'left') {
        from = carouselImageWrapper.item(0).offsetLeft;
        upto = from + imageWidth;
        slideImageWithSpeed(speed,from,upto,slideTo);
    } else if (slideTo === 'reset') {
        carouselImageWrapper.item(0).style.left = '0px';
        offSet = 0;
    } 
    else if (slideTo === 'right') {
        from = carouselImageWrapper.item(0).offsetLeft;
        upto = -(totalImages.item(offSet).offsetLeft);
        slideImageWithSpeed(speed,from,upto,slideTo);
    }
    
    return offSet;
}

function slideImageWithSpeed(speed,from,upto,slideTo) {
    var positionLeft = from;
    var id = setInterval(function() {
        if (slideTo === 'right') {
            if (upto >= - imageWidth * totalImages.length) {
                positionLeft -= speed
                positionLeft = positionLeft < upto? upto : positionLeft;
                carouselImageWrapper.item(0).style.left = positionLeft+'px';
                if(positionLeft === upto) {
                    clearInterval(id);
                }
            }
        } else if (slideTo === 'left') {
            if (upto <= 0) {
                positionLeft += speed;
                positionLeft = positionLeft > upto? upto : positionLeft;
                carouselImageWrapper.item(0).style.left = positionLeft+'px';
                if(positionLeft === upto) {
                    clearInterval(id);
                }
            }
        }
    },5);
}


var leftSliderButton = document.createElement('div');

leftSliderButton.style.width = '5%';
leftSliderButton.style.height = '100%';
leftSliderButton.style.backgroundImage = 'url("./images/left-arrow.svg")';
leftSliderButton.style.backgroundPosition = 'center left';
leftSliderButton.style.backgroundRepeat = 'no-repeat';
leftSliderButton.style.position = 'absolute';
leftSliderButton.onmouseover = function() {
    leftSliderButton.style.cursor = 'pointer';
}
leftSliderButton.onclick = function() {
    var offSet = calculateOffsetLeft()
    var slideTo = 'left';
    slideImage(offSet,slideTo,imageWidth);
}

var rightSliderButton = document.createElement('div');

rightSliderButton.style.width = '5%';
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
    var offSet = calculateOffsetLeft()
    var slideTo = 'right';
    slideImage(++offSet,slideTo,imageWidth);
}

carouselContainer.item(0).appendChild(leftSliderButton);
carouselContainer.item(0).appendChild(rightSliderButton);

var imageIndicatorWrapper = document.createElement('ul');
imageIndicatorWrapper.style.display = 'block';
imageIndicatorWrapper.style.listStyleType = 'none';
imageIndicatorWrapper.style.position = 'absolute';
imageIndicatorWrapper.style.bottom = '0px';
imageIndicatorWrapper.style.left = '0px';
imageIndicatorWrapper.style.right = '0px';
imageIndicatorWrapper.style.width = 'max-content';
imageIndicatorWrapper.style.alignContent='center';
imageIndicatorWrapper.style.height = '50px';
imageIndicatorWrapper.style.margin = '0 auto';


Array.from(totalImages).forEach(function() {
    var imageIndicator = document.createElement('li');
    imageIndicator.style.border = '1px solid rgba(255, 255, 255, 255)';
    imageIndicator.style.borderRadius = '5px';
    imageIndicator.style.float = 'left';
    imageIndicator.style.margin = '10px';
    imageIndicator.style.padding = '5px';
    imageIndicator.onmouseover = function() {
        imageIndicator.style.cursor = 'pointer';
        imageIndicator.style.backgroundColor = 'white';
    }
    imageIndicator.onmouseout = function() {
        imageIndicator.style.backgroundColor = '';
    }
    imageIndicatorWrapper.appendChild(imageIndicator);
    
});

carouselContainer.item(0).appendChild(imageIndicatorWrapper);