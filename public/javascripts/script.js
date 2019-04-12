document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

/* Open the sidenav signup */
function openNavSign() {
  document.getElementById("mySidenavSign").style.width = "60%";
}

/* Close/hide the sidenav signup */
function closePanel() {
  document.getElementById("mySidenavSign").style.width = "0";
  document.getElementById("mySidenavLog").style.width = "0";
}

/* Open the sidenav login*/
function openNavLog() {
  document.getElementById("mySidenavLog").style.width = "50%";
}


function myFunction() {
  /* Get the text field */
  var copyText = document.getElementById("quizLink");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
} 
