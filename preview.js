window.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(['data'], function (result) {
        var data = result.data;
        
        document.getElementById("previewImage").src = data.imgUrl;
        document.getElementById("titleSpan").innerHTML = 'Pealkiri: '+ data.title;
        document.getElementById("authorSpan").innerHTML = 'Autor: '+ data.author;
        document.getElementById("likesSpan").innerHTML = 'Meeldimised: '+ data.likes;
      });

    document.getElementById("saveButton").addEventListener("click", function() {
      window.location.href = "index.html";
    });
});