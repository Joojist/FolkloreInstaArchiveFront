window.addEventListener("DOMContentLoaded", () => {
  let data = null;

  chrome.storage.local.get(['data'], function (result) {
      data = result.data;
      
      document.getElementById("previewImage").src = data.imgUrl;
      document.getElementById("titleSpan").innerHTML = 'Pealkiri: '+ data.title;
      document.getElementById("authorSpan").innerHTML = 'Autor: '+ data.author;
      document.getElementById("likesSpan").innerHTML = 'Meeldimised: '+ data.likes;

      const archiver = document.getElementById("archiverInput");
      const tagsInput = document.getElementById("tagsInput");
      const archiverComment = document.getElementById("commentInput");

      document.getElementById("saveButton").addEventListener("click", function() {
        data.comments.forEach(comment => {
          return commentsArray = {
            text: comment.comment,
            author: comment.author,
            replies: [
              {
                text: "thanks",
                author: "user33.3"
              }
            ]
          };
        });

        const tags = tagsInput.value.split(",");

        fetch("http://localhost:8080/save_data.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            archiver: archiver.value,
            likes: data.likes,
            creatorId: 1,
            igCreatedAt: new Date(),
            caption: data.title,
            tags: tags,
            userComment: archiverComment.value,
            igUser: {
              igId: 1,
              username: data.author
            },
            media: [{ url: data.imgUrl }],
            // comments: [{
            //   comment: commentsArray
            // }]
          })
        })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData);
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
        // window.location.href = "index.html";
      });
    });
});