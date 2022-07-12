/* This fixes the error with the slider moving every time the page is reloaded in dark mode */

document.addEventListener("DOMContentLoaded", () => {
  let delayTransitions = document.getElementById("delay-transition");
  delayTransitions.removeAttribute("id", "delay-transition");
});

/* If the user has previously used the website and toggled darkMode on the site will show the dark theme, otherwise
   it will check whether the user prefers light or dark themes and style itself accordingly.
*/

let darkMode = localStorage.getItem("darkMode");
const darkModeBtn = document.querySelector(".dark-toggle");
const toggleIndicator = document.querySelector(".toggle__indicator");

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
  } else {
    localStorage.removeItem("darkMode");
  }
});

/*
  Get image for card background
  documentation link for quick access (ctrl + click)
  https://unsplash.com/documentation#search-photos 
*/

fetch(
  "https://api.unsplash.com/search/photos?query=banana&per_page=1&orientation=portrait&client_id=kop-Le_jMIaVSWUr02BVHqUXsXC1NADHYKc2X8m_Owg"
)
  .then((res) => {
    return res.json();
  })
  .then((imgData) => {
    const cardImg = document.querySelector(".card");
    cardImg.style.backgroundImage = `url(${imgData.results[0].urls.small})`;
  })
  .catch((e) => {
    console.log(e);
  });

/*
  Gets quote and quote author
  Using RapidAPI
*/
