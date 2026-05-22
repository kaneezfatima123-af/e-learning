document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const teacherName = localStorage.getItem("teacherName");

  if (role !== "teacher") {
    window.location.href = "login.html";
    return;
  }

  const welcome = document.getElementById("welcome");
  if (welcome) welcome.textContent = `Welcome, ${teacherName}!`;
});

document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "Index.html";
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  alert("Logged out successfully!");
  window.location.href = "login.html";
});

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h2").textContent;
    if (title.includes("Courses")) window.location.href = "teacher_course.html";
    else if (title.includes("Quizzes")) window.location.href = "teacher quiz.html";
    else if (title.includes("Students")) window.location.href = "teacher progress.html";
    else if (title.includes("Forum")) window.location.href = "teacher form.html";
    else alert(title + " section khulega!");
  });
});
