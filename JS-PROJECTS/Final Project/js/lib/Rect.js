class Rect {
  coordinates = [];
  constructor(beginX, beginY, width, height, context, fillColor, img) {
    this.beginX = beginX;
    this.beginY = beginY;
    this.height = height;
    this.width = width;
    this.context = context;
    this.coordinates.push(new Vector(beginX, beginY));
    this.coordinates.push(new Vector(beginX, beginY + height));
    this.coordinates.push(new Vector(beginX + width, beginY + height));
    this.coordinates.push(new Vector(beginX + width, beginY));
    this.fillColor = fillColor || null;
    this.img = img || null;
  }

  draw() {
    if (this.fillColor !== null) {
      this.context.beginPath();
      this.context.rect(this.beginX, this.beginY, this.width, this.height);
      this.context.fillStyle = this.fillColor;
      this.context.fill();
    } else {
      this.context.beginPath();
      this.context.rect(this.beginX, this.beginY, this.width, this.height);
      this.context.stroke();
    }
  }
}
