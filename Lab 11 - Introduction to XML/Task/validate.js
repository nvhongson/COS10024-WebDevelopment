"use strict";

function validate() {
  var errMsg = "";
  var result = true;

  // Get the values from the input fields
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var age = parseInt(document.getElementById("age").value);
  var species = getSpecies();
  var is1day = document.getElementById("1day").checked;
  var is4day = document.getElementById("4day").checked;
  var is10day = document.getElementById("10day").checked;

  // Validate first name
  if (!firstname.match(/^[a-zA-Z]+$/)) {
    errMsg += "Your first name must only contain alpha characters\n";
    result = false;
  }

  // Validate last name
  if (!lastname.match(/^[a-zA-Z-]+$/)) {
    errMsg += "Your last name must only contain alpha characters or a hyphen\n";
    result = false;
  }

  // Validate age
  if (isNaN(age)) {
    errMsg += "Your age must be a number\n";
    result = false;
  } else if (age < 18) {
    errMsg += "Your age must be 18 or older\n";
    result = false;
  } else if (age >= 10000) {
    errMsg += "Your age cannot be greater than or equal to 10,000\n";
    result = false;
  }

  // Validate food preference
  if (document.getElementById("food").value == "none") {
    errMsg += "You must select a food preference\n";
    result = false;
  }

  // Validate trip options
  if (!(is1day || is4day || is10day)) {
    errMsg += "Please select at least one trip\n";
    result = false;
  }

  // Validate species selection
  if (species == "Unknown") {
    errMsg += "You must select a species\n";
    result = false;
  }

  // Check species against age and beard length
  var speciesErrMsg = checkSpeciesAge(age);
  if (speciesErrMsg != "") {
    errMsg += speciesErrMsg;
    result = false;
  }

  // Display error message if any
  if (errMsg != "") {
    alert(errMsg);
  }

  // Store booking if validation is successful
  if (result) {
    storeBooking(firstname, lastname, age, species, is1day, is4day, is10day);
  }

  return result;
}

function getSpecies() {
  var speciesName = "Unknown";
  var speciesArray = document.getElementById("species").getElementsByTagName("input");
  for (var i = 0; i < speciesArray.length; i++) {
    if (speciesArray[i].checked) {
      speciesName = speciesArray[i].value;
      break;
    }
  }
  return speciesName;
}

function checkSpeciesAge(age) {
  var errMsg = "";
  var species = getSpecies();
  switch (species) {
    case "Human":
      if (age > 120) {
        errMsg = "You cannot be a " + species + " and over 120.\n";
      }
      if (age >= 30 && parseInt(document.getElementById("beard").value) < 12) {
        errMsg = "You cannot be a " + species + ", no " + species + " aged 30 or over has a beard less than 12 inches.\n";
      }
      break;
    case "Dwarf":
      if (age > 150) {
        errMsg = "You cannot be a " + species + " and over 150.\n";
      }
      if (parseInt(document.getElementById("beard").value) <= 12) {
        errMsg = "You cannot be a " + species + ", all " + species + " have a beard longer than 12 inches.\n";
      }
      break;
    case "Hobbit":
      if (age > 150) {
        errMsg = "You cannot be a " + species + " and over 150.\n";
      }
      if (parseInt(document.getElementById("beard").value) !== 0) {
        errMsg = "You cannot be a " + species + ", no " + species + " has a beard.\n";
      }
      break;
    case "Elf":
      if (parseInt(document.getElementById("beard").value) !== 0) {
        errMsg = "You cannot be a " + species + ", no " + species + " has a beard.\n";
      }
      break;
    default:
      errMsg = "We don't allow your kind on our tours.\n";
  }
  return errMsg;
}

function storeBooking(firstname, lastname, age, species, is1day, is4day, is10day) {
  var trip = "";
  if (is1day) trip += "1 day";
  if (is4day) {
    if (trip != "") trip += ", ";
    trip += "4 day";
  }
  if (is10day) {
    if (trip != "") trip += ", ";
    trip += "10 day";
  }
  
  sessionStorage.trip = trip;
  sessionStorage.firstname = firstname;
  sessionStorage.lastname = lastname;
  sessionStorage.age = age;
  sessionStorage.species = species;
  sessionStorage.food = document.getElementById("food").value;
  sessionStorage.partySize = document.getElementById("partySize").value;
}

function prefill_form() {
  if (sessionStorage.firstname != undefined) {
    document.getElementById("firstname").value = sessionStorage.firstname;
    document.getElementById("lastname").value = sessionStorage.lastname;
    document.getElementById("age").value = sessionStorage.age;
    
    var species = sessionStorage.species;
    switch (species) {
      case "Human":
        document.getElementById("human").checked = true;
        break;
      case "Dwarf":
        document.getElementById("dwarf").checked = true;
        break;
      case "Hobbit":
        document.getElementById("hobbit").checked = true;
        break;
      case "Elf":
        document.getElementById("elf").checked = true;
        break;
    }
    
    document.getElementById("food").value = sessionStorage.food;
    document.getElementById("partySize").value = sessionStorage.partySize;
  }
}

function init() {
  document.getElementById("regform").onsubmit = validate;
  prefill_form();
}

window.onload = init;
