const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "Mark Twain", "F. Scott Fitzgerald", "Ernest Hemingway"],
        correctAnswer: 0
    },
    {
        question: "What is the powerhouse of the cell?",
        choices: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
        correctAnswer: 2
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        choices: ["Oxygen", "Gold", "Osmium", "Oganesson"],
        correctAnswer: 0
    },
    {
        question: "What is the longest river in the world?",
        choices: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correctAnswer: 1
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        choices: ["China", "South Korea", "Japan", "Thailand"],
        correctAnswer: 2
    },
    {
        question: "What is the hardest natural substance on Earth?",
        choices: ["Gold", "Iron", "Diamond", "Platinum"],
        correctAnswer: 2
    },
    {
        question: "Which planet is closest to the sun?",
        choices: ["Venus", "Mars", "Mercury", "Earth"],
        correctAnswer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = Array(questions.length).fill(null);

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `Q${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    choicesElement.innerHTML = '';
    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'btn btn-secondary';
        button.textContent = choice;
        button.onclick = () => checkAnswer(index, button);
        if (selectedAnswers[currentQuestionIndex] !== null) {
            button.disabled = true;
            if (index === selectedAnswers[currentQuestionIndex]) {
                if (index === currentQuestion.correctAnswer) {
                    button.classList.add('btn-correct');
                } else {
                    button.classList.add('btn-incorrect');
                }
            }
        }
        choicesElement.appendChild(button);
    });

    feedbackElement.style.display = 'none';
    updateProgress();

    if (currentQuestionIndex > 0) {
        prevButton.style.display = 'block';
    } else {
        prevButton.style.display = 'none';
    }

    if (selectedAnswers[currentQuestionIndex] !== null) {
        nextButton.style.display = 'block';
    } else {
        nextButton.style.display = 'none';
    }
}

function checkAnswer(selectedIndex, button) {
    const currentQuestion = questions[currentQuestionIndex];
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('next-btn');

    selectedAnswers[currentQuestionIndex] = selectedIndex;

    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
        button.classList.add('btn-correct');
        feedbackElement.textContent = 'Correct!';
        feedbackElement.classList.remove('incorrect-feedback');
        feedbackElement.classList.add('correct-feedback');
    } else {
        button.classList.add('btn-incorrect');
        feedbackElement.textContent = `Incorrect! The correct answer is: ${currentQuestion.choices[currentQuestion.correctAnswer]}`;
        feedbackElement.classList.remove('correct-feedback');
        feedbackElement.classList.add('incorrect-feedback');
    }

    feedbackElement.style.display = 'block';
    document.querySelectorAll('#choices button').forEach(btn => {
        btn.disabled = true;
    });
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.querySelector('.quiz-container').style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.querySelector('.quiz-container').style.transform = 'scale(1)';
            loadQuestion();
        }, 300);
    } else {
        showScore();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showScore() {
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const percentageElement = document.getElementById('percentage');

    scoreElement.textContent = `${score}/${questions.length}`;
    percentageElement.textContent = ((score / questions.length) * 100).toFixed(2);

    scoreContainer.style.display = 'block';

    document.getElementById('question').style.display = 'none';
    document.getElementById('choices').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('prev-btn').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
    const retryButton = document.getElementById('retry-btn');
}



document.addEventListener('DOMContentLoaded', loadQuestion);





