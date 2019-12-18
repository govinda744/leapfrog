class GridCanvas {

  constructor(parentClass, left, top, width, height, img) {
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

    return this.gridContext;
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

  draw() {
    if (this.img.complete) {
      this.gridContext.beginPath();
      this.gridContext.drawImage( this.img,0,0,100,100, 0, 0, this.width, this.height);
      this.gridContext.closePath();
    }
  }
}