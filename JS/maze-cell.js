class Cell{
    constructor (maze, i, j){
        this.context = maze.context;
        this.mazeWidth = maze.width;
        this.mazeHeight = maze.height;

        this.width = 60;
        this.height = 45;

        this.i = i; //column number
        this.j = j; //row number
    }

    checkNeighbors(){

    }

    //optional - just highlights the current cell
    highlight(){

    }

    show(){
        //console.log("maze-cell is connected to Maze")
        
    }
}