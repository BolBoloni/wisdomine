const apiKey = "your_openai_api_key_here";

let debugging = false;

function toggleDebugging() {
    debugging = !debugging;
    const toggleButton = document.getElementById("toggle-debugging");
    toggleButton.innerText = debugging ? "Turn off Debugging" : "Turn on Debugging";
}

function callChatGPTAPI(prompt) {
    if (debugging) {
        const sentences = [
            "This is a random sentence for debugging purposes.",
            "Another random sentence appears!",
            "Debugging is an essential part of software development.",
            "Yet another random sentence for your debugging needs.",
            "This is a test. This is only a test.",
        ];
    
        const index = Math.floor(Math.random() * sentences.length);
        const sentence = sentences[index];
    
        return Promise.resolve({ choices: [{ text: sentence }] });
    } else {
        // Add your actual API call here
    }
}

async function askQuestion() {
    const questionInput = document.getElementById("question-input");
    const question = questionInput.value.trim();
    const submitButton = document.getElementById("submit-button");
  
    if (question.length === 0) return;
  
    submitButton.disabled = true;
  
    appendChatMessage("user-message", "User", question);
  
    const prompt = `prompt here\n\nUser: ${question}\nAI: `;
    const response = await callChatGPTAPI(prompt);
    const answer = response.choices[0].text.trim();
  
    appendChatMessage("ai-message", "WisdoMine", answer);
  
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
    chatContent.scrollTop = chatContent.scrollHeight;
}

function recordData(data) {
    console.log("Data recorded:", data);
}

document.getElementById("thumbs-up").addEventListener("click", () => {
    recordData({ eventType: "thumbsUp" });
});

document.getElementById("thumbs-down").addEventListener("click", () => {
    recordData({ eventType: "thumbsDown" });
});
