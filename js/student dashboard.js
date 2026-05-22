document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const studentName = localStorage.getItem("studentName");

  if (role !== "student") {
    window.location.href = "login.html";
    return;
  }

  const welcome = document.getElementById("welcome");
  if (welcome) welcome.textContent = `Welcome, ${studentName}!`;
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
    if (title.includes("Courses")) window.location.href = "student_course.html";
    else if (title.includes("Quizzes")) window.location.href = "quizz.html";
    else if (title.includes("Discussion")) window.location.href = "comments.html";
  });
});
