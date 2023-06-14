const bill_input = document.getElementById("Bill_input");
const custom_tip_input = document.getElementById("custom_tip_input");
const people_input = document.getElementById("people_input");
const tip_result = document.getElementById("tip_result");
const total_result = document.getElementById("total_result");

const reset = document.getElementById("reset");
const tip_buttons_container = document.querySelector(".input_field.flex-container");

// To do 
// [ ] add delay then delete the content of h2.error
// [ done ] solve the negaive numbers issue

/////////////////// functions
//function reset
function reset_callback() {
    bill_input.value = '';
    custom_tip_input.value = '';
    people_input.value = '';

    tip_result.innerText = "$0.00";
    total_result.innerText = "$0.00";

    reset.toggleAttribute("disabled");
}
//function fire error
function hasError() {
    let fireError = false;
    if (bill_input.value == '' || bill_input.value == '0') {
        fireError = true;
        bill_input.classList.add('input_error');
        const parent = bill_input.parentElement.parentElement;
        const error_massage = parent.querySelector(".error");
        error_massage.innerText = "Can't be zero";
        error_massage.classList.remove("out_error");
        error_massage.classList.add("fire_error");
    }
    else {
        bill_input.classList.remove('input_error');

        const parent = bill_input.parentElement.parentElement;
        const error_massage = parent.querySelector(".error");
        error_massage.innerText = "";
        error_massage.classList.remove("fire_error");
    }

    if (people_input.value == '' || people_input.value == '0') {
        fireError = true;
        people_input.classList.add('input_error');
        const parent = people_input.parentElement.parentElement;
        const error_massage = parent.querySelector(".error");
        error_massage.innerText = "Can't be zero";
        error_massage.classList.add("fire_error");

    }
    else {
        people_input.classList.remove('input_error');

        const parent = people_input.parentElement.parentElement;
        const error_massage = parent.querySelector(".error");
        error_massage.innerText = "";
        error_massage.classList.remove("fire_error");

    }

    return fireError;
}
//input Error callback
function remove_input_error_style_callback(e) {
    const element = e.target;
    element.classList.remove('input_error');
    const error_massage = element.parentElement.parentElement.querySelector(".error");
    error_massage.classList.remove("fire_error");

    //add delay then rmove the innertext of h2
    setTimeout(() => error_massage.innerText = '', 500)
}
//unwanted characters
function unwanted_characters_callback(e) {
    const unWantedChars = ['', '-', '+', 'e', ' ']
    if (unWantedChars.includes(e.key)) {
        e.preventDefault();
    }
}
//function calc
function calc(tip_percentage) {
    if (hasError()) {
        // console.log("error");
        return
    }

    if (tip_percentage == '0%') {
        // console.log('reset to zero')
        tip_result.innerText = '$0.00';
        total_result.innerText = '$0.00';
        return
    }

    tip_percentage = tip_percentage.substring(0, tip_percentage.indexOf('%'));
    tip_percentage = parseFloat(tip_percentage) / 100;

    //calculate the valuse
    if (reset.hasAttribute("disabled")) {
        reset.removeAttribute("disabled");
    }
    const bill_value = parseFloat(bill_input.value);
    const people_number = parseInt(people_input.value);

    const person_bill = (bill_value / people_number);
    const tip_amount = person_bill * tip_percentage;
    const total = person_bill + tip_amount;

    tip_result.innerText = '$' + tip_amount.toFixed(2);
    total_result.innerText = '$' + total.toFixed(2);

}

/////////////////// evnet listner
reset.addEventListener('click', reset_callback)

tip_buttons_container.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName == 'BUTTON') {
        calc(target.innerText);
    }
});
// custom tip input __start__
custom_tip_input.addEventListener('keydown', (e) => {
    const unWantedChars = ['', '-', '+', 'e', ' '];
    // console.log(e);

    if (unWantedChars.includes(e.key)) {
        // console.log('prevent:', e.key, 'input value', e.target.value);
        e.preventDefault();
    }
});

custom_tip_input.addEventListener('input', (e) => {
    const value = e.target.value;
    // console.log(typeof value,value);
    if (value == '' || value == ' ') {
        console.log('calc 0');
        calc(0 + '%')
    }
    else {
        // console.log('calc ' + value);
        calc(value + '%')
    }
});
// custom tip input __end__

bill_input.addEventListener('keydown', unwanted_characters_callback);
people_input.addEventListener('keydown', unwanted_characters_callback);

bill_input.addEventListener('focus', remove_input_error_style_callback);

people_input.addEventListener('focus', remove_input_error_style_callback);
