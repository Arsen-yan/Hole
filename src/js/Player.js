class Player {
  constructor() {
    this.player = document.getElementById("mainPlayer");
    this.gameScreen = document.getElementById("gameScreen");

    this.x = 750; // Initial x position //
    this.y = 400; // Initial y position //
    this.speed = 2;
    this.figuresEaten = 0;
    this.keysPressed = {};

    this.updatePosition();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.move = this.move.bind(this);
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown(event) {
    this.keysPressed[event.key.toLowerCase()] = true;
  }

  handleKeyUp(event) {
    this.keysPressed[event.key.toLowerCase()] = false;
  }

  move() {
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
      this.checkBounds();
      this.checkCollision();
      isMoving = false;
    }

    this.updatePosition();
  }

  checkBounds() {
    const playerWidth = this.player.offsetWidth;
    const playerHeight = this.player.offsetHeight;
    const gameScreenWidth = this.gameScreen.clientWidth;
    const gameScreenHeight = this.gameScreen.clientHeight;

    if (this.x < 0) {
      this.x = 0;
      this.reverseDirection("x");
    }
    if (this.y < 0) {
      this.y = 0;
      this.reverseDirection("y");
    }
    if (this.x + playerWidth > gameScreenWidth) {
      this.x = gameScreenWidth - playerWidth;
      this.reverseDirection("x");
    }
    if (this.y + playerHeight > gameScreenHeight) {
      this.y = gameScreenHeight - playerHeight;
      this.reverseDirection("y");
    }
  }

  // Add this method to reverse direction on hitting a wall
  reverseDirection(axis) {
    if (axis === "x") {
      this.speedX = -this.speedX;
    } else if (axis === "y") {
      this.speedY = -this.speedY;
    }
  }

  updatePosition() {
    this.player.style.left = `${this.x}px`;
    this.player.style.top = `${this.y}px`;
  }

  checkCollision() {
    const figures = document.querySelectorAll(".figure");
    figures.forEach((figure) => {
      const figureRect = figure.getBoundingClientRect();
      const playerRect = this.player.getBoundingClientRect();

      if (
        playerRect.x < figureRect.x + figureRect.width &&
        playerRect.x + playerRect.width > figureRect.x &&
        playerRect.y < figureRect.y + figureRect.height &&
        playerRect.y + playerRect.height > figureRect.y
      ) {
        figure.remove(); // Remove figure if collision detected
        this.figuresEaten++;
        this.grow();
      }
    });
  }
  grow() {
    const currentWidth = this.player.offsetWidth;
    const currentHeight = this.player.offsetHeight;
    this.player.style.width = `${currentWidth + 5}px`; // Increase size by 5px
    this.player.style.height = `${currentHeight + 5}px`;
  }
  win() {
    console.log("Player wins!");
    // Display a message or perform any action for winning
    // Example: Display a victory message, stop game updates, etc.
  }
}

addEventListener("keydown", (evn) => {
  console.log(evn.key.charCodeAt);
});

class RandomPlayer extends Player {
  constructor() {
    super();
    this.player = document.getElementById("randomPlayer");

    this.moveRandomly();
  }

  moveRandomly() {
    setInterval(() => {
      const directions = [
        { moveX: -this.speed, moveY: 0 },
        { moveX: this.speed, moveY: 0 },
        { moveX: 0, moveY: -this.speed },
        { moveX: 0, moveY: this.speed },
      ];
      const randomDirection =
        directions[Math.floor(Math.random() * directions.length)];

      this.x += randomDirection.moveX;
      this.y += randomDirection.moveY;
      this.checkBounds();
      this.updatePosition();
      this.checkCollision();
    }, 1000);
  }
}
