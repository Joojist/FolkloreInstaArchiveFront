/*document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("urlForm");
    var urlInput = document.getElementById("urlInput");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      var url = urlInput.value;
      chrome.runtime.sendMessage({ action: "openTab", url: url }, function(response) {
        alert(response.message);
      });
      urlInput.value = "tere 21AS ";
    });
  });*/

chrome.tabs.create({url: "index.html"});
window.close();
  