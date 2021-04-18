
//ingame constants
const resetDiv = document.querySelector('.reset');
const cells = document.querySelectorAll('.game-cell');
const huPlayer = 'o';
const aiPlayer = 'x';
const xSymbol = '×';
const oSymbol = '○';
const statusDiv= document.querySelector('.status');


//ingame variables
var realBoard = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
var inValidClick = false;
var flag=0;
var glag = 0;
var gulag = 0;
var cornerPuts = 0;
var emptyBoard = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];

//functions
resetGame();
function playGame(){
    resetDiv.addEventListener('click',resetGame);
    for (const cell of cells){
        cell.addEventListener('click',handleClick);
    }
    

}


function turn(squareId,player,square){
    let row = Math.floor(squareId/3);
    let col = squareId % 3;
    if(realBoard[row][col] == ' '){
        realBoard[row][col] = player;
        square.target.classList.add('o');
         
    }    
    else{
        inValidClick = true;
    }
    
}

function gameDraw(realBoard){
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(realBoard[i][j]==' '){
                return false;
            }
        }
    }
    return true;
}


function aiDisplay(realBoard,i,j){
    var computedSquareId = (i*3)+j;
    var aiSquare = document.getElementById(String(computedSquareId)).classList.add('x');
}

// function minimaxWin(){
//     let winner = null;
//     let unmarked = 0;
//     for(var i=0;i<3;i++){
//         for(var j=0;j<3;j++){
//             if(realBoard[i][j] == ' '){
//                 unmarked+=1;
//             }
//         }
//     }
//     if((realBoard[0][0]=='x' && realBoard[0][1]=='x' &&realBoard[0][2]=='x') || (realBoard[1][0]=='x' && realBoard[1][1]=='x' &&realBoard[1][2]=='x') || (realBoard[2][0]=='x' && realBoard[2][1]=='x' &&realBoard[2][2]=='x') || (realBoard[2][0]=='x' && realBoard[1][0]=='x' &&realBoard[0][0]=='x')  || (realBoard[2][1]=='x' && realBoard[1][1]=='x' &&realBoard[0][1]=='x')  || (realBoard[2][2]=='x' && realBoard[1][2]=='x' &&realBoard[0][2]=='x')  || (realBoard[2][2]=='x' && realBoard[1][1]=='x' &&realBoard[0][0]=='x')  || (realBoard[2][0]=='x' && realBoard[1][1]=='x' &&realBoard[0][2]=='x')){
//         winner = 'ai';
        
//     }
//     else if((realBoard[0][0]=='o' && realBoard[0][1]=='o' &&realBoard[0][2]=='o') || (realBoard[1][0]=='o' && realBoard[1][1]=='o' &&realBoard[1][2]=='o') || (realBoard[2][0]=='o' && realBoard[2][1]=='o' &&realBoard[2][2]=='o') || (realBoard[2][0]=='o' && realBoard[1][0]=='o' &&realBoard[0][0]=='o')  || (realBoard[2][1]=='o' && realBoard[1][1]=='o' &&realBoard[0][1]=='o')  || (realBoard[2][2]=='o' && realBoard[1][2]=='o' &&realBoard[0][2]=='o')  || (realBoard[2][2]=='o' && realBoard[1][1]=='o' &&realBoard[0][0]=='o')  || (realBoard[2][0]=='o' && realBoard[1][1]=='o' &&realBoard[0][2]=='o')){
//         winner = 'hu';
    
//     }
//     else if(winner == null && unmarked == 9){
//         winner = 'draw';
        
//     }
//     return winner;

    
// }

function aiPlays(realBoard){
    let bestScore = -Infinity;
    let bestMove;
    let alpha = -Infinity;
    let beta = Infinity;
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(realBoard[i][j] == ' '){
                realBoard[i][j] = 'x';
                let score = minimax(realBoard,0,false,alpha, beta);
                realBoard[i][j] = ' ';
                if(score>bestScore){
                    bestScore = score;
                    bestMove = {i, j};
                }
            }
        }
    }
    realBoard[bestMove.i][bestMove.j] = 'x';
    aiDisplay(realBoard,bestMove.i,bestMove.j);

    // for(var i =0;i<3;i++){
    //     for(var j=0;j<3;j++){
    //         if(realBoard[i][j]==' '){
    //             realBoard[i][j] = 'x';
    //             //multiply row with 3, add the result to col
    //             var computedSquareId = (i*3)+j;
    //             var aiSquare = document.getElementById(String(computedSquareId)).classList.add('x');
    //             flag = 1;
    //             break;
    //         }
    //     }
    //     if(flag){
    //         break;
    //     }
    // }
}

function emptySquares(board){
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(board[i][j]==' '){
                return true;
            }
        }
    }
    return false;
}


