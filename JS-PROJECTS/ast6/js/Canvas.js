class Canvas {
    canvasElement;
    canvasContext;

    startAngle = 0;
    endAngle = 2 * Math.PI;

    NUMBER_OF_CIRCLES = 10;
    MAX_CIRCLE_RADIUS = 5;
    SPACING_X = 20;
    SPACING_Y = 8;
    NUMBER_OF_STRANDS = 10;

    constructor(height, width, parentClass) {
        this.height = height;
        this.width = width;
    }

    init() {
        this.canvasElement = document.createElement('canvas');
        this.canvasContext = this.canvasElement.getContext('2d');

        this.canvasElement.style.height = this.height + 'px';
        this.canvasElement.style.width = this.width + 'px';

        this.canvasContext.height = this.height + 'px';
        this.canvasContext.width = this.width + 'px';

        this.canvasElement.style.display = 'block';

        this.canvasElement.style.margin = '50px auto';

        this.initHelix();

        return this.canvasElement;
    }

    initHelix() {
        let centerX = 0;
        let centerY = 0;
        for (let i = 0; i < this.NUMBER_OF_STRANDS; i++) {
            centerX += this.SPACING_X + this.MAX_CIRCLE_RADIUS;
            centerY = this.SPACING_Y;  
            for (let j = 0 ; j < this.NUMBER_OF_CIRCLES; j++) {
                centerY += this.SPACING_Y + this.MAX_CIRCLE_RADIUS;
                this.canvasContext.beginPath();
                this.canvasContext.arc(centerX, centerY, this.MAX_CIRCLE_RADIUS, this.startAngle , this.endAngle);
                this.canvasContext.fill();
            }

        }
    }

    flicker() {
        
    }
}