let currentEmail = "";

// Submit Comment
window.submitComment = async function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (!name || !email || !comment) {
    alert("❌ Please fill all fields!");
    return;
  }

  try {
    const response = await fetch("http://https://elearning-backend.bonto.run/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_name: name, student_email: email, comment })
    });

    const data = await response.json();

    if (!response.ok) {
      alert("❌ Failed to save comment.");
      return;
    }

    alert("✅ Comment submitted successfully!");
    currentEmail = email;
    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";
    loadComments();

  } catch (err) {
    console.error(err);
    alert("❌ Server error!");
  }
};

// Load Comments
async function loadComments() {
  const email = currentEmail || document.getElementById("email")?.value?.trim();

  if (!email) {
    document.getElementById("comment-list").innerHTML = "<p>Please submit a comment first.</p>";
    return;
  }

  try {
    const response = await fetch(`http://https://elearning-backend.bonto.run/api/comments?email=${email}`);
    const data = await response.json();

    const section = document.getElementById("comment-list");
    section.innerHTML = "";

    if (!data || data.length === 0) {
      section.innerHTML = "<p>No comments yet.</p>";
      return;
    }

    data.forEach(c => {
      section.innerHTML += `
        <div class="comment-box">
          <p><strong>${c.student_name}</strong> (${c.student_email})</p>
          <p>${c.comment}</p>
          ${c.answer
            ? `<p style="color:green;"><strong>✅ Teacher Reply:</strong> ${c.answer}</p>`
            : `<p style="color:gray;">⏳ Waiting for teacher reply...</p>`}
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    document.getElementById("comment-list").innerHTML = "<p>Failed to load comments.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComments();
});

window.loadComments = loadComments;
