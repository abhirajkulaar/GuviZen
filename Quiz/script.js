
//Purely for creating the HTML DOM
var elem0 = document.createElement('div');
elem0.classList.add('container', 'text-center');
var elem1 = document.createElement('div');
elem1.classList.add('row', 'h-100', 'align-items-center');
var elem2 = document.createElement('div');
elem2.classList.add('cover-container', 'col-12');
var elem3 = document.createElement('div');
elem3.classList.add('inner', 'cover');
var elem4 = document.createElement('div');
elem4.classList.add('row', 'justify-content-between');
var elem5 = document.createElement('div');
elem5.classList.add('col-4');
var elem6 = document.createElement('div');
var elem7 = document.createElement('span');
elem7.setAttribute('id', 'questionNumber');
elem6.appendChild(elem7);
var txtnode = document.createTextNode('/10');
elem6.appendChild(txtnode);
elem5.appendChild(elem6);
elem4.appendChild(elem5);
var elem8 = document.createElement('div');
elem8.classList.add('col-4');
var elem9 = document.createElement('div');
elem9.setAttribute('id', 'scoreVal');
var txtnode = document.createTextNode('0');
elem9.appendChild(txtnode);
elem8.appendChild(elem9);
elem4.appendChild(elem8);
elem3.appendChild(elem4);
var elem10 = document.createElement('h3');
elem10.setAttribute('id', 'question');
elem10.classList.add('mt-4', 'cover-heading');
elem3.appendChild(elem10);
var elem11 = document.createElement('div');
elem11.classList.add('options');
elem3.appendChild(elem11);
elem2.appendChild(elem3);
elem1.appendChild(elem2);
elem0.appendChild(elem1);
document.body.appendChild(elem0);


//Function used to shuffle the questions array to randomize the position of correct answer
function shuffleArray(array) { 
   for (var i = array.length - 1; i > 0; i--) {  
    
       // Generate random number  
       var j = Math.floor(Math.random() * (i + 1)); 
                    
       var temp = array[i]; 
       array[i] = array[j]; 
       array[j] = temp; 
   } 
        
   return array; 
} 


//Function to fetch all queations
async function getQuestions()
    {
        try{
        const rawQnA = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple");
        const JsonQnA= await rawQnA.json();
        return JsonQnA.results;
            
    }
        catch(e){console.error("Unable to get questions from server: "+e)}
        
    }



//Function to display next question (if no next question available then save score as session variable myScore then GoTo end.html) -->takes input an object from the main questions array
function showQuestion(questionObject){
    if(window.questionNumber>window.JsonQnA.length-1){sessionStorage.setItem('myScore', document.querySelector("#scoreVal").innerText);    ;window.location.href = "end.html"}
    //change displayed question number
    document.querySelector("#questionNumber").innerText=window.questionNumber+1
    //change question text
    document.querySelector("#question").innerText=questionObject.question;
    //create array of options for current question
    let options=[];
    questionObject.incorrect_answers.forEach((o)=>options.push({val:o,correct:"No"}))
    options.push({val:questionObject.correct_answer,correct:"Yes"})
    //shuffle the position of correct answer
    options=shuffleArray(options);
    let optionsHTML=document.querySelector(".options");
    //removing old options
    optionsHTML.innerHTML="";
    //adding new options
    options.forEach((option)=>{let optionButton =document.createElement("button");optionButton.classList.add("btn","option","btn-outline-primary","btn-block");optionButton.setAttribute("data-correct",option.correct);optionButton.innerHTML=option.val;optionsHTML.appendChild(optionButton);})
    //adding eventlistener for each option
    document.querySelectorAll(".option").forEach((o)=>o.addEventListener("click",selectAnswer))

}


//Function triggered whenever an option is selected 
function selectAnswer(e)
{
    console.log(e.target.dataset.correct)
    //Changes color of buttons to green if option correct else grey
    document.querySelectorAll(".option").forEach((o)=>{o.classList.remove("btn-outline-primary");if(o.dataset.correct=="Yes"){o.classList.add("btn-success")}else{o.classList.add("btn-secondary")}})
    //If option correct then increases score else colors selected option red
    if(e.target.dataset.correct=="Yes"){document.querySelector("#scoreVal").innerText=parseInt(document.querySelector("#scoreVal").innerText)+10;}
    else{e.target.classList.remove("btn-outline-primary");e.target.classList.add("btn-danger")}
    //increases current question counter
    window.questionNumber++;
    //triggers next question with a delay
    window.setTimeout(()=>showQuestion(window.JsonQnA[window.questionNumber]),1500)
   
}





// main function gets question list using getQuestions and then displays first  question
async function main(){
const JsonQnA= await getQuestions();
//window.JsonQnA contains all questions
window.JsonQnA=JsonQnA;
//window.questionNumber is the current question
window.questionNumber=0;

showQuestion(window.JsonQnA[window.questionNumber]);

}

//triggers the main function
main()