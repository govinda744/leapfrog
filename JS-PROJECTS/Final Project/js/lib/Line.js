class Line {
  constructor(beginVector, endvector, size, color, cap) {
    this.beginX = beginVector.coX;
    this.beginY = beginVector.coY;

    this.endX = endvector.coX;
    this.endY = endvector.coY;

    this.size = size;

    this.color = color;
    this.cap = cap;
  }

  setBeginAt(beginVector) {
    this.beginX = beginVector.coX;
    this.beginY = beginVector.coY;
  }

  setEndAt(endvector) {
    this.endX = endvector.coX;
    this.endY = endvector.coY;
  }

  getMidPoint() {
    return new Vector((this.beginX + this.endX) / 2, (this.beginY + this.endY) / 2);
  }

  draw(context) {
    context.beginPath();
    context.lineWidth = this.size;
    context.lineCap = this.cap;
    if (this.color === null) {
      context.strokeStyle = "#" + ((1 << 24) * Math.random() | 0).toString(16);
      context.stroke();
    } else {
      context.strokeStyle = this.color;
    }
    context.moveTo(this.beginX, this.beginY);
    context.lineTo(this.endX, this.endY);
    context.stroke();
    context.closePath();
  }

  intersects(line) {
    let x1 = this.beginX;
    let y1 = this.beginY;

    let x2 = this.endX;
    let y2 = this.endY;

    let x3 = line.beginX;
    let y3 = line.beginY;

    let x4 = line.endX;
    let y4 = line.endY;

    let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    if (denominator === 0) {
      return false;
    }

    let numeratorA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3));

    let numeratorB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3));

    let ta = numeratorA / denominator;

    let tb = numeratorB / denominator;

    if (0 <= ta && ta <= 1 && 0 <= tb && tb <= 1) {
      return true;
    }
    return false;
  }

  getCollidingPoint(line) {
    let x1 = this.beginX;
    let y1 = this.beginY;

    let x2 = this.endX;
    let y2 = this.endY;

    let x3 = line.beginX;
    let y3 = line.beginY;

    let x4 = line.endX;
    let y4 = line.endY;

    let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    let numeratorA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3));

    let tA = numeratorA / denominator;

    let intersectionX = x1 + (tA * (x2 - x1));
    let intersectionY = y1 + (tA * (y2 - y1));

    return new Vector(intersectionX, intersectionY);
  }

}
