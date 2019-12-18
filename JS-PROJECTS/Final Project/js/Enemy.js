function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Enemy {
  moving = false;
  enemySpeed = 0.6;

  movingId;

  pathToMove;

  enemyGrid;
  enemyGridContext;

  spriteImageOffset = 100;
  spriteImageNumbers = 6;
  spriteCounter = 7;

  lightRays;

  rotationDegree;
  rotate = 0;

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
    this.initEnemyGrid();
    this.initRayCast();
  }

  initEnemyGrid() {
    this.enemyGrid = new GridCanvas(this.parentClass, this, this.sx, this.sy, this.beginX, this.beginY, this.width, this.height, this.enemyImage);
    this.enemyGridContext = this.enemyGrid.init();
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
      this.spriteCounter --;
      if (this.spriteCounter < 0) {
        this.sx += this.spriteImageOffset;
        this.sx = this.sx > this.spriteImageNumbers * this.spriteImageOffset ? 0 : this.sx;
        this.enemyGrid.setSpriteX(this.sx);
        this.spriteCounter = 7;
      }
      if (this.beginX < this.pathToMove[0].beginX || this.beginY < this.pathToMove[0].beginY) {
        this.moveByIncrement();
      } else if (this.beginX > this.pathToMove[0].beginX || this.beginY > this.pathToMove[0].beginY) {
        this.moveByDecrement();
      }
      if (this.lightRays) {
        for (let i = 0; i < this.lightRays.length; i++) {
          if (this.parentClass.player.playerCoordinates.isCollidingWith(this.lightRays[i])) {
            this.shootAtPlayer();
            break;
          }
        }
      }
    }
  }

  shootAtPlayer() {
    this.pathToMove = undefined;
    this.lineOfFire = new Line(new Vector(this.lightRays[0].beginX, this.lightRays[0].beginY), new Vector(this.parentClass.player.beginX, this.parentClass.player.beginY), 5, 'black', 'butt');
  }

  moveByIncrement() {
    if (this.beginX < this.pathToMove[0].beginX) {
      this.beginX += this.enemySpeed;
      this.setRotationDegree('xIncreasing');
    } else if (this.beginY < this.pathToMove[0].beginY) {
      this.beginY += this.enemySpeed;
      this.setRotationDegree('yIncreasing');
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
      this.setRotationDegree('xDecreasing');
    } else if (this.beginY > this.pathToMove[0].beginY) {
      this.beginY -= this.enemySpeed;
      this.setRotationDegree('yDecreasing');
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

  setRotationDegree(inCase) {
    switch (inCase) {
      case 'yIncreasing':
        if (this.rotate === 0) {
          this.rotationDegree = 90;
        } else if (this.rotate === 90) {
          this.rotationDegree = 90;
        } else if (this.rotate === 180) {
          this.rotationDegree = 90;
        } else if (this.rotate === 270) {
          this.rotate = 90;
          this.rotationDegree = 90;
        } else if (this.rotate === 360) {
          this.rotate = 0;
          this.rotationDegree = 90;
        }
        break;
      case 'xIncreasing':
        if (this.rotate === 0) {
          this.rotate = 0;
          this.rotationDegree = 0;
        } else if (this.rotate === 90) {
          this.rotationDegree = 0;
        } else if (this.rotate === 180) {
          this.rotate = 0;
          this.rotationDegree = 0;
        } else if (this.rotate === 270) {
          this.rotationDegree = 360;
        } else if (this.rotate === 360) {
          this.rotate = 0;
          this.rotationDegree = 0;
        }
        break;
      case 'yDecreasing':
        if (this.rotate === 0) {
          this.rotate = 360;
          this.rotationDegree = 270;
        } else if (this.rotate === 90) {
          this.rotate = 270;
          this.rotationDegree = 270;
        } else if (this.rotate === 180) {
          this.rotationDegree = 270;
        } else if (this.rotate === 270) {
          this.rotationDegree = 270;
        } else if (this.rotate === 360) {
          this.rotationDegree = 270;
        }
        break;
      case 'xDecreasing':
        if (this.rotate === 0) {
          this.rotate = 180;
          this.rotationDegree = 180;
        } else if (this.rotate === 90) {
          this.rotationDegree = 180;
        } else if (this.rotate === 180) {
          this.rotate = 180;
          this.rotationDegree = 180;
        } else if (this.rotate === 270) {
          this.rotationDegree = 180;
        } else if (this.rotate === 360) {
          this.rotate = 180;
          this.rotationDegree = 180;
        }
        break;
    }
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
    this.enemyCoordinates = new Rect(this.beginX, this.beginY, this.width, this.height);
  }

  initRayCast() {
    if (this.pathToMove && this.pathToMove.length) {
      this.lightRays = this.rayCast.castSearchLightTowards(this, this.pathToMove[0].beginX, this.pathToMove[0].beginY, this.rotate);
    }
  }

  drawRays(context) {
    if (this.lightRays) {
      this.lightRays.forEach(ray => ray.draw(context));
    }
  }

  draw(context) {
    if (this.rotate < this.rotationDegree) {
      this.rotate += 5;
    } else if (this.rotate > this.rotationDegree) {
      this.rotate -= 5;
    }
    this.enemyGrid.setRotation(this.rotate);
    this.enemyGrid.setPosition(this.beginX, this.beginY);
    this.enemyGrid.draw();
    if (!this.moving) {
      this.initRandomMove();
    }
    if (this.lineOfFire !== undefined) {
      this.lineOfFire.draw(context);
      for(let i = 0; i < this.parentClass.obstacles.length; i++) {
        if (this.parentClass.obstacles[i].gridCoordinates.isCollidingWith(this.lineOfFire)) {
          this.lineOfFire = undefined;
          this.initRandomMove();
          break;
        } else {
          this.shootAtPlayer();
        }
      }
    }
    this.initRayCast(context);
    this.drawRays(context);
  }
}