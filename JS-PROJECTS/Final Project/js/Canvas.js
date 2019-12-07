function getRandomNumber(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) ) + min;
}

class Canvas {
    grids = [];

    height;
    width;
    gameContainerClass;

    gridLength = 50;

    canvasElement;
    canvasContext;

    mouseCoordinates;

    constructor(width, height, gameContainerClass) {
        this.height = height;
        this.width = width;
        this.gameContainerClass = gameContainerClass;
    }

    init() {
        this.canvasElement = document.createElement('canvas');
        this.canvasContext = this.canvasElement.getContext('2d');

        this.canvasElement.height = this.height;
        this.canvasElement.width = this.width;

        this.canvasElement.style.background = '#d5d5d5';

        this.initGrids();
        // this.createPath();
        this.initMouseEvent();

        return this.canvasElement;
    }

    initGrids() {
        let upperLeftX = -this.gridLength;
        for(let rows = 0; rows < parseInt(this.width / this.gridLength); rows++) {
            upperLeftX += this.gridLength;
            let upperLeftY = -this.gridLength;
            let columsnGrid = [];
            for (let columns = 0; columns < parseInt(this.height / this.gridLength); columns++) {
                upperLeftY += this.gridLength;
                columsnGrid[columns] = new Grid(upperLeftX, upperLeftY, this.gridLength, this.gridLength, this.canvasContext);
                columsnGrid[columns].draw();
            }
            this.grids.push(columsnGrid);
        }
    }

    createPath() {
        for (let rowGrid of this.grids) {
            for (let i = 0; i < rowGrid.length * 2; i++) {
                let rand = getRandomNumber(0, rowGrid.length)
                rowGrid[rand].isObstacle = false;
                rowGrid[rand].draw();
            }
        }
    }

    initMouseEvent() {
        this.canvasElement.addEventListener('mousedown', (event) => {
            this.mouseCoordinates = new Vector(event.offsetX, event.offsetY);
            this.getMidOfGridClickedOn();
        });
    }

    minSquareToCoverCanvas() {
        return parseInt((this.height / this.gridLength) * (this.width / this.gridLength));
    }

    getMidOfGridClickedOn() {
        for (let rowGrid of this.grids) {
            for (let columnGrid of rowGrid) {
                if (columnGrid.includes(this.mouseCoordinates)) {
                    this.mouseCoordinates = columnGrid.midPointOfGrid;
                }
            }
        }
    }
}