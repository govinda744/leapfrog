class Grid {
    midPointOfGrid;
    immediateNodes = [];
    isObstacle;

    constructor(beginX, beiginY, gridWidth, gridHeight, context) {
        this.beginX = beginX;
        this.beiginY = beiginY;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.context = context;
        this.midPointOfGrid = new Vector(this.beginX + (this.gridWidth / 2), this.beiginY +(this.gridHeight / 2));
        this.init();
    }

    init() {
        this.isObstacle = true;
        this.gridCoordinates = new Rect(this.beginX, this.beiginY, this.gridWidth, this.gridHeight, this.context, 'red');
        this.initImmediateNodes();
    }

    initImmediateNodes() {
        let y = -1;
        for (let i = 0; i < 3; i++) {
            let x = -1;
            let cordinateY = this.midPointOfGrid.coY + (y * this.gridHeight);
            for (let j = 0; j < 3; j++) {
                if (y!== 0 || x !== 0) {
                    let cordinateX = this.midPointOfGrid.coX + (x * this.gridWidth);
                    if (cordinateX > 0 && cordinateX < this.context.canvas.width && cordinateY > 0 && cordinateY < this.context.canvas.height)
                    this.immediateNodes.push(new Vector(cordinateX, cordinateY));
                }
                x++;
            }
            y++;
        }
    }

    draw() {
        if (!this.isObstacle) {
            this.gridCoordinates.fillColor = '#d5d5d5';
            this.gridCoordinates.draw();
        } else {
            this.gridCoordinates.draw();
        }
    }

    includes(vectorCordinate) {
        return this.beginX < vectorCordinate.coX && this.beiginY < vectorCordinate.coY && this.beginX + this.gridHeight > vectorCordinate.coX && this.beiginY + this.gridWidth > vectorCordinate.coY;
    }
}