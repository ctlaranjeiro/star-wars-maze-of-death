class Player {
    constructor(maze){
        this.context = maze.context;

        this.mazeWidth = maze.width;
        this.mazeHeight = maze.height;

        this.width = 50;
        this.height = 35;

        this.cellWidth = 60; // 60 is the cell width! If i change the cell size in the maze-cell.js, I have to change here too
        this.cellHeight = 45; // 45 is the cell height - maze-cell.js

        this.x = this.cellWidth % this.width/2;
        this.y = this.cellHeight % this.height/2;
        

        this.cols = maze.cols;
        this.rows = maze.rows;
    }

    draw(){
        this.context.save();
        this.context.fillStyle = "purple"
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.restore();

        this.context.save();
        this.context.fillStyle = "white";
        this.context.font = "15px Arial";
        this.context.fillText("P", this.cellWidth / 2.4, this.cellHeight/ 1.65);
        this.context.restore();
    }
}