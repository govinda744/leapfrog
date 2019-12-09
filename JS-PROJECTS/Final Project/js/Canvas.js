function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Canvas {
  grids = [];

  height;
  width;
  gameContainerClass;
  playerClass;

  playerMoveId;

  gridLength = 50;
  generateAgain = true;

  canvasElement;
  canvasContext;

  mouseInGridCell;
  playerInGridCell;

  pathToMoveForPlayer;

  constructor(width, height, gameContainerClass) {
    this.height = height;
    this.width = width;
    this.gameContainerClass = gameContainerClass;
  }

  init() {
    this.canvasElement = document.createElement("canvas");
    this.canvasContext = this.canvasElement.getContext("2d");

    this.canvasElement.height = this.height;
    this.canvasElement.width = this.width;

    this.canvasElement.style.background = "#d5d5d5";

    if (this.generateAgain) {
      let randomGrid = new RandomizeGrid(
        this.gridLength,
        this.height,
        this.width,
        this.canvasContext
      );
      randomGrid.initGrids();
      this.grids = randomGrid.createPath();
    }
    this.drawGrid();
    this.initPlayer();
    this.initMouseEvent();

    return this.canvasElement;
  }

  drawGrid() {
    for (let rowGrid of this.grids) {
      for (let columnGrid of rowGrid) {
        columnGrid.draw();
      }
    }
  }

  initPlayer() {
    this.playerClass = new Player(this, 0, 0, 50, 50, this.canvasContext);
    this.playerClass.init();
  }

  initMouseEvent() {
    this.canvasElement.addEventListener("mousedown", event => {
      if (this.playerMoveId) {
        clearInterval(this.playerMoveId);
        this.playerMoveId = undefined;
        this.erasePath(this.pathToMoveForPlayer);
      }
      this.mouseInGridCell = new Vector(event.offsetX, event.offsetY);
      this.getMouseClickedGridCell();
      this.getPlayerGridCell();
      if (!this.mouseInGridCell.isObstacle) {
        this.pathToMoveForPlayer = AstarSearch.findPath(
          this.grids.slice(),
          this.playerInGridCell,
          this.mouseInGridCell
        );
        this.drawPath(this.pathToMoveForPlayer);
        this.movePlayer(this.pathToMoveForPlayer);
      }
    });
  }

  movePlayer(path) {
    if (path.length) {
      let i = 0;
      this.playerMoveId = setInterval(
        function() {
          this.playerClass.moveTo(path[i]);
          i++;
          if (i === path.length) {
            clearInterval(this.playerMoveId);
          }
        }.bind(this),
        this.playerClass.playerMoveInterval
      );
    }
  }

  erasePath(path) {
    for (let i = 0; i < path.length; i++) {
      this.canvasContext.clearRect(
        path[i].beginX,
        path[i].beginY,
        this.gridLength,
        this.gridLength
      );
    }
  }

  drawPath(pathPoints) {
    if (pathPoints) {
      for (let i = 0; i < pathPoints.length - 1; i++) {
        new Line(
          new Vector(
            pathPoints[i].beginX + this.gridLength / 2,
            pathPoints[i].beginY + this.gridLength / 2
          ),
          new Vector(
            pathPoints[i + 1].beginX + this.gridLength / 2,
            pathPoints[i + 1].beginY + this.gridLength / 2
          ),
          this.canvasContext
        ).draw();
      }
    }
  }

  minSquareToCoverCanvas() {
    return parseInt(
      (this.height / this.gridLength) * (this.width / this.gridLength)
    );
  }

  getMouseClickedGridCell() {
    for (let rowGrid of this.grids) {
      for (let columnGrid of rowGrid) {
        if (columnGrid.includes(this.mouseInGridCell)) {
          this.mouseInGridCell = columnGrid;
        }
      }
    }
  }

  getPlayerGridCell() {
    for (let rowGrid of this.grids) {
      for (let columnGrid of rowGrid) {
        if (columnGrid.equals(this.playerClass)) {
          this.playerInGridCell = columnGrid;
        }
      }
    }
  }
}
