export default class Input {
    static keyLeft = 0;
    static keyRight = 0;
    static keyJump = 0;

    static keyPressed(key) {
        switch (key.code) {
            case 'KeyA':
            case 'ArrowLeft':
                Input.keyLeft = 1;
                break;
            case 'KeyD':
            case 'ArrowRight':
                Input.keyRight = 1;
                break;
            case 'KeyW':
            case 'ArrowUp':
            case 'Space':
                Input.keyJump = 1;
        }
    }

    static keyReleased(key) {
        switch (key.code) {
            case 'KeyA':
            case 'ArrowLeft':
                Input.keyLeft = 0;
                break;
            case 'KeyD':
            case 'ArrowRight':
                Input.keyRight = 0;
                break;
            case 'KeyW':
            case 'ArrowUp':
            case 'Space':
                Input.keyJump = 0;
        }
    }
}