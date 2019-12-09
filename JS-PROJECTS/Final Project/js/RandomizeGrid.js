class RandomizeGrid {
  grids = [];
  constructor(gridLength, canvasHeight, canvasWidth, context) {
    this.gridLength = gridLength;
    this.height = canvasHeight;
    this.width = canvasWidth;
    this.context = context;
  }

  initGrids() {
    let upperLeftX = -this.gridLength;
    for (let rows = 0; rows < parseInt(this.width / this.gridLength); rows++) {
      upperLeftX += this.gridLength;
      let upperLeftY = -this.gridLength;
      let columsnGrid = [];
      for (
        let columns = 0;
        columns < parseInt(this.height / this.gridLength);
        columns++
      ) {
        upperLeftY += this.gridLength;
        columsnGrid[columns] = new GridCell(
          this,
          upperLeftX,
          upperLeftY,
          this.gridLength,
          this.gridLength,
          this.context
        );
      }
      this.grids.push(columsnGrid);
    }
  }

  createPath() {
    for (let rowGrid of this.grids) {
      for (let i = 0; i < rowGrid.length * 2; i++) {
        let rand = getRandomNumber(0, rowGrid.length);
        rowGrid[rand].isObstacle = false;
        rowGrid[rand].isDiagonalMoveAllowed = true;
      }
    }

    return this.grids;
  }
}
