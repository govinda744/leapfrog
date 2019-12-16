class Canvas {
  height;
  width;
  gameContainerClass;

  grids = [];
  maps;

  player;
  enimies = [];
  obstacles = [];

  gridLength = 20; //minimum 20
  generateAgain = true;

  canvasElement;
  canvasContext;

  constructor(width, height, gameContainerClass) {
    this.height = height;
    this.width = width;
    this.gameContainerClass = gameContainerClass;
  }

  init() {

    this.level = 1;

    this.canvasElement = document.createElement("canvas");
    this.canvasContext = this.canvasElement.getContext("2d");

    this.canvasElement.height = this.height;
    this.canvasElement.width = this.width;

    this.canvasElement.style.background = "#d5d5d5";

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
    this.initGame();
    this.gameLoop();
  }

  initGame() {
    this.initGrids();
    this.initMouseEvent();
  }

  renderGrid() {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    for (let rowGrid of this.grids) {
      for (let columnGrid of rowGrid) {
        columnGrid.draw(this.canvasContext);
      }
    }
    this.drawPlayer();
    this.drawEnemies();
  }

  update() {
    this.player.update();
    this.enimies.forEach(enemy => enemy.update());
  }

  gameLoop() {
    window.requestAnimationFrame(this.gameLoop.bind(this));
    // setInterval(function() {
    this.renderGrid();
    // this.update();
    // }.bind(this), 35);
  }

  initGrids() {
    let upperLeftX = -this.gridLength;
    for (let rows = 0; rows < this.maps[this.level][0].length; rows++) {
      upperLeftX += this.gridLength;
      let upperLeftY = -this.gridLength;
      let columnsGrid = [];
      for (let columns = 0; columns < this.maps[this.level].length; columns++) {
        upperLeftY += this.gridLength;
        columnsGrid[columns] = new GridCell(this, upperLeftX, upperLeftY, this.gridLength, this.gridLength);
        let isThis = this.maps[this.level][columns][rows];
        columnsGrid[columns].whatIs = isThis;
        if (isThis === MapComponenets.PLAYER) {
          columnsGrid[columns].whatIs = MapComponenets.PATH;
          this.initPlayer(columnsGrid[columns]);
        } else if (isThis === MapComponenets.ENEMY) {
          columnsGrid[columns].whatIs = MapComponenets.PATH;
          this.initEnemy(columnsGrid[columns]);
        } else if (isThis === MapComponenets.OBSTACLE) {
          this.obstacles.push(columnsGrid[columns]);
        }
      }
      this.grids.push(columnsGrid);
    }
  }

  initEnemy(gridCell) {
    this.enimies.push(new Enemy(gridCell));
  }

  initPlayer(gridCell) {
    this.player = new Player(gridCell);
  }

  drawPlayer() {
    this.player.draw(this.canvasContext);
  }

  drawEnemies() {
    this.enimies.forEach(enemy => enemy.draw(this.canvasContext));
  }

  initMouseEvent() {
    this.canvasElement.addEventListener("mousedown", event => {
      let mouseInGrid = this.getMouseGrid(new Vector(event.offsetX, event.offsetY));
      if (mouseInGrid.whatIs !== MapComponenets.OBSTACLE) {
        if (this.player.movingId) {
          clearInterval(this.player.movingId);
          this.player.fixToGrid();
        }
        for (let i = 0; i < this.enimies.length; i++) {
          if (mouseInGrid.includes(new Vector(this.enimies[i].beginX, this.enimies[i].beginY)) || mouseInGrid.includes(new Vector(this.enimies[i].beginX + this.enimies[i].width, this.enimies[i].beginY + this.enimies[i].height))) {
            this.player.follow(this.enimies[i]);
            return;
          }
        }
        if (mouseInGrid.whatIs === MapComponenets.PATH) {
          this.player.moveTo(mouseInGrid);
        }
      }
    });
  }

  getMouseGrid(mouseVect) {
    for (let rowGrid of this.grids) {
      for (let columnGrid of rowGrid) {
        if (columnGrid.includes(mouseVect)) {
          return columnGrid;
        }
      }
    }
  }
}
