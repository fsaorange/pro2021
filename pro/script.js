


//布雷+点击
function Renderboard(numRows,numCols,numbines,grid){

    let boardEl = document.querySelector("#board")

    for (let i=0;i<numRows;i++) {
        let trEl =document.createElement("tr")

        for (let j=0;j<numCols;j++) {
            let cellEl =document.createElement("div")
            cellEl.className="cell"

            grid[i][j].cellEl = cellEl;
 
            //if ( grid[i][j].count === -1) {
            //    cellEl.innerText = "*";    
            //} else {
            //    cellEl.innerText = grid[i][j].count;
            //}
          

            cellEl.addEventListener("click",(e) => {
                if (grid[i][j].clear === false){
                    if (grid[i][j].count === -1) {
                        explode(grid, i, j, numRows, numCols)
                        for (let row = 0; row < grid.length; row ++) {
                            let gridRow = grid[row];
                            for (let col = 0; col < gridRow.length; col ++) {
                                let cell = gridRow[col];
                    
                                if (cell.flag === true) {
                                    let removed = document.getElementById("www");
                                    removed.remove();
                                }
                            }
                        }
                        if (explode(grid, i, j, numRows, numCols)){
                            setTimeout(fol,500)
                            function fol(){
                            let i =  document.getElementById('timeValue').value;
                            let j =  numbines - NoFlagtunder(grid);
                            alert("game over!!!" + "\n" + "用时:" + i  + '\n' + "未被插旗的雷数:" + j);
                            }
                        }
                        return;
                    }
                    if (grid[i][j].count === 0){
                        searchClearArea(grid,i,j,numRows,numCols);
                    } else if (grid[i][j].count > 0){
                        grid[i][j].clear = true;
                        cellEl.classList.add("clear")
                        grid[i][j].cellEl.innerText=grid[i][j].count;
                    }
                    checkAllClear(grid)

                }else if (grid[i][j].clear === true) {
                    let count =0 ;
                    for (let [drow,dcol] of directions){
                        let cellRow = i+drow;
                        let cellCol = j+dcol;
                        if  (cellRow < 0 || cellCol < 0|| cellRow >= numRows || cellCol >= numCols){
                            continue;
                        }
                        if (grid[cellRow][cellCol].clear ===false){
                            count +=1
                        }
                    }
                    if (grid[i][j].count === count  ){
                        for (let [row,col] of directions){
                            let CRow = i+row;
                            let CCol = j+col;
                            if  (CRow < 0 || CCol < 0|| CRow >= numRows || CCol >= numCols){
                                continue;
                            }
                            if (grid[CRow][CCol].clear === false && grid[CRow][CCol].flag ===false){
                                insertFlag(CRow,CCol,numbines,grid);
                            }
                        }             
                }
            }
            });


            let tdEl =document.createElement("td")
            tdEl.append(cellEl);
            cellEl.id = i + '_' + j ;
            trEl.append(tdEl);

            cellEl.oncontextmenu =function(){
                insertFlag(i,j,numbines,grid);
                return false;
            }
        }

        boardEl.append(trEl);
    }
}


//方向
const directions=[
    [-1,-1],[-1,0],[-1,1],
    [0,-1],[0,1],
    [1,-1],[1,0],[1,1]
]
//初始化棋盘
function Initialize(numRows,numCols,numMines){
    let grid = new Array(numRows)
    for (let i=0;i<numRows;i++){
        grid[i] = new Array(numCols);
        for (let j=0;j<numCols;j++){
            grid[i][j]={
                clear : false,
                count : 0,
                flag : false
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
                    grid[cellRow][cellCol].count=count
                }
            }
        }   
    }
    //排除雷重复的情况
    return grid; 
}

//点击操作下寻找无雷区域
function searchClearArea(grid, row, col, numRows, numCols) {
    let gridCell = grid[row][col];
    gridCell.clear = true;
    gridCell.cellEl.classList.add("clear");

    for (let [drow, dcol] of directions) {
        let cellRow = row + drow;
        let cellCol = col + dcol;
        console.log(cellRow, cellCol, numRows, numCols);
        if (cellRow < 0 || cellRow >= numRows || cellCol < 0 || cellCol >= numCols) {
            continue;
        }

        let gridCell = grid[cellRow][cellCol];

        console.log(cellRow, cellCol, gridCell);
        
        if (!gridCell.clear) {
            gridCell.clear = true;
            gridCell.cellEl.classList.add("clear");
            if (gridCell.count === 0) {
                searchClearArea(grid, cellRow, cellCol, numRows, numCols);
            } else if (gridCell.count > 0) {
                gridCell.cellEl.innerText = gridCell.count;
            } 
        }
    }
}

//游戏开始时寻找无雷区域
function searchsafeArea(grid, row, col, numRows, numCols) {
    let gridCell = grid[row][col];
    gridCell.clear = true;
    gridCell.cellEl.classList.add("clear");

    for (let [drow, dcol] of directions) {
        let cellRow = row + drow;
        let cellCol = col + dcol;
        console.log(cellRow, cellCol, numRows, numCols);
        if (cellRow < 0 || cellRow >= numRows || cellCol < 0 || cellCol >= numCols) {
            continue;
        }

        let gridCell = grid[cellRow][cellCol];

        console.log(cellRow, cellCol, gridCell);
        
        if (gridCell.count !== -1 ) {
            gridCell.clear = true;
            gridCell.cellEl.classList.add("clear");
            if (gridCell.count === 0) {
                searchClearArea(grid, cellRow, cellCol, numRows, numCols);
            } else if (gridCell.count > 0) {
                gridCell.cellEl.innerText = gridCell.count;
            } 
        }
    }
    //初始化的时候就赢了
    checkAllClear(grid)
}

