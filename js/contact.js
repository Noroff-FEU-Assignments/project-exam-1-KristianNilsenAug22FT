const form = document.querySelector("#contact");
const userName = document.querySelector("#name");
const userNameError = document.querySelector("#nameError");
const userEmail = document.querySelector("#email");
const userEmailError = document.querySelector("#emailError");
const userSubject = document.querySelector("#subject");
const userSubjectError = document.querySelector("#subjectError");
const userMessage = document.querySelector("#message");
const userMessageError = document.querySelector("#messageError");

function validateForm() {
  event.preventDefault();

  if (checkLength(userName.value, 0) === true) {
    userNameError.style.display = "none";
  } else {
    userNameError.style.display = "block";
  }

  if (validateEmail(userEmail.value) === true) {
    userEmailError.style.display = "none";
  } else {
    userEmailError.style.display = "block";
  }

  if (checkLength(userSubject.value, 14) === true) {
    userSubjectError.style.display = "none";
  } else {
    userSubjectError.style.display = "block";
  }

  if (checkLength(userMessage.value, 24) === true) {
    userMessageError.style.display = "none";
  } else {
    userMessageError.style.display = "block";
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
