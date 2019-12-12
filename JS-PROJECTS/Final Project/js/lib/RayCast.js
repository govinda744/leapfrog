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
    let angleToCast = angleToCastOn - angleOfSearchLight;
    let id = setInterval(
      function () {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(
          this.centerOfCircle.coX,
          this.centerOfCircle.coY
        );
        this.canvasContext.lineTo(
          Math.cos(angleToCast * this.degToRadian) * this.circleRadius +
          this.centerOfCircle.coX,
          Math.sin(angleToCast * this.degToRadian) * this.circleRadius +
          this.centerOfCircle.coY
        );
        this.canvasContext.lineWidth = 5;
        this.canvasContext.globalAlpha = 0.2;
        this.canvasContext.strokeStyle = "white";
        this.canvasContext.stroke();
        this.canvasContext.closePath();
        this.canvasContext.globalAlpha = 1;
        angleToCast += 1;
        if (angleToCast === angleToCastOn + angleOfSearchLight) {
          clearInterval(id);
        }
      }.bind(this)
    );
    this.canvasContext.globalAlpha = 1;
    this.parentClass.drawGrid();
  }
}
