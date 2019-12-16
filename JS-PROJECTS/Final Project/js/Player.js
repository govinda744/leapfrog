class Player {
  playerMoveInterval = 10;

  playerSpeed = 4;

  pathToMove;
  movingId;

  constructor(gridCell) {
    this.parentClass = gridCell.parentClass;
    this.beginX = gridCell.beginX;
    this.beginY = gridCell.beginY;
    this.width = gridCell.gridWidth;
    this.height = gridCell.gridHeight;
    this.playerImage = './images/wood_box.png';

    this.initCoordinates();
  }

  setPlayerSpeed(speed) {
    this.playerSpeed = speed;
  }

  initCoordinates() {
    this.playerCoordinates = new Rect(this.beginX, this.beginY, this.width, this.height, 'green');
  }

  follow(enemy) {
    if (enemy) {
      this.pathToMove = AstarSearch.findPath(this.parentClass.grids, this.getPlayerGrid(), this.getEnemyGrid(enemy));
      this.animateMove();
    }
  }

  moveTo(grid) {
    this.pathToMove = AstarSearch.findPath(this.parentClass.grids, this.getPlayerGrid(), grid);
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
    }, this.playerMoveInterval);
  }

  moveByIncrement() {
    if (this.beginX < this.pathToMove[0].beginX) {
      this.beginX += this.playerSpeed;
    } else if (this.beginY < this.pathToMove[0].beginY) {
      this.beginY += this.playerSpeed;
    }
    if (this.beginX >= this.pathToMove[0].beginX && this.beginY >= this.pathToMove[0].beginY) {
      this.fixToGrid();
      this.pathToMove.shift();
      clearInterval(this.movingId);
      if (this.pathToMove.length) {
        this.animateMove();
      }
    }
    this.initCoordinates();
  }

  moveByDecrement() {
    if (this.beginX > this.pathToMove[0].beginX) {
      this.beginX -= this.playerSpeed;
    } else if (this.beginY > this.pathToMove[0].beginY) {
      this.beginY -= this.playerSpeed;
    }
    if (this.beginX <= this.pathToMove[0].beginX && this.beginY <= this.pathToMove[0].beginY) {
      this.fixToGrid();
      this.pathToMove.shift();
      clearInterval(this.movingId);
      if (this.pathToMove.length) {
        this.animateMove();
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
      this.initCoordinates()
    }
  }

  getPlayerGrid() {
    for (let rowGrid of this.parentClass.grids) {
      for (let columnGrid of rowGrid) {
        if (columnGrid.equals(this)) {
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

  draw(context) {
    // if (this.pathToMove && this.pathToMove.length >= 2) {
    //   context.save();
    //   context.translate(this.beginX, this.beginY);
    //   let rotateAngle = (this.pathToMove[0].beginY - this.pathToMove[1].beginY) / (this.pathToMove[0].beginX - this.pathToMove[1].beginX);
    //   console.log(rotateAngle);
    //   context.rotate(rotateAngle - 1);
    //   this.playerCoordinates.draw(context, 0);
    //   context.restore();
    // } else {
    this.playerCoordinates.draw(context);
    // }
    if (this.pathToMove) {
      this.drawpath(context);
    }
  }
}
