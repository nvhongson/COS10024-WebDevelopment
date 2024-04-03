document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Perform validation
    const dobInput = document.getElementById("dob");
    const stateInput = document.getElementById("state");
    const postcodeInput = document.getElementById("postcode");
    const skillsCheckbox = document.getElementById("others");
    const othersInput = document.getElementById("others");

    const dobPattern = /^\d{2}\/\d{2}\/\d{4}$/;
    const postcodePattern = /^\d{4}$/;

    const dobErrorMessage = "Please enter a valid date of birth in dd/mm/yyyy format.";
    const ageErrorMessage = "Applicants must be between 15 and 80 years old.";
    const statePostcodeErrorMessage = "The selected state must match the first digit of the postcode.";
    const othersErrorMessage = "Please provide details for other skills.";

    // Date of Birth validation
    if (!dobPattern.test(dobInput.value)) {
      showError(dobInput, dobErrorMessage);
      return;
    }

    const dobParts = dobInput.value.split("/");
    const dob = new Date(dobParts[2], dobParts[1] - 1, dobParts[0]);
    const currentDate = new Date();
    const age = Math.floor((currentDate - dob) / (365.25 * 24 * 60 * 60 * 1000));

    // Age validation
    if (age < 15 || age > 80) {
      showError(dobInput, ageErrorMessage);
      return;
    }

    // State and Postcode validation
    const statePostcodeMap = {
      VIC: /^[38]/,
      NSW: /^[12]/,
      QLD: /^[49]/,
      NT: /^0/,
      WA: /^6/,
      SA: /^5/,
      TAS: /^7/,
      ACT: /^0/
    };

    if (!statePostcodeMap[stateInput.value].test(postcodeInput.value)) {
      showError(postcodeInput, statePostcodeErrorMessage);
      return;
    }

    // Other Skills validation
    if (skillsCheckbox.checked && othersInput.value.trim() === "") {
      showError(othersInput, othersErrorMessage);
      return;
    }

    // If all validations pass, submit the form
    form.submit();
  });

  function showError(input, message) {
    const errorContainer = document.createElement("div");
    errorContainer.className = "error";
    errorContainer.textContent = message;

    const parent = input.parentElement;
    parent.appendChild(errorContainer);

    input.classList.add("error-input");
    input.addEventListener("input", function() {
      errorContainer.remove();
      input.classList.remove("error-input");
    });
  }
});