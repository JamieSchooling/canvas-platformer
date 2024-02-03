import Camera from "./camera.js";
import GameObject from "./gameobject.js";
import Goal from "./goal.js";
import Hazard from "./hazard.js";
import Title from "./levelTitle.js";
import Player from "./player.js";
import Vector2 from "./vector2.js";

export default class Scene {

    constructor(title) {
        this.objects = [];
        this.lightPos = new Vector2(1, 1);
        this.lightColour = "#006aff";
        this.shadowColour = "#0044a3";
        this.camera;
        this.title = new Title(title);
        this.levelUpSFX = new Audio("audio/levelup.mp3");
    }

    addObject(object) {
        this.objects.push(object);
    }

    addCamera(camera) {
        this.camera = camera;
    }

    showTitle() {
        this.title.show();
    }

    reset() {
        this.objects.forEach(obj => {
            obj.reset();
        })
        this.camera.reset();
        this.levelUpSFX.play();
    }    
}

export class SceneManager {    
    static currentScene;
    static scenes = []
    static currentSceneIndex = 0;
    static canvas;

    static loadScene(sceneIndex) {
        this.currentSceneIndex = sceneIndex;
        this.currentScene = this.scenes[this.currentSceneIndex];
        this.canvas.style.backgroundColor = this.currentScene.shadowColour;
        this.currentScene.reset();
        this.currentScene.showTitle();
    }

    static initialiseScenes() {
        this.#createScene1();
        this.#createScene2();
        this.#createScene3();
        this.loadScene(0);
    }

    static #createScene1() {    
        let scene = new Scene("Level 1");
        let player = new Player(new Vector2(100, 200), "#3399ff");
        scene.addObject(player);

        let lowerBoundHazard = new Hazard(new Vector2(-1000, 800), 5000, 300);
        let platform1 = new GameObject(new Vector2(50, 400), 200, 400);
        let hazard1 = new Hazard(new Vector2(250, 690), 950, 50);
        let hazard1Bottom = new GameObject(new Vector2(250, 740), 950, 100);
        let platform2 = new GameObject(new Vector2(500, 550), 100, 40);
        let platform3 = new GameObject(new Vector2(800, 450), 100, 40);
        let platform4 = new GameObject(new Vector2(1200, 300), 100, 500);
        let platform5 = new GameObject(new Vector2(1300, 250), 100, 550);
        let hazard2 = new Hazard(new Vector2(1400, 360), 250, 40);
        let hazard2Bottom = new GameObject(new Vector2(1400, 400), 250, 40);
        let platform6 = new GameObject(new Vector2(1800, 650), 100, 40);
        let hazard3 = new Hazard(new Vector2(2000, 500), 80, 40);
        let hazard3Bottom = new GameObject(new Vector2(2000, 540), 80, 260);
        let platform7 = new GameObject(new Vector2(2200, 550), 100, 40);
        let goal = new Goal(new Vector2(2700, -100), 1000, 1000, 1);
        
