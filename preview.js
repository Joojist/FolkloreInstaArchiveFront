window.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', () => {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value;
    console.log(url);


    // VARIANT 1
    //************************************** */
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Accept', 'application/json');
  //   //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
  //   headers.append('Origin','http://localhost:8080');

  //   fetch(url, {
  //     //mode: 'cors',
  //     //credentials: 'include',
  //     method: 'GET',
  //     headers: headers
  // })
  //     .then(response => response.text())
  //     .then(html => {
  //       const parser = new DOMParser();
  //       const doc = parser.parseFromString(html, 'text/html');
  //       const targetDiv = doc.getElementsByClassName('x1i10hfl')[0];
  //       // Manipulate or access the targetDiv as needed
  //       console.log(targetDiv);
  //       console.log(targetDiv.innerHTML);
  //   })
  //   .catch(error => {
  //     console.log('Error:', error);
  //   });
    //************************************** */


    // VARIANT 2
    //************************************** */
    const requestData = {
      url: url, // Specify the URL you want to fetch
    };
    
    fetch('http://localhost:8080/src/controller/FetchController2.php', {
      method: 'POST',
      body: JSON.stringify(requestData),
    })
      .then(response => response.text())
      .then(html => {
        // Manipulate or access the fetched HTML content as needed
        console.log(html);
      })
      .catch(error => {
        console.log('Error:', error);
      });
    //************************************** */


    // VARIANT 3
    //************************************** */
    // chrome.runtime.sendMessage({ action: "fetchHTML", url: "https://example.com" }, function(response) {
    //   console.log(response);
    //   if (response.html) {
    //     console.log(response.html);
    //   } else {
    //     console.error(response.error);
    //   }
    // });
    //************************************** */


    // Save the URL or perform any desired actions here

    // window.location.href = `preview.html?url=${encodeURIComponent(url)}`;
  });
});