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

  gridLength = 20; //minimum 20
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

    this.rayCasting = new RayCast(this, this.canvasContext);

    this.canvasContext.draggable = "true";

    this.canvasElement.height = this.height;
    this.canvasElement.width = this.width;

    this.canvasElement.style.background = "#d5d5d5";

    if (this.generateAgain) {
      let randomGrid = new CreateMap(
        this.gridLength,
        this.height,
        this.width,
        this.canvasContext
      );
      this.generateAgain = false;
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
    this.playerClass = new Player(
      this,
      0,
      this.gridLength,
      this.gridLength,
      this.gridLength,
      this.canvasContext
    );
    this.playerClass.init();
  }

  initMouseEvent() {
    this.canvasElement.addEventListener("mousedown", event => {
      this.mouseInGridCell = new Vector(event.offsetX, event.offsetY);
      this.getMouseClickedGridCell();
      this.getPlayerGridCell();
      if (!this.mouseInGridCell.isObstacle) {
        if (this.playerMoveId) {
          clearInterval(this.playerMoveId);
          this.playerMoveId = undefined;
          if (this.mouseInGridCell !== this.playerInGridCell) {
            this.erasePath(this.pathToMoveForPlayer);
          }
        }
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
      this.playerMoveId = setInterval(
        function () {
          let pathPoint = path[0];
          console.log(path.length);
          this.rayCasting.castSearchLightTowards(
            pathPoint.beginX,
            pathPoint.beginY
          );
          this.playerClass.moveTo(pathPoint);
          this.drawPath(path);
          path.shift();
          if (!path.length) {
            clearInterval(this.playerMoveId);
          }
        }.bind(this),
        this.playerClass.playerMoveInterval
      );
    }
  }

  erasePath(path) {
    if (path.length) {
      for (let i = 0; i < path.length - 1; i++) {
        this.canvasContext.clearRect(
          path[i + 1].beginX,
          path[i + 1].beginY,
          this.gridLength,
          this.gridLength
        );
      }
    }
  }

  drawPath(pathPoints) {
    if (pathPoints.length) {
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
          this.canvasContext,
          10,
          "black"
        ).draw();
      }
    }
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
