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
  let comments = [];
  let commentAuthor = "";
  let comment = "";

  const allComments = doc.querySelectorAll("ul._a9ym");

  if (allComments) {
    allComments.forEach(commentBlock => {
      let replyAuthor = "";
      let replyText = "";
      let replies = [];

      authorBlock = commentBlock.querySelector("div.xt0psk2 span a");

      if (authorBlock) {
        commentAuthor = authorBlock.innerHTML;
      } else {
        commentAuthor = commentBlock.querySelector("div.xt0psk2 div.xt0psk2 a").innerHTML;
      }
      
      const commentTextBlock = commentBlock.querySelector("div._a9zs span");

      if (commentTextBlock) {
        comment = commentTextBlock.innerHTML;
      }

      // const allReplies = commentBlock.querySelectorAll("li ul._a9yo");
      // replies.push(commentBlock.querySelector("li ul._a9yo"));

      // if (allReplies) {
      //   allReplies.forEach(replyBlock => {
      //     replyAuthor = replyBlock.querySelector("div.xt0psk2 span a");//.innerHTML;
      //     replyText = replyBlock.querySelector("div._a9zs span");//.innerHTML;
  
      //     replies.push({
      //       replyBlock: replyBlock,
      //       author: replyAuthor,
      //       comment: replyText
      //     })
      //   });
      // }

      // replies.push(
      //   {
      //     author: 'Steven',
      //     comment: 'Test reply'
      //   },
      //   {
      //     author: 'Steven 2',
      //     comment: 'Test reply 2'
      //   }  
      // );

      comments.push({
        author: commentAuthor,
        comment: comment,
        children: replies
      })
    });
  }
  
  return comments;
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
