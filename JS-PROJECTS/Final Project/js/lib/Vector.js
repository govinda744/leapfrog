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
}
