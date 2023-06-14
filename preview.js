// const urlParams = new URLSearchParams(window.location.search);
// const imageUrl = urlParams.get('url');

// const previewImage = document.getElementById('previewImage');
// previewImage.src = imageUrl;


window.addEventListener("DOMContentLoaded", function () {
  // JavaScript code for the Save button functionality
  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', () => {
    // Get the input value from the URL input field
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value;

    // Save the URL or perform any desired actions here

    // Redirect to the archive preview page with the URL as a parameter
    window.location.href = `preview.html?url=${encodeURIComponent(url)}`;
  });
});