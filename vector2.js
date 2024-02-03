export default class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(b) {
        return new Vector2(this.x + b.x, this.y + b.y);
    }
    sub(b) {
        return new Vector2(this.x - b.x, this.y - b.y);
    }
    mult(b) {
        return new Vector2(this.x * b.x, this.y * b.y);
    }
    div(b) {
        return new Vector2(this.x / b.x, this.y / b.y);
    }
    sqrMag() {
        return this.x**2 + this.y**2;
    }
    mag() {
        return Math.sqrt(this.sqrMag());
    }
    normalise() {
        let mag = this.mag();
        return new Vector2(this.x / mag, this.y / mag);
    }
}