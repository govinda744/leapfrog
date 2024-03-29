class Canvas {
  height;
  width;
  gameContainerClass;

  paused = false;

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

  score = 0;

  constructor(width, height, maps, level, playerConfig, enemyConfig, gameContainerClass) {
    this.height = height;
    this.width = width;

    this.totalPlayerlife = playerConfig.life;

    this.maps = maps;
    this.level = level;
    this.playerConfig = playerConfig;
    this.enemyConfig = enemyConfig;

    this.gameContainerClass = gameContainerClass;
  }

  init() {

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

    this.initGame();
    this.gameLoop();

    return this.canvasElement;
  }

  initGame() {
    this.initGrids();
    this.initMouseEvent();
    this.initKeyBoardEvent();
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
    this.drawScore();
    this.drawLife();
  }

  drawScore() {
    this.canvasContext.font = "20px Arial";
    this.canvasContext.fillStyle = '#2B2D42';
    this.canvasContext.fillText(this.score, this.width / 2, 15);
  }

  drawLife() {
    this.canvasContext.fillStyle = 'green';
    this.canvasContext.font = "10px Arial";
    this.canvasContext.fillText('LIFE:', this.width * 0.78, 15);
    this.canvasContext.beginPath();
    this.canvasContext.fillRect((this.width * 0.78) + 30, 7, this.player.playerLife * 30, 10);
    for (let i = 1; i <= this.totalPlayerlife; i++) {
      this.canvasContext.strokeStyle = 'black';
      this.canvasContext.beginPath();
      this.canvasContext.strokeRect((this.width * 0.78) + (i * 30), 7, 30, 10);
      this.canvasContext.closePath();
    }
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
    for (let rows = 0; rows < this.maps[0].length; rows++) {
      upperLeftX += this.gridLength;
      let upperLeftY = -this.gridLength;
      let columnsGrid = [];
      for (let columns = 0; columns < this.maps.length; columns++) {
        upperLeftY += this.gridLength;
        columnsGrid[columns] = new GridCell(this, upperLeftX, upperLeftY, this.gridLength, this.gridLength);
        let isThis = this.maps[columns][rows];
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
    this.enimies.push(new Enemy(gridCell, this.enemyConfig));
  }

  initPlayer(gridCell) {
    this.player = new Player(gridCell, this.playerConfig);
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

  initKeyBoardEvent() {
    document.addEventListener('keyup', (event) => {
      if (event.code === 'Escape') {
        if (!this.paused) {
          window.cancelAnimationFrame(this.requestId);
          this.canvasContext.beginPath();
          this.canvasContext.fillStyle = 'rgba(0,0,0,0.5)';
          this.canvasContext.font = "100px Arial";
          this.canvasContext.fillText('PAUSED', this.width * 0.3, this.height * 0.5);
          this.paused = true;
        } else if (this.paused) {
          this.gameLoop();
          this.paused = false;
        }
      }
    })
  }

  deleteEnemy(enemy) {
    this.score += 10;
    let enemyGrid = this.getEnemyGrid(enemy);
    if (enemy instanceof Enemy) {
      for (let i = 0; i < this.enimies.length; i++) {
        if (this.enimies[i] === enemy) {
          delete this.enimies[i];
          this.player.followingEnemy = undefined;
          this.enimies.splice(i, 1);
        } else {
          if (Math.max(Math.abs(enemy.beginX - this.enimies[i].beginX), Math.abs(enemy.beginY - this.enimies[i].beginY)) < enemy.proximityTo) {
            this.enimies[i].increaseSpeed();
            this.enimies[i].rushTo(enemyGrid);
          }
        }
      }
    }
    if (this.enimies.length <= 0) {
      this.gameContainerClass.appElement.removeChild(this.gameContainerClass.gameContainerElement);
      this.gameContainerClass.appElement.appendChild(new EndScreen(this.width, this.height, this, this.gameContainerClass.appElement, 'CONGRATULATION!!!').init());
      window.cancelAnimationFrame(this.requestId);
    }
  }

  getEnemyGrid(enemy) {
    return this.grids[Math.floor(enemy.beginX / this.gridLength)][Math.floor(enemy.beginY / this.gridLength)];
  }

  killPlayer() {
    if (this.player.playerLife <= 0) {
      this.gameContainerClass.appElement.removeChild(this.gameContainerClass.gameContainerElement);
      this.gameContainerClass.appElement.appendChild(new EndScreen(this.width, this.height, this, this.gameContainerClass.appElement, 'GAME OVER').init());
      window.cancelAnimationFrame(this.requestId);
    } else {
      this.player.playerLife--;
    }
  }
}