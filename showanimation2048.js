//动画效果
function showNumberWithAnimation( i, j, randNumber){

    let numberCell = $('#number-cell-' + i + '-' + j);

    numberCell.css('background-color', getNumberBGC( randNumber ));
    numberCell.css('color',getNumberColor( randNumber ));
    numberCell.text( randNumber );
    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    },50)
}

function showMoveAnimation(fromx, fromy, tox , toy){
    let numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
        top: getPosTop(tox,toy),
        left: getPosLeft(tox, toy)
    },50)
}