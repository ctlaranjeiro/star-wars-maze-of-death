class Collect {
    constructor(maze) {
        this.context = maze.context;

        this.mazeWidth = maze.width;
        this.mazeHeight = maze.height;

        //cell size
        this.cellWidth = maze.cellWidth;
        this.cellHeight = maze.cellHeight;

        //maze grid
        this.grid = maze.grid;
        this.collectGrid = [];

        //maze cols and rows
        this.cols = maze.cols;
        this.rows = maze.rows;

        //collect size
        this.width = this.cellWidth / 2;
        this.height = this.cellHeight / 2;

        //collect coordinates
        this.x = 0;
        this.y = 0;

        this.i = 0; //cols
        this.j = 0; //rows

        this.current;

        this.endCell;

        this.image = new Image();
        this.image.src = "/img/Chewbacca.png";
    }

    draw() {
        //this.setRandomPosition();

        //-------COLLECT GREEN RECTANGLE
        // this.context.save();
        // this.context.fillStyle = "green";
        // this.context.fillRect(this.x, this.y, this.width, this.height);
        // this.context.restore();

        //console.log("collect drawn");

        this.context.drawImage(this.image,this.x, this.y, this.width, this.height);
    }

    setRandomPosition() {
        //console.log(this.rows, this.cols);

        this.i = Math.floor(Math.random() * this.cols);
        this.j = Math.floor(Math.random() * this.rows);
        //console.log("this.i:", this.i, "this.j:", this.j);

        //------- exclude random number of i and j if they're equal to the end cell location
        this.endCell = this.grid.filter(cells => cells.end === true);
        //console.log(this.endCell[0].i);

        //console.log("endCell i:", this.endCell[0].i, "endCell j:", this.endCell[0].j);

        if (this.i === this.endCell[0].i && this.j === this.endCell[0].j) {
            if (this.i === 0) {
                this.i += 1;
            } else {
                this.i -= 1;
            }
        }
        //------- END of exclusion

        this.current = this.grid.filter(cells => cells.i === this.i && cells.j === this.j);
        //console.log("Collect this.current:", this.current);

        this.x = this.current[0].x;
        this.y = this.current[0].y;
    }
}