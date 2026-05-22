document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "student dashboard.html";
});

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const course = card.dataset.course;
    if (course === "cpp") window.location.href = "cpp.html";
    if (course === "python") window.location.href = "python.html";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  loadCourses();
});

async function loadCourses() {
  try {
    const response = await fetch("http://localhost:3000/api/courses");
    const data = await response.json();

    const courseList = document.getElementById("course-list");
    if (!courseList) return;
    courseList.innerHTML = "";

    if (!data || data.length === 0) {
      courseList.innerHTML = "<li>No courses available yet.</li>";
      return;
    }

    data.forEach(course => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${course.course_link}" target="_blank">${course.course_name}</a>`;
      courseList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}
