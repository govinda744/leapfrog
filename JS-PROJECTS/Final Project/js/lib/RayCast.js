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
    // this.worker = new Worker('./js/lib/Worker.js');

    this.centerOfCircle = new Vector(npc.beginX + npc.width / 2, npc.beginY + npc.height / 2);

    let angleToCastOn = Math.atan((coY - npc.beginY) / (coX - npc.beginX)) * this.radToDeg;

    angleToCastOn = Math.sign(coX - npc.beginX) === -1 ? 180 : angleToCastOn;

    this.castSearchLight(angleToCastOn, this.angleOfSearchLight, context);

    // this.worker.postMessage({'angleToCast' : angleToCastOn, 'angleOfSearchLight' : this.angleOfSearchLight, 'centerOfCircle' : this.centerOfCircle, 'circleRadius' : this.circleRadius});

    // this.worker.addEventListener('message', function(event) {
    //   let rays = event.data;
    //   rays.forEach(element => {
    //     new Line(new Vector(element.beginX, element.beginY), new Vector(element.endX, element.endY), element.size, element.color, element.cap).draw(context);
    //   });
    //   this.terminate();
    // })
  }

  castSearchLight(angleToCastOn, angleOfSearchLight, context) {
    let angleToCast = angleToCastOn - angleOfSearchLight;
    let beginAt = new Vector(this.centerOfCircle.coX, this.centerOfCircle.coY);
    while (angleToCast <= angleToCastOn + angleOfSearchLight) {
      let endAt = new Vector(Math.cos(angleToCast * this.degToRadian) * this.circleRadius + this.centerOfCircle.coX, Math.sin(angleToCast * this.degToRadian) * this.circleRadius + this.centerOfCircle.coY
      );
      let ray = new Line(beginAt, endAt, 1, 'rgb(255, 255, 255, 0.8)', 'butt');
      // for (let obstacle of this.parentClass.obstacles) {
      //   if (obstacle.gridCoordinates.isCollidingWith(ray)) {
      //     ray.setEndAt(obstacle.gridCoordinates.getCollidingPoint(ray));
      //   }
      // }
      ray.draw(context);
      angleToCast += 1;
    }
  }
}
