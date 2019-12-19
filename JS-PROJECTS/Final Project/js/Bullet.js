class Bullet {

  SHOOTDELAY = 1000;

  constructor(parentClass, lineOfFire, atAngle) {
    this.parentClass = parentClass;

    this.lineOfFire = lineOfFire;

    this.shotPlayer = false;

    this.beginX = lineOfFire.beginX;
    this.beginY = lineOfFire.beginY;

    this.endX = lineOfFire.endX;
    this.endY = lineOfFire.endY;

    this.atAngle = atAngle;

    this.circleRadius = 0.1;

    this.bulletRadius = 5;

    this.shootTime = 1;
  }

  shoot(context) {
    if (this.shootTime % this.SHOOTDELAY === 0) {
      this.bulletToX = Math.cos(this.atAngle * (Math.PI / 180)) * this.circleRadius + this.beginX;
      this.bulletToY = Math.sin(this.atAngle * (Math.PI / 180)) * this.circleRadius + this.beginY;
      context.beginPath();
      let distanceOflineOfFire = new Vector(this.lineOfFire.beginX, this.lineOfFire.beginY).distanceTo(new Vector(this.lineOfFire.endX, this.lineOfFire.endY));
      let distanceTraveledByBullet = new Vector(this.lineOfFire.beginX, this.lineOfFire.beginY).distanceTo(new Vector(this.bulletToX, this.bulletToY));
      if (distanceOflineOfFire <= distanceTraveledByBullet) {
        context.fillStyle = '#ffffff00';
      } else {
        context.fillStyle = 'red';
      }
      if (!this.shotPlayer && (distanceOflineOfFire <= distanceTraveledByBullet)) {
        this.parentClass.killPlayer();
        this.shotPlayer = true;
      }

      context.arc(this.bulletToX, this.bulletToY, this.bulletRadius, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
      this.circleRadius += 0.05;
    } else {
      this.shootTime++;
    }
  }
}