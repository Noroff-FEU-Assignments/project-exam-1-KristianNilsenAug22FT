const form = document.querySelector("#contact");
const userName = document.querySelector("#name");
const userNameError = document.querySelector("#nameError");
const userEmail = document.querySelector("#email");
const userEmailError = document.querySelector("#emailError");
const userSubject = document.querySelector("#subject");
const userSubjectError = document.querySelector("#subjectError");
const userMessage = document.querySelector("#message");
const userMessageError = document.querySelector("#messageError");

function validateForm(event) {
  event.preventDefault();

  if (checkLength(userName.value, 4) === true) {
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

  if (
    checkLength(userName.value, 4) &&
    validateEmail(userEmail.value) &&
    checkLength(userSubject.value, 14) &&
    checkLength(userMessage.value, 24)
  ) {
    // Create a new FormData object and append form data
    const formData = new FormData(form);
    formData.append("submit", "true");

    // Send a POST request to the form action URL
    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Handle the response (e.g., show confirmation message, redirect)
        if (response.ok) {
          // Show confirmation message
          const confirmationMessage = document.createElement("p");
          confirmationMessage.textContent = "Message submitted successfully.";
          confirmationMessage.classList.add("confirmation-message");
          form.appendChild(confirmationMessage);

          // Redirect to the thank you page (replace "thank-you.html" with your desired thank you page URL)
          window.location.href = "thankyou.html";
        } else {
          // Handle error response
          console.log("Error submitting the form.");
        }
      })
      .catch((error) => {
        // Handle fetch error
        console.log("Error submitting the form:", error);
      });
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
