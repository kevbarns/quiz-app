document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

/* Open the sidenav signup */
function openNavSign() {
  document.getElementById("mySidenavSign").style.width = "50%";
}

/* Close/hide the sidenav signup */
function closeNavSign() {
  document.getElementById("mySidenavSign").style.width = "0";
}

/* Open the sidenav login*/
function openNavLog() {
  document.getElementById("mySidenavLog").style.width = "50%";
}

/* Close/hide the sidenav login */
function closeNavLog() {
  document.getElementById("mySidenavLog").style.width = "0";
}
