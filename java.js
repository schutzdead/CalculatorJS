// QD ON CLIQUE SUR "C" AVEC CURRENT2 DIFF DE 0 ALORS SUPP QUE CURRENT2

const screen = document.querySelector('.screen');
const numbers = document.querySelectorAll('.number');
const cancel = document.getElementById('cancel');
const equal = document.getElementById('equal');
const negation = document.getElementById('negation');
const purcent = document.getElementById('purcent');
const operates = document.querySelectorAll('.operate');
const dot = document.getElementById('dot');
const cssOperate = document.querySelectorAll('.button2');

var total = 0;
var current = 0;
var current_2 = 0;
var operateSelect = "";
// POUR DEBLOQUER UN MAX-LENGTH > OPERATE + NUMBER > SAUF QUE SI ON A PAS DE ONOFF, LE NUMBER NE LAISSE JAMAIS PASSER
var onoff = 0; 
// POUR QUE LE DEMI-CANCEL PASSE A TRAVERS LA 1ERE CONDITION DE NUMBERS
var passTest1 = 0;


function add (first, second) {
  total = first + second;
} 
function sub (first, second){
  total = first - second;
}
function multiply (first, second){
  total = first * second;
}
function div (first, second){
  total =  first / second;
}

purcent.addEventListener('click', () => {
  if(screen.textContent === "Too high !") return basicReload();
  screen.textContent = screen.textContent/100;
})

negation.addEventListener('click', () => {
  if(screen.textContent === "Too high !") return basicReload();
  if (screen.textContent === "0") return 0;
  if (parseFloat(screen.textContent) < 0) return screen.textContent = Math.abs(screen.textContent);
  screen.textContent = `-${screen.textContent}`;
});

numbers.forEach(number => number.addEventListener('click', () => {
  initialAllColor()
// Z = OPERATE ; 1 = CURRENT ; 2 = CURRENT_2
  if(screen.textContent.length >= 7) screen.style.fontSize = '40px';
  if(screen.textContent.length >= 10 && onoff === 0) return;
  if(screen.textContent === "Too high !") return basicReload();
// SI UN OPERATE EST MIS TROP TOT (1 = 0 ; 2 = 0; Z = 1)
  if (operateSelect !== "" && screen.textContent==="0" && passTest1===0){
    screen.textContent = number.textContent;
    operateSelect = "";
// JUSTE APRES UN OPERATE (1 = 1 ; 2 = 0; Z = 1)
  } else if(operateSelect !== "" && current_2 === 0){  
    screen.textContent = number.textContent;
    current_2 = parseFloat(screen.textContent);
    screen.style.fontSize = '64px';
    passTest1 = 0;
// CUMULE LE 2EME NOMBRE (1 = 1 ; 2 = 1; Z = 1)
  } else if (operateSelect !== "") {
    if(screen.textContent.length >2) onoff = 0;
    return screen.textContent += number.textContent;
// INITIALISE ET CUMULE (1 = 0 ; 2 = 0 ; 2 = 0)
  } else {
    if(screen.textContent==="0"){
      screen.textContent = number.textContent;
    } else {
      if(screen.textContent.length >2) onoff = 0;
      screen.textContent += number.textContent;
    }
  } 
}))

function test(p){
if (p.textContent === operateSelect) clickColor(p);
}

cancel.addEventListener('click', () => {
  if (current_2 !== 0){
    current_2 = 0
    screen.textContent = "0";
    passTest1 = 1;
    operates.forEach(operate => test(operate))
  } else {
    initialAllColor()
    basicReload ()
  }
  });

function basicReload (){
  screen.style.fontSize = '64px'
  screen.textContent = "0";
  current = 0;
  current_2 =0;
  operateSelect="";
}

function initialColor (p1){
  p1.style.color = "white";
  p1.style.backgroundColor = "#fe9e0a";
}

function clickColor (p1) {
  p1.style.color = "#fe9e0a";
  p1.style.backgroundColor = "white";
}

function initialAllColor(){
    cssOperate.forEach(css => initialColor(css))
}

operates.forEach(operate => operate.addEventListener('click', () => {
  if(screen.textContent === "Too high !") return basicReload();
  onoff = 1;
  initialAllColor()
  clickColor(operate)
// 2 NOMBRES STOCKES
  if(current_2 !== 0 && current !== 0) {
    result()
    operateSelect = operate.textContent;
    current = total;
    current_2 = 0;
// 1ER OPERATE
  } else {
  operateSelect = operate.textContent;
  current = parseFloat(screen.textContent);
  }
  if (parseFloat(screen.textContent) >= 99999999999) return screen.textContent = "Too high !";
}))


equal.addEventListener('click', () =>{
  initialAllColor();
  if(screen.textContent === "Too high !") return basicReload();
  if(operateSelect === "") return screen.textContent;
  result();
  current = 0;
  current_2 = 0;
  operateSelect = "";
})

function result (){
  current_2 = parseFloat(screen.textContent);
  switch (operateSelect) {
    case "+":
      add(current, current_2);
    break;
    case "-":
      sub(current, current_2);
    break;
    case "X":
      multiply(current, current_2);
    break;
    case "÷":
      div(current, current_2);
    break;
  }
  if (parseFloat(total) >= 99999999999) return screen.textContent = "Too high !";
  if(total.toString().length >= 7) screen.style.fontSize = '40px';
  if(total > 9999999) screen.style.fontSize = '40px';
  screen.textContent = Math.round(total * 100000) / 100000;
}

dot.addEventListener('click', () => {
  let eachDigit = screen.textContent.split('');
  for (digit of eachDigit){
    if (digit === ".") return;
  }
  screen.textContent += ".";
})
