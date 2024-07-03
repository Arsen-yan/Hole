class MainPlayer {
  constructor() {
    this.player = document.getElementById("mainPlayer");
    this.gameScreen = document.getElementById("gameScreen");

    this.x = 750; //750
    this.y = 400; //400
    this.speed = 4;

    this.keysPressed = {};

    this.updatePosition();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.move = this.move.bind(this);

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);

    this.move();
  }

  handleKeyDown(event) {
    this.keysPressed[event.key.toLowerCase()] = true;
  }

  handleKeyUp(event) {
    this.keysPressed[event.key.toLowerCase()] = false;
  }

  move() {
    requestAnimationFrame(this.move);

    let moveX = 0;
    let moveY = 0;
    let isMoving = false;
    if (this.keysPressed["arrowleft"] || this.keysPressed["a"]) {
      moveX -= this.speed;
      isMoving = true;
    }
    if (this.keysPressed["arrowright"] || this.keysPressed["d"]) {
      moveX += this.speed;
      isMoving = true;
    }
    if (this.keysPressed["arrowup"] || this.keysPressed["w"]) {
      moveY -= this.speed;
      isMoving = true;
    }
    if (this.keysPressed["arrowdown"] || this.keysPressed["s"]) {
      moveY += this.speed;
      isMoving = true;
    }

    if (isMoving) {
      this.x += moveX;
      this.y += moveY;
      isMoving = false;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.player.style.left = `${this.x}px`;
    this.player.style.top = `${this.y}px`;
  }
}

const mainPlayer = new MainPlayer();

// ************************************* //

class RandomPlayer extends MainPlayer {
  constructor() {
    super();
    this.player = document.getElementById("randomPlayer");
    this.x = Math.random() * (this.gameScreen.clientWidth - 100); // Random starting X position
    this.y = Math.random() * (this.gameScreen.clientHeight - 100); // Random starting Y position
    this.speed = 2;

    this.moveRandomly();
  }

  moveRandomly() {
    setInterval(() => {
      const directions = [
        { moveX: -this.speed, moveY: 50 }, // Left
        { moveX: this.speed, moveY: 50 }, // Right
        { moveX: 50, moveY: -this.speed }, // Up
        { moveX: 50, moveY: this.speed }, // Down
      ];
      const randomDirection =
        directions[Math.floor(Math.random() * directions.length)];

      this.x += randomDirection.moveX;
      this.y += randomDirection.moveY;

      // Ensure the player stays within the game screen bounds
      this.x = Math.max(
        0,
        Math.min(this.x, this.gameScreen.clientWidth - this.player.clientWidth)
      );
      this.y = Math.max(
        0,
        Math.min(
          this.y,
          this.gameScreen.clientHeight - this.player.clientHeight
        )
      );

      this.updatePosition();
    }, 500); // Change direction every 500 milliseconds
  }
}

const randomPlayer = new RandomPlayer();
