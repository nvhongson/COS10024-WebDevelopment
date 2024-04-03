/**
 * Author: Grima Wormtongue
 * Target: confirm.html
 * Purpose: Load data from session storage and submit to server
 * Credits: J.R. Tolkein
 */
"use strict";

/* Get variables from form and check rules */
function validate() {
	var errMsg = ""; // Stores the error message
	var result = true; // Assumes no errors

	return result; // If false, the information will not be sent to the server
}

// This should really be calculated securely on the server!
function calcCost(trips, partySize) {
	var cost = 0;
	if (trips.search("1day") != -1) cost = 200;
	if (trips.search("4day") != -1) cost += 1500;
	if (trips.search("10day") != -1) cost += 3000;
	return cost * partySize;
}

function getBooking() {
	var cost = 0;
	if (sessionStorage.firstname !== undefined) { // If sessionStorage for username is not empty
		// Confirmation text
		document.getElementById("confirm_name").textContent = sessionStorage.firstname + " " + sessionStorage.lastname;
		document.getElementById("confirm_age").textContent = sessionStorage.age;
		document.getElementById("confirm_trip").textContent = sessionStorage.trip;
		document.getElementById("confirm_species").textContent = sessionStorage.species;
		document.getElementById("confirm_food").textContent = sessionStorage.food;
		document.getElementById("confirm_partySize").textContent = sessionStorage.partySize;
		cost = calcCost(sessionStorage.trip, sessionStorage.partySize);
		document.getElementById("confirm_cost").textContent = cost;
		// Fill hidden fields
		document.getElementById("firstname").value = sessionStorage.firstname;
		document.getElementById("lastname").value = sessionStorage.lastname;
		document.getElementById("age").value = sessionStorage.age;
		document.getElementById("species").value = sessionStorage.species;
		document.getElementById("food").value = sessionStorage.food;
		document.getElementById("partySize").value = sessionStorage.partySize;
		document.getElementById("cost").value = cost;
	}
}

function init() {
  var bookForm = document.getElementById("bookform"); // Link the variable to the HTML element
  bookForm.onsubmit = validate; // Assign functions to corresponding events
  
  var cancelButton = document.getElementById("cancelButton"); // Get the cancel button element
  cancelButton.onclick = cancelBooking; // Assign the cancelBooking function to the onclick event of the cancel button
  getBooking(); // Call the getBooking() function to populate the form
}


window.onload = init;