function minimax(realBoard,depth,maximize,alpha,beta){
    let result = null;
    if(checkWin(aiPlayer)){
        result = 10;
        return 10-depth;
    }
    else if(checkWin(huPlayer)){
        result = 10;
        return -10+depth;
    }
    else if(result == null && !emptySquares(realBoard)){
        result = 0;
        return 0;
    }
    
    if(maximize){
        let bestScore = -Infinity;
        let flag = 0;
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                if(realBoard[i][j] == ' '){
                    realBoard[i][j] = 'x';
                    let score = minimax(realBoard,depth+1,false,alpha,beta);
                    realBoard[i][j] = ' ';
                    bestScore = Math.max(score,bestScore);
                    alpha = Math.max(alpha,bestScore);
                    if(beta<=alpha){
                        flag = 1;
                        break;
                    }
                }
            }
            if(flag){
                break;
            }
        }
        return bestScore;
    }
    else{
        let bestScore = Infinity;
        let flag = 0;
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                if(realBoard[i][j] == ' '){
                    realBoard[i][j] = 'o';
                    let score = minimax(realBoard,depth+1,true);
                    realBoard[i][j] = ' ';
                    bestScore = Math.min(score,bestScore);
                    beta = Math.min(beta,bestScore);
                    if(beta<=alpha){
                        flag = 1;
                        break;
                    }

                }
                if(flag){
                    break;
                }
            }
        }
        return bestScore;

    }
    
}


function checkWin(player){
    if((player == aiPlayer) && ((realBoard[0][0]=='x' && realBoard[0][1]=='x' &&realBoard[0][2]=='x') || (realBoard[1][0]=='x' && realBoard[1][1]=='x' &&realBoard[1][2]=='x') || (realBoard[2][0]=='x' && realBoard[2][1]=='x' &&realBoard[2][2]=='x') || (realBoard[2][0]=='x' && realBoard[1][0]=='x' &&realBoard[0][0]=='x')  || (realBoard[2][1]=='x' && realBoard[1][1]=='x' &&realBoard[0][1]=='x')  || (realBoard[2][2]=='x' && realBoard[1][2]=='x' &&realBoard[0][2]=='x')  || (realBoard[2][2]=='x' && realBoard[1][1]=='x' &&realBoard[0][0]=='x')  || (realBoard[2][0]=='x' && realBoard[1][1]=='x' &&realBoard[0][2]=='x'))){
        
        return true;
    }

    if((player == huPlayer) && ((realBoard[0][0]=='o' && realBoard[0][1]=='o' &&realBoard[0][2]=='o') || (realBoard[1][0]=='o' && realBoard[1][1]=='o' &&realBoard[1][2]=='o') || (realBoard[2][0]=='o' && realBoard[2][1]=='o' &&realBoard[2][2]=='o') || (realBoard[2][0]=='o' && realBoard[1][0]=='o' &&realBoard[0][0]=='o')  || (realBoard[2][1]=='o' && realBoard[1][1]=='o' &&realBoard[0][1]=='o')  || (realBoard[2][2]=='o' && realBoard[1][2]=='o' &&realBoard[0][2]=='o')  || (realBoard[2][2]=='o' && realBoard[1][1]=='o' &&realBoard[0][0]=='o')  || (realBoard[2][0]=='o' && realBoard[1][1]=='o' &&realBoard[0][2]=='o'))){
        
        return true;
    }
return false;

}

function gameOver(player){
    for (const cell of cells){
        cell.removeEventListener('click',handleClick);
    }
    if(player==huPlayer){statusDiv.innerText = "human won!";}
    
    else if(player == aiPlayer)
    statusDiv.innerHTML = `${"<span>told ya, <br>no<br></span>chance!"}` ;

    else if(player == 'no one')
    statusDiv.innerHTML = `${"<span>Game</span> <br>Draw"}` ;
}

//event handlers
function handleClick(square){
    inValidClick = false;
    flag=0;
    turn(square.target.id,huPlayer,square);
    if(checkWin(huPlayer)){
        gameOver(huPlayer);

    }
    else if(!gameDraw(realBoard) && !inValidClick){
        aiPlays(realBoard);
        cornerPuts+=1;
        if(checkWin(aiPlayer)){
            gameOver(aiPlayer);
        }
    }
    else if(gameDraw(realBoard)){
        gameOver('no one');

    }
    
}

function resetGame(){
    cornerPuts = 0;
    for(const cell of cells){
        cell.classList.remove('x');
        cell.classList.remove('o');
    }
    for (const cell of cells){
        cell.addEventListener('click',handleClick);
    }
    realBoard = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
    statusDiv.innerHTML =  `${"<span>beat <br>the<br></span> machine"}` 
    
}


playGame();




