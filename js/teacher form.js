document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "teacher_dashboard.html";
});

// Load pending comments
async function loadComments() {
  try {
    const response = await fetch("http://http://https://e-learning-six-sand.vercel.app/api/comments");
    const allComments = await response.json();
    const comments = allComments.filter(c => c.status === "pending");

    const commentList = document.getElementById("commentList");
    commentList.innerHTML = "";

    if (!comments || comments.length === 0) {
      commentList.innerHTML = "<li>There are no pending comments.</li>";
      return;
    }

    comments.forEach(c => {
      const li = document.createElement("li");
      li.textContent = `${c.student_name}: ${c.comment}`;
      li.dataset.id = c._id;
      li.classList.add("comment-item");
      li.addEventListener("click", () => selectComment(c._id, c.student_name, c.comment, li));
      commentList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert("Comments load nahi ho sake!");
  }
}

// Select comment for reply
function selectComment(id, name, comment, element) {
  document.querySelectorAll(".comment-item").forEach(item => item.classList.remove("selected"));
  element.classList.add("selected");
  document.getElementById("selectedCommentId").value = id;
  document.getElementById("selectedInfo").innerHTML = `<p><strong>Replying to:</strong> ${name} — "${comment}"</p>`;
}

// Submit reply
document.getElementById("answerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const answer = document.getElementById("answer").value.trim();
  const commentId = document.getElementById("selectedCommentId").value;

  if (!commentId) {
    alert("⚠ Please select a student comment to reply!");
    return;
  }
  if (!answer) {
    alert("❌ Reply cannot be empty!");
    return;
  }

  try {
    const response = await fetch(`http://http://https://e-learning-six-sand.vercel.app/api/comments/reply/${commentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer })
    });

    const data = await response.json();

    if (!response.ok) {
      alert("❌ " + data.message);
      return;
    }

    alert("✅ Reply submitted successfully!");
    document.getElementById("answer").value = "";
    document.getElementById("selectedCommentId").value = "";
    document.getElementById("selectedInfo").innerHTML = "<p>⚠ Please select a student comment to reply.</p>";
    loadComments();
    loadAnswers();

  } catch (err) {
    console.error(err);
    alert("❌ Server error!");
  }
});

// Load answered comments
async function loadAnswers() {
  try {
    const response = await fetch("http://http://https://e-learning-six-sand.vercel.app/api/comments");
    const comments = await response.json();

    const answerList = document.getElementById("answerList");
    answerList.innerHTML = "";

    const answered = comments.filter(c => c.status === "answered");

    if (answered.length === 0) {
      answerList.innerHTML = "<li>No answers yet.</li>";
      return;
    }

    answered.forEach(c => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${c.student_name}</strong> asked: "${c.comment}"<br>➡ Teacher: ${c.answer}`;
      answerList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComments();
  await loadAnswers();
});