        let objects = [lowerBoundHazard, platform1, hazard1, hazard1Bottom, platform2, platform3, 
            platform4, platform5, hazard2, hazard2Bottom, platform6, hazard3, hazard3Bottom, platform7, goal];
        objects.forEach(obj => {
            scene.addObject(obj);
        });
        let camera = new Camera(canvas, new Vector2(100, 200), player);
        scene.addCamera(camera);
        scene.lightPos = new Vector2(4000, -2000);
        scene.lightColour = "#006aff";
        scene.shadowColour = "#0044a3";
        SceneManager.scenes.push(scene);
    }

    static #createScene2() {
        let scene = new Scene("Level 2");
        let player = new Player(new Vector2(100, 200), "#ff3333");
        scene.addObject(player);

        let lowerBoundHazard = new Hazard(new Vector2(-1000, 800), 5000, 300, "#271111");
        let platform1 = new GameObject(new Vector2(50, 700), 200, 300, "#5c0000");
        let platform2 = new GameObject(new Vector2(500, 550), 100, 300, "#5c0000");
        let platform3 = new GameObject(new Vector2(900, 400), 200, 400, "#5c0000");
        let hazard = new Hazard(new Vector2(975, 350), 50, 50, "#271111");
        let platform4 = new GameObject(new Vector2(1600, 600), 200, 200, "#5c0000");
        let platform5 = new GameObject(new Vector2(1800, 500), 200, 300, "#5c0000");
        let hazard2 = new Hazard(new Vector2(1770, 500), 30, 100, "#271111");
        let platform6 = new GameObject(new Vector2(2200, 600), 100, 40, "#5c0000");
        let platform7 = new GameObject(new Vector2(2500, 450), 100, 40, "#5c0000");
        let platform8 = new GameObject(new Vector2(2300, 280), 100, 40, "#5c0000");
        let platform9 = new GameObject(new Vector2(2700, 200), 100, 600, "#5c0000");
        let hazard3 = new Hazard(new Vector2(2670, 200), 30, 600, "#271111");
        let platform10 = new GameObject(new Vector2(3100, 400), 100, 40, "#5c0000");
        let goal = new Goal(new Vector2(3600, -100), 1000, 1000, 2, "#ff8a8a");
        
        let objects = [lowerBoundHazard, platform1, platform2, platform3, hazard, 
            platform4, platform5, hazard2, platform6, platform7, platform8, platform9, hazard3, platform10, goal];
        objects.forEach(obj => {
            scene.addObject(obj);
        });
        let camera = new Camera(canvas, new Vector2(100, 200), player);
        scene.addCamera(camera);
        scene.lightPos = new Vector2(6000, -1000);
        scene.lightColour = "#eb2323";
        scene.shadowColour = "#a30000";
        SceneManager.scenes.push(scene);
    }

    static #createScene3() {    
        let scene = new Scene("Level 3");
        let player = new Player(new Vector2(100, 200), "#cf33ff");
        scene.addObject(player);

        let lowerBoundHazard = new Hazard(new Vector2(-1000, 800), 10000, 300, "#291130");
        let platform1 = new GameObject(new Vector2(50, 500), 200, 300, "#47005c");
        let hazard = new Hazard(new Vector2(250, 650), 350, 40, "#291130");
        let hazard1Bottom = new GameObject(new Vector2(250, 690), 350, 200, "#47005c");
        let platform2 = new GameObject(new Vector2(600, 550), 75, 300, "#47005c");
        let platform3 = new GameObject(new Vector2(1050, 600), 100, 40, "#47005c");
        let platform4 = new GameObject(new Vector2(1300, 400), 100, 40, "#47005c");
        let platform5 = new GameObject(new Vector2(1450, 250), 100, 40, "#47005c");
        let platform6 = new GameObject(new Vector2(1800, 150), 100, 650, "#47005c");
        let platform7 = new GameObject(new Vector2(1900, 150), 300, 80, "#47005c");
        let platform8 = new GameObject(new Vector2(2100, 450), 300, 80, "#47005c");
        let hazard2 = new Hazard(new Vector2(2100, 410), 80, 40, "#291130");
        let platform9 = new GameObject(new Vector2(1900, 750), 450, 200, "#47005c");
        let platform10 = new GameObject(new Vector2(2325, -50), 75, 580, "#47005c");
        let platform11 = new GameObject(new Vector2(2500, 650), 450, 200, "#47005c");
        let platform12 = new GameObject(new Vector2(3200, 500), 100, 40, "#47005c");

        let goal = new Goal(new Vector2(3800, -200), 1000, 1000, 0, "#e48aff");
        
        let objects = [lowerBoundHazard, platform1, hazard, hazard1Bottom, platform2, platform3, platform4, platform5,
        platform6, platform7, platform8, hazard2, platform9, platform10, platform11, platform12, goal];
        objects.forEach(obj => {
            scene.addObject(obj);
        });
        let camera = new Camera(canvas, new Vector2(100, 200), player);
        scene.addCamera(camera);
        scene.lightPos = new Vector2(-1000, -200);
        scene.lightColour = "#bd24eb";
        scene.shadowColour = "#7d00a3";
        SceneManager.scenes.push(scene);
    }
}