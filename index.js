let darkMode = localStorage.getItem("darkMode");
const darkModeBtn = document.querySelector(".dark-toggle");
const toggleIndicator = document.querySelector(".toggle__indicator");

/* If the user has previously used the website and toggled darkMode on the site will show the dark theme, otherwise
   it will check whether the user prefers light or dark themes and style itself accordingly.
*/

if (darkMode) {
  toggleIndicator.classList.add("on");
  document.body.classList.add("dark");
} else {
  /*Check if preference-color-scheme is supported by the client's browser */
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      toggleIndicator.classList.add("on");
      document.body.classList.add("dark");
    } else {
      toggleIndicator.classList.remove("on");
      document.body.classList.remove("dark");
    }
  } else {
    /* if not supported */
    console.log("You should change browsers");
  }
}

darkModeBtn.addEventListener("click", () => {
  toggleIndicator.classList.toggle("on");
  document.body.classList.toggle("dark");
  if (!darkMode) {
    localStorage.setItem("darkMode", "enabled");
  } else if (darkMode) {
    localStorage.removeItem("darkMode");
  }
});
