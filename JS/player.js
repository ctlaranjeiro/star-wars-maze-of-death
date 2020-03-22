class Player {
    constructor(maze){
        this.context = maze.context;

        this.mazeWidth = maze.width;
        this.mazeHeight = maze.height;
        
        //cell size
        this.cellWidth = maze.cellWidth;
        this.cellHeight = maze.cellHeight;

        //
        this.grid = maze.grid;

        //player size
        this.width = this.cellWidth;
        this.height = this.cellHeight;

        // this.x = Math.floor(this.cellWidth % this.width/2);
        // this.y = Math.floor(this.cellHeight % this.height/2);

        this.x = 0;
        this.y = 0;

        this.speedX = 0;
        this.speedY = 0;

        this.i = 0; //cols
        this.j = 0; //rows

        this.currentPlayer;

        // this.cols = maze.cols;
        // this.rows = maze.rows;
    }

    draw(){
        //-------PLAYER PURPLE RECTANGLE
        this.context.save();
        this.context.fillStyle = "purple"
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.restore();
        //end of test
    }

    update(){
        //this.x += this.speedX;
        //this.y += this.speedY;
    }

    currentPlayerCell(){
        //console.log(`Current player cell coordinates i:${this.i}, j: ${this.j}`);        

        this.currentPlayer = this.grid.filter(cells => cells.i === this.i && cells.j === this.j);

        console.log(this.currentPlayer);

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

    setControls(){
        window.addEventListener("keydown", event => {
            event.preventDefault();
            switch(event.keyCode){

                //UP
                case 38:
                    //this.checkWallsCollision();

                    if(this.checkWallsCollision("up") === "top wall"){
                        console.log("can't move - top wall");
                    } else if (this.y <= 0){
                        //this.y = 0;
                        console.log("can't leave maze");
                    } else{
                        //this.wallCollision();
                        this.y -= this.height;
                        this.j -= 1;
                        //console.log("Y:", this.y);
                        //console.log("j:", this.j);
                    }

                    this.currentPlayerCell();

                    break;
                    
                //RIGHT
                case 39:
                    //this.checkWallsCollision("right");

                    if(this.checkWallsCollision("right") === "right wall"){
                        console.log("can't move - right wall");
                    } else if (this.x >= this.mazeWidth - this.width){
                        //this.x = 0;
                        console.log("can't leave maze");
                    } else{
                        //this.currentPlayerCell();
                        this.x += this.width;
                        this.i += 1;
                        //console.log("i:", this.i);
                    }

                    this.currentPlayerCell();

                    break;
                
                //DOWN
                case 40:
                    //this.currentPlayerCell();
                    //this.checkWallsCollision("down");

                    if(this.checkWallsCollision("down") === "bottom wall"){
                        console.log("can't move - bottom wall");
                    } else if (this.y >= this.mazeHeight - this.height){
                        //this.y = 0;
                        //this.y = this.mazeHeight - this.height;
                        console.log("can't leave maze");
                    } else{
                        this.y += this.height;
                        this.j += 1;
                        //console.log("Y:", this.y);
                        //console.log("j:", this.j);
                    }

                    //this.checkWallsCollision("down");
                    this.currentPlayerCell();

                    break;

                //LEFT
                case 37:
                    //this.checkWallsCollision();

                    if(this.checkWallsCollision("left") === "left wall"){
                        console.log("can't move - left wall");
                    } else if (this.x <= 0){
                        //this.x = 0;
                        console.log("can't leave maze");
                    } else{
                        this.x -= this.width;
                        this.i -= 1;
                        //console.log("i:", this.i);
                    }

                    this.currentPlayerCell();
                    
                    break;
            }
            //console.log(this.speedX, this.speedY);
            //console.log(this.x, this.y)
        });

        window.addEventListener("keyup", event => {
            this.speedX = 0;
            this.speedY = 0;
        });
    }

    checkWallsCollision(direction){
        this.currentPlayerCell();
        let wall = this.currentPlayer.map(cell => cell.walls);
        //console.log(wall[0].length);

        for (let i = 0; i < wall[0].length; i++){
            if (wall[0][i]){
                console.log(wall[0][i], "is true");
            }else if (!wall[0][i]){
                console.log(wall[0][i], "is false");
            }
        }

        switch (direction){
            case "start":
                //top
                if (wall[0][0]){
                    return "top wall";
                }

                //right
                if (wall[0][1]){
                    return "right wall";
                }

                //bottom
                if (wall[0][2]){
                    //this.y = 0;
                    return "down wall";
                }

                //left
                if (wall[0][3]){
                    return "left wall";
                }
                

                break;


            case "up":
                if (wall[0][0]){
                    //this.y = 0;
                    return "top wall";
                }


            case "right":
                if (wall[0][1]){
                    //this.y = 0;
                    return "right wall";
                }


            case "down":
                if (wall[0][2]){
                    //this.y = 0;
                    return "bottom wall";
                }


            case "left":
                if (wall[0][3]){
                    //this.y = 0;
                    return "left wall";
                }
        }
        
    }
}