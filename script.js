document.getElementById("finishButton").onclick = function() {main()};
document.getElementById("finishLink").onclick = function() {main()};

window.open = function() {
	console.log("opened.");
}

let startTime, endTime;
let date = new Date()
date.toISOString().split('T')[0]
console.log(date);
start();
function main() {
	answers = getValues();
	results = validateAnswers(answers);
	updatePage(results);
	validateResults(results);
	console.log("History of mouse X movements: " + mouseX);
	console.log("History of mouse Y movements: " + mouseY);
}

let mouseX = [];
let mouseY = [];
$(document).mousemove(function(e) {
    mouseX.push(e.pageX);
    mouseY.push(e.pageY);
}).mouseover();

function validateResults(results) {
	let incorrectAnswers = 0;
	for (i=0;i<5;i++) {
		console.log(results[i]);
		if (results[i] == false) {
			incorrectAnswers = incorrectAnswers + 1;
		} 
	}
	console.log("Number of correct answers: " + (5 - incorrectAnswers));
	console.log("Number of incorrect answers: " + incorrectAnswers);
}

function start() {
	startTime = new Date();
}

function end() {
	endTime = new Date()
	let timeDiff = endTime - startTime;
	timeDiff /= 1000;
	let seconds = Math.round(timeDiff);
	return seconds;
}

function remove() {
	document.getElementById("popup").style.visibility = "hidden";
}

function updatePage(results) {
	document.getElementById("popup").style.visibility = "visible";
	document.getElementById("resultsMenuContainer").style.visibility = "visible";
	timeTaken = end();
	setTimeout(remove, 7000);

	answerContainers = document.getElementsByClassName("answerContainer");
	for (i=0;i<5;i++) {
		answerName = "answer" + (i+1);
		indicatorName = "menuIndicator" + (i+1);
		markerName = "marker" + (i+1);
		answerContainers[i].style.display = "block";
		answerElement = document.getElementById(answerName);
		indicatorElement = document.getElementById(indicatorName);
		markerElement = document.getElementById(markerName);
		if (results[i] == true) {
			answerElement.innerHTML = "Your answer is correct";
			indicatorElement.style.visibility = "visible";
			indicatorElement.style.backgroundColor = "green";
			markerElement.style.backgroundColor = "green";
		} else {
			answerElement.innerHTML = "Your answer is incorrect";
			indicatorElement.style.visibility = "visible";
			indicatorElement.style.backgroundColor = "red";
			markerElement.style.backgroundColor = "red";
		}
	}
	getMarksAndGrade(results);
	document.getElementById("startedDate").innerHTML = date;
	document.getElementById("state").innerHTML = "Finished";
	document.getElementById("timeTaken").innerHTML = timeTaken + " seconds";
	console.log("The user took " + timeTaken + " seconds to complete the quiz.");
}

function getMarksAndGrade(results) {
	let marks = 0;
	for (i=0;i<5;i++) {
		if (results[i] == true) {
			marks = marks + 1;
		}
	}

	grade = (20*marks) + "%";
	document.getElementById("marks").innerHTML = marks+"/5"
	document.getElementById("grade").innerHTML = grade;
}

function getValues() {
	let inputs = [document.getElementById("1a").checked,
	document.getElementById("1b").checked,
	document.getElementById("1c").checked,
	document.getElementById("1d").checked,
	document.getElementById("2a").checked,
	document.getElementById("2b").checked,
	document.getElementById("2c").checked,
	document.getElementById("2d").checked,
	document.getElementById("3a").checked,
	document.getElementById("3b").checked,
	document.getElementById("3c").checked,
	document.getElementById("3d").checked,
	document.getElementById("4a").checked,
	document.getElementById("4b").checked,
	document.getElementById("4c").checked,
	document.getElementById("4d").checked,
	document.getElementById("5a").checked,
	document.getElementById("5b").checked,
	document.getElementById("5c").checked,
	document.getElementById("5d").checked];

	let answers = [];

	for (i=0;i<20;i++) {
		if (inputs[i] == false) {
			answers.push(0);
		} else if (inputs[i] == true){
			answers.push(1);
		}
	}
	
	return answers;
}

function validateAnswers(answers) {
	answerKey = [0,0,0,1,
	1,0,0,0,
	0,0,0,1,
	0,0,0,1,
	1,0,0,0];
	//d, a, d, d, a
	

	let results = []

	if (answers[3] == 1) {
		results.push(true);
	} else {
		results.push(false);
	}
	if (answers[4] == 1) {
		results.push(true);
	} else {
		results.push(false);
	}
	if (answers[11] == 1) {
		results.push(true);
	} else {
		results.push(false);
	}
	if (answers[15] == 1) {
		results.push(true);
	} else {
		results.push(false);
	}
	if (answers[16] == 1) {
		results.push(true);
	} else {
		results.push(false);
	}
	return results;
}
