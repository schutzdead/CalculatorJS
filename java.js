// ------------------------- VARIABLES -------------------------

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

var onoff = 0; // DEBLOQUE LE MAX-LENGTH > OPERATE + NUMBER > SAUF QUE SI ON A PAS DE ONOFF, LE NUMBER NE LAISSE JAMAIS PASSER
var forceTest1 = 0; // ORIENTE LE DEMI-CANCEL DANS LES CONDITIONS NUMBER
var forceTest2 = 0; // ORIENTE LA SORTIE DE EQUAL 


// ------------------------- FUNCTIONS -------------------------


function toHigh (){ // NOMBRE TROP GRAND > RELOAD
  if(screen.textContent === "Too high !") return basicReload();
}

function test(p){ // EN CAS DE DEMI-CANCEL, REMETTRE LE CHANGEMENT CSS SUR LE BON OPERATE
  if(p.textContent === operateSelect) clickColor(p);
}

function basicReload (){ // RESTAURE LES PARAMETRES PAR DEFAUT
  screen.style.fontSize = '64px'
  screen.textContent = "0";
  current = 0;
  current_2 =0;
  operateSelect="";
}

function initialColor (p1){ // CSS INITAL DES BOUTONS OPERATEURS
  p1.style.color = "white";
  p1.style.backgroundColor = "#fe9e0a";
}

function clickColor (p1) { // CSS QD UN OPERANDE EST SELECTIONNE
  p1.style.color = "#fe9e0a";
  p1.style.backgroundColor = "white";
}

function initialAllColor(){ // APPLIQUE LE CSS INITIAL A TOUS LES OPERATEURS
  cssOperate.forEach(css => initialColor(css))
}

function add (first, second) { // ADDITION
  total = first + second;
} 
function sub (first, second){ // SOUSTRACTION
  total = first - second;
}
function multiply (first, second){ // MULTIPLICATION
  total = first * second;
}
function div (first, second){ // DIVISION
  total =  first / second;
}

function result (){ // RESULTAT
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
  arrTotal = Math.round(total * 100000) / 100000; 
  if(arrTotal.toString().length >= 7) screen.style.fontSize = '40px'; // PRINCIPALEMENT POUR LES NOMBRES A VIRGULE
  if(total > 9999999) screen.style.fontSize = '40px';
  if (parseFloat(total) >= 99999999999) return screen.textContent = "Too high !";
  screen.textContent = arrTotal;
  }


// ------------------------- BOUTTONS -------------------------


// BOUTON POURCENTAGE
purcent.addEventListener('click', () => {
  toHigh();
  screen.textContent = screen.textContent/100;
})

// BOUTON CHANGEMENT DE SIGNE
negation.addEventListener('click', () => {
  toHigh();
  if (screen.textContent === "0") return 0; 
  if (parseFloat(screen.textContent) < 0) return screen.textContent = Math.abs(screen.textContent);
  screen.textContent = `-${screen.textContent}`;
});

// BOUTON SUPPRIMER
cancel.addEventListener('click', () => {
  // DEMI-CANCEL (LA PERSONNE CE TROMPE SUR SON 2ÈME CHIFFRE)
  if (current_2 !== 0){
    current_2 = 0
    screen.textContent = "0";
    forceTest1 = 1;
    operates.forEach(operate => test(operate))
  // FULL CANCEL
  } else {
    initialAllColor()
    basicReload ()
  }
  });

// BUTTONS CHIFFRES
numbers.forEach(number => number.addEventListener('click', () => {
// (LEGENDE : Z = OPERATE ; 1 = CURRENT ; 2 = CURRENT_2)
  initialAllColor()
  if(screen.textContent.length >= 7) screen.style.fontSize = '40px'; // POUR NE PAS DEPASSER LA TAILLE DE L'ECRAN
  if(screen.textContent.length >= 10 && onoff === 0) return; // LIMITE DE L'ECRAN
  toHigh();
// SI UN OPERATE EST MIS TROP TOT (1 = 0 ; 2 = 0; Z = 1)
  if (operateSelect !== "" && screen.textContent==="0" && forceTest1===0){
    screen.textContent = number.textContent;
    operateSelect = "";
// JUSTE APRES UN OPERATE (1 = 1 ; 2 = 0; Z = 1)
  } else if(operateSelect !== "" && current_2 === 0){  
    screen.textContent = number.textContent;
    current_2 = parseFloat(screen.textContent);
    screen.style.fontSize = '64px';
    forceTest1 = 0;
// CUMULE LE 2EME NOMBRE (1 = 1 ; 2 = 1; Z = 1)
  } else if (operateSelect !== "") {
    if(screen.textContent.length >2) onoff = 0;
    return screen.textContent += number.textContent;
// INITIALISE ET CUMULE (1 = 0 ; 2 = 0 ; 2 = 0)
  } else {
    if(screen.textContent==="0" || forceTest2 ===1){
      screen.textContent = number.textContent;
      forceTest2 = 0;
    } else {
      if(screen.textContent.length >2) onoff = 0;
      screen.textContent += number.textContent;
    }
  } 
}))

// BUTTONS OPERATEURS
operates.forEach(operate => operate.addEventListener('click', () => {
  toHigh();
  onoff = 1;
  initialAllColor()
  clickColor(operate)
// 2 NOMBRES STOCKES
  if(current_2 !== 0 && current !== 0) {
    result()
    operateSelect = operate.textContent;
    current = total;
    current_2 = 0;
// 1 NOMBRE INSCRIT
  } else {
  operateSelect = operate.textContent;
  current = parseFloat(screen.textContent);
  }
  if (parseFloat(screen.textContent) >= 99999999999) return screen.textContent = "Too high !";
}))

// BUTTON EGAL
equal.addEventListener('click', () =>{
  initialAllColor();
  toHigh();
  if(operateSelect === "") return screen.textContent;
  result();
  current = 0;
  current_2 = 0;
  operateSelect = "";
  forceTest2 = 1;
})

// BUTTON POINT
dot.addEventListener('click', () => {
  let eachDigit = screen.textContent.split('');
  for (digit of eachDigit){ // EMPECHE DE POUVOIR METTRE PLUSIEURS POINTS
    if (digit === ".") return;
  }
  screen.textContent += ".";
})