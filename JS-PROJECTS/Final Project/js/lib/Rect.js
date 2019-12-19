class Rect {
  coordinates = [];
  constructor(beginX, beginY, width, height, fillColor, img) {
    this.sWidth = 100;
    this.sHeight = 100;
    this.sOffset = 10;
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

  draw(context, sx, sy) {
    if (this.fillColor !== null) {
      context.beginPath();
      context.rect(this.beginX, this.beginY, this.width, this.height);
      context.fillStyle = '#ffffff00';
      context.fill();
    } else if (this.img !== null) {
      if (this.img.complete) {
        if (sx !== undefined && sy !== undefined) {
          context.drawImage(this.img, sx, sy, this.sWidth, this.sHeight, 0, 0, this.width, this.height);
        } else {
          context.drawImage(this.img, this.beginX, this.beginY, this.width, this.height);
        }
      }
    } else {
      context.beginPath();
      context.rect(this.beginX, this.beginY, this.width, this.height);
      context.fillStyle = '#ffffff00';
      context.fill();
    }
  }

  isCollidingWith(something) {
    if (something instanceof Line) {
      if (this.leftLine.intersects(something)) {
        return true;
      }
      if (this.bottomLine.intersects(something)) {
        return true;
      }
      if (this.rightLine.intersects(something)) {
        return true;
      }
      if (this.topLine.intersects(something)) {
        return true;
      }

      return false;
    } else if (something instanceof Rect) {
      if (something.isCollidingWith(this.leftLine)) {
        return true;
      }
      if (something.isCollidingWith(this.bottomLine)) {
        return true;
      }
      if (something.isCollidingWith(this.rightLine)) {
        return true;
      }
      if (something.isCollidingWith(this.topLine)) {
        return true;
      }

      return false;
    }
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
