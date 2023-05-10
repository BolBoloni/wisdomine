document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    app.innerHTML = `
        <h1>Welcome to AIpray</h1>
        <p>Ask your questions about religion and receive answers from our AI bot:</p>
        <form id="questionForm">
            <input type="text" id="userInput" name="userInput" placeholder="Enter your question (max 200 characters)" maxlength="200" required>
            <input type="submit" value="Ask">
        </form>
        <div id="output"></div>
        <div class="section">
            <h2 class="section-title">Popular Questions</h2>
            <ul>
                <li><a href="#q1">What is the purpose of life according to different religions?</a></li>
                <li><a href="#q2">What are the main differences between Christianity and Islam?</a></li>
                <li><a href="#q3">What are the Five Pillars of Islam?</a></li>
                <li><a href="#q4">What is the role of reincarnation in Hinduism and Buddhism?</a></li>
            </ul>
        </div>
        <div class="section">
            <h2 class="section-title">Resources</h2>
            <ul>
                <li><a                href="https://www.religioustolerance.org/">Religious Tolerance</a></li>
                <li><a href="https://www.pewforum.org/">Pew Research Center - Religion & Public Life</a></li>
                <li><a href="https://www.beliefnet.com/">Beliefnet</a></li>
                <li><a href="https://www.religionfacts.com/">ReligionFacts</a></li>
            </ul>
        </div>
        <div class="section">
            <h2 class="section-title">Contact Us</h2>
            <p>If you have any questions, suggestions, or feedback, feel free to email us at: <a href="mailto:contact@aipray.com">contact@aipray.com</a></p>
        </div>
    `;

    document.getElementById("questionForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const userInput = document.getElementById("userInput").value;
        const response = await fetchChatGPT(userInput);
        document.getElementById("output").innerHTML = response;
    });
});

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

