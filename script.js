var beginButton = document.querySelector("#begin");
var timer = document.querySelector("#timer");
var time = 60; // time in seconds
var quizContainer = document.querySelector('#quiz-box');
var highscoreButton = document.querySelector('#view-highscores');
var question = 0;
var score = 0;

var highscoreInitials = [];
var highscores = [];

var questions = [
	{
		question: "Inside which HTML element do we put the JavaScript?",
		answers: [
			'<scripting>',
			'<script>',
			'<js>',
			'<javascript>'
		],
		correctAnswer: 3
	},
	{
		question: "Which built-in method combines the text of two strings and returns a new string?",
		answers: [
			'append()',
			'concat()',
			'attach()',
			'None of the above'
		],
		correctAnswer: 1
	},
	{
		question: "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
		answers: [
			'pop()',
			'push()',
			'join()',
			'map()'
		],
		correctAnswer: 1
	}
];


function showQuestion (questionNumber) {

	var quizCard = document.createElement("div");
	quizCard.className ="card";

	quizContainer.appendChild(quizCard);



	cardHeader = document.createElement("div");
	cardHeader.className = "card-header";

	cardHeader.textContent = questions[questionNumber].question;

	quizCard.appendChild(cardHeader);

	cardBody = document.createElement("div");
	cardBody.className = "card-body";
	quizCard.appendChild(cardBody);

	questions[questionNumber].answers.forEach((answerOption, index) => {
		var answerBtn = document.createElement("button");
		answerBtn.className = "btn btn-primary answerBtn";
		answerBtn.setAttribute("data-answer-index",index);
		answerBtn.textContent = answerOption;
		cardBody.appendChild(answerBtn);
	});


	var answerConfirm = document.createElement("div");
	cardBody.appendChild(answerConfirm);

	//build a function to increment the value in showQuestion function when any button is clicked.
	cardBody.addEventListener('click', (event) => {
		const isButton = event.target.nodeName === 'BUTTON';
		if (isButton) {
			answerSelected = parseInt(event.target.getAttribute("data-answer-index"));
			if (answerSelected === questions[question].correctAnswer) {
				score += 1;
				answerConfirm.textContent="Correct!";
			}
			else {
				answerConfirm.textContent="Wrong!";
				time -= 5;
			}
			setTimeout(function(){
				answerConfirm.textContent="";
				quizContainer.removeChild(quizCard);
				question+=1;
				if (question < questions.length) {
					showQuestion(question);
				} 
				},1000);

		}
	});

};

function answerConfirmation(confirm) {

	setTimeout(function(){
		confirmAnswer = quizContainer.textContent=msg;
		},3000);
}

function quizComplete() {
	if (time ===0){
		quizContainer.removeChild(quizContainer.firstElementChild);
	}
	var quizCard = document.createElement("div");
	quizCard.className ="card";

	quizContainer.appendChild(quizCard);

	cardHeader = document.createElement("div");
	cardHeader.className = "card-header";

	cardHeader.textContent = "Quiz Completed";

	quizCard.appendChild(cardHeader);

	cardBody = document.createElement("div");
	cardBody.className = "card-body";
	cardBody.textContent = "Your score was "+score;
	
	formElement = document.createElement("form");
	formElement.className="form-inline";

	inputTextCol = document.createElement("div");
	inputTextCol.className="form-group mb-3";	
	inputText = document.createElement("div");
	inputText.textContent = "Enter Initials:";
	inputTextCol.appendChild(inputText);

	inputBoxCol = document.createElement("div");
	inputBoxCol.className="form-group mb-3";
	inputBox = document.createElement("input");
	inputBox.type = "text";
	inputBox.className = "form-control"
	inputBox.id ="initial";
	inputBoxCol.appendChild(inputBox);

	submitButtonCol = document.createElement("div");
	submitButtonCol.className = "form-group mb-3";
	submitButton = document.createElement("button");
	submitButton.className = "btn btn-primary answerBtn";
	submitButton.textContent = "Submit";
	submitButtonCol.appendChild(submitButton);

	formElement.appendChild(inputTextCol);
	formElement.appendChild(inputBoxCol);
	formElement.appendChild(submitButtonCol);

	cardBody.appendChild(formElement);
	quizCard.appendChild(cardBody);

	submitButton.addEventListener("click", function(event) {
		event.preventDefault();
	  
		var nameInitial = document.querySelector("#initial").value;
		highscoreInitials.push(nameInitial);
		highscores.push(score);
		localStorage.setItem("initial", JSON.stringify(highscoreInitials));
		localStorage.setItem("score", JSON.stringify(highscores));

		//set to defaults
		timer.textContent = 60;
		score=0;
		question=0;
		quizContainer.removeChild(quizCard);
		time=60;
	  });

}
  

function startTimer() {

	if (quizContainer.childNodes.length >1) {
		quizContainer.removeChild(quizContainer.firstElementChild);
	}

	if (time === 60){
		showQuestion(question);
		interval = setInterval(function() {
			time--;
			timer.textContent = time;
			if(time===0 | question >= questions.length) {
				clearInterval(interval);
				
				quizComplete();
				return;
			}

		}, 1000);
	}
  }

beginButton.addEventListener("click",startTimer);

highscoreButton.addEventListener("click",showHighscores);

function showHighscores() {

	if (quizContainer.childNodes.length >1) {
		quizContainer.removeChild(quizContainer.firstElementChild);
	}
	var users = JSON.parse(localStorage.getItem("initial"));
	var scores = JSON.parse(localStorage.getItem("score"));

	var tbody =	document.createElement("table");
	tbody.className ="table table-bordered";

	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	td1.textContent = "Initial";
	var td2 = document.createElement("td");
	td2.textContent = "Score";
	tr.appendChild(td1);
	tr.appendChild(td2);
	tbody.appendChild(tr);

	for(i=0; i< users.length; i++) {
		var tr = document.createElement("tr");

		var td1 = document.createElement("td");
		td1.textContent = users[i];
		var td2 = document.createElement("td");
		td2.textContent = scores[i];
		tr.appendChild(td1);
		tr.appendChild(td2);
		tbody.appendChild(tr);
	}

	quizContainer.appendChild(tbody);

	var clearButton = document.createElement("button");
	clearButton.className = "btn btn-primary answerBtn";
	clearButton.textContent = "Clear";
	quizContainer.appendChild(clearButton);

	clearButton.addEventListener("click",clearFunction);
	
	function clearFunction () {
		localStorage.clear();
		while (quizContainer.childNodes.length >1) {
			quizContainer.removeChild(quizContainer.firstElementChild);
		}

	}

 }