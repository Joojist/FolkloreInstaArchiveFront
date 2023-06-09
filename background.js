chrome.action.onClicked.addListener(tab => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.create({ url: "popup.html" });
  });
})