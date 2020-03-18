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

        //stack
        this.stack = [];
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
                this.stack.push(this.current);                
                this.removeWalls(this.current, next);
                this.current = next;
            } else if (this.stack.length > 0){
                this.current = this.stack.pop(); 
            }
            console.log(this.stack);
        }

        //console.log(this.stack);
    }

    draw(){
        // console.log("Maze and Game are linked");
        // this.cell.show();
        this.setup();
        for (let i = 0; i < this.grid.length; i++){
            this.grid[i].show();
        }
        
        this.current.highlight();
    }

    index(i, j){
        if (i < 0 || j < 0 || i > this.cols-1 || j > this.rows-1){
            return -1;
        }

        return i + j * this.cols;
    }

    removeWalls(a,b){
        
        let x = a.i - b.i;

        if (x === 1){
            a.walls[3] = false;
            b.walls[1] = false;
        } else if (x === -1){
            a.walls[1] = false;
            b.walls[3] = false;
        }

        let y = a.j - b.j;

        if (y === 1){
            a.walls[0] = false;
            b.walls[2] = false;
        } else if (y === -1){
            a.walls[2] = false;
            b.walls[0] = false;
        }
    }
}