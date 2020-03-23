class Cell{
    constructor (maze, i, j){
        this.context = maze.context;
        this.mazeWidth = maze.width;
        this.mazeHeight = maze.height;
        this.grid = maze.grid;
        this.index = maze.index;

        this.cols = maze.cols;
        this.rows = maze.rows;
        
        // cell size
        this.width = 60; // ---- LEVEL 1 - 60 | LEVEL 2 - 50 | LEVEL 3 - 40
        this.height = 45; //---- LEVEL 1 - 45 | LEVEL 2 - 35 | LEVEL 3 - 25
        
        // cell location on column and row
        this.i = i; //column number
        this.j = j; //row number

        // x and y coordinates
        this.x = this.i * this.width; // Cell x coordinate - i is looping, so it will do this for every cell until it reaches the width of the canvas - 60 (it starts at 0)
        this.y = this.j * this.height; // Cell y coordinate - j is looping, so it will do this for every cell until it reaches the height of the canvas - 45 (it starts at 0)

        // mark if wall exists or not - all set as true
        this.walls = [true, true, true, true];

        // mark as visited - it start's as it has not been visited
        this.visited = false;

        // neighbors
        //this.neighbors = [];

    }

    checkNeighbors(){

        let neighbors = [];

        let top = this.grid[this.index(this.i, this.j-1)];
        let right = this.grid[this.index(this.i+1, this.j)];
        let bottom = this.grid[this.index(this.i, this.j+1)];
        let left = this.grid[this.index(this.i-1, this.j)];

        


        if (top && !top.visited) { 
            // as long as top exists and it hasn't been visited, push it to the neighbors array
            neighbors.push(top);
        }

        if (right && !right.visited) {
            neighbors.push(right);
        }

        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }

        if (left && !left.visited) {
            neighbors.push(left);
        }

        //console.log("top:", top, "right:", right,"bottom:", bottom,"left:", left);
        //console.log(this.neighbors)
        

        //Random neighboor
        if (neighbors.length > 0){
            let random = Math.floor(Math.random() * neighbors.length);
            return neighbors[random];
        }else {
            return undefined;
        }

    }

    //optional - just highlights the current cell
    // highlight(){
    //     this.context.save();
    //     this.context.fillStyle = "orange";
    //     this.context.fillRect(this.x,this.y,this.width, this.height);
    //     this.context.restore();
    // }

    show(){
        //console.log("maze-cell is connected to Maze")
        //console.log("x:", x, "y:", y);

        this.context.save();

        //this.context.shadowBlur = 2;
        //this.context.shadowColor = "white";
        this.context.lineWidth = 2;
        this.context.strokeStyle = "white";

        // TOP wall
        if(this.walls[0]){
            this.context.beginPath();
            this.context.moveTo(this.x, this.y);
            this.context.lineTo(this.x + this.width, this.y);
            this.context.stroke();
            this.context.closePath();
        }

        // RIGHT wall
        if(this.walls[1]){
            this.context.beginPath();
            this.context.moveTo(this.x + this.width, this.y);
            this.context.lineTo(this.x + this.width, this.y + this.height);
            this.context.stroke();
            this.context.closePath();
        }

        // BOTTOM wall
        if (this.walls[2]){
            this.context.beginPath();
            this.context.moveTo(this.x + this.width, this.y + this.height);
            this.context.lineTo(this.x, this.y + this.height);
            this.context.stroke();
            this.context.closePath();
        }

        // LEFT wall
        if (this.walls[3]){
            this.context.beginPath();
            this.context.moveTo(this.x, this.y + this.height);
            this.context.lineTo(this.x, this.y);
            this.context.stroke();
            this.context.closePath();
        }

        this.context.restore();

        //---- CHECK WITH COLOR IF ALL CELLS HAVE BEEN VISITED
        // if(this.visited){
        //     this.context.save();
        //     this.context.fillStyle = "#1febfd";
        //     this.context.fillRect(this.x,this.y,this.width, this.height);
        //     this.context.restore();
        //     //console.log("visited");
        // }
    }
}