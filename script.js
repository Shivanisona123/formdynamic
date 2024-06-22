document.getElementById('surveyTopic').addEventListener('change', function() {
    document.getElementById('technologySection').classList.add('hidden');
    document.getElementById('healthSection').classList.add('hidden');
    document.getElementById('educationSection').classList.add('hidden');

    if (this.value === 'Technology') {
        document.getElementById('technologySection').classList.remove('hidden');
    } else if (this.value === 'Health') {
        document.getElementById('healthSection').classList.remove('hidden');
    } else if (this.value === 'Education') {
        document.getElementById('educationSection').classList.remove('hidden');
    }
});

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!this.checkValidity()) {
        alert('Please fill out all required fields.');
        return;
    }

    fetchAdditionalQuestions();
});

function fetchAdditionalQuestions() {
    const surveyTopic = document.getElementById('surveyTopic').value;

    // Simulating an API call to fetch additional questions based on the selected survey topic
    // Replace the URL with the actual API endpoint
    fetch('https://api.example.com/getAdditionalQuestions?topic=' + surveyTopic)
        .then(response => response.json())
        .then(data => {
            displayAdditionalQuestions(data.questions);
            displaySummary();
        })
        .catch(error => {
            console.error('Error fetching additional questions:', error);
        });
}

function displayAdditionalQuestions(questions) {
    const additionalQuestionsContent = document.getElementById('additionalQuestionsContent');
    additionalQuestionsContent.innerHTML = '';

    questions.forEach((question, index) => {
        const questionLabel = document.createElement('label');
        questionLabel.textContent = question;
        const questionInput = document.createElement('input');
        questionInput.type = 'text';
        questionInput.name = `additionalQuestion${index}`;
        questionInput.required = true;

        additionalQuestionsContent.appendChild(questionLabel);
        additionalQuestionsContent.appendChild(questionInput);
        additionalQuestionsContent.appendChild(document.createElement('br'));
    });

    document.getElementById('additionalQuestions').classList.remove('hidden');
}

function displaySummary() {
    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = '';

    const formData = new FormData(document.getElementById('surveyForm'));
    formData.forEach((value, key) => {
        const dataElement = document.createElement('p');
        dataElement.textContent = `${key}: ${value}`;
        summaryContent.appendChild(dataElement);
    });

    document.getElementById('summary').classList.remove('hidden');
}
