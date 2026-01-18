/* =========================
   BACKEND CONFIG (IMPORTANT)
   ========================= */

const API_URL = "https://leanrexia-backeend.onrender.com";

/* =========================
   REGISTRATION
   ========================= */

function register_student() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const course = document.getElementById("course").value;

    if (!name || !email || !password || !course) {
        alert("Please fill all fields");
        return;
    }

    fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "Student" })
    })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(() => alert("Server error"));
}

function register_volunteer() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const skills = document.getElementById("skills").value;

    if (!name || !email || !password || !skills) {
        alert("Please fill all fields");
        return;
    }

    fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "volunteer" })
    })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(() => alert("Server error"));
}

function register_ngo() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const sector = document.getElementById("sector").value;

    if (!name || !email || !password || !sector) {
        alert("Please fill all fields");
        return;
    }

    fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "NGO" })
    })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(() => alert("Server error"));
}

/* =========================
   LOGIN
   ========================= */

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msgBox = document.getElementById("loginMsg");

    msgBox.innerText = "";

    if (!email || !password) {
        msgBox.innerText = "Please fill all fields";
        msgBox.style.color = "red";
        return;
    }

    fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type
