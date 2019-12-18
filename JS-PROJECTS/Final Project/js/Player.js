class Player {
  playerSpeed = 1;
  pathToMove;

  followingEnemy;

  sx = 0;
  sy = 0;

  translationVector;
  rotationDegree;
  rotate = 0;

  radToDeg = (180 / Math.PI);
  degToRad = (Math.PI / 180);

  constructor(gridCell) {
    this.parentClass = gridCell.parentClass;
    this.beginX = gridCell.beginX;
    this.beginY = gridCell.beginY;
    this.width = gridCell.gridWidth;
    this.height = gridCell.gridHeight;
    this.playerImage = new Image();
    this.playerImage.src = './images/sprite.png';
    this.playerImage.onload = () => { };

    this.initCoordinates();
  }

  setPlayerSpeed(speed) {
    this.playerSpeed = speed;
  }

  initCoordinates() {
    this.playerCoordinates = new Rect(this.beginX, this.beginY, this.width, this.height, null, this.playerImage, this.sx, this.sy);
  }

  follow(enemy) {
    this.followingEnemy = enemy;
    if (this.followingEnemy) {
      this.pathToMove = AstarSearch.findPath(this.parentClass.grids, this.getPlayerGrid(), this.getEnemyGrid(this.followingEnemy));
      this.update();
    }
  }

  moveTo(grid) {
    this.pathToMove = AstarSearch.findPath(this.parentClass.grids, this.getPlayerGrid(), grid);
    this.update();
  }

  update() {
    if (this.followingEnemy) {
      if (this.playerCoordinates.isCollidingWith(this.followingEnemy.enemyCoordinates)) {
        this.killEnemy(this.followingEnemy);
      } else {
        if (this.beginX % this.parentClass.gridLength !== 0 && this.beginY % this.parentClass.gridLength !== 0) {
          this.fixToGrid();
        }
        this.pathToMove = AstarSearch.findPath(this.parentClass.grids, this.getPlayerGrid(), this.getEnemyGrid(this.followingEnemy));
      }
    }
    if (this.pathToMove && this.pathToMove.length) {
      if (this.beginX < this.pathToMove[0].beginX || this.beginY < this.pathToMove[0].beginY) {
        this.moveByIncrement();
      } else if (this.beginX > this.pathToMove[0].beginX || this.beginY > this.pathToMove[0].beginY) {
        this.moveByDecrement();
      }
    }
  }

  killEnemy(enemy) {
    this.parentClass.deleteEnemy(enemy);
  }

  moveByIncrement() {
    if (this.beginX < this.pathToMove[0].beginX) {
      this.beginX += this.playerSpeed;
      this.rotationDegree = 0;

    } else if (this.beginY < this.pathToMove[0].beginY) {
      this.beginY += this.playerSpeed;
      this.rotationDegree = 90;
    }
    this.translationVector = new Vector(this.beginX + this.width, this.beginY);
    let collidingEnemy = this.collidingWithEnemy();
    if (collidingEnemy) {
      this.killEnemy(collidingEnemy);
    }
    if (this.beginX >= this.pathToMove[0].beginX && this.beginY >= this.pathToMove[0].beginY) {
      this.fixToGrid();
      this.pathToMove.shift();
      if (this.pathToMove.length) {
        this.update();
      }
    }
    this.initCoordinates();
  }

  moveByDecrement() {
    if (this.beginX > this.pathToMove[0].beginX) {
      this.beginX -= this.playerSpeed;
      this.rotationDegree = 180;
    } else if (this.beginY > this.pathToMove[0].beginY) {
      this.beginY -= this.playerSpeed;
      this.rotationDegree = 270;
    }
    this.translationVector = new Vector(this.beginX, this.beginY + this.height);
    let collidingEnemy = this.collidingWithEnemy();
    if (collidingEnemy) {
      this.killEnemy(collidingEnemy);
    }
    if (this.beginX <= this.pathToMove[0].beginX && this.beginY <= this.pathToMove[0].beginY) {
      this.fixToGrid();
      this.pathToMove.shift();
      if (this.pathToMove.length) {
        this.update();
      }
    }
    this.initCoordinates();
  }

  drawpath(context) {
    if (this.pathToMove.length) {
      for (let i = 1; i < this.pathToMove.length; i++) {
        if (this.pathToMove[i + 1]) {
          let beginLine = new Vector(this.pathToMove[i].beginX + (this.width / 2), this.pathToMove[i].beginY + (this.height / 2));
          let endLine = new Vector(this.pathToMove[i + 1].beginX + (this.width / 2), this.pathToMove[i + 1].beginY + (this.height / 2));
          new Line(beginLine, endLine, 10, null, 'round').draw(context);
        }
      }
    }
  }

  fixToGrid() {
    if (this.pathToMove[0]) {
      let inGrid = this.pathToMove[0];
      this.beginX = inGrid.beginX;
      this.beginY = inGrid.beginY;
      this.initCoordinates();
    }
  }

  getPlayerGrid() {
    let beginX = this.parentClass.gridLength * Math.round(this.beginX / this.parentClass.gridLength);
    let beginY = this.parentClass.gridLength * Math.round(this.beginY / this.parentClass.gridLength);
    let playerInGrid = new GridCell(null, beginX, beginY);
    for (let rowGrid of this.parentClass.grids) {
      for (let columnGrid of rowGrid) {
        if (columnGrid.equals(playerInGrid)) {
          return columnGrid;
        }
      }
    }
  }

  getEnemyGrid(enemy) {
    let beginX = this.parentClass.gridLength * Math.round(enemy.beginX / this.parentClass.gridLength);
    let beginY = this.parentClass.gridLength * Math.round(enemy.beginY / this.parentClass.gridLength);
    let enemyInGrid = new GridCell(this.parentClass, beginX, beginY);
    for (let rowGrid of this.parentClass.grids) {
      for (let columnGrid of rowGrid) {
        if (columnGrid.equals(enemyInGrid)) {
          return columnGrid;
        }
      }
    }
  }

  collidingWithEnemy() {
    for (let i = 0; i < this.parentClass.enimies.length; i++) {
      if (this.playerCoordinates.isCollidingWith(this.parentClass.enimies[i].enemyCoordinates)) {
        return this.parentClass.enimies[i];
      }
    }
  }

  draw(context) {
    if (this.pathToMove && this.pathToMove.length) {
      context.save();
      context.translate(this.translationVector.coX, this.translationVector.coY);
      context.rotate((this.rotationDegree * this.degToRad));
      // context.fillStyle = 'red';
      // context.fillRect(0, 0, this.parentClass.width, this.parentClass.height);
      this.playerCoordinates.draw(context, this.sx, this.sy);
      context.restore();
    } else {
      context.save();
      context.translate(this.beginX, this.beginY);
      this.playerCoordinates.draw(context, this.sx, this.sy);
      context.restore();
    }
    if (this.pathToMove) {
      this.drawpath(context);
    }
  }
}
