//Purely for creating the HTML DOM
var elem0 = document.createElement('div');
elem0.classList.add('container', 'text-center');
var elem1 = document.createElement('div');
elem1.classList.add('row', 'h-100', 'align-items-center');
var elem2 = document.createElement('div');
elem2.classList.add('cover-container', 'col-12');
var elem3 = document.createElement('div');
elem3.classList.add('inner', 'cover');
var elem4 = document.createElement('h1');
elem4.classList.add('cover-heading');
var txtnode = document.createTextNode('Your Score');
elem4.appendChild(txtnode);
elem3.appendChild(elem4);
var elem5 = document.createElement('h1');
elem5.setAttribute('id', 'userScore');
elem5.classList.add('cover-heading');
elem3.appendChild(elem5);
var elem6 = document.createElement('div');
elem6.classList.add('row', 'justify-content-center');
var elem7 = document.createElement('div');
elem7.classList.add('col-8');
var elem8 = document.createElement('input');
elem8.setAttribute('type', 'text');
elem8.classList.add('form-controlmb-3');
elem8.setAttribute('id', 'username');
elem8.setAttribute('placeholder', 'Enter Username');
elem7.appendChild(elem8);
var elem9 = document.createElement('button');
elem9.setAttribute('id', 'saveScoreBtn');
elem9.classList.add('btn', 'btn-primary', 'btn-block');
var txtnode = document.createTextNode('Save');
elem9.appendChild(txtnode);
elem7.appendChild(elem9);
var elem10 = document.createElement('a');
elem10.setAttribute('id', 'playAgain');
elem10.setAttribute('href', 'game.html');
elem10.classList.add('btn', 'btn-success', 'btn-block');
var txtnode = document.createTextNode('Play Again');
elem10.appendChild(txtnode);
elem7.appendChild(elem10);
var elem11 = document.createElement('a');
elem11.setAttribute('id', 'goHome');
elem11.setAttribute('href', 'index.html');
elem11.classList.add('btn', 'btn-primary', 'btn-block');
var txtnode = document.createTextNode('Go Home');
elem11.appendChild(txtnode);
elem7.appendChild(elem11);
elem6.appendChild(elem7);
elem3.appendChild(elem6);
elem2.appendChild(elem3);
elem1.appendChild(elem2);
elem0.appendChild(elem1);
document.body.appendChild(elem0);


















//Displays the current score
document.querySelector("#userScore").innerText=sessionStorage.getItem("myScore")

//Adds the users score to the local storage JSON string scoreList
document.querySelector("#saveScoreBtn").addEventListener("click",()=>{var scoreList = JSON.parse(localStorage.getItem("scoreList"));if(scoreList==undefined){scoreList=[]};scoreList.push({username:document.querySelector("#username").value,score:sessionStorage.getItem("myScore")});localStorage.setItem("scoreList", JSON.stringify(scoreList));document.getElementById("saveScoreBtn").disabled=true;document.querySelector("#username").disabled=true;})

//disables the savescore button ar start
document.getElementById("saveScoreBtn").disabled=true;

//enabled the savescore button if len(username)>0 else disables
document.querySelector("#username").addEventListener("input",(e)=>{ if(e.target.value.length>0){document.getElementById("saveScoreBtn").disabled=false;}else{document.getElementById("saveScoreBtn").disabled=true;}})