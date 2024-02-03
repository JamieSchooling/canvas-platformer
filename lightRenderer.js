import { SceneManager } from "./scene.js";
import Vector2 from "./vector2.js";

export default class LightRenderer {
    constructor(canvas) {
        this.angleOffset = 0.0001;

        this.rayColor = '#000000';
        this.rayWidth = 4;

        this.extraRayColor = '#ffffff';
        this.extraRayWidth = 2;

        this.pointColor = '#ffffff';
        this.pointRadius = 5;

        this.lightBorder = [
            [new Vector2(-5000, -5000), new Vector2(canvas.width + 5000, -5000)],
            [new Vector2(canvas.width + 5000, 0), new Vector2(canvas.width + 5000, canvas.height + 5000)],
            [new Vector2(canvas.width + 5000, canvas.height + 500), new Vector2(-5000, canvas.height + 5000)],
            [new Vector2(-5000, canvas.height + 5000), new Vector2(-5000, -5000)]
        ];
        this.borderCorners = this.lightBorder.reduce((corners, edge) => {
            return [...corners, ...edge];
        }, []);

        this.debug = false;
    }

    getOffsettedRayPoint(ray, angle) {
        return new Vector2(
            (ray[1].x - ray[0].x) * Math.cos(angle) - (ray[1].y - ray[0].y) * Math.sin(angle) + ray[0].x,
            (ray[1].y - ray[0].y) * Math.cos(angle) + (ray[1].x - ray[0].x) * Math.sin(angle) + ray[0].y
            );
    }
    
    sortIntersectionPointsByAngle(anchor, points) {
        return points.sort(
            (point1, point2) => 
              Math.atan2(point1.y - anchor.y, point1.x - anchor.x) 
            - Math.atan2(point2.y - anchor.y, point2.x - anchor.x));
    }
    
    getIntersectionPoint(ray, segment, smallestR) {
        const [pointA, pointB] = segment;
        const [pointC, pointD] = ray;
      
        const denominator = (pointD.x - pointC.x) * (pointB.y - pointA.y) - (pointB.x - pointA.x) * (pointD.y - pointC.y);
      
        const r = ((pointB.x - pointA.x) * (pointC.y - pointA.y) - (pointC.x - pointA.x) * (pointB.y - pointA.y)) / denominator;
        if (r < 0) return null;
        if (smallestR !== null && smallestR < r) return null;
      
        const s = ((pointA.x - pointC.x) * (pointD.y - pointC.y) - (pointD.x - pointC.x) * (pointA.y - pointC.y)) / denominator;
        
        if (s < 0 || s > 1) {
            return null;
        }
      
        return { 
            x: s * (pointB.x - pointA.x) + pointA.x, 
            y: s * (pointB.y - pointA.y) + pointA.y,
            r,
        };
    }
    
    getClosestIntersectionPoint(ray, segments) {
        return segments
            .reduce((closest, segment) => {
              return this.getIntersectionPoint(ray, segment, (closest ? closest.r : null)) || closest;
            }, null);
    }
    
    drawRay(ctx, ray) {
        let screenX, screenY;

        ctx.strokeStyle = this.rayColor;
        ctx.lineWidth = this.rayWidth;
      
        ctx.beginPath();
        screenX = ray[0].x - SceneManager.currentScene.camera.position.x;        
        screenY = ray[0].y - SceneManager.currentScene.camera.position.y;
        ctx.moveTo(screenX, screenY);
        screenX = ray[1].x - SceneManager.currentScene.camera.position.x;        
        screenY = ray[1].y - SceneManager.currentScene.camera.position.y;
        ctx.lineTo(screenX, screenY);
        ctx.stroke();
    }
      
    drawExtraRay(ctx, ray) {
        let screenX, screenY;

        ctx.strokeStyle = this.extraRayColor;
        ctx.lineWidth = this.extraRayWidth;
        
        ctx.beginPath();
        screenX = ray[0].x - SceneManager.currentScene.camera.position.x;        
        screenY = ray[0].y - SceneManager.currentScene.camera.position.y;
        ctx.moveTo(screenX, screenY);
        screenX = ray[1].x - SceneManager.currentScene.camera.position.x;        
        screenY = ray[1].y - SceneManager.currentScene.camera.position.y;
        ctx.lineTo(screenX, screenY);
        ctx.stroke();
    }  
      
    drawClosestIntersectionPoint(ctx, closestPoint) {
        let screenX, screenY;
        screenX = closestPoint.x - SceneManager.currentScene.camera.position.x;        
        screenY = closestPoint.y - SceneManager.currentScene.camera.position.y;
    
        if (closestPoint !== null) {
          ctx.fillStyle = this.pointColor;
          
          ctx.beginPath();
          ctx.arc(screenX, screenY, this.pointRadius, 0, 2 * Math.PI);
          ctx.fill();
        }
    }    
    
    drawVisibleArea(ctx, sortedIntersectionPoints) {
        let screenX, screenY;
        screenX = sortedIntersectionPoints[0].x - SceneManager.currentScene.camera.position.x;        
        screenY = sortedIntersectionPoints[0].y - SceneManager.currentScene.camera.position.y;
    
        ctx.beginPath();
        ctx.moveTo(screenX, screenY);
        sortedIntersectionPoints.slice(1).forEach(point => {
            screenX = point.x - SceneManager.currentScene.camera.position.x;        
            screenY = point.y - SceneManager.currentScene.camera.position.y;
            ctx.lineTo(screenX, screenY);
        });        
        screenX = sortedIntersectionPoints[0].x - SceneManager.currentScene.camera.position.x;        
        screenY = sortedIntersectionPoints[0].y - SceneManager.currentScene.camera.position.y;
        ctx.lineTo(screenX, screenY);
        ctx.fillStyle = SceneManager.currentScene.lightColour;
        ctx.fill();
    }
    
    draw(ctx, lightPos, edges, vertices) {
        const intersectionPoints = [];
        const extraIntersectionPoints = [];

        edges = [...this.lightBorder, ...edges];
        vertices = [...this.borderCorners, ...vertices];
    
        vertices.forEach(vertex => {
            const extraOffsetPoint1 = this.getOffsettedRayPoint([lightPos, vertex], -this.angleOffset);
            const extraOffsetPoint2 = this.getOffsettedRayPoint([lightPos, vertex], this.angleOffset);
            const closestPoint = this.getClosestIntersectionPoint([lightPos, vertex], edges);
            const extraClosestPoint1 = this.getClosestIntersectionPoint([lightPos, extraOffsetPoint1], edges);
            const extraClosestPoint2 = this.getClosestIntersectionPoint([lightPos, extraOffsetPoint2], edges);
            if(closestPoint !== null) intersectionPoints.push(closestPoint);
            if(extraClosestPoint1 !== null) extraIntersectionPoints.push(extraClosestPoint1);
            if(extraClosestPoint2 !== null) extraIntersectionPoints.push(extraClosestPoint2);
        });
    
        const sortedIntersectionPoints = this.sortIntersectionPointsByAngle(lightPos, [...intersectionPoints, ...extraIntersectionPoints]);
    
        this.drawVisibleArea(ctx, sortedIntersectionPoints);
    
        if (this.debug) {
            extraIntersectionPoints.forEach(intersectionPoint => {
                this.drawExtraRay(ctx, [lightPos, intersectionPoint]);
                this.drawClosestIntersectionPoint(ctx, intersectionPoint);
            });
            intersectionPoints.forEach(intersectionPoint => {
                this.drawRay(ctx, [lightPos, intersectionPoint]);
                this.drawClosestIntersectionPoint(ctx, intersectionPoint);
            });
        }
    }   
}