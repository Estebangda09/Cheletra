
const questions = [
    { hint: "Autobús", answer: "colectivo" },
    { hint: "Dinero", answer: "guita" },
    { hint: "Mentira", answer: "coba" },
    { hint: "Intenso", answer: "fiebruo" }
];

let current = 0;
let input = [];
let fernet = 200;

document.addEventListener("DOMContentLoaded", () => {
    updateScore();
    loadQuestion();
    createKeyboard();
    document.addEventListener("keydown", (e) => {
        const letter = e.key.toLowerCase();
        if (/^[a-zñ]$/.test(letter)) handleInput(letter);
    });
});

function updateScore() {
    document.getElementById("fernet").textContent = fernet;
}

function loadQuestion() {
    const q = questions[current];
    document.getElementById("hint").textContent = `Pista: ${q.hint}`;
    const container = document.getElementById("word-container");
    container.innerHTML = "";
    input = [];
    for (let i = 0; i < q.answer.length; i++) {
        const box = document.createElement("div");
        box.className = "letter-box";
        box.textContent = "";
        container.appendChild(box);
    }
}

function createKeyboard() {
    const qwerty = "qwertyuiopasdfghjklñzxcvbnm";
    const keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = "";
    for (const key of qwerty) {
        const btn = document.createElement("button");
        btn.className = "key";
        btn.textContent = key;
        btn.onclick = () => handleInput(key);
        keyboard.appendChild(btn);
    }
}

function handleInput(letter) {
    const boxes = document.querySelectorAll(".letter-box");
    if (input.length >= boxes.length) return;
    input.push(letter);
    boxes[input.length - 1].textContent = letter;

    if (input.length === boxes.length) {
        const answer = questions[current].answer;
        if (input.join("") === answer) {
            boxes.forEach(b => b.classList.add("correct"));
            fernet += 7;
            updateScore();
            setTimeout(() => {
                current = (current + 1) % questions.length;
                loadQuestion();
            }, 800);
        } else {
            boxes.forEach(b => b.classList.add("incorrect"));
            setTimeout(() => {
                boxes.forEach(b => {
                    b.classList.remove("incorrect");
                    b.textContent = "";
                });
                input = [];
            }, 800);
        }
    }
}

function deleteLastLetter() {
    if (input.length === 0) return;
    input.pop();
    const boxes = document.querySelectorAll(".letter-box");
    boxes[input.length].textContent = "";
}

function resetInput() {
    input = [];
    const boxes = document.querySelectorAll(".letter-box");
    boxes.forEach(b => b.textContent = "");
}

function getHint() {
    if (fernet < 20) return alert("No tenés suficientes vasos de fernet 😓");
    fernet -= 20;
    updateScore();
    alert("Otra pista: " + questions[current].hint);
}
