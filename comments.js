window.addEventListener("DOMContentLoaded", function () {
  const commentsTable = document.getElementById("commentsTable");

  chrome.storage.local.get(['data'], function (result) {
    const comments = result.data.comments;
    populateTable(comments);
  });

  function populateTable(comments) {
    const tbody = commentsTable.querySelector("tbody");
    tbody.innerHTML = "";

    comments.forEach(function (commentObj) {
      const row = document.createElement("tr");
      const commentCell = document.createElement("td");
      commentCell.innerHTML = getCommentHtml(commentObj);

      row.appendChild(commentCell);
      tbody.appendChild(row);
    });
  }

  function getCommentHtml(commentObj) {
    let html = `<div class="comment"><p><strong>${commentObj.author}:</strong> ${commentObj.comment}</p>`;

    if (commentObj.children.length > 0) {
      html += `<ul class="reply-list">`;
      commentObj.children.forEach(function (reply) {
        html += `<li style="margin-left: 20px;"><strong>${reply.author}:</strong> ${reply.comment}</li>`;
      });
      html += `</ul>`;
    }

    html += `</div>`;
    return html;
  }
});