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
    console.log("you should download google chrome");
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

const animateButton = () => {
  const newBtnIcon = document.querySelector(".icon--new");

  newBtnIcon.classList.add("new__clicked");
  newBtnIcon.style.animationName = "none"; // setting the animation name to none will stop the animation.
  requestAnimationFrame(() => {
    // using requestAnimationFrame and settingTimeout to 0 fixes a problem with firefox.
    setTimeout(() => {
      newBtnIcon.style.animationName = ""; // setting the animation name to empty quotes will make it
    }, 0); // fallback to the name we set on the css file. (making the animation start again)
  });
};

const newQuote = async () => {
  const quoteAuthor = document.querySelector(".quote-author");
  const quote = document.querySelector(".quote");
  const cardImg = document.querySelector(".card");
  // try to use goquotes api, if it fails use type fit api instead, this is a fallback in case one of them dies
  try {
    const resQuote = await fetch(
      "https://goquotes-api.herokuapp.com/api/v1/random?count=2"
    );
    const dataQuote = await resQuote.json();
    quote.textContent = `${dataQuote.quotes[0].text}`;
    quoteAuthor.textContent = `- ${dataQuote.quotes[1].author}`;
  } catch (e) {
    const resQuoteBackup = await fetch(`https://type.fit/api/quotes`);
    const dataQuoteBackup = await resQuoteBackup.json();
    console.log("error with goquotes api");
    quote.textContent = `${
      dataQuoteBackup[Math.floor(Math.random() * 333)].text // generate a number from 0 to 333 and use it as the index of the json we're getting data from
    }`;
    quoteAuthor.textContent = `- ${
      dataQuoteBackup[Math.floor(Math.random() * 333)].author
    }`;
  }
  try {
    const resImg = await fetch(
      `https://api.unsplash.com/search/photos?query=${quoteAuthor.textContent}&per_page=1&orientation=portrait&client_id=` // your api key here
    );
    const dataImg = await resImg.json();
    cardImg.style.backgroundImage = `url(${dataImg.results[0].urls.small})`;
  } catch (e) {
    console.log(
      "if you'd like to get slightly more relevant images please get an api key at https://unsplash.com/developers and then paste it after client_id="
    );
    cardImg.style.backgroundImage = `url(https://source.unsplash.com/random/300x200?sig=${Math.random()}`;
  }
};

// Animation on the new button

const newBtn = document.querySelector(".new");
newBtn.addEventListener("click", () => {
  animateButton();
  newQuote();
});

// Function for downloading the quote

const downloadQuote = () => {
  const quoteImg = document.querySelector(".card");
  /* "useCORS: true" enables saved online images to show up on the downloaded quote */
  html2canvas(quoteImg, { useCORS: true }).then((canvas) => {
    const base64img = canvas.toDataURL("quote/png");
    var anchor = document.createElement("a");
    anchor.setAttribute("href", base64img);
    anchor.setAttribute("download", "quote.png");
    anchor.click();
    anchor.remove();
  });
};

const downloadBtn = document.querySelector(".download");

downloadBtn.addEventListener("click", () => {
  downloadQuote();
});

// function for toggling the font

const toggleFont = () => {
  const quoteFont = document.querySelector(".card");
  const fontDisplay = document.querySelector(".font-icon");
  quoteFont.classList.toggle("changeFont");
  fontDisplay.classList.toggle("changeFont");
};

const fontToggleBtn = document.querySelector(".font");

fontToggleBtn.addEventListener("click", () => {
  toggleFont();
});

// shortcuts

document.addEventListener("keydown", (event) => {
  const shortcuts = {
    n: () => {
      animateButton();
      newQuote();
    },
    s: () => {
      downloadQuote();
    },
    f: () => {
      toggleFont();
    },
  };
  const keyPressed = event.key.toLowerCase(); // Converting to lowercase so the shortcuts will work even if the user has capitalization activated (caps or holding shift)
  if (shortcuts[keyPressed] != undefined) {
    // if the key pressed matches an object key execute its value function
    shortcuts[keyPressed]();
  }
});
