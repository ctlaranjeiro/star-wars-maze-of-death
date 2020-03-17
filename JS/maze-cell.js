class Cell{
    constructor (maze, i, j){
        this.context = maze.context;
        this.mazeWidth = maze.width;
        this.mazeHeight = maze.height;

        this.width = 60;
        this.height = 45;

        this.i = i; //column number
        this.j = j; //row number

        this.x = this.i * this.width; // Cell x coordinate - i is looping, so it will do this for every cell until it reaches the width of the canvas - 60 (it starts at 0)
        this.y = this.j * this.height; // Cell y coordinate - j is looping, so it will do this for every cell until it reaches the height of the canvas - 45 (it starts at 0)
    }

    checkNeighbors(){

    }

    //optional - just highlights the current cell
    highlight(){

    }

    show(){
        //console.log("maze-cell is connected to Maze")
        //console.log("x:", x, "y:", y);

        this.context.strokeStyle = "white";
        this.context.strokeRect(this.x,this.y,this.width, this.height);
    }
}