let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let selectedOption = null; // Track the user's current selection
let attempts = 0; // Track the number of attempts

// Add darkmode function
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function loadQuestions() {
    console.log('Loading questions...');
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            console.log('Questions loaded:', data);
            shuffleQuestions(data); // Shuffle the questions
            questions = data;
            displayQuestion(); // Initialize the first question after loading data
        })
        .catch(error => console.error('Error loading the questions:', error));
}

function displayQuestion() {
    console.log('Displaying question...');
    if (questions.length > 0) {
        const question = questions[currentQuestionIndex];
        document.getElementById('question').textContent = question.Question;

        // Clear previous results, reason, and selection
        document.getElementById('result').textContent = '';
        document.getElementById('reason').textContent = '';
        selectedOption = null;

        // Display options with radio buttons
        const optionsUl = document.getElementById('options');
        optionsUl.innerHTML = '';
        Object.keys(question.Options).forEach(key => {
            const optionItem = document.createElement('li');
            optionItem.className = 'option';
    
            // Create radio button
            const radioButton = document.createElement('input');
            radioButton.setAttribute('type', 'radio');
            radioButton.setAttribute('id', `option${key}`);
            radioButton.setAttribute('name', 'option');
            radioButton.setAttribute('value', key);
            radioButton.onclick = () => selectedOption = key;
    
            // Create label for radio button with the option number
            const label = document.createElement('label');
            label.setAttribute('for', `option${key}`);
            label.innerHTML = `(${key}) ${question.Options[key]}`;
    
            // Append radio button and label to the list item
            optionItem.appendChild(radioButton);
            optionItem.appendChild(label);
    
            optionsUl.appendChild(optionItem);
        });
    } else {
        console.log('No questions to display.');
    }
}

// Evaluate the selected option when the user clicks "Submit"
function submitAnswer() {
    if (selectedOption === null) {
        alert("Please select an option.");
        return;
    }

    // Increment attempts when an answer is submitted
    attempts++;

    const question = questions[currentQuestionIndex];
    const resultDiv = document.getElementById('result');
    const reasonDiv = document.getElementById('reason');

    if (selectedOption === question.Answer) {
        resultDiv.textContent = `CORRECT (Answer: ${selectedOption})`;
        resultDiv.className = 'correct';
        score++;
    } else {
        resultDiv.textContent = `INCORRECT (Correct Answer: ${question.Answer})`;
        resultDiv.className = 'incorrect';
    }

    // Update the score display to show "X out of Y attempted"
    document.getElementById('score').textContent = `Correct Answers: ${score} out of ${attempts} attempted`;
    reasonDiv.textContent = question.Reason;
}


document.getElementById('submit').addEventListener('click', submitAnswer);

document.getElementById('next').addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

document.getElementById('dark-mode-button').addEventListener('click', toggleDarkMode);

// Load the questions
loadQuestions();
