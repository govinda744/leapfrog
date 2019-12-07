class Rect {
    coordinates = [];
    constructor(beginX, beginY, width, height, context, fillColor, boundaryColor) {
        this.beginX = beginX;
        this.beginY = beginY;
        this.height = height;
        this.width = width;
        this.context = context;
        this.coordinates.push(new Vector(beginX, beginY));
        this.coordinates.push(new Vector(beginX,beginY + height));
        this.coordinates.push(new Vector(beginX + width, beginY + height));
        this.coordinates.push(new Vector(beginX + width, beginY));
        this.fillColor = fillColor || null;
        this.boundaryColor = boundaryColor || null;
    }

    draw() {
        this.context.beginPath();
        this.context.rect(this.beginX, this.beginY, this.width, this.height);
        if (this.fillColor) {
            this.context.fillStyle = this.fillColor;
            this.context.stroke();
        } else {
            this.context.stroke();
        }
        this.context.closePath();
    }
}