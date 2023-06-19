window.addEventListener("DOMContentLoaded", function () {
    var commentsTable = document.getElementById("commentsTable");
  
    populateTable([
      {
        comments: [
          {
            id: 1,
            parent_id: null,
            author: "steven",
            text: "lahe pilt"
          },
          {
            id: 2,
            parent_id: 1,
            author: "kalle",
            text: "tegelt mitte lahe pilt"
          },
          {
            id: 3,
            parent_id: 1,
            author: "juss",
            text: "pilt"
          },
          {
            id: 4,
            parent_id: null,
            author: "kalle",
            text: "ei meeldi"
          },
          {
            id: 5,
            parent_id: 4,
            author: "mari",
            text: "meeldib"
          },
          {
            id: 6,
            parent_id: null,
            author: "juss",
            text: "ilus pilt"
          },
          {
            id: 7,
            parent_id: 6,
            author: "mari",
            text: "väga ilus"
          },
          {
            id: 8,
            parent_id: null,
            author: "mari",
            text: "nii ilus"
          },
          {
            id: 9,
            parent_id: null,
            author: "malle",
            text: "lahe pilt"
          },
          {
            id: 10,
            parent_id: null,
            author: "tiiu",
            text: "okei pilt"
          },
        ],
      },
    ]);
  
    function populateTable(comments) {
      var tbody = commentsTable.querySelector("tbody");
      tbody.innerHTML = "";
  
      comments.forEach(function (commentObj) {
        commentObj.comments.forEach(function (comment) {
          var row = document.createElement("tr");
          var commentsCell = document.createElement("td");
          commentsCell.innerHTML = getCommentHtml(comment);
  
          row.appendChild(commentsCell);
          tbody.appendChild(row);
        });
      });
    }
  
    function getCommentHtml(comment) {
      var indent = comment.parent_id ? "style='margin-left: 20px'" : "";
      var html = `<div class="comment" ${indent}><p>${comment.author}: ${comment.text}</p></div>`;
  
      return html;
    }
  });