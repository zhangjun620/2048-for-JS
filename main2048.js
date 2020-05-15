let board = new Array();
let socre = 0;

$(document).ready(function(){
    prepareForMobile();
    newgame();
    $('#newgamebutton').click( function(){
        newgame()
    })
});

function prepareForMobile(){
    if( documentWidth > 500){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    $('#grid-container').css('width',gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-raduis',0.02 * gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02 * gridContainerWidth);

}

function newgame(){
    //初始化游戏
    init();

    //随机两个格子生成两个数字 2/4
    generateOneNumber();
    generateOneNumber();

}

function init(){
    for(let i = 0; i < 4; i++)
        for(let j = 0; j < 4 ; j++){
            //每个小格子的值 拼出来
            let gridCell = $("#grid-cell-" + i + "-" + j);

            // 计算每个小格子的方位
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }


    for(let i = 0; i < 4; i++){
        //将一维数组标称二维数组
        board[i] = new Array();
        for(let j = 0; j < 4; j++)
            //初始化每一个格子中的数字 ，都是0
            board[i][j] = 0;   
    }
    //刷新前端数字显示 每次都刷新
    updateBoardView();

}

function updateBoardView(){
    // 变动的数字
    $(".number-cell").remove();
    for(let i = 0; i < 4; i++)
        for(let j = 0; j < 4 ; j++){
            $('#grid-container').append(`<div class="number-cell" id="number-cell-`+ i + `-`+ j +`"></div>`);
            let theNumberCell = $(`#number-cell-` + i + "-" + j);

            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2);
            }else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBGC( board[i][j] ));
                theNumberCell.css('color',getNumberColor( board[i][j] ));
                theNumberCell.text( board[i][j] );                
            }

        }

    $('.number-cell').css('line-height',cellSideLength + 'px');
    $('.number-cell').css('font-size',0.6 * cellSideLength + 'px')
}

function generateOneNumber(){
    //看有没有空间生成数字了
    if( nospace( board ) )
        return false;

    //随机位置  x,y坐标 
    let randx = parseInt( Math.floor( Math.random() * 4 ) );
    let randy = parseInt( Math.floor( Math.random() * 4 ) );

    //随机生成算法
    // 第一次
    // while( true ){

    //     if( board[randx][randy] == 0)
    //         break;
    //     //不为0就生成
    //     randx = parseInt( Math.floor( Math.random() * 4 ) );
    //     randy = parseInt( Math.floor( Math.random() * 4 ) );
    // }
    //第二次修改
    let time  = 0;
    while( time < 50 ){

        if( board[randx][randy] == 0)
        break;
        //不为0就生成
        randx = parseInt( Math.floor( Math.random() * 4 ) );
        randy = parseInt( Math.floor( Math.random() * 4 ) );

        time++;
    }
    if(time == 50){
         for(let i = 0; i < 4;i++ ){
             for(let j =0; j < 4;j++)
             if( board[i][j] == 0){
                 randx = i;
                 randy = j;
             }
         }  
    }

    //随机数字
    let randNumber  = Math.random() < 0.5?2:4 ;

    //随机位置显示数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx, randy ,randNumber);

    return true;
}


$(document).keydown(function( event ){
    switch(event.keyCode){
        case 37: // left
            if( moveLeft()){
                setTimeout("generateOneNumber()",210) ;
                setTimeout("isgameover()",300);
            }
            break;
        case 38: //up
            if( moveUp() ){
                setTimeout("generateOneNumber()",210) ;
                setTimeout("isgameover()",300);
            }
            break;
        case 39: //right
            if( moveRight() ){
                setTimeout("generateOneNumber()",210) ;
                setTimeout("isgameover()",300);
            }
            break;
        case 40: //down
            if( moveDown() ){
                setTimeout("generateOneNumber()",210) ;
                setTimeout("isgameover()",300);
            }
            break;
        default : 
            break;
    }
})

function isgameover(){
    if( nospace( board ) && nomove( board )){
        gameover();
    }
}

function gameover(){
    alert('gameover')
    console.log(99)
}

function moveLeft(){
    if( !canMoveLeft( board ))
        return false;

    // moveleft
    for(let i = 0; i< 4; i++)
        for( let j = 1; j < 4; j++){ //左边第一列不可以移动所以从1 开始
            if( board[i][j] != 0){

                for( let k = 0; k< j ;k++){
                    if( board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                        //move 看是不是空的或有没有障碍物
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)){
                        // 相等合并 并且没有障碍物
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        continue;
                    
                    }
                } 
            }
        }

    setTimeout("updateBoardView()",'10') ; //刷新
    return true

}

function moveUp(){
    console.log(1)
    if( !canMoveUp( board ))
        return false;

    // move up
    for(let j = 0; j < 4 ; j++)
        for(let i = 1; i < 4; i++){
            console.log(2)
            if( board[i][j] != 0){
                for(let k = 0; k < i; k++){
                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                }
            }
        }


    setTimeout("updateBoardView()",'10') ; //刷新
    return true
}

function moveRight(){
    if( !canMoveRight( board ))
        return false;

    // move right
    for(let i = 0; i < 4 ; i++)
        for(let j = 2; j >= 0; j--){
            if( board[i][j] != 0){

                for(let k=3; k > j; k--){
                    if( board[i][k] == 0 && noBlockHorizontal(i, j, k, board) ){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;

                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) ){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue; 
                    }

                }
            }
        }


    setTimeout("updateBoardView()",'10') ; //刷新
    return true
}

function moveDown(){
    if( !canMoveDown( board ))
        return false;
    
    for(let j = 0; j < 4; j++)
        for(let i = 2; i >= 0; i --)
            if( board[i][j] != 0){
                for(let k =3 ; k > i ; k--){
                    if( board[k][j] == 0 && noBlockVertical(j, i, k, board) ){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }

    setTimeout("updateBoardView()",'10') ; //刷新
    return true

}