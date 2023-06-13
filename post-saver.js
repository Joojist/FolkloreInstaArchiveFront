document.getElementById("saveButton").addEventListener("click", submitForm);

function submitForm() {
    console.log('submit started');
    var form = document.getElementById("urlForm");

    // Perform any necessary form validation or processing here

    form.submit();
}
