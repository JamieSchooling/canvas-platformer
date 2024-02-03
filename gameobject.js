import { SceneManager } from "./scene.js";
import Vector2 from "./vector2.js";

export default class GameObject {
    constructor(position, width, height, colour = "#00285c") {
        this.position = position;
        this.width = width;
        this.height = height;
        this.vertices = [position, new Vector2(position.x + width, position.y), new Vector2(position.x + width, position.y + height), new Vector2(position.x, position.y + height)]
        this.edges = [
            [this.vertices[3], this.vertices[0]],
            [this.vertices[0], this.vertices[1]],
            [this.vertices[1], this.vertices[2]],
            [this.vertices[2], this.vertices[3]],
        ]
        this.colour = colour;
    }

    update(deltaTime) {
        
    }

    updateEdges() {
        this.vertices = [
            this.position, 
            new Vector2(this.position.x + this.width, this.position.y), 
            new Vector2(this.position.x + this.width, this.position.y + this.height), 
            new Vector2(this.position.x, this.position.y + this.height)
        ]
        this.edges = [
            [this.vertices[3], this.vertices[0]],
            [this.vertices[0], this.vertices[1]],
            [this.vertices[1], this.vertices[2]],
            [this.vertices[2], this.vertices[3]],
        ]
    }

    draw(ctx) {
        let screenX, screenY;
        screenX = this.position.x - SceneManager.currentScene.camera.position.x;        
        screenY = this.position.y - SceneManager.currentScene.camera.position.y;
        ctx.fillStyle = this.colour;
        ctx.fillRect(screenX, screenY, this.width, this.height);
    }

    reset() {
        
    }
}