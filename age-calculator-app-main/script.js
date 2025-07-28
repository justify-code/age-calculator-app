document.getElementById('submitbtn').addEventListener('click', function (e) {
    e.preventDefault();

    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');

    const dayError = document.getElementById('day-error');
    const monthError = document.getElementById('month-error');
    const yearError = document.getElementById('year-error');

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

   ///reset styles and messages
   [dayInput, monthInput, yearInput].forEach(input => 
    input.style.border = '');
    [dayError, monthError, yearError].forEach(el => el.textContent = '');

    let hasError = false;
/////empty fields
    if(!day) {
        dayError.textContent = 'day is required';
        dayInput.style.border = '1px solid red';
        hasError = true;
    }
    if (!month) {
        monthError.textContent = 'month is required';
        monthInput.style.border = '1px solid red';
        hasError = true;
    }
    if (!year) {
        yearError.textContent = 'year is required'
        yearInput.style.border = '1px solid red';
        hasError = true;
    }
    if (day && (day < 1 || day > 31)) {
        dayError.textContent = 'must be a valid day';
        dayInput.style.border = '1px solid red'
        hasError = true;
    }
    if (month && (month < 1 || month > 12)) {
        monthError.textContent = 'must be a valid month';
        monthInput.style.border = '1px solid red'
        hasError = true;
    }
    if (year && (year < 1000 || year > today.getFullYear())) {
        yearError.textContent = 'must be in the past';
        yearInput.style.border = '1px solid red';
        hasError = true;
    }
    //invalid date
    if (
        day && month && year &&
        (birthDate.getFullYear() !== year ||
         birthDate.getMonth() !== month - 1 ||
         birthDate.getDate() !== day)
    ){
        dayError.textContent = "invalid date";
        dayInput.style.border = '1px solid red';
        hasError = true;
    }
    if (birthDate > today) {
        yearError.textContent = 'date cant be in the feature';
        yearInput.style.border = '1px solid red'
        hasError = true;
    }

    //stop error
    if (hasError) {
        document.getElementById('years').textContent = '--';
        document.getElementById('months').textContent = '--';
        document.getElementById('years').textContent = '--';
        return;
    }
    ////continue if valid age calculation logic
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if(days < 0) {
        years--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if(months < 0) {
        years--;
        months += 12;
    }
    if(birthDate > today) {
        years = months = days = 0;
    }

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
});

///function to clear error
function addClearError(input, errorElement) {
    input.addEventListener('input', () => {
        input.style.border = '';
        errorElement.textContent = '';
    });
    
}
