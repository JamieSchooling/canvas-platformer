import Vector2 from "./vector2.js";

export default class Camera {
    constructor(canvas, position, player) {
        this.canvas = canvas;
        this.startPos = new Vector2(position.x, position.y - 200);
        this.position = this.startPos;
        this.player = player;

        this.followSpeed = 2.5;
    }

    update(deltaTime) {
        let canvasOffset = new Vector2(this.canvas.width / 2, this.canvas.height / 2);
        let playerPos = this.player.position.sub(canvasOffset);
        this.position.x += (playerPos.x - this.position.x) * this.followSpeed * deltaTime;
    }
    
    reset() {
        this.position = this.startPos;
    }
}