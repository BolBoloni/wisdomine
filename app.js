const apiKey = "your_openai_api_key_here";

async function callChatGPTAPI(prompt) {
  const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.8
    })
  });

  return await response.json();
}

async function askQuestion() {
  const questionInput = document.getElementById("question-input");
  const question = questionInput.value.trim();

  if (question.length === 0) return;

  // Add the user's question to the chat
  appendChatMessage("user-message", "User", question);

  // Call the API
  const prompt = `prompt here\n\nUser: ${question}\nAI: `;
  const response = await callChatGPTAPI(prompt);
  const answer = response.choices[0].text.trim();

  // Add the AI's answer to the chat
  appendChatMessage("ai-message", "Answer", answer);

  // Clear the input field
  questionInput.value = "";

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