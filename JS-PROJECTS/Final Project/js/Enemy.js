function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Enemy {
  enemyMoveInterval = 10;

  moving = false;
  enemySpeed = 0.5;

  movingId;

  pathToMove;

  searchLightRadius = 100;

  lightRays = [];

  enemyCoordinates;

  constructor(gridCell) {
    this.parentClass = gridCell.parentClass;
    this.beginX = gridCell.beginX;
    this.beginY = gridCell.beginY;
    this.width = gridCell.gridWidth;
    this.height = gridCell.gridHeight;
    this.playerImage = './images/wood_box.png';

    this.rayCast = new RayCast(this.parentClass, this.searchLightRadius);

    this.initCoordinates();
  }

  initRandomMove() {
    let row = getRandomNumber(1, this.parentClass.grids.length - 1);
    let column = getRandomNumber(1, this.parentClass.grids[row].length - 1);
    if (this.parentClass.grids[row][column].whatIs === MapComponenets.PATH) {
      this.moving = true;
      this.moveTo(this.parentClass.grids[row][column]);
    }
  }

  moveTo(grid) {
    this.pathToMove = AstarSearch.findPath(this.parentClass.grids, this.getEnemyGrid(), grid);
    this.animateMove();
  }

  animateMove() {
    this.movingId = setInterval(() => {
      if (this.pathToMove.length) {
        if (this.beginX < this.pathToMove[0].beginX || this.beginY < this.pathToMove[0].beginY) {
          this.moveByIncrement();
        } else if (this.beginX > this.pathToMove[0].beginX || this.beginY > this.pathToMove[0].beginY) {
          this.moveByDecrement();
        }
      }
    }, this.enemyMoveInterval);
  }

  moveByIncrement() {
    if (this.beginX < this.pathToMove[0].beginX) {
      this.beginX += this.enemySpeed;
    } else if (this.beginY < this.pathToMove[0].beginY) {
      this.beginY += this.enemySpeed;
    }
    if (this.beginX >= this.pathToMove[0].beginX && this.beginY >= this.pathToMove[0].beginY) {
      this.fixToGrid();
      this.pathToMove.shift();
      clearInterval(this.movingId);
      if (this.pathToMove.length) {
        this.animateMove();
      } else {
        this.moving = false;
      }
    }
    this.initCoordinates();
  }

  moveByDecrement() {
    if (this.beginX > this.pathToMove[0].beginX) {
      this.beginX -= this.enemySpeed;
    } else if (this.beginY > this.pathToMove[0].beginY) {
      this.beginY -= this.enemySpeed;
    }
    if (this.beginX <= this.pathToMove[0].beginX && this.beginY <= this.pathToMove[0].beginY) {
      this.fixToGrid();
      this.pathToMove.shift();
      clearInterval(this.movingId);
      if (this.pathToMove.length) {
        this.animateMove();
      } else {
        this.moving = false;
      }
    }
    this.initCoordinates();
  }

  getEnemyGrid() {
    for (let rowGrid of this.parentClass.grids) {
      for (let columnGrid of rowGrid) {
        if (columnGrid.equals(this)) {
          return columnGrid;
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

  initCoordinates() {
    this.enemyCoordinates = new Rect(this.beginX, this.beginY, this.width, this.height, 'red');
  }

  initRays() {
    this.lightRays = this.rayCast.castSearchLightTowards(this, this.beginX + 1, this.beginY);
  }

  drawRays(context) {
    this.adjustRays();
    this.lightRays.forEach(ray => ray.draw(context));
  }

  adjustRays() {
    this.rayCast.maintainRaysOf(this, this.beginX + 1, this.beginY);
  }

  collidingRays() {
    for (let i = 0; i < this.lightRays.length; i++) {
      
    }
  }

  draw(context) {
    this.enemyCoordinates.draw(context);
    if (!this.moving) {
      this.initRandomMove();
    }
    
    if (this.lightRays.length === 0) {
      console.log('init rays');
      this.initRays();
    }
    this.drawRays(context);
  }
}