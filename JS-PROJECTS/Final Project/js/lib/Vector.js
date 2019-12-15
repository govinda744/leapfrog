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