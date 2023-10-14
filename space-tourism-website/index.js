// ================================================================= //
// --- Determines the behavior of the navbar when clicked ---------- //
// ================================================================= //

// Constants
const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

// When someone clicks the hamburger button
navToggle.addEventListener("click", () => {
    const visibility = nav.getAttribute("data-visible");

    if (visibility === "false") {
        // if the nav is closed, open it
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else {
        // if the nav is open, close it
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});


// ================================================================= //
// --- Change destination page content using JSON file ------------- //
// ================================================================= //

// Constants
const tabList = document.querySelector(".tab-list");
const destinationName = document.querySelector("#destination-name");
const destinationImageWebp = document.querySelector("#destination-picture-source");
const destinationImagePng = document.querySelector("#destination-picture-img");
const destinationDescription = document.querySelector("#destination-description");
const destinationDistance = document.querySelector("#destination-distance");
const destinationTravel = document.querySelector("#destination-travel");

// Change the aria-selected
const changeSelected = (btn) => {
    const parentEl = btn.parentNode;
    const allBtn = parentEl.getElementsByTagName("button");

    for (let i = 0; i < allBtn.length; i++) {
        allBtn[i].setAttribute("aria-selected", false);
    }

    btn.setAttribute("aria-selected", true);
};


// When someone clicks on the buttons for the listed destinations
tabList.addEventListener("click", (event) => {

    // selects the pressed button based on its id
    const btnId = event.target.id;
    const btn = document.querySelector(`#${btnId}`);

    // change the aria-selected
    changeSelected(btn);

    // set the initial value of d
    let d = 0;

    // change the value of d for each id
    if      (btnId === "btn-moon")   { d = 0; }
    else if (btnId === "btn-mars")   { d = 1; }
    else if (btnId === "btn-europa") { d = 2; }
    else if (btnId === "btn-titan")  { d = 3; }

    // read JSON file into html with JS fetch API
    fetch("./data.json")
    .then(response => response.json())
    .then(data => {

        // update the name
        destinationName.innerHTML = data.destinations[d].name;

        // update the image srcset, src and alt
        destinationImageWebp.setAttribute("srcset", data.destinations[d].images.webp);
        destinationImagePng.setAttribute("src", data.destinations[d].images.png);
        destinationImagePng.setAttribute("alt", data.destinations[d].name);

        // update the description
        destinationDescription.innerHTML = data.destinations[d].description;

        // update the avg. distance
        destinationDistance.innerHTML = data.destinations[d].distance;

        // update the est. travel time
        destinationTravel.innerHTML = data.destinations[d].travel;
    });
});