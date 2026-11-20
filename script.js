const screens = document.querySelectorAll(".screen");

const loadingScreen = document.getElementById("loadingScreen");
const envelopeScreen = document.getElementById("envelopeScreen");
const questionScreen = document.getElementById("questionScreen");
const continueScreen = document.getElementById("continueScreen");
const confessionScreen = document.getElementById("confessionScreen");

const bgMusic = document.getElementById("bgMusic");
const envelopeSound = document.getElementById("envelopeSound");

function showScreen(screenToShow) {
    screens.forEach(screen => {
        screen.classList.add("hidden");
    });

    screenToShow.classList.remove("hidden");
}

window.addEventListener("load", () => {
    setTimeout(() => {
        showScreen(envelopeScreen);
    }, 3000);
});

document.getElementById("openEnvelope").addEventListener("click", () => {
    const envelope = document.getElementById("envelope");

    bgMusic.volume = 0.4;
    bgMusic.play().catch(error => {
        console.log("Music playback was blocked:", error);
    });

    envelopeSound.currentTime = 0;
    envelopeSound.play().catch(error => {
        console.log("Envelope sound playback was blocked:", error);
    });

    envelope.classList.add("opening");

    setTimeout(() => {
        envelope.classList.remove("opening");
        showScreen(questionScreen);
        typequestion();
    }, 850);
});



const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzrcwRPp7aWYVIwzt29NkuYEz5emTZKIqpS2_0j3bnRbwCswh5PAaL0jqu7VIZUTQa5hQ/exec";

document.getElementById("submitAnswer").addEventListener("click", () => {
    const answer = document.getElementById("answerInput").value.trim();

    if (answer === "") {
        alert("I'd love to hear what you think first. 💙");
        return;
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = SCRIPT_URL;
    form.target = "responseFrame";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "answer";
    input.value = answer;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    form.remove();

    showScreen(continueScreen);
});

document.getElementById("revealButton").addEventListener("click", () => {
    showScreen(confessionScreen);
    confessionScreen.classList.add("show-flower");
    typeConfession()
});

const endingButton = document.getElementById("endingButton");
const endingScreen = document.getElementById("endingScreen");

endingButton.addEventListener("click", () => {
    showScreen(endingScreen);
});

function typeQuestion() {
    const question = document.querySelector(".question-text");

    const message = "You once said that you can read people, right? So, can you read me? Can you understand my actions, especially when it comes to you?";

    question.textContent = "";
    let index = 0;

    function type() {
        if (index < message.length) {
            question.textContent += message.charAt(index);
            index++;
            setTimeout(type, 35);
        }
    }

    type();
}

const answerInput = document.getElementById("answerInput");
const submitButton = document.getElementById("submitAnswer");

submitButton.disabled = true;

answerInput.addEventListener("input", () => {
    submitButton.disabled = answerInput.value.trim() === "";
});

function typeConfession() {
    const messageElement = document.getElementById("confessionMessage");
    const message = messageElement.textContent.trim();

    messageElement.textContent = "";

    let index = 0;

    function typeNextCharacter() {
        if (index < message.length) {
            messageElement.textContent += message.charAt(index);
            index++;

            setTimeout(typeNextCharacter, 35);
        }
    }

    typeNextCharacter();
}