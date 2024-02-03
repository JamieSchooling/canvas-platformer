export default class Title{
    constructor(text) {
        this.text = text;
        this.fadeSpeed = 0.4;
        this.alpha = 0;
    }

    update(deltaTime) {
        if (this.alpha <= 1 && this.alpha > 0) {
            this.alpha -= this.fadeSpeed * deltaTime;
        }
        else {
            this.alpha = 0;
        }
    }

    draw(ctx) {
        ctx.font = '150px Roboto Slab';
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fillText(this.text, 620, 300);   
    }

    show() {
        this.alpha = 1;
    }
}