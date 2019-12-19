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

  requestId;

  constructor(width, height, gameContainerClass) {
    this.height = height;
    this.width = width;
    this.gameContainerClass = gameContainerClass;
  }

  init() {

    this.level = 1;

    this.canvasElement = document.createElement("canvas");
    this.canvasContext = this.canvasElement.getContext("2d");

    this.canvasElement.style.position = 'absolute';
    this.canvasElement.style.zIndex = 1;

    this.canvasElement.style.boxShadow = '0px 0px 10px #888888';
    this.canvasElement.style.borderRadius = 10 + 'px';

    this.canvasElement.style.background = '#c0c0c0';

    this.canvasElement.style.backgroundImage = 'repeating-linear-gradient(120deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(60deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px), linear-gradient(60deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1)), linear-gradient(120deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1))';

    this.canvasElement.style.backgroundSize = '70px 120px';
    
    this.canvasElement.height = this.height;
    this.canvasElement.width = this.width;

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
    this.requestId = window.requestAnimationFrame(this.gameLoop.bind(this));
    this.renderGrid();
    this.update();
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
      let row = Math.floor(event.offsetX / this.gridLength);
      let column = Math.floor(event.offsetY / this.gridLength);
      let mouseInGrid = this.grids[row][column];
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
          this.player.followingEnemy = undefined;
          this.player.moveTo(mouseInGrid);
        }
      }
    });
  }

  deleteEnemy(enemy) {
    let enemyGrid = this.getEnemyGrid(enemy);
    if (enemy instanceof Enemy) {
      for (let i = 0; i < this.enimies.length; i++) {
        if (this.enimies[i] === enemy) {
          delete this.enimies[i];
          this.player.followingEnemy = undefined;
          this.enimies.splice(i, 1);
        } else {
          if (Math.max(Math.abs(enemy.beginX - this.enimies[i].beginX),Math.abs(enemy.beginY - this.enimies[i].beginY)) < enemy.proximityTo) {
            this.enimies[i].increaseSpeed();
            this.enimies[i].rushTo(enemyGrid);
          }
        }
      }
    }
  }

  getEnemyGrid(enemy) {
    return this.grids[Math.floor(enemy.beginX / this.gridLength)][Math.floor(enemy.beginY / this.gridLength)];
  }

  killPlayer() {
    if (this.player.playerLife <= 0) {
      this.gameContainerClass.appElement.appendChild(new Start(this.width, this.height, this.gameContainerClass.appElement).init());
      window.cancelAnimationFrame(this.requestId);
      this.gameContainerClass.appElement.removeChild(this.gameContainerClass.gameContainerElement);
    } else {
      this.player.playerLife --;
    }
  }
}