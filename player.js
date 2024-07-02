class MainPlayer {
  constructor() {
    this.player = document.getElementById("mainPlayer");
    this.gameScreen = document.getElementById("gameScreen");

    this.x = 50;
    this.y = 50;

    this.hole = document.getElementById("mainPlayer");

    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const step = 10; // Adjust this value for faster or slower movement

    // Track movement directions
    let moveX = 0;
    let moveY = 0;

    // Determine which direction to move
    switch (key) {
      case "arrowleft":
      case "a":
        moveX = -step; // Move left
        break;
      case "arrowright":
      case "d":
        moveX = step; // Move right
        break;
      case "arrowup":
      case "w":
        moveY = -step; // Move up
        break;
      case "arrowdown":
      case "s":
        moveY = step; // Move down
        break;

      case "arrowup" && "arrowleft":
        moveX = -step;
        moveY = -step;
      default:
        return; // Exit if the key isn't relevant
    }

    this.x += moveX;
    this.y += moveY;

    this.hole.style.left = `${this.x}px`;
    this.hole.style.top = `${this.y}px`;
  }
}
const mainPlayer = new MainPlayer();
