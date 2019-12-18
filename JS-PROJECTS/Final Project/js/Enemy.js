function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Enemy {
  enemyMoveInterval = 10;

  moving = false;
  enemySpeed = 0.6;

  movingId;

  pathToMove;

  lightRays;

  rotationDegree;
  translationVector;

  degToRad = (Math.PI / 180);

  constructor(gridCell) {
    this.sx = 0;
    this.sy = 300;
    this.parentClass = gridCell.parentClass;
    this.beginX = gridCell.beginX;
    this.beginY = gridCell.beginY;
    this.width = gridCell.gridWidth;
    this.height = gridCell.gridHeight;
    this.enemyImage = new Image();
    this.enemyImage.src = './images/sprite.png';
    this.enemyImage.onload = () => { };
    this.rayCast = new RayCast(this.parentClass, this);
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
    this.update();
  }

  update() {
    if (this.pathToMove && this.pathToMove.length) {
      if (this.beginX < this.pathToMove[0].beginX || this.beginY < this.pathToMove[0].beginY) {
        this.moveByIncrement();
      } else if (this.beginX > this.pathToMove[0].beginX || this.beginY > this.pathToMove[0].beginY) {
        this.moveByDecrement();
      }
    }
  }

  moveByIncrement() {
    if (this.beginX < this.pathToMove[0].beginX) {
      this.beginX += this.enemySpeed;
      this.rotationDegree = 0;
      
    } else if (this.beginY < this.pathToMove[0].beginY) {
      this.beginY += this.enemySpeed;
      this.rotationDegree = 90;
    }
    this.translationVector = new Vector(this.beginX + this.width, this.beginY);
    if (this.beginX >= this.pathToMove[0].beginX && this.beginY >= this.pathToMove[0].beginY) {
      this.fixToGrid();
      this.pathToMove.shift();
      if (this.pathToMove.length) {
        this.update();
      } else if (this.pathToMove.length === 0) {
        this.moving = false;
      }
    }
    this.initCoordinates();
  }

  moveByDecrement() {
    if (this.beginX > this.pathToMove[0].beginX) {
      this.beginX -= this.enemySpeed;
      this.rotationDegree = 180;
    } else if (this.beginY > this.pathToMove[0].beginY) {
      this.beginY -= this.enemySpeed;
      this.rotationDegree = 270;
    }
    this.translationVector = new Vector(this.beginX, this.beginY + this.height);
    if (this.beginX <= this.pathToMove[0].beginX && this.beginY <= this.pathToMove[0].beginY) {
      this.fixToGrid();
      this.pathToMove.shift();
      if (this.pathToMove.length) {
        this.update();
      } else if (this.pathToMove.length === 0) {
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
    this.enemyCoordinates = new Rect(this.beginX, this.beginY, this.width, this.height, null, this.enemyImage, this.sx, this.sy);
  }

  initRayCast(context) {
    if (this.pathToMove && this.pathToMove.length) {
      this.lightRays = this.rayCast.castSearchLightTowards(this, this.pathToMove[0].beginX, this.pathToMove[0].beginY, context);
    }
  }

  drawRays(context) {
    if (this.lightRays) {
      this.lightRays.forEach(ray => ray.draw(context));
    }
  }

  draw(context) {
    if (this.pathToMove && this.pathToMove.length) {
      context.save();
      context.translate(this.translationVector.coX, this.translationVector.coY);
      context.rotate(this.rotationDegree * this.degToRad);
      this.enemyCoordinates.draw(context, this.sx, this.sy);
      context.restore();
    } else {
      context.save();
      context.translate(this.beginX, this.beginY);
      this.enemyCoordinates.draw(context, this.sx, this.sy);
      context.restore();
    }
    if (!this.moving) {
      this.initRandomMove();
    }
    this.initRayCast(context);
    this.drawRays(context);
  }
}