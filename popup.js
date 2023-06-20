function getHtml() {
  return document.documentElement.innerHTML;
}

function parseDoc(html) {
  const parser = new DOMParser();
  return parser.parseFromString(html[0].result, "text/html");
}

function getImage(doc) {
  return doc.querySelector("div._aagv img").src;
}

function getTitle(doc) {
  const title = doc.querySelector("h1");

  if (title) {
    return title.innerHTML;
  }

  return null;
}

function getAuthor(doc) {
  return doc.querySelector("div._aaqt a.x1i10hfl").innerHTML;

}
function getAuthorAccountUrl(doc) {
  return doc.querySelector("div._aaqt a.x1i10hfl").href;
}

function getLikesAmount(doc) {
  let likesContainer = doc.querySelector("section._ae5m div div span a span span");

  if (likesContainer) {
    return parseInt(likesContainer.innerHTML.replaceAll(",", ""))
  }

  likesContainer = doc.querySelector("section.x12nagc div div span a span span");

  if (likesContainer) {
    return parseInt(likesContainer.innerHTML.replaceAll(",", ""))
  }

  return null;
}

function getComments(doc) {
  /*
    const allComments = doc.querySelectorAll("div.xt0psk2 span");
    allComments.forEach(comment => {
      console.log(comment.innerHTML);
    });
    return doc.querySelector("div.xt0psk2 span").innerHTML;
  */
  let comments;

  const allComments = doc.querySelectorAll("div._a9ym span");
  allComments.forEach(comment => {
    console.log(comment.innerHTML);
  });
  return doc.querySelector("div._a9zs span").innerHTML;
}

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
        const doc = parseDoc(html);
      
        chrome.runtime.sendMessage({ action: "create-preview", data: { 
          imgUrl: getImage(doc),
          title: getTitle(doc),
          author: getAuthor(doc),
          authorAccountUrl: getAuthorAccountUrl(doc),
          likes: getLikesAmount(doc),
          comments: getComments(doc)
        } });
      });
    });
  });
});
