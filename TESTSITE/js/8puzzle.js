//ingame constants
const cells = document.querySelectorAll('.cell');
const aiTurn = document.querySelector('.controlbtn')
const buttons = []
buttons.push(document.querySelector('.fa.fa-arrow-up'),document.querySelector('.fa.fa-arrow-right'),document.querySelector('.fa.fa-arrow-left'),document.querySelector('.fa.fa-arrow-down'))


//ingame variables
var realBoard = [];
var aiNotSolving;

//functions
function playGame(){
    aiNotSolving = true;

    for(const button of buttons){
        button.addEventListener('click',clickHandler)
    }
    aiTurn.addEventListener('click',helpmeHandler)
    realBoard = validBoardGenerator()
    fillBoard();
    userPlays();
    
}

function validBoardGenerator(){
    var randomBoard
    while(true){
        randomBoard = Array.from(Array(9).keys())
        shuffleArray(randomBoard)
        if(isSolvable(randomBoard)){
            break;
        }
    }

    return randomBoard
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

}

function isSolvable(randomBoard){
    var inversions =0;
    for(var i=0;i<randomBoard.length-1;i++){
        for(var j=i+1;j<randomBoard.length;j++){
            if(randomBoard[i]>randomBoard[j] && randomBoard[i]!=0 && randomBoard[j]!=0){
                inversions+=1;
            }
        }
    }

    return inversions%2==0;
}

function fillBoard(){
    
    for(var i=0;i<9;i++){
        if(realBoard[i] == 0){
            cells[i].innerText = ''
        }
        else if(realBoard[i]!=0){
            cells[i].innerText = realBoard[i]
        }
       
    }
}

function aiSolves(){
     
}


function emptySquare(){
    for(var i=0;i<realBoard.length;i++){
        if(realBoard[i] == 0){
            return i;
        }
    }
}

function userPlays(){
    if(checkWin()){
        gameOver();
    }

    else if(!aiNotSolving){
        for(const button of buttons){
            button.removeEventListener('click',clickHandler)
        }
    }

}

function checkWin(){
    for(var i=0;i<7;i++){
        if(realBoard[i]>realBoard[i+1]){
            return false
        }
    }
    return true
}


function gameOver(){
    for(const button of buttons){
        button.removeEventListener('click',clickHandler)
    }
    alert('solved')

}


//event handlers
function clickHandler(square){
    var empty = emptySquare();
    if(square.target.id =="left"){
        if(empty%3 !=0){
            let temp = realBoard[empty];
            realBoard[empty] = realBoard[empty-1];
            realBoard[empty-1] = temp;
        }
        fillBoard();
        userPlays();
        
    }
    
    if(square.target.id =="up"){
        if(empty>=3){
            let temp = realBoard[empty];
            realBoard[empty] = realBoard[empty-3];
            realBoard[empty-3] = temp;
        }
        fillBoard();
        userPlays();
        
    } 

    if(square.target.id =="right"){
        if(empty%3 !=2){
            let temp = realBoard[empty];
            realBoard[empty] = realBoard[empty+1];
            realBoard[empty+1] = temp;
        }
        fillBoard();
        userPlays();
        
    } 

    if(square.target.id =="down"){
        if(empty<6){
            let temp = realBoard[empty];
            realBoard[empty] = realBoard[empty+3];
            realBoard[empty+3] = temp;
        }
        fillBoard();
        userPlays();
        
    } 

}


function helpmeHandler(square){
    aiNotSolving = false;
    aiSolves();
}



playGame();