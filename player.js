import Vector2 from "./vector2.js";
import GameObject from "./gameobject.js";
import Input from "./input.js";
import { SceneManager } from "./scene.js";
import Hazard from "./hazard.js";
import Goal from "./goal.js";

export default class Player extends GameObject {
    constructor(position, colour = "#3399ff") {
        super(position, 50, 100, colour);
        this.spawnPoint = position;
        this.velocity = new Vector2(0, 0);
        this.maxSpeed = 300;
        this.acceleration = 4;
        this.deceleration = 6;
        this.decelerationAir = 6;
        this.gravity = 700;
        this.isGrounded = false;
        this.currentGravity = this.gravity;
        this.jumpEndGravityMultiplier = 2;
        this.jumpForce = 550; 
        this.jumping = false;
        this.isCoyoteAvailable = false;
        this.coyoteTime = 0.1;
        this.time = 0;
        this.timeLeftGround = 0;
        this.jumpSFX = new Audio("audio/jump.wav");
        this.landSFX = new Audio("audio/land.wav");
        this.deathSFX = new Audio("audio/death.wav");
    }

    update(deltaTime) {
        this.time += deltaTime;
        let moveVector = Input.keyRight - Input.keyLeft;

        this.velocity.x += moveVector * this.maxSpeed * this.acceleration * deltaTime;
        if (moveVector === 0) {
            if (this.velocity.x < 0) {
                this.velocity.x += (this.isGrounded ? this.deceleration : this.decelerationAir) * this.maxSpeed * deltaTime;
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                }
            } else if (this.velocity.x > 0) {
                this.velocity.x -= (this.isGrounded ? this.deceleration : this.decelerationAir) * this.maxSpeed * deltaTime;
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                }
            }
        }
        if (this.velocity.x > this.maxSpeed) {
            this.velocity.x = this.maxSpeed;
        } else if (this.velocity.x < -this.maxSpeed) {
            this.velocity.x = -this.maxSpeed;
        }

        this.velocity.y += this.currentGravity * deltaTime;

        this.collisionChecks(deltaTime);
        
        if (Input.keyJump && (this.isGrounded || this.canUseCoyote())) {
            this.jumpSFX.play();
            this.velocity.y -= this.jumpForce;
            this.isCoyoteAvailable = false;
            this.jumping = true;
        } else if (!Input.keyJump && this.jumping && this.velocity.y < 0) {
            this.jumping = false;
            this.currentGravity = this.gravity * this.jumpEndGravityMultiplier;
        }
        
        this.position = this.position.add(this.velocity.scale(deltaTime));
    }

    canUseCoyote() {
        return this.isCoyoteAvailable && !this.isGrounded && this.time < this.timeLeftGround + this.coyoteTime;
    }

    collisionChecks(deltaTime) {
        if (this.checkCollisionAtPosition(new Vector2(this.position.x + this.velocity.x * deltaTime, this.position.y))) {
            while (!this.checkCollisionAtPosition(new Vector2(this.position.x + Math.sign(this.velocity.x), this.position.y))) {
                this.position.x += Math.sign(this.velocity.x);
            }
            this.velocity.x = 0;
        }

        if (this.checkCollisionAtPosition(new Vector2(this.position.x, this.position.y + this.velocity.y * deltaTime))) {
            while (!this.checkCollisionAtPosition(new Vector2(this.position.x, this.position.y + Math.sign(this.velocity.y)))) {
                this.position.y += Math.sign(this.velocity.y);
            }
            if (!this.isGrounded && this.velocity.y > 0) {
                this.landSFX.play();
                this.isGrounded = true;
                this.isCoyoteAvailable = true;
                this.currentGravity = this.gravity;
            }
            this.velocity.y = 0;
        }
        else if (this.isGrounded) {
            this.isGrounded = false;
            this.timeLeftGround = this.time;
        }
    }

    checkCollisionAtPosition(position) {
        let result = false;
        SceneManager.currentScene.objects.forEach(obj => {
            if (obj === this) return;            
            if (position.x < obj.position.x + obj.width &&
                position.x + this.width > obj.position.x &&
                position.y < obj.position.y + obj.height &&
                position.y + this.height > obj.position.y) {
                    result = true;
                    if (obj instanceof Hazard) {
                        result = false;
                        this.deathSFX.play();
                        this.reset();
                    } else if (obj instanceof Goal) {
                        result = false;
                        SceneManager.loadScene(obj.scene);
                    }
                }
        });
        return result;
    }

    reset() {
        this.velocity = new Vector2(0, 0);
        this.position = this.spawnPoint;
    }
}