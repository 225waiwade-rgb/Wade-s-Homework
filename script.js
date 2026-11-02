const billInput = document.getElementById("bill-amount");
const tipSelect = document.getElementById("tip-percent");
const peopleInput = document.getElementById("number-of-people");
const calculateButton = document.getElementById("calculate-button");

const errorMessage = document.getElementById("error-message");
const tipOutput = document.getElementById("tip-amount");
const totalOutput = document.getElementById("total-amount");
const perPersonOutput = document.getElementById("total-per-person");

function showError(message) {
    errorMessage.textContent = message;
    tipOutput.textContent = "$0.00";
    totalOutput.textContent = "$0.00";
    perPersonOutput.textContent = "$0.00";
}

calculateButton.addEventListener("click", function () {
    const billText = billInput.value.trim();
    const peopleText = peopleInput.value.trim();

    const bill = Number(billText);
    const tipPercent = Number(tipSelect.value);
    const people = Number(peopleText);

    if (billText === "" || !Number.isFinite(bill)) {
        showError("Please enter a valid bill amount.");
        return;
    }

    if (bill < 0) {
        showError("Bill amount cannot be negative.");
        return;
    }

    if (peopleText === "" || !Number.isFinite(people)) {
        showError("Please enter the number of people.");
        return;
    }

    if (people <= 0) {
        showError("Number of people must be greater than zero.");
        return;
    }

    if (!Number.isInteger(people)) {
        showError("Number of people must be a whole number.");
        return;
    }

    if (!Number.isFinite(tipPercent) || tipPercent < 0) {
        showError("Please select a valid tip percentage.");
        return;
    }

    const tip = bill * tipPercent / 100;
    const total = bill + tip;
    const perPerson = total / people;

    if (![tip, total, perPerson].every(Number.isFinite)) {
        showError("The amounts are too large. Please enter smaller values.");
        return;
    }

    errorMessage.textContent = "";
    tipOutput.textContent = "$" + tip.toFixed(2);
    totalOutput.textContent = "$" + total.toFixed(2);
    perPersonOutput.textContent = "$" + perPerson.toFixed(2);
});