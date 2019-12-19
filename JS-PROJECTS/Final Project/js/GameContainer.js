class GameContainer { 
    height;
    width;
    appElement;

    canvasHeight = 600;
    canvasWidth = 1000;

    gameContainerElement;

    constructor(width, height, maps, level, playerConfig, enemyConfig, appElement) {
        this.height = height;
        this.width = width;

        this.maps = maps;
        this.level = level;
        this.playerConfig = playerConfig;
        this.enemyConfig = enemyConfig;

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
        this.gameContainerElement.appendChild(new Canvas(this.canvasWidth, this.canvasHeight, this.maps, this.level, this.playerConfig, this.enemyConfig, this).init());
    }
}