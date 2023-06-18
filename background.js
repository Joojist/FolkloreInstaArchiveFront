chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'create-preview') {
        chrome.storage.local.set({ data: message.data });
        chrome.tabs.create({ url: 'preview.html' });
    }
  });