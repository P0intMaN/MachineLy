//ingame constants
const cells = document.querySelectorAll('.cell');
const aiTurn = document.querySelector('.controlbtn')
const buttons = []
buttons.push(document.querySelector('.fa.fa-arrow-up'),document.querySelector('.fa.fa-arrow-right'),document.querySelector('.fa.fa-arrow-left'),document.querySelector('.fa.fa-arrow-down'))


//ingame variables
var realBoard = [];
var solvedBoard= [1, 2, 3, 4, 5, 6, 7, 8, 0];
var steps = [];
var aiNotSolving;

//functions
function playGame(){
    aiNotSolving = true;

    for(const button of buttons){
        button.addEventListener('click',clickHandler)
    }
    aiTurn.addEventListener('click',helpmeHandler)
    realBoard = validBoardGenerator();
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
    let realBoardCopy = [];
    let openlist = [];                   //contains steps
    let openLIST = [];                   //contains slice(0, 8)
    let closedlist = [];
    let x = [];
    let heuristiclist = [];

    realBoardCopy = realBoard.slice();
    let zeroIndex = emptySquare(realBoardCopy);
    realBoardCopy.push(zeroIndex);

    openlist.push(realBoardCopy);
    x = openlist.shift();
    
    while(gameOverCopy(x.slice(0, 9)))  
    {
        zeroIndex = x[9];
        if (zeroIndex - 3 >= 0)                         //up
        {
            let ss1 = [];                            
            ss1 = x.slice();
            var temp = ss1[zeroIndex];
            ss1[zeroIndex] = ss1[zeroIndex - 3];
            ss1[zeroIndex - 3] = temp;
            ss1[9] = ss1[9] - 3;
            ss1.push("UP");
            if(!gameOverCopy(ss1.slice(0, 9))){
                steps = ss1.slice(10);
                break;
            }
            var j;
            for(var i=0; i<closedlist.length; i++){
                j = compare(ss1.slice(0, 9), closedlist[i]);
                if (j == 0)
                {
                    //means there is a match
                    break;
                }
            }
            if(j!=0){
                openlist.push(ss1);
                openLIST.push(ss1.slice(0, 9));
                heuristiclist.push(heuristics(ss1.slice(0, 9)));
            }

        }

        if (zeroIndex + 3 <= 8)                         //down
        {
            let ss1 = [];                            
            ss1 = x.slice();
            var temp = ss1[zeroIndex];
            ss1[zeroIndex] = ss1[zeroIndex + 3];
            ss1[zeroIndex + 3] = temp;
            ss1[9] = ss1[9] + 3;
            ss1.push("DOWN");
            if(!gameOverCopy(ss1.slice(0, 9))){
                steps = ss1.slice(10);
                break;
            }
            var j;
            for(var i=0; i<closedlist.length; i++){
                j = compare(ss1.slice(0, 9), closedlist[i]);
                if (j == 0)
                {
                    //means there is a match
                    break;
                }
            }
            if(j!=0){
                openlist.push(ss1);
                openLIST.push(ss1.slice(0, 9));
                heuristiclist.push(heuristics(ss1.slice(0, 9)));
            }

        }

        if (zeroIndex % 3 != 0)                         //left
        {
            let ss1 = [];                            
            ss1 = x.slice();
            var temp = ss1[zeroIndex];
            ss1[zeroIndex] = ss1[zeroIndex - 1];
            ss1[zeroIndex - 1] = temp;
            ss1[9] = ss1[9] - 1;
            ss1.push("LEFT");
            if(!gameOverCopy(ss1.slice(0, 9))){
                steps = ss1.slice(10);
                break;
            }
            var j;
            for(var i=0; i<closedlist.length; i++){
                j = compare(ss1.slice(0, 9), closedlist[i]);
                if (j == 0)
                {
                    //means there is a match
                    break;
                }
            }
            if(j!=0){
                openlist.push(ss1);
                openLIST.push(ss1.slice(0, 9));
                heuristiclist.push(heuristics(ss1.slice(0, 9)));
            }

        }

        if (zeroIndex % 3 != 2)                         //right
        {
            let ss1 = [];                            
            ss1 = x.slice();
            var temp = ss1[zeroIndex];
            ss1[zeroIndex] = ss1[zeroIndex + 1];
            ss1[zeroIndex + 1] = temp;
            ss1[9] = ss1[9] + 1;
            ss1.push("RIGHT");
            if(!gameOverCopy(ss1.slice(0, 9))){
                steps = ss1.slice(10);
                break;
            }
            var j;
            for(var i=0; i<closedlist.length; i++){
                j = compare(ss1.slice(0, 9), closedlist[i]);
                if (j == 0)
                {
                    //means there is a match
                    break;
                }
            }
            if(j!=0){
                openlist.push(ss1);
                openLIST.push(ss1.slice(0, 9));
                heuristiclist.push(heuristics(ss1.slice(0, 9)));
            }

        }

        closedlist.push(x.slice(0, 9));
        var pos = min(heuristiclist);
        x = openlist[pos];
        openlist.splice(pos, 1);
        var tem = heuristiclist.splice(pos, 1);
        
    }

    console.log(steps);
    stepsolve();
    
     
}


