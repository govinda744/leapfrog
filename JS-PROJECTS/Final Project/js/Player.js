class Player {

  playerMoveInterval = 60;

  constructor(parentClass, beginX, beginY, width, height, context) {
    this.parentClass = parentClass;
    this.beginX = beginX;
    this.beginY = beginY;
    this.width = width;
    this.height = height;
    this.context = context;
    this.init();
  }

  init() {
    this.playerCoordinates = new Rect(
      this.beginX,
      this.beginY,
      this.width,
      this.height,
      this.context,
      "green"
    );
    this.draw();
  }

  moveTo(grid) {
    this.context.clearRect(this.beginX, this.beginY, this.width, this.height);
    this.beginX = grid.beginX;
    this.beginY = grid.beginY;
    delete this.playerCoordinates;
    this.playerCoordinates = new Rect(
      grid.beginX,
      grid.beginY,
      this.width,
      this.height,
      this.context,
      "green"
    );
    this.draw();
  }

  draw() {
    this.playerCoordinates.draw();
  }
}
