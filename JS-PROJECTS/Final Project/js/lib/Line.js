class Line {
  constructor(beginVector, endvector, context, size, color) {
    this.beginX = beginVector.coX;
    this.beginY = beginVector.coY;

    this.endX = endvector.coX;
    this.endY = endvector.coY;

    this.context = context;

    this.size = size;

    this.color = color;
  }

  draw() {
    this.context.beginPath();
    this.context.lineWidth = this.size;
    this.context.lineCap = "round";
    this.context.strokeStyle = this.color;
    this.context.moveTo(this.beginX, this.beginY);
    this.context.lineTo(this.endX, this.endY);
    this.context.stroke();
    this.context.closePath();
  }

  intersects(line) {
    let denominator =
      (line.endX - line.beginX) * (this.beginY - this.endY) -
      (this.beginX - this.endX) * (line.endY - line.beginY);

    if (denominator === 0) {
      return false;
    }

    let numeratorA =
      (line.beginY - line.endY) * (this.beginX - line.beginX) +
      (line.endX - line.beginX) * (this.beginY - line.beginY);

    let numeratorB =
      (this.beginY - this.endY) * (this.beginX - line.beginX) +
      (this.endX - this.beginX) * (this.beginY - line.beginY);

    let ta = numeratorA / denominator;

    let tb = numeratorB / denominator;

    if (0 <= ta && ta <= 1 && 0 <= tb && tb <= 1) {
      return true;
    } else {
      false;
    }
  }
}
