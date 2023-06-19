window.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(['data'], function (result) {
        var data = result.data;
        console.log('Retrieved data:', data);
        
        document.getElementById("previewImage").src = data.imgUrl;
        document.getElementById("titleSpan").innerHTML = data.title;
        document.getElementById("authorSpan").innerHTML = data.author;
        // document.getElementById("authorSpan").href = "https://www.instagram.com" + data.authorAccountUrl;
        document.getElementById("likesSpan").innerHTML = data.likes;
      });
});