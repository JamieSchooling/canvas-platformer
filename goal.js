import GameObject from "./gameobject.js";

export default class Goal extends GameObject {
    constructor(position, width, height, sceneIndex, colour = "#8ac4ff") {
        super(position, width, height, colour);
        this.scene = sceneIndex;
    }
}