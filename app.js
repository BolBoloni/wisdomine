document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    app.innerHTML = `
        <h1>Welcome to WisdoMine</h1>
        <p>Ask your questions about religion and receive answers from our AI bot:</p>
        <form id="questionForm">
            <input type="text" id="userInput" name="userInput" placeholder="Enter your question (max 200 characters)" maxlength="200" required>
            <input type="submit" value="Ask">
        </form>
        <span class="answer-label">Answer:</span>
        <div id="output"></div>
        <div class="section">
            <h2 class="section-title">Use Examples</h2>
            <ul>
                <li>What is the purpose of life according to different religions?</li>
                <li>What are the main differences between Christianity and Islam?</li>
                <li>What are the Five Pillars of Islam?</li>
                <li>What is the role of reincarnation in Hinduism and Buddhism?</li>
            </ul>
        </div>
    `;

    const questionForm = document.getElementById("questionForm");
    questionForm.addEventListener("submit", handleSubmit);
});

async function handleSubmit(event) {
    event.preventDefault();
    const userInput = document.getElementById("userInput").value;
    const response = await fetchChatGPT(userInput);
    document.getElementById("output").innerHTML = response;
}

async function fetchChatGPT(input) {
    const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ input })
    });

    if (response.ok) {
        const data = await response.json();
        return data.output;
    } else {
        return "An error occurred. Please try again later.";
    }
}