const form = document.querySelector("#contact");
const userName = document.querySelector("#name");
const userNameError = document.querySelector("#nameError");
const userEmail = document.querySelector("#email");
const userEmailError = document.querySelector("#emailError");
const userSubject = document.querySelector("#subject");
const userSubjectError = document.querySelector("#subjectError");
const userMessage = document.querySelector("#message");
const userMessageError = document.querySelector("#messageError");
const confirmationMessage = document.querySelector("#confirmationMessage");

function validateForm(event) {
  event.preventDefault();

  let isValid = true;

  if (!checkLength(userName.value, 4)) {
    userNameError.style.display = "block";
    isValid = false;
  } else {
    userNameError.style.display = "none";
  }

  if (!validateEmail(userEmail.value)) {
    userEmailError.style.display = "block";
    isValid = false;
  } else {
    userEmailError.style.display = "none";
  }

  if (!checkLength(userSubject.value, 14)) {
    userSubjectError.style.display = "block";
    isValid = false;
  } else {
    userSubjectError.style.display = "none";
  }

  if (!checkLength(userMessage.value, 24)) {
    userMessageError.style.display = "block";
    isValid = false;
  } else {
    userMessageError.style.display = "none";
  }

  if (isValid) {
    
    confirmationMessage.style.display = "block";

   
    userName.value = "";
    userEmail.value = "";
    userSubject.value = "";
    userMessage.value = "";
  }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
  return value.trim().length >= len;
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
}
