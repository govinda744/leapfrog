class RayCast {
  constructor(parentClass, npc) {
    this.npc = npc;
    
    this.parentClass = parentClass;

    this.angleOfSearchLight = 20;
    this.degToRadian = Math.PI / 180;
    this.radToDeg = 180 / Math.PI;

    this.centerOfCircle = null;
    this.circleRadius = 100;
  }

  castSearchLightTowards(npc, coX, coY) {
    this.centerOfCircle = npc.enemyCoordinates.rightLine.getMidPoint();

    let angleToCastOn = Math.atan((coY - npc.beginY) / (coX - npc.beginX)) * this.radToDeg;

    angleToCastOn = Math.sign(coX - npc.beginX) === -1 ? 180 : angleToCastOn;

    return this.castSearchLight(angleToCastOn, this.angleOfSearchLight);
  }

  castSearchLight(angleToCastOn, angleOfSearchLight) {
    let rays = [];
    let angleToCast = angleToCastOn - angleOfSearchLight;
    let beginAt = new Vector(this.centerOfCircle.coX, this.centerOfCircle.coY);
    while (angleToCast <= angleToCastOn + angleOfSearchLight) {
      let endAt = new Vector(Math.cos(angleToCast * this.degToRadian) * this.circleRadius + this.centerOfCircle.coX, Math.sin(angleToCast * this.degToRadian) * this.circleRadius + this.centerOfCircle.coY
      );
      let ray = new Line(beginAt, endAt, 1, 'rgb(255, 255, 255, 0.8)', 'butt');
      for (let rowGrid of this.parentClass.grids) {
        for (let columnGrid of rowGrid) {
          if (columnGrid.whatIs === MapComponenets.OBSTACLE) {
            if (columnGrid.gridCoordinates.isCollidingWith(ray)) {
              ray.setEndAt(columnGrid.gridCoordinates.getCollidingPoint(ray));
            }
          }
        }
      }
      rays.push(ray);
      angleToCast += 1;
    }
    return rays;
  }

  maintainRaysOf(npc, coX, coY) {
    this.centerOfCircle = npc.enemyCoordinates.rightLine.getMidPoint();

    let angleToCastOn = Math.atan((coY - npc.beginY) / (coX - npc.beginX)) * this.radToDeg;

    let angleToCast = angleToCastOn - this.angleOfSearchLight;

    npc.lightRays.forEach(ray => {
      ray.setBeginAt(this.centerOfCircle);
      let endAt = new Vector(Math.cos(angleToCast * this.degToRadian) * this.circleRadius + this.centerOfCircle.coX, Math.sin(angleToCast * this.degToRadian) * this.circleRadius + this.centerOfCircle.coY);
      ray.setEndAt(endAt);
      for (let rowGrid of this.parentClass.grids) {
        for (let columnGrid of rowGrid) {
          if (columnGrid.whatIs === MapComponenets.OBSTACLE) {
            if (columnGrid.gridCoordinates.isCollidingWith(ray)) {
              ray.setEndAt(columnGrid.gridCoordinates.getCollidingPoint(ray));
            }
          }
        }
      }
      angleToCast += 1;
    });
  }
}
