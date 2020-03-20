class Player {
    constructor(maze){
        this.context = maze.context;

        this.mazeWidth = maze.width;
        this.mazeHeight = maze.height;
        
        //cell size
        this.cellWidth = maze.cellWidth;
        this.cellHeight = maze.cellHeight;

        //player size
        this.width = this.cellWidth/1.5;
        this.height = this.cellHeight/1.5;

        this.x = this.cellWidth % this.width/2;
        this.y = this.cellHeight % this.height/2;

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
            switch(event.keyCode){

                //UP
                case 38:
                    this.speedY = -1;
                    break;
                    
                //RIGHT
                case 39: //right key
                    this.speedX = 1;
                    break;
                
                //DOWN
                case 40:
                    this.speedY = 1;
                    break;

                //LEFT
                case 37:
                    this.speedX = -1;
                    break;
            }
            //console.log(this.speedX, this.speedY);
        });

        window.addEventListener("keyup", event => {
            this.speedX = 0;
            this.speedY = 0;
        });
    }
}