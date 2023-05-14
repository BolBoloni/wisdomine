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
    const userPrompt = document.getElementById("user-input").value;
    if (userPrompt.trim() === "") {
      alert("Please enter a question.");
      return;
    }
  
    appendChatMessage("user-message", "User", userPrompt);
    document.getElementById("user-input").value = "";
  
    // Disable the send button and change its content to show a loading spinner
    const sendButton = document.getElementById("send-button");
    sendButton.disabled = true;
    sendButton.innerHTML = `<div class="loader"></div>`;
  
    const chatGPTResponse = await callChatGPTAPI(`prompt here`);
    
    // Re-enable the send button and change its content back to "Send"
    sendButton.disabled = false;
    sendButton.textContent = "Send";
  
    const answer = chatGPTResponse.choices[0].text.trim();
    appendChatMessage("ai-message", "AI", answer);

    questionInput.value = "";
  
    submitButton.disabled = false;
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
    
    // Add thumbs up and thumbs down buttons for AI's answer
    if (className === "ai-message") {
      messageDiv.innerHTML = `
        <div>
          <strong>${label}:</strong> ${text}
        </div>
        <div class="feedback-buttons">
          <button class="thumbs-up">👍</button>
          <button class="thumbs-down">👎</button>
        </div>
      `;
      
      // Add event listeners for the buttons
      messageDiv.querySelector(".thumbs-up").addEventListener("click", () => {
        recordData({ eventType: "thumbsUp" });
      });
      messageDiv.querySelector(".thumbs-down").addEventListener("click", () => {
        recordData({ eventType: "thumbsDown" });
      });
    } else {
      messageDiv.innerHTML = `<strong>${label}:</strong> ${text}`;
    }
    
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

  document.getElementById("view-data").addEventListener("click", viewData);

  function viewData() {
    console.log(sessionData);
  }
  