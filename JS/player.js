class Player {
  constructor(maze) {
    this.context = maze.context;

    this.mazeWidth = maze.width;
    this.mazeHeight = maze.height;

    //cell size
    this.cellWidth = maze.cellWidth;
    this.cellHeight = maze.cellHeight;

    //maze grid
    this.grid = maze.grid;

    //player size
    this.width = this.cellWidth / 2;
    this.height = this.cellHeight / 2;

    //player coordinates
    this.x = 0;
    this.y = 0;

    this.i = 0; //cols
    this.j = 0; //rows

    this.currentPlayer = this.currentPlayerCell();

  }

  draw() {
    //-------PLAYER PURPLE RECTANGLE
    this.context.save();
    this.context.fillStyle = "purple";
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.restore();
    //end of test
  }

  currentPlayerCell() {
    //console.log(`Current player cell coordinates i:${this.i}, j: ${this.j}`);

    this.currentPlayer = this.grid.filter(
      cells => cells.i === this.i && cells.j === this.j
    );
  }

  setControls() {
    window.addEventListener("keydown", event => {
      event.preventDefault();
      switch (event.keyCode) {
        //UP
        case 38:
          this.y -= this.height;
          if (
            this.checkWallsCollision("up") === "top wall" &&
            this.y < this.currentPlayer[0].y
          ) {
            this.y += this.height;
          }
          if (this.y < this.currentPlayer[0].y) {
            this.j -= 1;
          }
          this.currentPlayerCell();
          break;
          //RIGHT
        case 39:
          this.x += this.width;
          if (
            this.checkWallsCollision("right") === "right wall" &&
            this.x === this.currentPlayer[0].x + this.cellWidth
          ) {
            this.x -= this.width;
          }
          if (this.x >= this.currentPlayer[0].x + this.cellWidth) {
            this.i += 1;
          }
          this.currentPlayerCell();
          break;
          //DOWN
        case 40:
          this.y += this.height;
          if (
            this.checkWallsCollision("down") === "bottom wall" &&
            this.y === this.currentPlayer[0].y + this.cellHeight
          ) {
            this.y -= this.height;
          }
          if (this.y >= this.currentPlayer[0].y + this.cellHeight) {
            this.j += 1;
          }
          this.currentPlayerCell();
          break;
          //LEFT
        case 37:
          this.x -= this.width;
          if (
            this.checkWallsCollision("left") === "left wall" &&
            this.x < this.currentPlayer[0].x
          ) {
            this.x += this.width;
          }
          if (this.x < this.currentPlayer[0].x) {
            this.i -= 1;
          }
          this.currentPlayerCell();
          break;
      }
    });
  }

  checkWallsCollision(direction) {
    this.currentPlayerCell();
    let wall = this.currentPlayer.map(cell => cell.walls);
    //console.log(wall[0].length);

    for (let i = 0; i < wall[0].length; i++) {
      if (wall[0][i]) {
        //console.log(wall[0][i], "is true");
      } else if (!wall[0][i]) {
        //console.log(wall[0][i], "is false");
      }
    }

    switch (direction) {
      case "up":
        if (wall[0][0]) {
          //this.y = 0;
          return "top wall";
        }
        break;

      case "right":
        if (wall[0][1]) {
          //this.y = 0;
          return "right wall";
        }
        break;

      case "down":
        if (wall[0][2]) {
          //this.y = 0;
          return "bottom wall";
        }
        break;

      case "left":
        if (wall[0][3]) {
          //this.y = 0;
          return "left wall";
        }
        break;
    }
  }

  //player limits
  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  crashWith(obstacle){
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }

}