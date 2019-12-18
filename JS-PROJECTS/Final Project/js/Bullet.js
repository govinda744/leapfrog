class Bullet {

  constructor(parentClass, beginX, beginY, endX, endY, atAngle) {
    this.parentClass = parentClass;

    this.beginX = beginX;
    this.beginY = beginY;

    this.endX = endX;
    this.endY = endY;

    this.atAngle = atAngle;

    this.circleRadius = 0.1;

    this.bulletRadius = 5;
  }

  shoot(context) {
    this.bulletToX = Math.cos(this.atAngle * (Math.PI / 180)) * this.circleRadius + this.beginX;
    this.bulletToY = Math.sin(this.atAngle * (Math.PI / 180)) * this.circleRadius + this.beginY;
    context.beginPath();
    context.fillStyle = 'red';
    context.arc(this.bulletToX, this.bulletToY, this.bulletRadius, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    this.circleRadius += 0.05;
  }
}