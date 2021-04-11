const mic = document.getElementById('mute');
const audio = document.getElementById("player");

mic.addEventListener('click',musicHandler);


//event handler
function musicHandler(){
    if(audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }


}