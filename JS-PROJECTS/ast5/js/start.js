function Start(width, height, parentClass) {
    this.width = width;
    this.height = height;

    this.zIndex = 150;

    this.startElement;

    this.init = function() {
        this.startElement = document.createElement('div');

        this.startElement.style.width = this.width + 'px';

        this.startElement.style.lineHeight = this.height +'px';
        this.startElement.innerHTML = 'Click here to start';
        this.startElement.style.color = '#000';
        this.startElement.style.textAlign = 'center';

        this.startElement.style.background = '#0000008d';

        this.startElement.style.backgroundImage = 'url(./images/logo.png),url(./images/flappy_bird.gif)';
        this.startElement.style.backgroundPosition = '50% 25%, 72% 24%';
        this.startElement.style.backgroundSize = 'auto, 10% 5%';
        this.startElement.style.backgroundRepeat = 'no-repeat';

        this.startElement.style.zIndex = this.zIndex;

        this.startElement.style.position = 'absolute';

        this.startElement.onmouseover = function() {
            this.startElement.style.cursor = 'pointer';
        }.bind(this);

        this.startElement.onclick = function() {
            parentClass.startGame();
            parentClass.gameContainerElement.removeChild(this);
        }

        return this.startElement;
    }
}