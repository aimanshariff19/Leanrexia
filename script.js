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
    alert("Login function called"); // DEBUG 1

    const emailEl = document.getElementById("email");
    const passEl = document.getElementById("password");
    const msgBox = document.getElementById("loginMsg");

    if (!emailEl || !passEl || !msgBox) {
        alert("HTML ID mismatch (email/password/loginMsg)");
        return;
    }

    const email = emailEl.value;
    const password = passEl.value;

    if (!email || !password) {
        msgBox.innerText = "Please fill all fields";
        msgBox.style.color = "red";
        return;
    }

    alert("Sending request to backend"); // DEBUG 2

    fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => {
        alert("Backend responded"); // DEBUG 3
        return res.json();
    })
    .then(data => {
        console.log("Backend data:", data); // DEBUG 4

        if (data.success) {
            msgBox.style.color = "green";
            msgBox.innerText = "Login successful";
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 800);
        } else {
            msgBox.style.color = "red";
            msgBox.innerText = data.message || "Login failed";
        }
    })
    .catch(err => {
        console.error("Login error:", err);
        alert("Login failed – check console");
    });
}


/* =========================
   DASHBOARD → ENROLL
   ========================= */

function goToEnroll(programCode) {
    window.location.href = "enrollment.html?program=" + programCode;
}

/* =========================
   ENROLLMENT PAGE LOAD
   ========================= */

document.addEventListener("DOMContentLoaded", function () {
    const programSpan = document.getElementById("programName");
    if (!programSpan) return;

    const params = new URLSearchParams(window.location.search);
    const programCode = params.get("program");

    const programNames = {
        digital: "Digital Learning",
        ai: "Learn basic about AI",
        fullstack: "Learn Fullstack Development",
        datascience: "Data Science",
        environment: "Environmental Education",
        health: "Health and Hygiene"
    };

    if (!programNames[programCode]) {
        programSpan.innerText = "No program selected";
        return;
    }

    localStorage.setItem("enroll_program", programCode);
    programSpan.innerText = programNames[programCode];
});

/* =========================
   CONFIRM ENROLLMENT
   ========================= */

function confirmEnroll() {
    const programCode = localStorage.getItem("enroll_program");

    const routes = {
        digital: "digital-learning.html",
        ai: "ai-basics.html",
        fullstack: "fullstack.html",
        datascience: "datascience.html",
        environment: "environment.html",
        health: "health.html"
    };

    const page = routes[programCode];

    if (!page) {
        alert("Invalid program selected");
        return;
    }

    // Save enrollment (backend)
    fetch(`${API_URL}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program: programCode })
    }).catch(() => console.warn("Enrollment API failed"));

    // Redirect regardless
    window.location.href = page;
}

