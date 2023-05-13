const apiKey = "your_openai_api_key_here";

function callChatGPTAPI() {
    // Array of pre-determined sentences
    const sentences = [
      "This is a random sentence for debugging purposes.",
      "Another random sentence appears!",
      "Debugging is an essential part of software development.",
      "Yet another random sentence for your debugging needs.",
      "This is a test. This is only a test.",
    ];
  
    // Pick a random sentence
    const index = Math.floor(Math.random() * sentences.length);
    const sentence = sentences[index];
  
    // Return the sentence wrapped in a Promise to simulate an async API call
    return Promise.resolve({ choices: [{ text: sentence }] });
  }
  

async function askQuestion() {
    const questionInput = document.getElementById("question-input");
    const question = questionInput.value.trim();
    const submitButton = document.getElementById("submit-button");
  
    if (question.length === 0) return;
  
    // Disable the submit button
    submitButton.disabled = true;
  
    // Add the user's question to the chat
    appendChatMessage("user-message", "User", question);
  
    // Call the API
    const prompt = `prompt here\n\nUser: ${question}\nAI: `;
    const response = await callChatGPTAPI(prompt);
    const answer = response.choices[0].text.trim();
  
    // Add the AI's answer to the chat
    appendChatMessage("ai-message", "WisdoMine", answer);
  
    // Clear the input field
    questionInput.value = "";
  
    // Enable the submit button
    submitButton.disabled = false;
  
    // Record the data
    recordData({
      time: new Date(),
      userQuestion: question,
      aiResponse: answer,
      responseTime: response.choices[0].finish_reason === "stop" ? response.choices[0].index : null,
    });
  }
  

function appendChatMessage(className, label, text) {
    const chatContent = document.getElementById("chat-content");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", className);
    messageDiv.innerHTML = `<strong>${label}:</strong> ${text}`;
    chatContent.appendChild(messageDiv);
  
    // Scroll to the bottom of the chat
    chatContent.scrollTop = chatContent.scrollHeight;
  }
  
  function recordData(data) {
    // Save the data to your database, analytics service, or any other storage system
    console.log("Data recorded:", data);
  }
  
  // Event listeners for thumbs up and thumbs down buttons
  document.getElementById("thumbs-up").addEventListener("click", () => {
    recordData({ eventType: "thumbsUp" });
  });
  
  document.getElementById("thumbs-down").addEventListener("click", () => {
    recordData({ eventType: "thumbsDown" });
  });