//document.getElementById("genderText").textContent = "TEST";
/*makes the phone number in the phone number textbox more readable to the user e.g. (123) 456-7890
 *this function is called by the phone number input element when it is unfocused by the user
 */
var RoosterChills = 0;
function correctPhoneNumber() {
	//get the phone number from the textbox
	let number = document.getElementById("phone").value;

	//take only numbers 0-9 from the phone number
	number = number.match(/\d/g);

	//if there are no numbers, empty the textbox and exit the function
	if (number == null) {
		document.getElementById("phone").value = "";
		return;
	}

	//combine the numbers into a single string
	number = number.join('');

	//remove the numbers 0 or 1 if they are the first number
	while (number.startsWith("0") || number.startsWith("1")) number = number.substring(1);

	//get the length of the number
	const length = number.length;

	//add parentheses and a space if there are at least 3 numbers
	if (length > 2) {
		number = "(" + number.substring(0, 3) + ") " + number.substring(3);

		//add a hyphen if there are at least 7 characters and remove extra numbers
		if (length > 6) number = number.substring(0, 9) + "-" + number.substring(9, 13);
	}

	//put the corrected phone number into the textbox
	document.getElementById("phone").value = number;
}

//pulls the data from the questionaire form
function getData(form) {
	const formData = new FormData(form);

	//traverses the form data
	for (let pair of formData.entries()) {
		console.log(pair[0] + ": " + pair[1]);
		checkData(pair);
	}
}

//checks the data from the form
function checkData(data) {
	switch (data[0]) {
		case "firstName": break;
		case "lastName": break;
		case "gender": break;
		case "age": break;
		case "symptoms":
			switch (data[1]) {
				case "cough": break;
				case "fever": break;
				case "lossOfTaste": break;
				case "lossOfSmell": break;
				case "chills": break;
				case "chestPain": break;
				case "vomiting": break;
				case "muscleAche": break;
				case "shortnessOfBreath": break;
				case "soreThroat": break;
				case "diarrhea": break;
				case "fatigue": break;
				case "headache": break;
				case "runnyNose": break;
			}
			break;
		case "phone": break;
		case "email": break;
	}
}

/*listens for whether the questionaire form submit button has been pressed, and calls
 *the getData() function with the form data as an argument
 */
document.getElementById("questionaireForm").addEventListener("submit", function (e) {
	e.preventDefault();
	//pulls the data from the form
	getData(e.target);
});