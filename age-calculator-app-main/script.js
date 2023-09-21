let labelDay = document.querySelector("#label__day");
let inputDay = document.querySelector("#input__day");
let invalidDay = document.querySelector("#invalid__day");

let labelMonth = document.querySelector("#label__month");
let inputMonth = document.querySelector("#input__month");
let invalidMonth = document.querySelector("#invalid__month");

let labelYear = document.querySelector("#label__year");
let inputYear = document.querySelector("#input__year");
let invalidYear = document.querySelector("#invalid__year");


function validateForm() {
    labelDay.style.color = "hsl(0, 100%, 67%)";
    invalidDay.innerHTML = "This field is required"
    // if (inputDay = "") {
    // }
};