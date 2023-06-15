window.addEventListener("DOMContentLoaded", function () {
    var postTable = document.getElementById("postTable");

    fetch("http://localhost:8080/get-posts.php")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error: " + response.status);
            }
        })
        .then(function (data) {
            populateTable(data);
        })
        .catch(function (error) {
            console.error(error);
        });

    populateTable(
        [
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
                likes: 100,
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
                likes: 100,
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
        ]
    )

    function populateTable(posts) {
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