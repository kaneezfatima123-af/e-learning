document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "teacher_dashboard.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.getElementById("uploadQuizBtn");
  const message = document.getElementById("message");

  uploadBtn.addEventListener("click", async () => {
    const question = document.getElementById("questionInput").value.trim();
    const option_a = document.getElementById("optionA").value.trim();
    const option_b = document.getElementById("optionB").value.trim();
    const option_c = document.getElementById("optionC").value.trim();
    const option_d = document.getElementById("optionD").value.trim();
    const correct_answer = document.getElementById("correctAnswer").value.trim();

    if (!question || !option_a || !option_b || !option_c || !option_d || !correct_answer) {
      message.textContent = "⚠ Please fill all fields!";
      message.style.color = "red";
      return;
    }

    try {
      const response = await fetch("http://https://elearning-backend.bonto.run/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, option_a, option_b, option_c, option_d, correct_answer })
      });

      const data = await response.json();

      if (!response.ok) {
        message.textContent = "❌ " + data.message;
        message.style.color = "red";
        return;
      }

      message.textContent = "✅ Quiz uploaded successfully!";
      message.style.color = "green";

      // Form clear karo
      document.getElementById("questionInput").value = "";
      document.getElementById("optionA").value = "";
      document.getElementById("optionB").value = "";
      document.getElementById("optionC").value = "";
      document.getElementById("optionD").value = "";
      document.getElementById("correctAnswer").value = "";

    } catch (err) {
      console.error(err);
      message.textContent = "❌ Server error!";
      message.style.color = "red";
    }
  });
});
