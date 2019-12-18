class GameContainer { 
    height;
    width;
    appElement;

    canvasHeight = 600;
    canvasWidth = 1000;

    gameContainerElement;

    constructor(width, height, appElement) {
        this.height = height;
        this.width = width;
        this.appElement = appElement;
    }

    init() {
        this.gameContainerElement = document.createElement('div');

        this.gameContainerElement.style.height = this.height + 'px';
        this.gameContainerElement.style.width = this.width + 'px';

        this.gameContainerElement.style.margin = '0 auto';

        this.gameContainerElement.style.position = 'relative';

        this.initCanvas();

        return this.gameContainerElement;
    }

    initCanvas() {
        this.gameContainerElement.appendChild(new Canvas(this.canvasWidth, this.canvasHeight, this).init());
    }
}