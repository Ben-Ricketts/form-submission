document.addEventListener("DOMContentLoaded", function () {
  let theForm = document.getElementById("form");

  theForm.noValidate = true;
  theForm.addEventListener("submit", function (e) {
    let errorFound = false;
    let elements = this.elements;

    for (let i = 0; i < elements.length; i++) {
      needsToBeValidated(elements[i]);

      if (!isFieldValid(elements[i])) {
        if (elements[i].value.trim() === "") {
          errorFound = true;
          let errorSpan = document.querySelector(
            "#" + elements[i].id + "-error"
          );
          errorSpan.innerHTML = "Required Field";
          errorSpan.classList.add("error-message");
          theForm.addEventListener("reset", () => (errorSpan.innerHTML = ""));
        } else if (elements[i].value.length < 2) {
          errorFound = true;
          let errorSpan = document.querySelector(
            "#" + elements[i].id + "-error"
          );
          errorSpan.innerHTML = "Must be more than 2 characters";
          errorSpan.classList.add("error-message");
          theForm.addEventListener("reset", () => (errorSpan.innerHTML = ""));
        } else if (!isEmailValid(elements[i])) {
          let emailErrorSpan = document.getElementById("email-error");
          emailErrorSpan.innerHTML = "Must be a valid Email Address";
          emailErrorSpan.classList.add("error-message");

          theForm.addEventListener(
            "reset",
            () => (emailErrorSpan.innerHTML = "")
          );
        }
      }

      if (!isPhoneValid(elements[i])) {
        errorFound = true;
        let phoneErrorSpan = document.getElementById("tel-error");
        phoneErrorSpan.innerHTML = "Not a valid phone number";
        phoneErrorSpan.classList.add("error-message");
        theForm.addEventListener(
          "reset",
          () => (phoneErrorSpan.innerHTML = "")
        );
      } else if (!isUrlValid(elements[i])) {
        errorFound = true;
        let urlErrorSpan = document.getElementById("url-error");
        urlErrorSpan.innerHTML = "Must be a valid URL";
        urlErrorSpan.classList.add("error-message");
        theForm.addEventListener("reset", () => (urlErrorSpan.innerHTML = ""));
      }

      if (errorFound) {
        e.preventDefault();
      }
    }
  });
});

// next functions

function isFieldValid(field) {
  if (!needsToBeValidated(field)) {
    return true;
  }
}

function needsToBeValidated(field) {
  return ["tel", "url", "reset", "submit"].indexOf(field.type) === -1;
}

// Check email

function isEmailValid(field) {
  if (field.type !== "email") {
    return true;
  }

  let emailRegex = new RegExp(
    '^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  );

  if (emailRegex.test(field.value)) {
    return true;
  } else {
    return false;
  }
}
// check phone

function isPhoneValid(field) {
  if (field.type !== "tel" || field.value.trim() === "") {
    return true;
  }

  let phoneRegex = new RegExp(
    "^(\\+0?1\\-)?\\(?\\d{3}\\)?[\\-\\s]?\\d{3}[\\-\\s]?\\d{4}$"
  );

  if (phoneRegex.test(field.value)) {
    return true;
  } else {
    return false;
  }
}

// check url

function isUrlValid(field) {
  if (field.type !== "url" || field.value.trim() === "") {
    return true;
  }

  let urlRegex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?" + // port
      "(\\/[-a-z\\d%_.~+]*)*" + // path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i" // fragment locator
  );

  if (urlRegex.test(field.value)) {
    return true;
  } else {
    return false;
  }
}
