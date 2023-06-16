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
        
        const imgUrlsString = doc.querySelector("div._aagv img").srcset;
        const imgUrlsArray = imgUrlsString.split(",");
        const lastImgUrl = imgUrlsArray[imgUrlsArray.length - 1].trim();
        const imgUrl = lastImgUrl.substring(0, lastImgUrl.length - 6);

        // chrome.tabs.create({ url: imgUrl }, async (tab) => {
        //   const response = await chrome.tabs.sendMessage(tab.id, "test");
        //   console.log(response);
        // });

        // chrome.tabs.create({ url: "preview.html" }, function(tab) {
        //   chrome.scripting.executeScript(tab.id, { code: 'var imageUrl = "' + imgUrl + '";' }, function() {
        //     chrome.scripting.executeScript(tab.id, { file: 'preview.js' });
        //   });
        // });
      
  
        chrome.tabs.create({url: imgUrl});
        //await chrome.runtime.sendMessage({message: "create-preview", imgUrl: imgUrl});
      });
    });

    chrome.tabs.create({url: 'preview.html'});
  });
});
