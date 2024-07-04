# Hole Game

Welcome to the Hole Game, a simple interactive game where players control a main player and encounter random movements from another player.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [How to Play](#how-to-play)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/hole-game.git
   ```

   Replace `your-username` with your actual GitHub username.

2. Navigate to the project directory:

   ```sh
   cd hole-game
   ```

3. Open `index.html` in your preferred web browser.

## Usage

After opening `index.html`, click the "Start Game" button to begin playing. You control the main hole using your keyboard, and there is a second hole that moves randomly.

## Features

- **Player Control:** Control the main hole with the keyboard.
- **Random Movement:** A second hole moves randomly on the screen.

## How to Play

- Use the arrow keys or WASD to move your hole:

  - **Arrow Left** or **A**: Move left
  - **Arrow Right** or **D**: Move right
  - **Arrow Up** or **W**: Move up
  - **Arrow Down** or **S**: Move down

- Avoid the randomly moving hole or try to catch it for fun.

## Code Overview

### MainPlayer Class

This class handles the main player's movement:

```javascript
class MainPlayer {
  constructor() {
    this.player = document.getElementById("mainPlayer");
    this.gameScreen = document.getElementById("gameScreen");

    this.x = 750;
    this.y = 400;
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
```
