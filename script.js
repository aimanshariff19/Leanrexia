/* =========================
   REGISTRATION FUNCTIONS
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

    fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "Student" })
    })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(() => alert("Registration failed"));
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

    fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "volunteer" })
    })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(() => alert("Registration failed"));
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

    fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "NGO" })
    })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(() => alert("Registration failed"));
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

    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            msgBox.style.color = "green";
            msgBox.innerText = "Login successful";
            setTimeout(() => window.location.href = "dashboard.html", 800);
        } else {
            msgBox.style.color = "red";
            msgBox.innerText = data.message || "Invalid credentials";
        }
    })
    .catch(() => {
        msgBox.style.color = "red";
        msgBox.innerText = "Server error";
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
   CONFIRM ENROLLMENT (FIXED)
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

    // 🔹 Backend call (optional – does NOT block redirect)
    fetch("http://localhost:5000/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ program: programCode })
    }).catch(() => {
        console.warn("Backend enrollment failed, continuing...");
    });

    // ✅ ALWAYS REDIRECT
    window.location.href = page;
}

/* =========================
   PROGRESS BAR (OPTIONAL)
   ========================= */

let progress = 40;

function increaseProgress() {
    if (progress < 100) {
        progress += 10;
        const bar = document.getElementById("progress");
        if (bar) bar.style.width = progress + "%";
    }
}
