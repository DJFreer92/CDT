
/*makes the phone number in the phone number textbox more readable to the user e.g. (123) 456-7890
 *this function is called by the phone number input element when it is unfocused by the user
 */
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

function getData(form) {
	const formData = new FormData(form);

	for (let pair of formData.entries()) {
		console.log(pair[0] + ": " + pair[1]);
	}
}

document.getElementById("questionaireForm").addEventListener("submit", function (e) {
	e.preventDefault();
	getData(e.target);
});