window.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(['data'], function (result) {
        var data = result.data;
        console.log('Retrieved data:', data);
        
        document.getElementById("previewImage").src = data.imgUrl;
      });
});