window.addEventListener("DOMContentLoaded", function () {
    const postsPerPage = 1; // Number of posts to display per page
    const postTable = document.getElementById("postTable");
    const postPagesContainer = document.getElementById("postPages");
    const posts = [
        {
            img: "img/2227.jpg",
            author: "folkoor",
            title: "title",
            comments: [
                {
                    author: "steven",
                    text: "lahe pilt"
                }
            ],
            likes: 100,
            tags: [
                {value: "pill"},
                {value: "muru"},
                {value: "kala"},
                {value: "roheline"},
                {value: "pill"},
                {value: "muru"},
                {value: "kala"},
                {value: "roheline"},
                {value: "pill"},
                {value: "muru"},
                {value: "kala"},
            ],
            archiver: "Mari",
            archiver_comment: "tahtsin lahedat pilti salvestada"
        },
        {
            img: "img/12xp-instagram-videoSixteenByNineJumbo1600-v2.jpg",
            author: "folkoor",
            title: "Väga ilus pilt ja suht pikk pealkiri. Väga ilus pilt ja suht pikk pealkiri. Väga ilus pilt ja suht pikk pealkiri.",
            comments: [
                {
                    author: "steven",
                    text: "lahe pilt"
                }
            ],
            likes: 459,
            tags: [
                {value: "pill"},
                {value: "muru"},
                {value: "kala"},
                {value: "roheline"},
            ],
            archiver: "Mari",
            archiver_comment: "tahtsin lahedat pilti salvestada"
        },
        {
            img: "img/instagram-10669-6.jpg",
            author: "folkoor",
            title: "title",
            comments: [
                {
                    author: "steven",
                    text: "lahe pilt"
                }
            ],
            likes: 1000,
            tags: [
                {value: "pill"},
                {value: "muru"},
                {value: "kala"},
                {value: "roheline"},
            ],
            archiver: "Mari",
            archiver_comment: "tahtsin lahedat pilti salvestada"
        },
        {
            img: "img/349523157_640074810913730_1279023568475007152_n.jpg",
            author: "folkoor",
            title: "title",
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
            likes: 100,
            tags: [
                {value: "pill"},
                {value: "muru"},
                {value: "kala"},
                {value: "roheline"},
            ],
            archiver: "Mari",
            archiver_comment: "tahtsin lahedat pilti salvestada"
        }
    ];

    const totalPages = posts.length / postsPerPage;
    console.log(totalPages);
    showPosts(1, posts);
    createPagination(totalPages, posts);
  
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

    // fetch("http://localhost:8080/get-posts.php")
    //     .then(function (response) {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             throw new Error("Error: " + response.status);
    //         }
    //     })
    //     .then(function (data) {
    //         populateTable(data);
    //     })
    //     .catch(function (error) {
    //         console.error(error);
    //     });

    function populateTable(posts) {
        console.log(postTable);
        var tbody = postTable.querySelector("tbody");
        tbody.innerHTML = "";

        posts.forEach(function (post) {
            var row = document.createElement("tr");

            var imgCell = document.createElement("td");
            var image = document.createElement("img");
            image.src = post.img;
            imgCell.appendChild(image);
            image.style.maxWidth = "100px";
            row.appendChild(imgCell);

            var authorCell = document.createElement("td");
            authorCell.textContent = post.author;
            row.appendChild(authorCell);

            var titleCell = document.createElement("td");
            var titleText = post.title;
            if (titleText.length > 100) {
                titleText = titleText.substring(0, 100) + "...";
            }
            titleCell.textContent = titleText;

            row.appendChild(titleCell);

        //    var commentsCell = document.createElement("td");
        //    post.comments.forEach(function (comment) {
        //        var commentText = document.createElement("p");
        //        commentText.textContent = `${comment.author}: ${comment.text}`;
        //        commentsCell.appendChild(commentText);
        //     });
        //    row.appendChild(commentsCell);

            var likesCell = document.createElement("td");
            likesCell.textContent = post.likes;
            row.appendChild(likesCell);

            var tagsCell = document.createElement("td");
            post.tags.forEach(function (tag) {
                var tagValue = document.createElement("span");
                tagValue.textContent = tag.value;
    
                var tagRow = document.createElement("div");
                tagRow.appendChild(tagValue);
    
                tagsCell.appendChild(tagRow);
            });
            row.appendChild(tagsCell);

            var archiverCell = document.createElement("td");
            archiverCell.textContent = post.archiver;
            row.appendChild(archiverCell);

            var archiver_commentCell = document.createElement("td");
            archiver_commentCell.textContent = post.archiver_comment;
            row.appendChild(archiver_commentCell);

            tbody.appendChild(row);
        });
    }
});