window.addEventListener("DOMContentLoaded", function() {
  var applyLinks = document.getElementsByClassName("apply-link");
  for (var i = 0; i < applyLinks.length; i++) {
    applyLinks[i].addEventListener("click", function(event) {
      var jobRef = this.getAttribute("data-job-ref");
      sessionStorage.setItem("jobRef", jobRef);
    });
  }

  var jobRefInput = document.getElementById("jobRef");
  var jobRef = sessionStorage.getItem("jobRef");
  if (jobRef) {
    jobRefInput.value = jobRef;
  }

  var dobInput = document.getElementById("dob");

  dobInput.addEventListener("blur", function() {
    var dob = dobInput.value;
    var dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    var dobParts = dob.split("/");
    var today = new Date();
    var dobDate = new Date(dobParts[2], dobParts[1] - 1, dobParts[0]);
    var age = today.getFullYear() - dobDate.getFullYear();

    if (
      !dobRegex.test(dob) ||
      dobParts.length !== 3 ||
      dobDate > today ||
      age < 15 ||
      age > 80
    ) {
      alert(
        "Please enter a valid date of birth (dd/mm/yyyy) between 15 and 80 years old."
      );
      dobInput.focus();
    }
  });

  dobInput.addEventListener("input", function(event) {
    var dob = dobInput.value;
    // Perform real-time validation checks and update error messages or visual indicators
    // based on the validity of the date of birth input.
  });

  // Validate State and Postcode
  var stateInput = document.getElementById("state");
  var postcodeInput = document.getElementById("postcode");
  var othersCheckbox = document.getElementById("others-checkbox");
  var othersInput = document.getElementById("others-input");

  var validateForm = function() {
    var dob = dobInput.value;
    var dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    var dobParts = dob.split("/");
    var today = new Date();
    var dobDate = new Date(dobParts[2], dobParts[1] - 1, dobParts[0]);
    var age = today.getFullYear() - dobDate.getFullYear();

    if (
      !dobRegex.test(dob) ||
      dobParts.length !== 3 ||
      dobDate > today ||
      age < 15 ||
      age > 80
    ) {
      alert(
        "Please enter a valid date of birth (dd/mm/yyyy) between 15 and 80 years old."
      );
      dobInput.focus();
      return false;
    }

    var state = stateInput.value;
    var postcode = postcodeInput.value;
    var postcodeRegex = /^\d{4}$/;
    var statePostcodeMap = {
      VIC: [3, 8],
      NSW: [1, 2],
      QLD: [4, 9],
      NT: [0],
      WA: [6],
      SA: [5],
      TAS: [7],
      ACT: [0],
    };
    if (
      (!statePostcodeMap[state] ||
        !statePostcodeMap[state].includes(Number(postcode.charAt(0)))) ||
      !postcodeRegex.test(postcode)
    ) {
      alert("Please enter a valid postcode that matches the selected state.");
      postcodeInput.focus();
      return false;
    }

    if (othersCheckbox.checked && othersInput.value.trim() === "") {
      alert("Please provide other skills in the 'Other Skills' field.");
      othersInput.focus();
      return false;
    }

    return true;
  };

  var submitButton = document.querySelector("button[type='submit']");
  submitButton.addEventListener("click", function(event) {
    var confirmed = confirm("Are you sure you want to submit the form?");
    if (!confirmed) {
      event.preventDefault(); // Cancel form submission
    }
  });
});
