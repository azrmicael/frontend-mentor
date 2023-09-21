// 1.   Constants

// 1.1  Colors
const validColor = 'hsl(0, 1%, 44%)';
const invalidColor = 'hsl(0, 100%, 67%)';

// 1.2  Date
const currentYear = new Date().getFullYear();

// 1.3  Select the input fields and the form
const labelDay = document.querySelector('#label__day');
const inputDay = document.querySelector('#input__day');
const invalidDay = document.querySelector('#invalid__day');

const labelMonth = document.querySelector('#label__month');
const inputMonth = document.querySelector('#input__month');
const invalidMonth = document.querySelector('#invalid__month');

const labelYear = document.querySelector('#label__year');
const inputYear = document.querySelector('#input__year');
const invalidYear = document.querySelector('#invalid__year');

const form = document.querySelector('#age-calculator');


// 2.   Utilities

// 2.1  isRequired() function
const isRequired = value => value === '' ? false : true;
// returns true if the input argument is empty

// 2.2  isBetween() function
const isBetween = (length, min, max) => length < min || length > max ? false : true;
// returns false if the length argument is not between the min and max argument


// 3.   EventListener

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isInputDayValid = checkDay(),
        isInputMonthValid = checkMonth(),
        isInputYearValid = checkYear();

    let isFormValid = isInputDayValid && 
        isInputMonthValid && 
        isInputYearValid;

    // submit if the form is valid
    if (isFormValid) {};        
});


// 4.   Validations

// 4.1  Validate the day field
const checkDay = () => {
    let valid = false;
    const min = 1,
        max = 31;
    const day = inputDay.value.trim();

    if (!isRequired(day)) {
        labelDay.style.color = invalidColor;
        invalidDay.innerHTML = 'This field is required';
    } else if (!isBetween(day, min, max)) {
        labelDay.style.color = invalidColor;
        invalidDay.innerHTML = 'Must be a valid day';
    } else {
        labelDay.style.color = validColor;
        invalidDay.innerHTML = '';
        valid = true;
    }
    return valid;
};

// 4.2  Validate the month field
const checkMonth = () => {
    let valid = false;
    const min = 1,
        max = 12;
    const month = inputMonth.value.trim();
    
    if (!isRequired(month)) {
        labelMonth.style.color = invalidColor;
        invalidMonth.innerHTML = 'This field is required';
    } else if (!isBetween(month, min, max)) {
        labelMonth.style.color = invalidColor;
        invalidMonth.innerHTML = 'Must be a valid month';
    } else {
        labelMonth.style.color = validColor;
        invalidMonth.innerHTML = '';
        valid = true;
    }
    return valid;
};

// 4.3  Validate the year field

const checkYear = () => {
    let valid = false;
    const min = 0,
        max = currentYear;
    const year = inputYear.value.trim();
    
    if (!isRequired(year)) {
        labelYear.style.color = invalidColor;
        invalidYear.innerHTML = 'This field is required';
    } else if (!isBetween(year, min, max)) {
        labelYear.style.color = invalidColor;
        invalidYear.innerHTML = 'Must be in the past';
    } else {
        labelYear.style.color = validColor;
        invalidYear.innerHTML = '';
        valid = true;
    }
    return valid;
};