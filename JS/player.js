class Player {
  constructor(maze) {
    this.context = maze.context;

    this.mazeWidth = maze.width;
    this.mazeHeight = maze.height;

    //cell size
    this.cellWidth = maze.cellWidth;
    this.cellHeight = maze.cellHeight;

    //
    this.grid = maze.grid;

    //player size
    this.width = this.cellWidth / 2;
    this.height = this.cellHeight / 2;

    // this.x = Math.floor(this.cellWidth % this.width/2);
    // this.y = Math.floor(this.cellHeight % this.height/2);

    this.x = 0;
    this.y = 0;

    this.speedX = 0;
    this.speedY = 0;

    this.i = 0; //cols
    this.j = 0; //rows

    this.currentPlayer = this.currentPlayerCell();

    // this.cols = maze.cols;
    // this.rows = maze.rows;
  }

  draw() {
    //-------PLAYER PURPLE RECTANGLE
    this.context.save();
    this.context.fillStyle = "purple";
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.restore();
    //end of test
  }

  update() {
    //this.x += this.speedX;
    //this.y += this.speedY;
  }

  currentPlayerCell() {
    //console.log(`Current player cell coordinates i:${this.i}, j: ${this.j}`);

    //if(this.i > 0 && this.j > 0 && this.i % 1 === 0 && this.j % 1 === 0){
    this.currentPlayer = this.grid.filter(
      cells => cells.i === this.i && cells.j === this.j
    );
    //console.log("%1")
    //} else{
    //console.log("it's divisible by 0.5");
    //}

    //console.log(this.currentPlayer);

    // switch (direction){
    //     case "up":
    //         this.currentPlayer.map(property =>{
    //             if (property.j !== 0){
    //                property.j -=1;
    //             }
    //         });
    //         break;

    //     case "right":
    //         this.currentPlayer.map(property =>{
    //             if( property.i !==9){
    //                 property.i += 1;
    //             }
    //         });
    //         break;

    //     case "down":
    //         this.currentPlayer.map(property =>{
    //             if (property.j !==9){
    //                 property.j += 1;
    //             }
    //         });
    //         break;

    //     case "left":
    //         this.currentPlayer.map(property =>{
    //             if (property.i !== 0){
    //                 property.i -= 1;
    //             }
    //         });
    //         break;

    // }

    //console.log(this.currentPlayer);
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
    window.addEventListener("keyup", event => {
      this.speedX = 0;
      this.speedY = 0;
    });
  }

  checkWallsCollision(direction) {
    this.currentPlayerCell();
    //if (this.i > 0 && this.j > 0 && this.i % 1 === 0 && this.j % 1 === 0){
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
      case "start":
        //top
        if (wall[0][0]) {
          return "top wall";
        }

        //right
        if (wall[0][1]) {
          return "right wall";
        }

        //bottom
        if (wall[0][2]) {
          //this.y = 0;
          return "down wall";
        }

        //left
        if (wall[0][3]) {
          return "left wall";
        }

        break;

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
    //}
  }
}