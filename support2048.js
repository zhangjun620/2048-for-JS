//移动端适配
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth; //大方块宽度
cellSideLength = 0.18 * documentWidth; //小方块边长
cellSpace = 0.04 * documentWidth; //间距


function getPosTop( i , j ){
    return cellSpace + i*(cellSpace + cellSideLength);
}

function getPosLeft( i , j ){
    return  cellSpace + j*(cellSpace + cellSideLength);
}

function getNumberBGC( number ){
    switch(number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
    return "black";
}

function getNumberColor( number ){
    if(number <= 4) 
        return "#776e65";

    return "white";
}

function nospace( board ){
    for(let i = 0; i < 4 ;i++)
        for(let j = 0;j < 4;j++)
        // 格子里还有为0的元素，那么代表还有空间生成新数字
            if( board[i][j] == 0){
                return false
            }
           
    
    return true;
}

function canMoveLeft( board ){
    for(let i = 0; i < 4; i++)
        for(let j = 0;j < 4; j++)
            if( board[i][j] != 0){
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j])
                    return true;
            }

    return false ;
}

function canMoveRight( board ){
    for(let i = 0; i< 4; i++)
        for(let j = 0; j<4; j++)
            if(board[i][j] !=0){
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                    return true;
            }
    return false;
}

function canMoveUp( board ){
    for(let j = 0; j < 4; j++)
        for(let i = 1; i < 4; i++)
            if( board[i][j] != 0){
                if(board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                    return true;
            }

    return false;
}

function canMoveDown( board ){

    for(let j = 0; j < 4; j++)
        for(let i = 2; i >= 0; i--)
            if( board[i][j] != 0){
                if(board[i+1][j] == 0 || board[i+1][j] == board[i][j])
                    return true;
            }
    return false;
}


function noBlockHorizontal(row , col1, col2 ,board){
    //第row行的col1和col2之间的元素进行判断
    for( let i = col1 + 1; i < col2 ; i++)
        if( board[row][i] != 0)  //存在障碍物
            return false

    return true;
}

function noBlockVertical(col, row1, row2 , board){
    for(let i = row1 + 1; i < row2 ; i++)
        if( board[i][col] !=0 )
            return false 

    return true;
}

function nomove(){
    if(canMoveLeft( board ) || 
       canMoveRight( board ) || 
       canMoveDown( board ) || 
       canMoveUp( board )){
           return false;
       }
    return true;
}