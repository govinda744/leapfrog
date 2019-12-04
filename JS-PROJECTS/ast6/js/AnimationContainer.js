'use strict';

class AnimationContainer {
    animationContainerElement;

    canvasHeight = 300;
    canvasWidth = 350;

    canvasClass;

    constructor(parentElement) {

    }

    init() {
        this.animationContainerElement = document.createElement('div');

        this.animationContainerElement.style.margin = '20px auto';

        this.animationContainerElement.style.float = 'left';
        this.initCanvas();

        return this.animationContainerElement;
    }

    initCanvas() {
        this.canvasClass = new Canvas(this.canvasHeight, this.canvasWidth, this);
        this.animationContainerElement.appendChild(this.canvasClass.init());
    }
}