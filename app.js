// ===== CONFIG =====
const API = "https://YOUR_BACKEND_URL"; // <-- CHANGE THIS

let token = "";

// ===== REGISTER =====
async function register() {
  const email = document.getElementById("r_email").value;
  const password = document.getElementById("r_pass").value;
  const role = document.getElementById("r_role").value;

  try {
    const res = await fetch(API + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error");

    alert("✅ Registered successfully! Now login.");
  } catch (err) {
    alert("❌ " + err.message);
  }
}

// ===== LOGIN =====
async function login() {
  const email = document.getElementById("l_email").value;
  const password = document.getElementById("l_pass").value;

  try {
    const res = await fetch(API + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Login failed");

    token = data.token;

    alert("✅ Logged in!");
    loadJobs();

  } catch (err) {
    alert("❌ " + err.message);
  }
}

// ===== CREATE JOB =====
async function createJob() {
  const title = document.getElementById("job_title").value;

  if (!token) {
    alert("⚠️ Login first");
    return;
  }

  try {
    await fetch(API + "/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ title })
    });

    alert("✅ Job posted!");
    loadJobs();

  } catch (err) {
    alert("❌ Failed to post job");
  }
}

// ===== LOAD JOBS =====
async function loadJobs() {
  try {
    const res = await fetch(API + "/api/jobs");
    const jobs = await res.json();

    const list = document.getElementById("jobs");
    list.innerHTML = "";

    jobs.forEach(job => {
      const li = document.createElement("li");
      li.innerText = job.title;
      list.appendChild(li);
    });

  } catch (err) {
    console.log(err);
  }
}

// ===== INIT =====
loadJobs();
