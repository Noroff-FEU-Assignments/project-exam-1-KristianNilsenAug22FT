const form = document.querySelector("#contact");
const userName = document.querySelector("#name");
const userNameError = document.querySelector("#nameError");
const userPhone = document.querySelector("#phone");
const userPhoneError = document.querySelector("#phoneError");
const userEmail = document.querySelector("#email");
const userEmailError = document.querySelector("#emailError");


function validateForm() {
  event.preventDefault();

  if (checkLength(userName.value, 0) === true) {
    userNameError.style.display = "none";
  } else {
    userNameError.style.display = "block";
  }

  if (checkLength(userPhone.value, 7) === true) {
    userPhoneError.style.display = "none";
  } else {
    userPhoneError.style.display = "block";
  }

  if (validateEmail(userEmail.value) === true) {
    userEmailError.style.display = "none";
  } else {
    userEmailError.style.display = "block";
  }

}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
