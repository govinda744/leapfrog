class Rect {
  coordinates = [];
  constructor(beginX, beginY, width, height, fillColor, img) {
    this.beginX = beginX;
    this.beginY = beginY;
    this.height = height;
    this.width = width;
    this.leftLine = new Line(new Vector(beginX, beginY), new Vector(beginX, beginY + height));
    this.bottomLine = new Line(new Vector(beginX, beginY + height), new Vector(beginX + width, beginY + height));
    this.rightLine = new Line(new Vector(beginX + width, beginY + height), new Vector(beginX + width, beginY));
    this.topLine = new Line(new Vector(beginX + width, beginY), new Vector(beginX, beginY));
    this.fillColor = fillColor || null;
    this.img = img || null;
  }

  draw(context, beginAt) {
    if (this.fillColor !== null) {
      context.beginPath();
      if (beginAt === 0) {
        context.rect(beginAt, beginAt, this.width, this.height);
      } else {
        context.rect(this.beginX, this.beginY, this.width, this.height);
      }      
      context.fillStyle = this.fillColor;
      context.fill();
    } else if (this.img !== null) {
      let image = new Image();
      image.src = this.img;
      image.onload = function() {
        context.drawImage(image, this.beginX, this.beginY, this.width, this.height);
      }.bind(this);
    } else {
      context.beginPath();
      context.rect(this.beginX, this.beginY, this.width, this.height);
      context.stroke();
    }
  }

  isCollidingWith(line) {
    if (this.leftLine.intersects(line)) {
      return true;
    }
    if (this.bottomLine.intersects(line)) {
      return true;
    }
    if (this.rightLine.intersects(line)) {
      return true;
    }
    if (this.topLine.intersects(line)) {
      return true;
    }
    return false;
  }

  getCollidingPoint(line) {
    let beginPoint = new Vector(line.beginX, line.beginY);
    let endPoint = new Vector(line.endX, line.endY);
    let distance = beginPoint.distanceTo(endPoint);
    if (this.leftLine.intersects(line)) {
      let leftCollisionPoint = this.leftLine.getCollidingPoint(line);
      let leftDistance = beginPoint.distanceTo(leftCollisionPoint);
      if (leftDistance < distance) {
        distance = leftDistance;
        endPoint = leftCollisionPoint;
      }
    }
    if (this.bottomLine.intersects(line)) {
      let bottomCollisionPoint = this.bottomLine.getCollidingPoint(line);
      let bottomDistance = beginPoint.distanceTo(bottomCollisionPoint);
      if (bottomDistance < distance) {
        distance = bottomDistance;
        endPoint = bottomCollisionPoint;
      }
    }
    if (this.rightLine.intersects(line)) {
      let rightCollisionPoint = this.rightLine.getCollidingPoint(line);
      let rightDistance = beginPoint.distanceTo(rightCollisionPoint);
      if (rightDistance < distance) {
        distance = rightDistance;
        endPoint = rightCollisionPoint;
      }
    }
    if (this.topLine.intersects(line)) {
      let topCollisionPoint = this.topLine.getCollidingPoint(line);
      let topDistance = beginPoint.distanceTo(topCollisionPoint);
      if (topDistance < distance) {
        distance = topDistance;
        endPoint = topCollisionPoint;
      }
    }
    return endPoint;
  }
}
