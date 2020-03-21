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
        this.x += this.speedX;
        this.y += this.speedY;
    }

    setControls(){
        window.addEventListener("keydown", event => {
            event.preventDefault();
            switch(event.keyCode){

                //UP
                case 38:
                    if (this.y <= 0){
                        this.speedY = 0;
                        //this.y = 0;
                        console.log("can't leave maze");
                    } else{
                        //this.wallCollision();
                        this.speedY = -this.height;
                        console.log("Y:", this.y);
                    }
                    break;
                    
                //RIGHT
                case 39: //right key
                    if (this.x > this.mazeWidth - this.width){
                        this.speedX = 0;
                        //this.x = this.mazeWidth - this.width;
                        console.log("can't leave maze");
                    } else{
                        this.wallCollision();
                        this.speedX = this.width;
                    }
                    break;
                
                //DOWN
                case 40:
                    if (this.y > this.mazeHeight - this.height){
                        this.speedY = 0;
                        //this.y = this.mazeHeight - this.height;
                        console.log("can't leave maze");
                    } else{
                        this.speedY = this.height;
                        console.log("Y:", this.y);
                    }
                    break;

                //LEFT
                case 37:
                    if (this.x <= 0){
                        this.speedX = 0;
                        //this.x = 0;
                        console.log("can't leave maze");
                    } else{
                        this.speedX = -this.width;
                    }
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

    wallCollision(){
        //console.log(this.grid);
        //let imageData = this.context.getImageData(0, 0, this.mazeWidth, this.mazeHeight);
        //console.log(imageData);
        
    }

    // -------

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
}