//炸弹爆炸
function explode(grid, row, col, numRows, numCols) {
    grid[row][col].cellEl.classList.add("exploded");

    for (let cellRow = 0; cellRow < numRows; cellRow++) {
        for (let cellCol = 0; cellCol < numCols; cellCol++) {
            let cell =  grid[cellRow][cellCol];
            cell.clear = true;
            cell.cellEl.classList.add('clear');

            if (cell.count === -1) {
                cell.cellEl.classList.add('landmine');
            }
        }
    }
    return true;
}

//判断是否胜利
function checkAllClear(grid) {
    for (let row = 0; row < grid.length; row ++) {
        let gridRow = grid[row];
        for (let col = 0; col < gridRow.length; col ++) {
            let cell = gridRow[col];
            if (cell.count !== -1 && !cell.clear) {
                return false;
            }
        }
    }

    for (let row = 0; row < grid.length; row ++) {
        let gridRow = grid[row];
        for (let col = 0; col < gridRow.length; col ++) {
            let cell = gridRow[col];

            if (cell.count === -1) {
                cell.cellEl.classList.add('landmine');
            }

            cell.cellEl.classList.add("success");
        }
    }
    for (let row = 0; row < grid.length; row ++) {
        let gridRow = grid[row];
        for (let col = 0; col < gridRow.length; col ++) {
            let cell = gridRow[col];

            if (cell.flag === true) {
                let removed = document.getElementById("www");
                removed.remove();
            }
        }
    }
    //return true;
    setTimeout(foo,500)
    function foo(){
    let i = document.getElementById('timeValue').value;
    alert("恭喜你赢了" + "\n" + "用时" + i );
    }
}

//数雷
function CountTunder(grid){
    let count =0
    for (let row = 0; row < grid.length; row ++) {
        let gridRow = grid[row];
        for (let col = 0; col < gridRow.length; col ++) {
            let cell = gridRow[col];

            if (cell.count === -1) {
                count += 1;
            }
        }
    }
    return count;
}


//数旗
function Flagcount(grid){
    let count =0
    for (let row = 0; row < grid.length; row ++) {
        let gridRow = grid[row];
        for (let col = 0; col < gridRow.length; col ++) {
            let cell = gridRow[col];

            if (cell.flag === true) {
                count += 1;
            }
        }
    }
    return count;
}   

//插旗
function insertFlag(i,j,numbines,grid){
    let cell = grid[i][j];
    let flagcount = Flagcount(grid);
    let cellbackground =document.getElementById(i + '_' + j);
    if (cell.clear ===false && flagcount <= (numbines-1)) {
        let imgEl = document.createElement("img");
        imgEl.src = "https://img1.baidu.com/it/u=1274523267,3693859102&fm=26&fmt=auto";
        imgEl.style.width = '22px';
        imgEl.style.height = '23px';
        imgEl.id="www"
        //cell.clear=true;
        cell.flag = true;
        cellbackground.append(imgEl);
        flagcount +=1 ;
        let i =parseInt(document.getElementById('restTunder').value);
        i -= 1;
        document.getElementById('restTunder').value =  i +'个';
    }
}

//随机掀开一个的方格
function openCell(num1,num2,grid) {
    let cellMl = Math.trunc(Math.random() * num1 * num2);
    let row = Math.trunc(cellMl / num2);
    let col = cellMl % num2
    if (grid[row][col].count !== -1){
        searchsafeArea(grid,row,col,num1,num2);
    } else {
        openCell(num1,num2)
    }
}

function myFunction(num1,num2,num3) {
    resetTimer();
    let i = parseInt(document.getElementById('timeValue').value.slice(0,1));
    if (document.getElementById('timeValue').value === 0 + '秒'){
        startTimer()
    } else {
        let j = parseInt(document.getElementById('timeValue').value.slice(0,1)) -i
        document.getElementById('timeValue').value === j + '秒';
    }
    document.querySelector("#board").innerHTML ='';
    let grid = Initialize(num1,num2,num3);
    let Tunders = CountTunder(grid)
    if (Tunders < num3){
        Initialize(num1,num2,num3)
    }
    Renderboard(num1,num2,num3,grid);
    document.getElementById('restTunder').value =  num3 +'个';
    openCell(num1,num2,grid)
}

var second = 0
function myold(){
    location.reload();
}

function resetTimer() {
    //window.clearInterva(startTimer());
    document.getElementById('timeValue').value = second+ '秒';
}

function startTimer() {
    return setInterval(timer,1000);
}

function timer() {
    second +=1;
    document.getElementById('timeValue').value =second  +'秒';
}

//被插旗的雷数
 function NoFlagtunder(grid) {
    let count =0
    for (let row = 0; row < grid.length; row ++) {
        let gridRow = grid[row];
        for (let col = 0; col < gridRow.length; col ++) {
            let cell = gridRow[col];

            if (cell.flag === true && cell.count === -1) {
                count += 1;
            }
        }
    }
    return count;
}
