class Maze{
    constructor (game){
        this.context = game.context;
        this.width = game.width;
        this.height = game.height;

        this.cols = 0;
        this.rows = 0;

        //linking the Cell inside the Maze
        this.cell = new Cell(this);

        //cell width and height
        this.cellWidth = this.cell.width;
        this.cellHeight = this.cell.height;

        //array grid
        this.grid = [];

        //current cell
        this.current;
    }

    setup(){
        this.cols = Math.floor(this.width / this.cellWidth);
        this.rows = Math.floor(this.height / this.cellHeight);

        for (let j = 0; j < this.rows; j++){
            for (let i = 0; i < this.cols; i++){
                let cell = new Cell (this,i,j);
                this.grid.push(cell);
                //console.log(cell);
                //console.log("i:", i,"j:",j);
            }
        }
        //console.log(this.grid);

        this.current = this.grid[0]; //set's the start location of the maze
        this.current.visited = true;

        for (let i = 0; i < this.grid.length; i++){
            let next = this.current.checkNeighbors();

            if (next){ // if next is not undefined (set in maze-cell - random neighbor)
                next.visited = true;
                this.current = next;
            }
        }
    }

    draw(){
        // console.log("Maze and Game are linked");
        // this.cell.show();
        this.setup();
        for (let i = 0; i < this.grid.length; i++){
            this.grid[i].show();
        }
    }

    index(i, j){
        if (i < 0 || j < 0 || i > this.cols-1 || j > this.rows-1){
            return -1;
        }

        return i + j * this.cols;
    }

    removeWalls(a,b){

    }
}