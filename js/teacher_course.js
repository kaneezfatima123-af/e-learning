document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "teacher_dashboard.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadForm");
  const message = document.getElementById("message");
  const uploadList = document.getElementById("uploadList");

  const loadUploads = async () => {
    try {
      const response = await fetch("http://http://https://e-learning-six-sand.vercel.app/api/courses");
      const data = await response.json();

      uploadList.innerHTML = "";
      if (data && data.length > 0) {
        data.forEach(course => {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${course.course_name}</strong> - <a href="${course.course_link}" target="_blank">Open</a>`;
          uploadList.appendChild(li);
        });
      } else {
        uploadList.innerHTML = "<li>No materials uploaded yet.</li>";
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadUploads();

  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const course_name = document.getElementById("course").value.trim();
    const course_link = document.getElementById("file_url").value.trim();

    if (!course_name || !course_link) {
      message.textContent = "⚠ Please fill all required fields!";
      message.style.color = "red";
      return;
    }

    try {
      new URL(course_link);
    } catch {
      message.textContent = "⚠ Invalid URL format!";
      message.style.color = "red";
      return;
    }

    try {
      const response = await fetch("https://e-learning-six-sand.vercel.app/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_name, course_link })
      });

      const data = await response.json();

      if (!response.ok) {
        message.textContent = "❌ " + data.message;
        message.style.color = "red";
        return;
      }

      message.textContent = "✅ Course uploaded successfully!";
      message.style.color = "green";
      uploadForm.reset();
      loadUploads();

    } catch (err) {
      console.error(err);
      message.textContent = "❌ Server error!";
      message.style.color = "red";
    }
  });
});
