window.addEventListener("DOMContentLoaded", function () {
    const postsPerPage = 10; // Number of posts to display per page
    const postTable = document.getElementById("postTable");
    const postPagesContainer = document.getElementById("postPages");

    fetch("http://localhost:8080/get_data.php")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error: " + response.status);
            }
        })
        .then(function (data) {
            console.log("Retrieved data:", data); // Debug: Log the retrieved data
            const totalPages = Math.ceil(data.length / postsPerPage);
            showPosts(1, data);
            createPagination(totalPages, data);
        })
        .catch(function (error) {
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Error fetching data: " + error.message;
            errorMessage.classList.add("error-message");
            postTable.appendChild(errorMessage);
            console.error("Error fetching data:", error); // Debug: Log the error
        });

    function createPagination(totalPages, data) {
        const paginationContainer = document.createElement("div");
        paginationContainer.className = "pagination";
      
        const paginationList = document.createElement("ul");
        paginationList.className = "pagination-list";
      
        let currentPage = 1;
      
        const showPageNumbers = (start, end) => {
          for (let i = start; i <= end; i++) {
            const pageNumber = document.createElement("li");
            pageNumber.textContent = i;
      
            if (i === currentPage) {
              pageNumber.classList.add("current");
            }
      
            pageNumber.addEventListener("click", function () {
              showPosts(i, data);

              const previousPageNumber = paginationContainer.querySelector(
                ".current"
              );
              if (previousPageNumber) {
                previousPageNumber.classList.remove("current");
              }
      
              pageNumber.classList.add("current");
              currentPage = i; 
            });
            paginationList.appendChild(pageNumber);
          }
        };
      
        const showPrevPageNumbers = () => {
          paginationList.innerHTML = "";
      
          let start = currentPage - 1;
          let end = currentPage + 1;
      
          if (start < 1) {
            start = 1;
            end = Math.min(totalPages, start + 2);
          }
      
          showPageNumbers(start, end);
          addPrevNextArrows();
        };
      
        const showNextPageNumbers = () => {
          paginationList.innerHTML = "";
      
          let start = currentPage - 1;
          let end = currentPage + 1;
      
          if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - 2);
          }
      
          showPageNumbers(start, end);
          addPrevNextArrows();
        };
      
        const addPrevNextArrows = () => {
          const prevArrow = document.createElement("li");
          prevArrow.textContent = "<";
          prevArrow.className = "arrow";
      
          const nextArrow = document.createElement("li");
          nextArrow.textContent = ">";
          nextArrow.className = "arrow";
      
          if (currentPage > 1) {
            prevArrow.addEventListener("click", () => {
              currentPage--;
              showPrevPageNumbers();
              showPosts(currentPage, data);
            });
            paginationList.prepend(prevArrow);
          }
      
          if (currentPage < totalPages) {
            nextArrow.addEventListener("click", () => {
              currentPage++;
              showNextPageNumbers();
              showPosts(currentPage, data);
            });
            paginationList.appendChild(nextArrow);
          }
        };
      
        const showPosts = (pageNumber, data) => {
          const start = (pageNumber - 1) * postsPerPage;
          const end = start + postsPerPage;
          const posts = data.slice(start, end);
      
          populateTable(posts);
        };
      
        showPageNumbers(1, Math.min(3, totalPages));
        addPrevNextArrows();
      
        paginationContainer.appendChild(paginationList);
        postPagesContainer.appendChild(paginationContainer);
      }
  
    function showPosts(pageNumber, data) {
        const start = (pageNumber - 1) * postsPerPage;
        const end = start + postsPerPage;
        const posts = data.slice(start, end);

        populateTable(posts);
    }

    function populateTable(posts) {
        var tbody = postTable.querySelector("tbody");
        tbody.innerHTML = "";

        posts.forEach(function (post) {
            var row = document.createElement("tr");

            var imgCell = document.createElement("td");

            post.media.forEach(function (media) {
                var imageLink = document.createElement("a");
                imageLink.href = media.url; // Use the correct property for the image URL
                imageLink.target = "_blank"; // Open the link in a new tab

                var image = document.createElement("img");
                image.src = media.url; // Use the correct property for the image URL
                image.crossOrigin = "Anonymous";
                image.style.maxWidth = "100px";

                imageLink.appendChild(image);
                imgCell.appendChild(imageLink);

            row.appendChild(imgCell);


            console.log("Image URL:", media.url); // Log the image URL for debugging
            });

            var authorCell = document.createElement("td");
            authorCell.textContent = post.igUser.username; // Use the correct property for the author's username
            row.appendChild(authorCell);

            var titleCell = document.createElement("td");
            var titleText = post.caption; // Use the correct property for the post caption
            if (titleText.length > 100) {
                titleText = titleText.substring(0, 100) + "...";
            }
            titleCell.textContent = titleText;
            row.appendChild(titleCell);

            var likesCell = document.createElement("td");
            likesCell.textContent = post.likes;
            row.appendChild(likesCell);

            var tagsCell = document.createElement("td");
            post.tags.forEach(function (tag) {
                var tagValue = document.createElement("span");
                tagValue.textContent = tag;

                var tagRow = document.createElement("div");
                tagRow.appendChild(tagValue);

                tagsCell.appendChild(tagRow);
            });
            row.appendChild(tagsCell);

            var creatorIdCell = document.createElement("td");
            creatorIdCell.textContent = post.creatorId; // Use the correct property for the creator's ID
            row.appendChild(creatorIdCell);

            var userCommentCell = document.createElement("td");
            userCommentCell.textContent = post.userComment; // Use the correct property for the user comment
            row.appendChild(userCommentCell);


            tbody.appendChild(row);
        });

    }
});
