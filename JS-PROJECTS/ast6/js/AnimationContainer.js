'use strict';

class AnimationContainer {
    animationContainerElement;

    canvasHeight = 200;
    canvasWidth = 400;

    canvasClass;

    constructor(height, width, parentElement) {
        this.height = height;
        this.width = width;
    }

    init() {
        this.animationContainerElement = document.createElement('div');

        this.animationContainerElement.style.height = this.height + 'px';
        this.animationContainerElement.style.width = this.width + 'px';

        this.animationContainerElement.style.margin = '20px auto';

        this.animationContainerElement.style.background = 'red';

        this.animationContainerElement.style.overflow = 'hidden';

        this.initCanvas();

        return this.animationContainerElement;
    }

    initCanvas() {
        this.canvasClass = new Canvas(this.canvasHeight, this.canvasWidth, this);
        this.animationContainerElement.appendChild(this.canvasClass.init());
    }
}