class GridCanvas {

  constructor(parentClass, gridContent, sx, sy, left, top, width, height, img) {
    this.sx = sx;
    this.sy = sy;

    this.sWidth = 100;
    this.sHeight = 100;

    this.gridContent = gridContent;
    this.parentClass = parentClass;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;

    this.img = img;
  }

  init() {
    this.gridCanvas = document.createElement('canvas');
    this.gridContext = this.gridCanvas.getContext('2d');

    this.gridCanvas.style.zIndex = 10;
    this.gridCanvas.style.position = 'absolute';

    this.gridCanvas.style.top = this.top + 'px';
    this.gridCanvas.style.left = this.left + 'px';

    this.parentClass.gameContainerClass.gameContainerElement.appendChild(this.gridCanvas);

    this.gridCanvas.width = this.width;
    this.gridCanvas.height = this.height;

    this.initMouseEvent();

    return this.gridContext;
  }

  initMouseEvent() {
    this.gridCanvas.addEventListener('mousedown', (event) => {
      this.parentClass.player.follow(this.gridContent);
    });
  }

  setPosition(left, top) {
    this.top = top;
    this.left = left;

    this.gridCanvas.style.top = this.top + 'px';
    this.gridCanvas.style.left = this.left + 'px';

    this.parentClass.gameContainerClass.gameContainerElement.appendChild(this.gridCanvas);
  }

  setRotation(deg) {
    this.gridCanvas.style.transform = 'rotate('+deg+'deg)';
  }

  setSpriteX(sx) {
    this.sx = sx;
  }

  draw() {
    if (this.img.complete) {
      this.gridContext.clearRect(0, 0, this.width, this.height);
      this.gridContext.beginPath();
      this.gridContext.drawImage(this.img, this.sx, this.sy, this.sWidth, this.sHeight, 0, 0, this.width, this.height);
      this.gridContext.closePath();
    }
  }
}