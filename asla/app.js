const questions = [
    { question: "What does 'var' declare in JavaScript?", options: ["A constant variable", "A variable that can be reassigned", "A function"], answer: 1 },
    { question: "Which of the following is a JavaScript data type?", options: ["String", "Integer", "Float"], answer: 0 },
    { question: "What is the output of 'typeof null' in JavaScript?", options: ["'null'", "'object'", "'undefined'"], answer: 1 },
    { question: "Which operator is used to compare both value and type?", options: ["==", "===", "!="], answer: 1 },
    { question: "What is the purpose of the 'this' keyword in JavaScript?", options: ["Refers to the global object", "Refers to the current function", "Refers to the object that is executing the current function"], answer: 2 },
    { question: "How do you declare a constant in JavaScript?", options: ["const", "let", "var"], answer: 0 },
    { question: "Which method converts a JSON string into a JavaScript object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.object()"], answer: 1 },
    { question: "What is a closure in JavaScript?", options: ["A function with a return value", "A function that returns another function", "A function with a private variable"], answer: 2 },
    { question: "What is the default value of a variable that has not been assigned a value?", options: ["0", "undefined", "null"], answer: 1 },
    { question: "Which keyword is used to create a function in JavaScript?", options: ["function", "func", "create"], answer: 0 },
    { question: "What is the output of '2 + 2' in JavaScript?", options: ["22", "4", "undefined"], answer: 1 },
    { question: "Which statement is used to stop a loop in JavaScript?", options: ["break", "stop", "exit"], answer: 0 },
    { question: "What does NaN stand for in JavaScript?", options: ["Not a Number", "No a Number", "Not a Numeric"], answer: 0 },
    { question: "Which event occurs when the user clicks on an HTML element?", options: ["onclick", "onmouseover", "onchange"], answer: 0 },
    { question: "How do you create a comment in JavaScript?", options: ["// This is a comment", "<!-- This is a comment -->", "' This is a comment"], answer: 0 }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;

function goToQuizStart() {
    const username = document.getElementById('username').value;
    const rollno = document.getElementById('rollno').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && rollno && email && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('rollno', rollno);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password); // Consider encrypting for security
        document.getElementById('signup-container').classList.add('hidden');
        document.getElementById('quiz-start-container').classList.remove('hidden');
    } else {
        alert("Please fill all fields.");
    }
}

function loadQuiz() {
    document.getElementById('quiz-start-container').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    document.getElementById('next').classList.add('hidden');
    document.getElementById('restart').classList.add('hidden');
    document.getElementById('time').innerText = timeLeft;
    loadQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    const quizContent = document.getElementById('quiz-content');

    quizContent.innerHTML = `
        <h2>Question ${currentQuestionIndex + 1}: ${questionData.question}</h2>
    `;

    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        quizContent.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');

    if (selectedIndex === questionData.answer) {
        score++;
        options[selectedIndex].classList.add('correct');
    } else {
        options[selectedIndex].classList.add('wrong');
        options[questionData.answer].classList.add('correct');
    }

    options.forEach(option => option.disabled = true);
    document.getElementById('next').classList.remove('hidden');
}

document.getElementById('next').onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
};

function endQuiz() {
    clearInterval(timer);
    const result = document.getElementById('result');
    result.classList.remove('hidden');
    if (score >= 10) {
        typewriterEffect("You Won!", result); // Use a regular space here
    } else {
        typewriterEffect("Try Again!", result);
    }
    document.getElementById('quiz-content').innerHTML = `<h2>Your score is ${score} out of ${questions.length}.</h2>`;
    document.getElementById('next').classList.add('hidden');
    document.getElementById('restart').classList.remove('hidden');
}

document.getElementById('restart').onclick = () => {
    loadQuiz();
};

function typewriterEffect(text, element) {
    let index = 0;
    element.innerHTML = ''; // Allow HTML content
    const interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}

window.onload = () => {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('quiz-start-container').classList.add('hidden');
};