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

    function populateTable(posts) {
        var tbody = postTable.querySelector("tbody");
        tbody.innerHTML = "";

        posts.forEach(function (post) {
            var row = document.createElement("tr");

            var idCell = document.createElement("td");
            idCell.textContent = post.id;
            row.appendChild(idCell);

            var titleCell = document.createElement("td");
            titleCell.textContent = post.title;
            row.appendChild(titleCell);

            var contentCell = document.createElement("td");
            contentCell.textContent = post.content;
            row.appendChild(contentCell);

            tbody.appendChild(row);
        });
    }
});