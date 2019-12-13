class Canvas {
  grids = [];
  maps;

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

    this.level = 1;

    this.canvasElement = document.createElement("canvas");
    this.canvasContext = this.canvasElement.getContext("2d");

    this.rayCasting = new RayCast(this, this.canvasContext);

    this.canvasContext.draggable = "true";

    this.canvasElement.height = this.height;
    this.canvasElement.width = this.width;

    this.canvasElement.style.background = "#d5d5d5";

    this.initGrids();
    this.getJsonData(this.setMapData.bind(this));

    return this.canvasElement;
  }

  getJsonData(callBack) {
    let request = new XMLHttpRequest();
    request.open('GET', './js/Levels/levels.json', true);
    request.send();
    request.onload = function () {
      if (request.status === 200) {
        let mapData = JSON.parse(request.responseText);
        callBack(mapData);
      }
    }
  }

  setMapData(mapData) {
    this.maps = mapData;
    this.createPath();
    this.startGame();
  }

  startGame() {
    this.drawGrid();
    this.initPlayer();
    this.initMouseEvent();
  }

  initGrids() {
    let upperLeftX = -this.gridLength;
    for (let rows = 0; rows < parseInt(this.width / this.gridLength); rows++) {
      upperLeftX += this.gridLength;
      let upperLeftY = -this.gridLength;
      let columnsGrid = [];
      for (
        let columns = 0;
        columns < parseInt(this.height / this.gridLength);
        columns++
      ) {
        upperLeftY += this.gridLength;
        columnsGrid[columns] = new GridCell(
          this,
          upperLeftX,
          upperLeftY,
          this.gridLength,
          this.gridLength,
          this.canvasContext
        );
      }
      this.grids.push(columnsGrid);
    }
  }

  createPath() {
    let map = this.maps[this.level];
    for (let i = 0; i < this.grids.length; i++) {
      for (let j = 0; j < this.grids[i].length; j++) {
        this.grids[i][j].isObstacle = map[j][i];
      }
    }
  }

  drawGrid(level) {
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
          let pathPoint = path.shift();
          this.rayCasting.castSearchLightTowards(
            pathPoint.beginX,
            pathPoint.beginY
          );
          this.playerClass.moveTo(pathPoint);
          this.drawPath(path);
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
      this.canvasContext.clearRect(0, 0, this.width, this.height);
      this.drawGrid();
      this.playerClass.draw();
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
          null,
          'round'
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
