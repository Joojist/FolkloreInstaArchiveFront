// window.addEventListener("DOMContentLoaded", function () {
//     const postsPerPage = 1; // Number of posts to display per page
//     const postTable = document.getElementById("postTable");
//     const postPagesContainer = document.getElementById("postPages");
  
//     function createPagination(totalPages, data) {
//       const paginationContainer = document.createElement("div");
//       paginationContainer.className = "pagination";
  
//       for (let i = 1; i <= totalPages; i++) {
//         const pageNumber = document.createElement("span");
//         pageNumber.textContent = i;
//         pageNumber.addEventListener("click", function () {
//           showPosts(i, data);
//         });
//         paginationContainer.appendChild(pageNumber);
//       }
  
//       postPagesContainer.appendChild(paginationContainer);
//     }
  
//     function showPosts(pageNumber, data) {
//       const start = (pageNumber - 1) * postsPerPage;
//       const end = start + postsPerPage;
//       const posts = data.slice(start, end);
  
//       populateTable(posts);
//     }
//   });