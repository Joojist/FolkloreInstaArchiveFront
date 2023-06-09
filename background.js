chrome.Action.onClicked.addListener(() => {
    chrome.tabs.create({ url: "popup.html" });
  });