//Variable for if the user has been in contact with an infected person or not:
var contactt = 0;
//Variables for the severity levels for each symptom:
/*They start at 0 and increase by 1 when the user selects symtoms from that level. 
All symptoms selected in the same severity level increase your likelyhood of having the disease.*/
var severity2 = 0; //Chills
var severity3 = 0; //Cough
var severity4 = 0; //Fever, Vomiting
var severity5 = 0; //Shortness of Breath, Fatigue, Loss of Taste, Loss of Smell
//Variables for the symtom severity groups:
/*These variables keep track of each symtpom reported from each severity group.
If all symptoms in the same severity group are selected, the total of that group will be multiplied by the severity level
of that group, since the all symptoms in a severity group being reported increases your likelihood of having the disease.*/
var group2 = 0; //Chills
var group3 = 0; //Cough
var group4 = 0; //Fever, Vomiting
var group5 = 0; //Shortness of Breath, Fatigue, Loss of Taste, Loss of Smell
//Variable for the total symtpoms reported:
var total = 0;
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

//pulls the data from the questionaire form
function getData(form) {
	const formData = new FormData(form);

	//traverses the form data
	for (let pair of formData.entries()) {
		console.log(pair[0] + ": " + pair[1]);
		checkAndRunData(pair);
	}
	if(severity2 == 1){
		total = total + (group2 * severity2);
	}else{
		total = total + group2;
	}
	if(severity3 == 1){
		total = total + (group3 * severity3);
	}
	else{
		total = total + group3;
	}
	if(severity4 == 2){
		total = total + (group4 * severity4);
	}
	else{
		total = total + group4;
	}
	if(severity5 == 4){
		total = total + (group5 * severity5);
	}
	else{
		total = total + group5;
	}
	console.log(total);
	if(total == 1){
		document.write("<p>You have no risk of having Rooster Chills.</p>");
	}
	if(total > 1 && total < 15){
		document.write("<p>You have a low risk of having Rooster Chills.</p>");
	}
	if(total > 15 && total < 26){
		document.write("<p>You have a medium risk of having Rooster Chills.</p>");
	}
	if(total >= 26){
		document.write("<p>You have a high risk of having Rooster Chills.</p>");
	}
}
//checks the data from the form
function checkAndRunData(data) {
	switch (data[0]) {
		case "firstName": break;
		case "lastName": break;
		case "gender": break;
		case "age":
			if(data[1] == "0-40"){
				total = total + 1;
				break;
			}
			if(data[1] == "40-59"){
				total = total + 2;
				break;
			}
			if(data[1] == "60+"){
				total = total + 3;
				break;
			}
		case "contact":
			if (data[1] == "yes") {
				total++;
				contactt = 1;
				break;
			}else{
				break;
			}
		case "symptoms":
			if (data[1] == "fever") {
				group4++;
				severity4++;
				break;
			}
			if (data[1] == "chills") {
				group2++;
				severity2++;
				break;
			}
			if (data[1] == "vomiting") {
				group4++;
				severity4++;
				break;
			}
			if (data[1] == "cough") {
				group3++;
				severity3++;
				break;
			}

			if (data[1] == "shortnessOfBreath") {
				group5++;
				severity5++;
				break;
			} 
			if (data[1] == "fatigue") {
				group5++;
				severity5++;
				break;
			}
			if (data[1] == "lossOfTaste") {
				group5++;
				severity5++;
				break;
			} 
			if (data[1] == "lossOfSmell") {
				group5++;
				severity5++;
				break;
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