function getTitle() { return document.documentElement.innerHTML; }

chrome.tabs.query({ active: true, currentWindow: true, status: "complete" }, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: getTitle,
    })
    .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html[0].result, "text/html");
        
        const imgUrlsString = doc.querySelector("div._aagv img").srcset;
        const imgUrlsArray = imgUrlsString.split(",");
        const lastImgUrl = imgUrlsArray[imgUrlsArray.length - 1].trim();
        const imgUrl = lastImgUrl.substring(0, lastImgUrl.length - 6);

        //chrome.tabs.create({url: imgUrl});
    });
});

window.addEventListener("DOMContentLoaded", () => {
  const viewArchiveButton = document.getElementById("viewArchiveButton");
  viewArchiveButton.addEventListener("click", function() {
      chrome.tabs.create({url: 'index.html'});
    });

  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", function() {
    chrome.tabs.create({url: 'preview.html'});
  });
});
