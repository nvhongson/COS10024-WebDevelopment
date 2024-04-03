/**
Author: Son Nguyen 103234103
Target: What html file are reference by the JS file
Purpose: Input and Output using Javascript
Created: 5th May 2023
Last Updated: 7th May 2023
Credits: Week 9 Lab Activities 1
*/

"use strict"; //prevents creation of global variables in functions

//this function is called when the browser window loads
//it will register the functions that will respond to browser events
function init()
{
	var clickMe = document.getElementById("clickme");
	clickMe.onclick = promptName;
}

function promptName()
{
	var sName = prompt("Enter your name.\nThis prompt should show up when the\nClick Me Button is clicked.", "Your name");
	alert("Hi there " + sName + ". Alert boxes are a quick way to check the state\nof your variables when you are developing code.");
}

window.onload = init;
