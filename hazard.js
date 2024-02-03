import GameObject from "./gameobject.js";

export default class Hazard extends GameObject {
    constructor(position, width, height, colour = "#111d27") {
        super(position, width, height, colour);
    }
}