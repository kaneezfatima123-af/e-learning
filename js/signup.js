document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const message = document.getElementById("message");

  if (!name || !email || !password || !role) {
    message.style.color = "red";
    message.textContent = "⚠ Please fill all fields!";
    return;
  }

  try {
    const response = await fetch("https://e-learning-six-sand.vercel.app/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: name, email, password, role })
    });

    const data = await response.json();

    if (!response.ok) {
      message.style.color = "red";
      message.textContent = data.message;
      return;
    }

    message.style.color = "green";
    message.textContent = "✅ Signup successful!";

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
