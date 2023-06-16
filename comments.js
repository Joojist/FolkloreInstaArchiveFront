window.addEventListener("DOMContentLoaded", function () {
    var commentsTable = document.getElementById("commentsTable");

    populateTable(
        [
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
                    }
                ],
            },
        ]
    )

    function populateTable(comments) {
        var tbody = commentsTable.querySelector("tbody");
        tbody.innerHTML = "";
      
        comments.forEach(function (comments) {
          var row = document.createElement("tr");
      
          var commentsCell = document.createElement("td");
          var commentsDiv = document.createElement("div"); 
          commentsDiv.id = "comments";
      
          comments.comments.forEach(function (comment) {
            var commentText = document.createElement("p");
            commentText.textContent = `${comment.author}: ${comment.text}`;
            commentsDiv.appendChild(commentText);
          });
      
          commentsCell.appendChild(commentsDiv);
          row.appendChild(commentsCell);
      
          tbody.appendChild(row);
        });
      }
});