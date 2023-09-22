// 1.   Constants

// 1.1  Define the colors
const defaultColor = 'hsl(0, 1%, 44%)';
const validColor = 'hsl(0, 1%, 44%)';
const invalidColor = 'hsl(0, 100%, 67%)';

// 1.2  Get the current year
const currentYear = new Date().getFullYear();

// 1.3  Select the input fields 
const labelDay = document.querySelector('#label-day');
const inputDay = document.querySelector('#input-day');
const validationDay = document.querySelector('#validation-day');

const labelMonth = document.querySelector('#label-month');
const inputMonth = document.querySelector('#input-month');
const validationMonth = document.querySelector('#validation-month');

const labelYear = document.querySelector('#label-year');
const inputYear = document.querySelector('#input-year');
const validationYear = document.querySelector('#validation-year');

// 1.4 Select the form
const form = document.querySelector('#age-calculator');

// 1.5  Select the result fields
const years = document.querySelector('#result-years');
const months = document.querySelector('#result-months');
const days = document.querySelector('#result-days');


// 2.   Utilities

// 2.1  isRequired() function
const isRequired = value => value === '' ? false : true;
// returns true if the input argument is empty

// 2.2  isBetween() function
const isBetween = (length, min, max) => length < min || length > max ? false : true;
// returns false if the length argument is not between the min and max argument


// 3.   EventListener

// 3.1  Listen to the submit event
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
    if (isFormValid) {
        calcAge();
    };        
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
        validationDay.innerHTML = 'This field is required';
    } else if (!isBetween(day, min, max)) {
        labelDay.style.color = invalidColor;
        validationDay.innerHTML = 'Must be a valid day';
    } else {
        labelDay.style.color = validColor;
        validationDay.innerHTML = '';
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
        validationMonth.innerHTML = 'This field is required';
    } else if (!isBetween(month, min, max)) {
        labelMonth.style.color = invalidColor;
        validationMonth.innerHTML = 'Must be a valid month';
    } else {
        labelMonth.style.color = validColor;
        validationMonth.innerHTML = '';
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
        validationYear.innerHTML = 'This field is required';
    } else if (!isBetween(year, min, max)) {
        labelYear.style.color = invalidColor;
        validationYear.innerHTML = 'Must be in the past';
    } else {
        labelYear.style.color = validColor;
        validationYear.innerHTML = '';
        valid = true;
    }
    return valid;
};


// 5.   Calculate the age

const calcAge = () => {
    // one day in ms
    const oneDay = 1000 * 60 * 60 * 24;

    // input date
    const year = inputYear.value.trim();
    const month = inputMonth.value.trim();
    const day = inputDay.value.trim();
    let inputDate = new Date(year, month - 1, day);

    // current date
    let currentDate = new Date();

    // calculate the difference in ms
    let diff = Math.round(currentDate.getTime() - inputDate.getTime());

    if (diff < 0) {
        labelDay.style.color = invalidColor;
        validationDay.innerHTML = 'Must be in the past';
        years.innerHTML = '--';
        months.innerHTML = '--';
        days.innerHTML = '--';
    } else {
        // total number of days
        let numDays = Math.floor(diff / oneDay);

        // number of years
        let resultYears = Math.floor(numDays / 365);
        numDays -= resultYears * 365;

        // number of months
        let resultMonths = Math.floor(numDays / 31);
        numDays -= resultMonths * 31;

        // number of days
        let resultDays = Math.floor(numDays);

        // print result
        years.innerHTML = resultYears;
        months.innerHTML = resultMonths;
        days.innerHTML = resultDays;
    }  
};