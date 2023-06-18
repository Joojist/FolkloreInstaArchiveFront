function getHtml() { return document.documentElement.innerHTML; }

window.addEventListener("DOMContentLoaded", () => {

  const viewArchiveButton = document.getElementById("viewArchiveButton");
  viewArchiveButton.addEventListener("click", function() {
    chrome.tabs.create({url: 'index.html'});
  });

  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", async () => {
    chrome.tabs.query({ active: true, currentWindow: true, status: "complete" }, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: getHtml,
      })
      .then(async (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html[0].result, "text/html");
        
        //const imgUrlsString = doc.querySelector("div._aagv img").srcset;
        //const imgUrlsArray = imgUrlsString.split(",");
        //const lastImgUrl = imgUrlsArray[imgUrlsArray.length - 1].trim();
        //const imgUrl = lastImgUrl.substring(0, lastImgUrl.length - 6);

        const imgUrl = doc.querySelector("div._aagv img").src;
      
        chrome.runtime.sendMessage({ action: "create-preview", data: { imgUrl: imgUrl } });
      });
    });
  });
});
