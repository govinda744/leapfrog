class Player {
  playerMoveInterval = 200;

  constructor(parentClass, beginX, beginY, width, height, context) {
    this.parentClass = parentClass;
    this.beginX = beginX;
    this.beginY = beginY;
    this.width = width;
    this.height = height;
    this.context = context;
    this.playerImage = './images/wood_box.png';
    this.init();
  }

  init() {
    this.playerCoordinates = new Rect(
      this.beginX,
      this.beginY,
      this.width,
      this.height,
      this.context,
      'green'
    );
    this.draw();
  }

  moveTo(grid) {
    this.context.clearRect(this.beginX, this.beginY, this.width, this.height);
    this.beginX = grid.beginX;
    this.beginY = grid.beginY;
    this.playerCoordinates.beginX = this.beginX;
    this.playerCoordinates.beginY = this.beginY;
    this.draw();
  }

  draw() {
    this.playerCoordinates.draw();
  }
}
