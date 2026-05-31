document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!email || !password) {
    message.style.color = "red";
    message.textContent = "⚠ Please fill all fields!";
    return;
  }

  try {
    const response = await fetch("https://e-learning-six-sand.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      message.style.color = "red";
      message.textContent = data.message;
      return;
    }

    message.style.color = "green";
    message.textContent = "✅ Login successful! Redirecting...";

    setTimeout(() => {
      localStorage.clear();
      localStorage.setItem("role", data.role);
      if (data.role === "student") {
        localStorage.setItem("studentName", data.full_name);
        window.location.href = "student dashboard.html";
      } else if (data.role === "teacher") {
        localStorage.setItem("teacherName", data.full_name);
        window.location.href = "teacher_dashboard.html";
      }
    }, 1000);

  } catch (err) {
    console.error(err);
    message.style.color = "red";
    message.textContent = "⚠ Server error!";
  }
});
