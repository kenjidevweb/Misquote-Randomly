let darkMode = localStorage.getItem("darkMode");
const darkModeBtn = document.querySelector(".dark-toggle");
const toggleIndicator = document.querySelector(".toggle__indicator");

if (darkMode) {
  toggleIndicator.classList.add("on");
  document.body.classList.add("dark");
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
