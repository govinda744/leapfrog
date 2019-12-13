class RayCast {
  constructor(parentClass, canvasContext) {
    this.canvasContext = canvasContext;
    this.parentClass = parentClass;

    this.angleOfSearchLight = 30;
    this.degToRadian = Math.PI / 180;
    this.radToDeg = 180 / Math.PI;

    this.centerOfCircle = null;
    this.circleRadius = 150;
  }

  castSearchLightTowards(coX, coY) {
    this.centerOfCircle = new Vector(
      coX + this.parentClass.playerClass.width / 2,
      coY + this.parentClass.playerClass.height / 2
    );

    let angleToCastOn =
      Math.atan(
        (coY - this.parentClass.playerClass.beginY) /
        (coX - this.parentClass.playerClass.beginX)
      ) * this.radToDeg;

    angleToCastOn =
      Math.sign(coX - this.parentClass.playerClass.beginX) === -1
        ? 180
        : angleToCastOn;

    this.castSearchLight(angleToCastOn, this.angleOfSearchLight);
  }

  castSearchLight(angleToCastOn, angleOfSearchLight) {
    this.canvasContext.clearRect(
      0,
      0,
      this.parentClass.width,
      this.parentClass.height
    );
    this.parentClass.drawGrid();
    let angleToCast = angleToCastOn - angleOfSearchLight;
    let beginAt = new Vector(
      this.centerOfCircle.coX,
      this.centerOfCircle.coY
    );
    while (angleToCast <= angleToCastOn + angleOfSearchLight) {
      let endAt = new Vector(
        Math.cos(angleToCast * this.degToRadian) * this.circleRadius +
        this.centerOfCircle.coX,
        Math.sin(angleToCast * this.degToRadian) * this.circleRadius +
        this.centerOfCircle.coY
      );
      let ray = new Line(beginAt, endAt, this.canvasContext, 1, 'rgb(255, 255, 255, 0.2)', 'butt');
      for (let rowGrid of this.parentClass.grids) {
        for (let columnGrid of rowGrid) {
          if (columnGrid.isObstacle) {
            if (columnGrid.gridCoordinates.isCollidingWith(ray)) {
              ray.setEndAt(columnGrid.gridCoordinates.getCollidingPoint(ray));
            }
          }
        }
      }
      ray.draw();
      angleToCast += 0.1;
    }
  }
}
