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

    this.obstacleImage = new Image();
    this.obstacleImage.src = './images/wood_box.png';
    this.obstacleImage.onload = ()=>{};

    this.tileImage = new Image();
    this.tileImage.src = './images/tile-new.png';
    this.tileImage.onload = () => {};

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
      this.gridCoordinates.img = this.tileImage;
      this.gridCoordinates.draw(context);
    } else if (this.whatIs === MapComponenets.OBSTACLE){
      this.gridCoordinates.img = this.obstacleImage;
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
