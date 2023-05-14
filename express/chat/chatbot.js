import therapyResponses from './questions.js';

function processUserInput(userInput) {
  var response;

  // Convert user input to lowercase for easier comparison
  var userMessage = userInput.toLowerCase();

  // Check user input against predefined questions
  for (var i = 0; i < therapyResponses.length; i++) {
    var questionObj = therapyResponses[i];
    var question = questionObj.question.toLowerCase();

    if (userMessage.includes(question)) {
      response = questionObj.response;
      break;
    }
  }

  // Use default response if no match is found
  if (response && response.includes('What can I ask?')) {
    showPossibleQuestions();
  } else if (response && response.includes('schedule')) {
    showPossibleQuestions();
  } else {
    // Use default response if no match is found
    if (!response) {
      response = getDefaultResponse();
    }

    appendMessage('User: ' + userInput);
    appendMessage('Therapist: ' + response);
  }
}

function getDefaultResponse() {
  // Retrieve a random default response from the array
  var defaultResponses = [
    'I understand. Can you please tell me more?',
    "It seems like there's a lot on your mind. Let's talk about it.",
    "You're not alone. I'm here to listen and support you.",
  ];
  var randomIndex = Math.floor(Math.random() * defaultResponses.length);
  return defaultResponses[randomIndex];
}

function sendMessage() {
  var userInput = document.getElementById('userInput').value;
  processUserInput(userInput);
  document.getElementById('userInput').value = '';
}

function appendMessage(message) {
  var chatbox = document.getElementById('chatbox');
  var messageElement = document.createElement('p');
  messageElement.innerHTML = message;
  chatbox.appendChild(messageElement);
}

function showPossibleQuestions() {
  var possibleQuestions = '';
  var questionSubset = therapyResponses.slice(0, 5); // Change the subset range as needed

  for (var i = 0; i < questionSubset.length; i++) {
    var questionObj = questionSubset[i];
    var question = questionObj.question;
    possibleQuestions += '- ' + question + '\n';
  }

  appendMessage('Possible questions to ask:\n' + possibleQuestions);
}

// Register the event listener for the send button
var sendButton = document.querySelector('button');
sendButton.addEventListener('click', sendMessage);
