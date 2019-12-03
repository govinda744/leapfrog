function Start(width, height, parentClass) {
    this.width = width;
    this.height = height;

    this.zIndex = 150;

    this.startElement;

    this.init = function() {
        this.startElement = document.createElement('div');

        this.startElement.style.width = this.width + 'px';

        this.startElement.style.lineHeight = this.height +'px';
        this.startElement.innerHTML = 'Click here to start game';
        this.startElement.style.color = '#000';
        this.startElement.style.textAlign = 'center';

        this.startElement.style.zIndex = this.zIndex;

        this.startElement.style.position = 'absolute';

        this.startElement.style.background = '#0000008d';

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