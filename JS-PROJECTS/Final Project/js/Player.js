class Player {
  playerSpeed = 3;
  pathToMove;

  followingEnemy;

  playerGrid;
  playerGridContext;

  spriteImageOffset = 100;
  spriteImageNumbers = 6;

  rotationDegree;
  rotate = 0;

  constructor(gridCell) {
    this.sx = 0;
    this.sy = 0;

    this.parentClass = gridCell.parentClass;
    this.beginX = gridCell.beginX;
    this.beginY = gridCell.beginY;
    this.width = gridCell.gridWidth;
    this.height = gridCell.gridHeight;
    this.playerImage = new Image();
    this.playerImage.src = './images/sprite.png';
    this.playerImage.onload = () => { };

    this.initCoordinates();
    this.initPlayerGrid();
  }

  initPlayerGrid() {
    this.playerGrid = new GridCanvas(this.parentClass, this, this.sx, this.sy, this.beginX, this.beginY, this.width, this.height, this.playerImage);
    this.playerGridContext = this.playerGrid.init();
  }

  setPlayerSpeed(speed) {
    this.playerSpeed = speed;
  }

  initCoordinates() {
    this.playerCoordinates = new Rect(this.beginX, this.beginY, this.width, this.height);
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
      this.sx += this.spriteImageOffset;
      this.sx = this.sx > this.spriteImageNumbers * this.spriteImageOffset ? 0 : this.sx;
      this.playerGrid.setSpriteX(this.sx);
      if (this.beginX < this.pathToMove[0].beginX || this.beginY < this.pathToMove[0].beginY) {
        this.moveByIncrement();
      } else if (this.beginX > this.pathToMove[0].beginX || this.beginY > this.pathToMove[0].beginY) {
        this.moveByDecrement();
      }
    }
  }

  killEnemy(enemy) {
    this.parentClass.deleteEnemy(enemy);
    this.parentClass.gameContainerClass.gameContainerElement.removeChild(enemy.enemyGrid.gridCanvas);
  }

  moveByIncrement() {
    if (this.beginX < this.pathToMove[0].beginX) {
      this.beginX += this.playerSpeed;
      this.setRotationDegree('xIncreasing');

    } else if (this.beginY < this.pathToMove[0].beginY) {
      this.beginY += this.playerSpeed;
      this.setRotationDegree('yIncreasing');
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
      this.setRotationDegree('xDecreasing');
    } else if (this.beginY > this.pathToMove[0].beginY) {
      this.beginY -= this.playerSpeed;
      this.setRotationDegree('yDecreasing');
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
    return this.parentClass.grids[Math.floor(this.beginX / this.width)][Math.floor(this.beginY / this.height)];
  }

  getEnemyGrid(enemy) {
    return this.parentClass.grids[Math.floor(enemy.beginX / enemy.width)][Math.floor(enemy.beginY / enemy.height)];
  }

  collidingWithEnemy() {
    for (let i = 0; i < this.parentClass.enimies.length; i++) {
      if (this.playerCoordinates.isCollidingWith(this.parentClass.enimies[i].enemyCoordinates)) {
        return this.parentClass.enimies[i];
      }
    }
  }

  draw(context) {
    if (this.rotate < this.rotationDegree) {
      this.rotate += 10;
    } else if (this.rotate > this.rotationDegree) {
      this.rotate -= 10;
    }
    this.playerGrid.setRotation(this.rotate);
    this.playerGrid.setPosition(this.beginX, this.beginY);
    this.playerGrid.draw();
    if (this.pathToMove) {
      this.drawpath(context);
    }
  }
}
