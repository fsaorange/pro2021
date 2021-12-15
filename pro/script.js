



function Renderboard(numRows,numCols,grid){
    let boardEl = document.querySelector("#board")

    for (let i=0;i<numRows;i++) {
        let trEl =document.createElement("tr")

        for (let j=0;j<numCols;j++) {
            let cellEl =document.createElement("div")
            cellEl.className="cell"
            cellEl.innerText=grid[i][j].count;

            let tdEl =document.createElement("td")
            tdEl.className="clear"
            tdEl.append(cellEl);

            trEl.append(tdEl);
        }

        boardEl.append(trEl);
    }
}

const directions=[
    [-1,-1],[-1,0],[-1,1],
    [0,-1],[0,1],
    [1,-1],[1,0],[1,1]
]
function Initialize(numRows,numCols,numMines){
    let grid = new Array(numRows)
    for (let i=0;i<numRows;i++){
        grid[i] = new Array(numCols);
        for (let j=0;j<numCols;j++){
            grid[i][j]={
                clear = false,
                count : 0
            };
        }
    }

    let mines = [];
    for (let k=0;k<numMines;k++){
        let cellMl = Math.trunc(Math.random() * numCols * numRows);
        let row = Math.trunc(cellMl / numCols);
        let col = cellMl % numCols
        console.log(cellMl,row,col);

        grid[row][col].count=-1
        mines.push([row,col]);
    }
        //计算有雷的周边为0的周边雷数
        for (let [row,col] of mines){
            console.log("mines:",row,col)
            for (let [drow,dcol] of directions){
                let cellRow = row+drow;
                let cellCol = col+dcol;
                if  (cellRow < 0 || cellCol < 0|| cellRow >= numRows || cellCol >= numCols){
                    continue;
                }
                if (grid[cellRow][cellCol].count === 0){
                    console.log("target",cellRow,cellCol);
                    let count = 0
                    for (let [arow,acol] of directions){
                        let tunderRow = cellRow+arow;
                        let tunderCol = cellCol+acol;
                        if  (tunderRow < 0 || tunderCol < 0|| tunderRow >= numRows || tunderCol >= numCols){
                            continue;
                        }
                        if (grid[tunderRow][tunderCol].count === -1){
                            console.log("danger",tunderRow,tunderCol);
                            count += 1;
                        }
                    }
                    if (count > 0){
                        grid[cellRow][cellCol].count = count
                    }
                }
            }   
        }
    return grid;
}

let grid = Initialize(9,9,9);
Renderboard(9,9,grid);