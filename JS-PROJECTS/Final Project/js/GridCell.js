class GridCell {
  functionalDistance;
  heuristicDistance;
  gFunctionDistance;
  visited;
  closed;
  parent;
  whatIs;

  constructor(parentClass, beginX, beginY, gridWidth, gridHeight) {
    this.parentClass = parentClass;
    this.beginX = beginX;
    this.beginY = beginY;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.init();
  }

  init() {
    this.gridCoordinates = new Rect( this.beginX, this.beginY, this.gridWidth, this.gridHeight);
  }

  isWall() {
    return this.whatIs;
  }

  draw(context) {
    if (this.whatIs === MapComponenets.PATH) {
      this.gridCoordinates.fillColor = "#d5d5d5";
      this.gridCoordinates.draw(context);
    } else if (this.whatIs === MapComponenets.OBSTACLE){
      this.gridCoordinates.fillColor = "#966F33";
      this.gridCoordinates.draw(context);
    }
  }

  includes(vectorCordinate) {
    return (
      this.beginX <= vectorCordinate.coX &&
      this.beginY <= vectorCordinate.coY &&
      this.beginX + this.gridHeight >= vectorCordinate.coX &&
      this.beginY + this.gridWidth >= vectorCordinate.coY
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
