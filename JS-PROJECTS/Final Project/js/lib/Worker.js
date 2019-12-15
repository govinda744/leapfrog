self.addEventListener('message', function (event) {
  let angleToCastOn = event.data.angleToCast;
  let angleOfSearchLight = event.data.angleOfSearchLight;
  let centerOfCircle = new Vector(event.data.centerOfCircle.coX, event.data.centerOfCircle.coY);
  let circleRadius = event.data.circleRadius;
  this.self.postMessage(castSearchLight(angleToCastOn, angleOfSearchLight, centerOfCircle, circleRadius));
});

function castSearchLight(angleToCastOn, angleOfSearchLight, centerOfCircle, circleRadius) {
  let rays = [];
  degToRadian = Math.PI / 180;
  radToDeg = 180 / Math.PI;
  let angleToCast = angleToCastOn - angleOfSearchLight;
  let beginAt = new Vector(centerOfCircle.coX, centerOfCircle.coY);
  while (angleToCast <= angleToCastOn + angleOfSearchLight) {
    let endAt = new Vector(Math.cos(angleToCast * degToRadian) * circleRadius + centerOfCircle.coX, Math.sin(angleToCast * degToRadian) * circleRadius + centerOfCircle.coY);
    let ray = new Line(beginAt, endAt, 1, 'rgb(255, 255, 255, 0.7)', 'butt');
    // for (let rowGrid of this.parentClass.grids) {
    //   for (let columnGrid of rowGrid) {
    //     if (columnGrid.whatIs === MapComponenets.OBSTACLE) {
    //       if (columnGrid.gridCoordinates.isCollidingWith(ray)) {
    //         ray.setEndAt(columnGrid.gridCoordinates.getCollidingPoint(ray));
    //       }
    //     }
    //   }
    // }
    rays.push(ray);
    angleToCast += 1;
  }
  return rays;
}

class Vector {
  constructor(coX, coY, angle) {
    this.coX = coX;
    this.coY = coY;

    if (angle) {
      this.angle = angle;
    }
  }

  equals(vector) {
    if (this.coY !== vector.coY) {
      return false;
    }
    if (this.coX !== vector.coX) {
      return false;
    }
    return true;
  }

  distanceTo(aVect) {
    return Math.sqrt(Math.pow((aVect.coX - this.coX), 2) + Math.pow((aVect.coY - this.coY), 2));
  }
}

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

  // isCollidingWith(rect) {

  // }

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
