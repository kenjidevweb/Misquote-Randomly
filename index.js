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

/* toggling dark mode */

darkModeBtn.addEventListener("click", () => {
  toggleIndicator.classList.toggle("on");
  document.body.classList.toggle("dark");
  if (!darkMode) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.removeItem("darkMode");
  }
});

const newQuote = async () => {
  const quoteAuthor = document.querySelector(".quote-author");
  const quote = document.querySelector(".quote");
  const cardImg = document.querySelector(".card");

  /*   
  documentation link for quick access (ctrl + click the link)
  https://goquotes.docs.apiary.io/# 
  */

  const resQuote = await fetch(
    "https://goquotes-api.herokuapp.com/api/v1/random?count=2"
  );
  const dataQuote = await resQuote.json();
  quote.textContent = `${dataQuote.quotes[0].text}`;
  quoteAuthor.textContent = `- ${dataQuote.quotes[1].author}`;

  /*
  documentation link for quick access (ctrl + click the link)
  https://unsplash.com/documentation#search-photos 
  */

  const resImg = await fetch(
    `https://api.unsplash.com/search/photos?query=${quoteAuthor.textContent}&per_page=1&orientation=portrait&client_id=kop-Le_jMIaVSWUr02BVHqUXsXC1NADHYKc2X8m_Owg`
  );
  const dataImg = await resImg.json();
  cardImg.style.backgroundImage = `url(${dataImg.results[0].urls.small})`;
};

/* Animation on the new button */

const newBtn = document.querySelector(".new");

newBtn.addEventListener("click", () => {
  const newBtnIcon = document.querySelector(".icon--new");
  newBtnIcon.classList.add("new__clicked");

  /* 
    setting the animation name to none will stop the animation.
    setting the animation name to empty quotes will make it fallback 
    to the name we set on the css file. (making the animation start again)

    using requestAnimationFrame and settingTimeout to 0 
    fixes a problem with firefox.
  */

  newBtnIcon.style.animationName = "none";
  requestAnimationFrame(() => {
    setTimeout(() => {
      newBtnIcon.style.animationName = "";
    }, 0);
  });
  newQuote();
});
