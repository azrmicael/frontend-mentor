// 1.   Constants

// 1.1  Define the colors
const labelDefaultColor = 'hsl(0, 1%, 44%)';
const borderDefaultColor = 'hsl(0, 0%, 86%)'
const greenValidColor = 'hsl(147, 100%, 35%)';
const redInvalidColor = 'hsl(0, 100%, 67%)';

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

// 1.4  Select the form
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

// 2.3  Determine whether it is a leap year
const isLeapYear = (year) => {
    let leapYear = false;

    if ((year % 4 === 0 && year % 100 !== 0) || 
        (year % 100 === 0 && year % 400 === 0)) {
        leapYear = true;
    }

    // returns true if it is a leap year and false otherwise
    return leapYear;
};

// 2.4  Determines the number of days per month for the year
const calcDaysPerMonth = (year) => {
    let daysPerMonth = [];

    // selects the appropriate array for the current year
    if (isLeapYear(year)) {
        // leap year:   JA, FE, MR, AP, MY, JN, JL, AU, SE, OC, NV, DE
        daysPerMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
        // conve. year: JA, FE, MR, AP, MY, JN, JL, AU, SE, OC, NV, DE
        daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    };

    // returns an array with the number of days in each month
    return daysPerMonth;
};

// 2.5  Invalid input error
const invalidInputError = (field, message) => {
    if (field == 'day') {
        labelDay.style.color = redInvalidColor;
        inputDay.style.borderColor = redInvalidColor;
        validationDay.style.color = redInvalidColor;
        validationDay.innerHTML = message;
    } else if (field == 'month') {
        labelMonth.style.color = redInvalidColor;
        inputMonth.style.borderColor = redInvalidColor;
        validationMonth.style.color = redInvalidColor;
        validationMonth.innerHTML = message;
    } else if (field == 'year') {
        labelYear.style.color = redInvalidColor;
        inputYear.style.borderColor = redInvalidColor;
        validationYear.style.color = redInvalidColor;
        validationYear.innerHTML = message;
    }

    years.innerHTML = '--';
    months.innerHTML = '--';
    days.innerHTML = '--';

    return;
};

// 2.6 Valid input 
const validInput = (field, message) => {
    if (field == 'day') {
        labelDay.style.color = labelDefaultColor;
        inputDay.style.borderColor = borderDefaultColor;
        validationDay.style.color = labelDefaultColor;
        validationDay.innerHTML = message;
    } else if (field == 'month') {
        labelMonth.style.color = labelDefaultColor;
        inputMonth.style.borderColor = borderDefaultColor;
        validationMonth.style.color = labelDefaultColor;
        validationMonth.innerHTML = message;
    } else if (field == 'year') {
        labelYear.style.color = labelDefaultColor;
        inputYear.style.borderColor = borderDefaultColor;
        validationYear.style.color = labelDefaultColor;
        validationYear.innerHTML = message;
    }

    return;
};



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
    if (isFormValid) {
        calcAge();
    };        
});


// 4.   Validations

// 4.1  Validate the day field
const checkDay = () => {
    let valid = false;

    const year = inputYear.value.trim();
    const month = inputMonth.value.trim();
    const day = inputDay.value.trim();

    const min = 1;
    const max = calcDaysPerMonth(year)[month - 1];

    if (!isRequired(day)) {
        invalidInputError('day', 'This field is required');
    } else if (!isBetween(day, min, max)) {
        invalidInputError('day', 'Must be a valid day');
    } else {
        labelDay.style.color = labelDefaultColor;
        validInput('day', '');
        valid = true;
    }
    return valid;
};

// 4.2  Validate the month field
const checkMonth = () => {
    let valid = false;
    
    const month = inputMonth.value.trim();
    const min = 1, max = 12;
    
    if (!isRequired(month)) {
        invalidInputError('month', 'This field is required');
    } else if (!isBetween(month, min, max)) {
        invalidInputError('month', 'Must be a valid month');
    } else {
        validInput('month', '');
        valid = true;
    }
    return valid;
};

// 4.3  Validate the year field
const checkYear = () => {
    let valid = false;

    const year = inputYear.value.trim();
    const min = 0, max = currentYear;
    
    if (!isRequired(year)) {
        invalidInputError('year', 'This field is required');
    } else if (!isBetween(year, min, max)) {
        invalidInputError('year', 'Must be in the past');
    } else {
        validInput('year', '');
        valid = true;
    }
    return valid;
};


// 5.   Calculates the number of leap years

const numLeapYears = () => {
    const startYear = inputYear.value.trim();
    let yearRange = [];

    // create an array with the years in the range
    for (let i = startYear; i <= currentYear; i++) {
        yearRange.push(i);
    };

    let newArray = [];

    // check if the year is a leap year
    yearRange.forEach((year) => {
        if (isLeapYear(year)) {
            newArray.push(year);
        };
    });

    // returns the number of leap years
    return newArray.length;
}


// 6.   Calculates the number of months and days remaining

const numMonthsAndDays = (numDays) => {
    let MonthsAndDays = [];

    // selects the appropriate array for the current year
    let daysPerMonth = calcDaysPerMonth(currentYear);
    
    // calculates the number of months remaining
    for (let months = 0, n = 0; n < numDays; months++){
        n += daysPerMonth[months];
        MonthsAndDays[0] = months;
    };

    // calculates the number of days remaining
    if (MonthsAndDays[0] == 0) {
        MonthsAndDays[1] = numDays;
    } else {
        for(let i = 0, days = 0; i < MonthsAndDays[0]; i++) {
            days += daysPerMonth[i];
            MonthsAndDays[1] = numDays - days;   
        }
    };

    // return the number of [months, days]
    return MonthsAndDays;
}


// 7.   Calculate the age

const calcAge = () => {
    // one day in ms
    const oneDay = 1000 * 60 * 60 * 24;

    // calculates the number of leap years to date
    const leapYears = numLeapYears();

    const year = inputYear.value.trim();
    const month = inputMonth.value.trim();
    const day = inputDay.value.trim();
    
    // date provided 
    const inputDate = new Date(year, month - 1, day);
    // Preferred method; never interprets any value as being a relative offset,
    // but instead uses the year value as-is
    inputDate.setFullYear(inputYear.value.trim());
    // now: 98 is 98 (not 1998)

    // current date
    const currentDate = new Date();

    // calculate the difference in ms
    let diff = Math.round(currentDate.getTime() - inputDate.getTime());

    if (diff < 0) {
        invalidInputError('day', 'Must be in the past');
    } else {
        // total number of days
        let numDays = Math.floor(diff / oneDay);

        // considering leap years
        numDays -= leapYears;

        // number of years
        let resultYears = Math.floor(numDays / 365);
        numDays -= + resultYears * 365;

        // calculates the number of months and days
        resultYearsAndMonths = numMonthsAndDays(numDays);

        // number of months
        let resultMonths = resultYearsAndMonths[0];

        // number of days
        let resultDays = resultYearsAndMonths[1];

        // print result
        years.innerHTML = resultYears;
        months.innerHTML = resultMonths;
        days.innerHTML = resultDays;
    }  
};