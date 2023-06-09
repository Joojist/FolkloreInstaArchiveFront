chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: openNewTab
  });
});

function openNewTab() {
  chrome.tabs.create({ url: "popup.html" });
}