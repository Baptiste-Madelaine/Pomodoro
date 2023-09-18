const body = document.body;
const temp = document.getElementById("time");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const state = document.getElementById("state");
const button = document.getElementById("but");
const pause = document.getElementById("pause");
let storage = localStorage;
let tempTot = 0;
let tempPause = 0;
let onWork = false;
let id_interval;

//On vérifie si on est en mode travail ou non
function State(){
    state.textContent = onWork ? "Au travail !":"En pause !";
    body.style.backgroundColor = onWork? "#bb3737":"RGB(25, 135, 83)";
    button.style.backgroundColor = !onWork?  "#bb3737" : "RGB(25, 135, 83)";
}

//Fonction pour remmetre au tout début du timer et à l'état travail
function Reset(){
    onWork = true;
    State();
}

//Fonction mis sur le onClick du boutton
function Click(){
    tempTot = parseInt(temp.value)*60;
    tempPause = parseInt(pause.value)*60;
    console.log(tempTot);
    if(!id_interval){
        id_interval = setInterval(Decr, 1000);
        onWork = !onWork;
        State();
        button.value = button.value =="Reset" ? "Start":"Reset";
    }else{
        Reset();
    }
}

//Fonction Pour décrémenter les secondes
function Decr(){
    if(onWork){
        tempTot--;
        sec.textContent = tempTot%60 < 10? "0" + tempTot%60:tempTot%60;
        min.textContent= Math.trunc(tempTot/60)<10 ? "0"+Math.trunc(tempTot/60)+":":Math.trunc(tempTot/60) + ":";
    }else{
        tempPause--;
        sec.textContent = tempPause%60 < 10? "0" + tempPause%60:tempPause%60;
        min.textContent= Math.trunc(tempPause/60)<10 ? "0"+Math.trunc(tempPause/60)+":":Math.trunc(tempPause/60) + ":";
    }
    if(tempTot==0 || tempPause==0 ){
        tempPause = parseInt(pause.value)*60;
        tempTot = parseInt(temp.value)*60;
        onWork = !onWork;
        State();
    }
}
//Les listener des champs du formulaires pour modifier l'affichage si le timer n'est pas lancé
temp.addEventListener("change",(evt)=>{
    storage.setItem("work", parseInt(temp.value));
    if(!id_interval)min.textContent = parseInt(temp.value)+":";
})
pause.addEventListener("change",(evt)=>{
    storage.setItem("pause", parseInt(pause.value));
})
State();

//On verifie si il y a des variables de stocké dans le local storage et on les remplaces.
if(storage.getItem("work")!=null){
    temp.value = storage.getItem("work");
}
if(storage.getItem("pause") != null){
    pause.value = storage.getItem("pause");
}
min.textContent = temp.value+":";