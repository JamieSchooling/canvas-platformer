// This is a simple platformer built using the HTML canvas element. 
// It uses requestAnimationFrame to control the mainloop, in which the game updates and draws objects frame by frame.
// To play, you can use A/D or Left Arrow/Right Arrow for horizontal movement and Space/W/Up Arrow to jump.
// Press L to toggle debug view for the light renderer.

import Vector2 from "./vector2.js";
import LightRenderer from "./lightRenderer.js";
import {SceneManager} from "./scene.js";
import Input from "./input.js";

let canvas, ctx;
function initCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d", {
        willReadFrequently: true,
    });
        
    canvas.width = 1200;
    canvas.height = 800;
    SceneManager.canvas = canvas;
}

let edges = [], vertices = [];
function setEdgesAndVerts() {
    edges = [];
    vertices = []
    SceneManager.currentScene.objects.forEach(object => {
        vertices = [...vertices, ...object.vertices];
        edges = [...edges, ...object.edges];
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleLightDebugMode() {
    lightRenderer.debug = !lightRenderer.debug;
}

initCanvas();

const lightRenderer = new LightRenderer(canvas);
SceneManager.initialiseScenes();
setEdgesAndVerts();

let mousePos = new Vector2(500, 300);
canvas.addEventListener("mousemove", event => {
    mousePos = new Vector2(event.x, event.y);
});
canvas.addEventListener("keydown", Input.keyPressed);
canvas.addEventListener("keyup", Input.keyReleased);
canvas.addEventListener("keydown", e => {
    if (e.code === "KeyL") toggleLightDebugMode();
});


let lastFrameTime = 0;
function mainloop(currentTime)
{
    let deltaTime = (currentTime - lastFrameTime) / 1000;

    clearCanvas();

    SceneManager.currentScene.objects.forEach(object => {
        object.update(deltaTime);
        object.updateEdges();
    });
    SceneManager.currentScene.camera.update(deltaTime);

    setEdgesAndVerts();
    lightRenderer.draw(ctx, SceneManager.currentScene.lightPos, edges, vertices);
    
    SceneManager.currentScene.objects.forEach(object => {
        object.draw(ctx);
    }); 

    SceneManager.currentScene.title.update(deltaTime);
    SceneManager.currentScene.title.draw(ctx);

    lastFrameTime = currentTime;
    requestAnimationFrame(mainloop);
}
requestAnimationFrame(mainloop);
