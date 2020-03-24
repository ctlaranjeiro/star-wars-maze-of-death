class Boss {
    constructor(maze) {
        this.context = maze.context;

        this.mazeWidth = maze.width;
        this.mazeHeight = maze.height;

        //cell size
        this.cellWidth = maze.cellWidth;
        this.cellHeight = maze.cellHeight;

        //maze grid
        this.grid = maze.grid;

        //Boss size
        this.width = this.cellWidth;
        this.height = this.cellHeight;

        //Boss coordinates
        this.x = 0;
        this.y = 0;

        this.i = 0; //cols
        this.j = 0; //rows

        this.image = new Image();
        this.image.src = "/img/Darth-Vader-End.png";

        this.bossLocation;
    }

    draw() {
        //-------BOSS RED RECTANGLE
        // this.context.save();
        // this.context.fillStyle = "red";
        // this.context.fillRect(this.x, this.y, this.width, this.height);
        // this.context.restore();
        //end of test
    
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }

    endCell(){
        this.bossLocation = this.grid.filter(cells => cells.end === true);

        this.x = this.bossLocation[0].x;
        this.y = this.bossLocation[0].y;

        this.i = this.bossLocation[0].i;
        this.j = this.bossLocation[0].j;

        //console.log("Boss location", this.bossLocation);
    }
}