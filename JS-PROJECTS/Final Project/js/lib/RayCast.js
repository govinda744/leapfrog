class RayCast {
  constructor(parentClass) {
    this.parentClass = parentClass;

    this.angleOfSearchLight = 20;
    this.degToRadian = Math.PI / 180;
    this.radToDeg = 180 / Math.PI;

    this.worker;

    this.centerOfCircle = null;
    this.circleRadius = 100;
  }

  castSearchLightTowards(npc, coX, coY, context) {

    this.centerOfCircle = new Vector(npc.beginX + npc.width / 2, npc.beginY + npc.height / 2);

    let angleToCastOn = Math.atan((coY - npc.beginY) / (coX - npc.beginX)) * this.radToDeg;

    angleToCastOn = Math.sign(coX - npc.beginX) === -1 ? 180 : angleToCastOn;

    this.castSearchLight(angleToCastOn, this.angleOfSearchLight, context);
  }

  castSearchLight(angleToCastOn, angleOfSearchLight, context) {
    let angleToCast = angleToCastOn - angleOfSearchLight;
    let beginAt = new Vector(this.centerOfCircle.coX, this.centerOfCircle.coY);
    while (angleToCast <= angleToCastOn + angleOfSearchLight) {
      let endAt = new Vector(Math.cos(angleToCast * this.degToRadian) * this.circleRadius + this.centerOfCircle.coX, Math.sin(angleToCast * this.degToRadian) * this.circleRadius + this.centerOfCircle.coY
      );
      let ray = new Line(beginAt, endAt, 1, 'rgb(255, 255, 255, 0.5)', 'butt');
      for (let obstacle of this.parentClass.obstacles) {
        if (new Vector(obstacle.beginX, obstacle.beginY).distanceTo(this.centerOfCircle) < this.circleRadius || new Vector(obstacle.beginX + obstacle.gridWidth, obstacle.beginY + obstacle.gridHeight).distanceTo(this.centerOfCircle) < this.circleRadius) {
          if (obstacle.gridCoordinates.isCollidingWith(ray)) {
            ray.setEndAt(obstacle.gridCoordinates.getCollidingPoint(ray));
          }
        }
      }
      ray.draw(context);
      angleToCast += 1;
    }
  }
}
