let quizData = [];

async function loadQuiz() {
  try {
    const response = await fetch("http://https://elearning-backend.bonto.run/api/quiz");
    const data = await response.json();

    const quizContainer = document.getElementById("quizContainer");

    if (!data || data.length === 0) {
      quizContainer.innerHTML = "<p>No quiz available yet.</p>";
      return;
    }

    quizData = data;
    quizContainer.innerHTML = "";

    data.forEach((q, index) => {
      const div = document.createElement("div");
      div.classList.add("question");
      div.innerHTML = `
        <p><strong>Q${index + 1}:</strong> ${q.question}</p>
        <label><input type="radio" name="q${index}" value="A"> ${q.option_a}</label><br>
        <label><input type="radio" name="q${index}" value="B"> ${q.option_b}</label><br>
        <label><input type="radio" name="q${index}" value="C"> ${q.option_c}</label><br>
        <label><input type="radio" name="q${index}" value="D"> ${q.option_d}</label>
      `;
      quizContainer.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    document.getElementById("quizContainer").innerHTML = "<p>Failed to load quiz.</p>";
  }
}

async function submitQuiz() {
  if (quizData.length === 0) {
    alert("Koi quiz available nahi hai!");
    return;
  }

  let correctCount = 0;
  const totalQuestions = quizData.length;
  let resultHTML = "";

  quizData.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
    const selected = selectedOption ? selectedOption.value : null;
    const isCorrect = selected === q.correct_answer;

    if (isCorrect) {
      correctCount++;
      resultHTML += `<p style="color:green;">✅ Q${index + 1}: ${q.question} — Correct!</p>`;
    } else {
      let correctText = "";
      if (q.correct_answer === "A") correctText = q.option_a;
      else if (q.correct_answer === "B") correctText = q.option_b;
      else if (q.correct_answer === "C") correctText = q.option_c;
      else if (q.correct_answer === "D") correctText = q.option_d;

      resultHTML += `<p style="color:red;">❌ Q${index + 1}: ${q.question}<br>
        Your Answer: ${selected ? selected : "No answer given"}<br>
Correct Answer: ${q.correct_answer} — ${correctText}</p>`;
    }
  });

  const percentage = (correctCount / totalQuestions) * 100;
  let remark = "";
  if (percentage >= 80) remark = "Excellent 🌟";
  else if (percentage >= 60) remark = "Good 👍";
  else if (percentage >= 40) remark = "Average 😐";
  else remark = "Needs Improvement 📚";

  document.getElementById("result").innerHTML = `
    <h3>Score: ${correctCount}/${totalQuestions} (${percentage.toFixed(0)}%) — ${remark}</h3>
    <hr>${resultHTML}
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "student dashboard.html";
  });

  document.getElementById("submitBtn").addEventListener("click", submitQuiz);

  loadQuiz();
});