class Canvas {
    canvasElement;
    canvasContext;

    startAngle = 0;
    endAngle = 2 * Math.PI;

    MIN_CIRCLE_RADIUS = 1;
    MAX_CIRCLE_RADIUS = 5;
    NUMBER_OF_ROWS = 10;
    NUMBER_OF_COLUMNS = 10;
    NUMBER_OF_STRANDS = 2;
    frameCount = 0;
    phase = 0;

    CIRCLE_FLICKER_RATE = 0.1;

    STRAND_ROTATE_SPACE = 50;

    helixFrom = 3;  //3rd of height of canvas

    offSetX = 30;

    SPEED_OF_ROTATION = 0.03;


    constructor(height, width, parentClass) {
        this.height = height;
        this.width = width;
    }

    init() {
        this.canvasElement = document.createElement('canvas');
        this.canvasContext = this.canvasElement.getContext('2d');

        this.canvasElement.height = this.height;
        this.canvasElement.width = this.width;

        this.canvasElement.style.margin = '0 auto';

        this.initAnimatedHelix();

        return this.canvasElement;
    }

    initAnimatedHelix() {
        setInterval(function() {
            this.canvasContext.clearRect(0, 0, this.width, this.height);

            let centerX = 0;
            let centerY = 0;
            let columnOffset = 0;
            this.frameCount++;
            
            this.phase = this.frameCount * this.SPEED_OF_ROTATION;

            for(let sCount = 0; sCount < this.NUMBER_OF_STRANDS; sCount++) {
                if (sCount === 0) {
                    var strandPhase = this.phase;
                } else {
                    var strandPhase = this.phase + sCount * Math.PI;
                }
                centerX = 0;
                for(let cols = 0; cols < this.NUMBER_OF_COLUMNS; cols++) {
                    centerX += this.offSetX;
                    columnOffset = (cols * this.NUMBER_OF_STRANDS * Math.PI) / this.NUMBER_OF_COLUMNS;

                    for(let rows = 0; rows < this.NUMBER_OF_ROWS; rows++) {
                        centerY = this.height / this.helixFrom + rows * this.NUMBER_OF_ROWS + Math.sin(strandPhase + columnOffset) * this.STRAND_ROTATE_SPACE;
                        let sizeOffset = (Math.cos(strandPhase -(rows * this.CIRCLE_FLICKER_RATE) + columnOffset) + this.MIN_CIRCLE_RADIUS);
                        let circleRadius = sizeOffset * this.MAX_CIRCLE_RADIUS;

                        this.canvasContext.beginPath();
                        this.canvasContext.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
                        var my_gradient = this.canvasContext.createLinearGradient(0, 0, 0, 400);
                        my_gradient.addColorStop(0, "yellow");
                        my_gradient.addColorStop(1, "green");
                        this.canvasContext.fillStyle = my_gradient;
                        this.canvasContext.fill();
                        this.canvasContext.closePath();
                    }
                }
            }
        }.bind(this),20);
        
    }

}