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
elem4.setAttribute('id', 'userScore');
elem4.classList.add('cover-heading');
var txtnode = document.createTextNode('High Scores!');
elem4.appendChild(txtnode);
elem3.appendChild(elem4);
var elem5 = document.createElement('div');
elem5.classList.add('row', 'justify-content-center');
var elem6 = document.createElement('div');
elem6.setAttribute('id', 'scoreList');
elem6.classList.add('col-8');
elem5.appendChild(elem6);
var elem7 = document.createElement('a');
elem7.setAttribute('id', 'goHome');
elem7.setAttribute('href', 'index.html');
elem7.classList.add('col-6', 'mt-3', 'btn', 'btn-primary', 'btn-block');
var txtnode = document.createTextNode('Go Home');
elem7.appendChild(txtnode);
elem5.appendChild(elem7);
elem3.appendChild(elem5);
elem2.appendChild(elem3);
elem1.appendChild(elem2);
elem0.appendChild(elem1);
document.body.appendChild(elem0);






//Gets highscores from local storage variable scoreList
let highScores=JSON.parse(localStorage.getItem("scoreList"));
if(highScores==undefined){highscores=[];}
//Sorts the list scorewise
highScores=highScores.sort((a,b)=>b.score-a.score);
//Appends the highscores to the page
highScores.forEach((obj)=>{let scr=document.createElement("div");scr.innerText=obj.username+" : " +obj.score;document.querySelector("#scoreList").appendChild(scr);})