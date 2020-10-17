

//All code here is only to dunamically create the HTML for the index page
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
var txtnode = document.createTextNode('Quiz');
elem4.appendChild(txtnode);
elem3.appendChild(elem4);
var elem5 = document.createElement('a');
elem5.setAttribute('id', 'play');
elem5.setAttribute('href', 'game.html');
elem5.classList.add('btn', 'btn-success', 'btn-block');
var txtnode = document.createTextNode('Play');
elem5.appendChild(txtnode);
elem3.appendChild(elem5);
var elem6 = document.createElement('a');
elem6.setAttribute('id', 'highScores');
elem6.setAttribute('href', 'highscores.html');
elem6.classList.add('btn', 'btn-primary', 'btn-block');
var txtnode = document.createTextNode('Check High Score');
elem6.appendChild(txtnode);
elem3.appendChild(elem6);
elem2.appendChild(elem3);
elem1.appendChild(elem2);
elem0.appendChild(elem1);
document.body.appendChild(elem0);