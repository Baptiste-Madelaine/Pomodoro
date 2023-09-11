const body = document.body;
const temp = document.getElementById("time");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const state = document.getElementById("state");
const button = document.getElementById("but");
let tempTot = 0;
let tempPause = 0;
let onWork = false;
let id_interval;

function State(){
    state.textContent = onWork ? "Travail !":"Pause !";
    console.log(state)
}

function Click(){
    tempTot = temp.value*60;
    console.log(tempTot);
    if(!id_interval){
        id_interval = setInterval(Decr, 1000);
        onWork = !onWork;
        State();
        button.value = button.value =="Reset" ? "Start":"Reset";
    }
}
function Decr(){
    if(onWork){
        tempTot--;
        
    }else{
        tempPause--;
        sec.textContent = tempPause%60 < 10? "0" + tempPause%60:tempPause%60;
        min.textContent= Math.trunc(tempPause/60)<10 ? "0"+Math.trunc(tempPause/60)+" :":Math.trunc(tempPause/60) + " :";
    }
    //console.log(tempTot);
}
State();