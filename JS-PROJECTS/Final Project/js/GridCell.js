class GridCell {
  functionalDistance;
  heuristicDistance;
  gFunctionDistance;
  visited;
  closed;
  parent;
  isObstacle = true;

  constructor(parentClass, beginX, beginY, gridWidth, gridHeight, context) {
    this.parentClass = parentClass;
    this.beginX = beginX;
    this.beginY = beginY;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.context = context;
    this.init();
  }

  setFunctionalDistance(functionalDistance) {
    this.functionalDistance = functionalDistance;
  }

  setGFunctionalDistance(gFunctionDistance) {
    this.gFunctionDistance = gFunctionDistance;
  }

  setHeuristicDistance(heuristicDistance) {
    this.heuristicDistance = heuristicDistance;
  }

  init() {
    this.isObstacle = true;
    this.gridCoordinates = new Rect(
      this.beginX,
      this.beginY,
      this.gridWidth,
      this.gridHeight,
      this.context,
      "red"
    );
  }

  isWall() {
    return this.isObstacle;
  }

  draw() {
    if (!this.isObstacle) {
      this.gridCoordinates.fillColor = "#d5d5d5";
      this.gridCoordinates.draw();
    } else {
      this.gridCoordinates.draw();
    }
  }

  includes(vectorCordinate) {
    return (
      this.beginX < vectorCordinate.coX &&
      this.beginY < vectorCordinate.coY &&
      this.beginX + this.gridHeight > vectorCordinate.coX &&
      this.beginY + this.gridWidth > vectorCordinate.coY
    );
  }

  equals(gridCell) {
    if (this.beginX !== gridCell.beginX) {
      return false;
    }
    if (this.beginY !== gridCell.beginY) {
      return false;
    }

    return true;
  }
}