function gameOverCopy(real){
    var count = 0;
    for(var i=0; i<9; i++)
    {
        if(real[i] == solvedBoard[i])
        {
            count++;
        }
    }
    if (count == 9){
        return 0;
    }
    else
    return 1;
}

function compare(a, b){
    for(var i=0; i<a.length; i++)
    {
        if (a[i] != b[i]){
            return 1;
        }
    }
    return 0;
}

function heuristics(real){
    var sum = 0;
    for(var i = 0; i<real.length; i++){
        var val = real[i];
        if (val != 0){
            sum += Math.abs((val-1)%3 - i%3);
            sum += Math.abs(Math.floor((val-1)/3) - Math.floor(i/3));
        }
    }
    return sum;
}

function min(real){
    var mini = 99999999;
    for(var i=0; i<real.length; i++){
        if(real[i]<mini){
            mini = real[i];
            var pos = i;
        }
    }
    return pos;
}


function stepsolve(){
    var i = 0;                  
    var solved = 0;
    function myLoop() {         
      setTimeout(function() {   
        action(i);   
        i++;               
        if (i < steps.length) { 
          myLoop();
          if (i == steps.length-1){
              solved = 1;
          }              
        }                       
      }, 500)
    }
    
    myLoop();
    
}


function action(i){
    var zero = emptySquare(realBoard);
        
    if (steps[i] == "UP"){
        var temp = realBoard[zero];
        realBoard[zero] = realBoard[zero-3];
        realBoard[zero-3] = temp;
    }

    if (steps[i] == "DOWN"){
        var temp = realBoard[zero];
        realBoard[zero] = realBoard[zero+3];
        realBoard[zero+3] = temp;
    }

    if (steps[i] == "LEFT"){
        var temp = realBoard[zero];
        realBoard[zero] = realBoard[zero-1];
        realBoard[zero-1] = temp;
    }

    if (steps[i] == "RIGHT"){
        var temp = realBoard[zero];
        realBoard[zero] = realBoard[zero+1];
        realBoard[zero+1] = temp;
    }
    fillBoard();
}


function emptySquare(real){
    for(var i=0;i<9;i++){
        if(real[i] == 0){
            return i;
        }
    }
}

function userPlays(){
    if(checkWin()){
        var winner = "human";
        gameOver(winner);
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


function gameOver(who){
    if(who == "human"){
        for(const button of buttons){
            button.removeEventListener('click',clickHandler)
        }
        alert('solved')
    
    }

    else if(who == "ai"){
        alert("solved")
        playGame();
    }

}


//event handlers
function clickHandler(square){
    var empty = emptySquare(realBoard);
    if(square.target.id =="left"){
        if(empty%3 !=0){
            let temp = realBoard[empty];
            realBoard[empty] = realBoard[empty-1];
            realBoard[empty-1] = temp;
        }
        console.log(realBoard);
        fillBoard();
        userPlays();
        
    }
    
    if(square.target.id =="up"){
        if(empty>=3){
            let temp = realBoard[empty];
            realBoard[empty] = realBoard[empty-3];
            realBoard[empty-3] = temp;
        }
        console.log(realBoard);
        fillBoard();
        userPlays();
        
    } 

    if(square.target.id =="right"){
        if(empty%3 !=2){
            let temp = realBoard[empty];
            realBoard[empty] = realBoard[empty+1];
            realBoard[empty+1] = temp;
        }
        console.log(realBoard);
        fillBoard();
        userPlays();
        
    } 

    if(square.target.id =="down"){
        if(empty<6){
            let temp = realBoard[empty];
            realBoard[empty] = realBoard[empty+3];
            realBoard[empty+3] = temp;
        }
        console.log(realBoard);
        fillBoard();
        userPlays();
        
    } 

}


function helpmeHandler(square){
    aiNotSolving = false;
    aiSolves();
    aiTurn.removeEventListener('click',helpmeHandler)
}



playGame();
