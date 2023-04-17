//variable for if the user has been in contact with an infected person or not:
var exposed = false;

/*severity groups for each symptom
 *starts at 0 and increases by 1 when the user selects symptoms from that severity level 
 *symptoms selected in the same severity level increase your likelyhood of having the disease
 *0: (Group 1) Loss of taste, loss of smell, and fever
 *1: (Group 2) Shortness of breath, chest pain, and cough
 *2: (Group 3) Fatigue, muscle ache, and headache
 *3: (Group 4) Vomiting and diarrhea
 *4: (Group 5) Runny nose and sore throat
 */
var groups = [0, 0, 0, 0, 0];

//total symtpoms reported:
var total = 0;

//waits until the html window finishes loading
window.onload = function() {
	/*listens for whether the questionaire form submit button has been pressed, and calls
	*the getData() function with the form data as an argument
	*/
	document.getElementById("questionaireForm").addEventListener("submit", function (e) {
		e.preventDefault();
		//pulls the data from the form
		getData(e.target);
	});
}

/*makes the phone number in the phone number textbox more readable to the user e.g. (123) 456-7890
 *this function is called by the phone number input element when it is unfocused by the user
 */
function correctPhoneNumber() {
	//get the phone number from the textbox, take only numbers 0-9 from the phone number
	let number = document.getElementById("phone").value.match(/\d/g);

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
		console.log(pair[0] + ": " + pair[1]);  //remove after testing complete
		analyzeData(pair);
	}
	
	//calculate total odds
	if (groups[0] == 3) total += groups[0] ** 2;
	else total += groups[0];

	if (groups[1] == 3) total += groups[1] ** 2;
	else total += groups[1];

	if (groups[2] == 3) total += groups[2] ** 2;
	else total += groups[2];

	if (groups[3] == 2) total += groups[3] ** 2;
	else total += groups[3];

	if (groups[4] == 2) total += groups[4] ** 2;
	else total += groups[4];

	console.log(total);  //remove after testing complete

	//displays the user's risk of having rc
	if (total > 21) document.write("<p>You have a high risk of having Rooster Chills.</p>");
	else if (total > 11) document.write("<p>You have a medium risk of having Rooster Chills.</p>");
	else document.write("<p>You have a low risk of having Rooster Chills.</p>");
}

//checks the data from the form
function analyzeData(data) {
	switch (data[0]) {
		case "firstName": break;		//First Name
		case "lastName": break;			//Last Name
		case "gender": break;			//Gender
		case "age":						//Age
			switch (data[1]) {
				case "0-40":				//Below 40
					total++;
					break;
				case "40-59":				//Between 40 and 59
					total += 2;
					break;
				case "60+":					//Above 60
					total += 3;
					break;
			}
			break;
		case "exposure":				//Exposure
			exposed = data[1] == "yes";
			if (exposed) total++;
			break;
		case "symptoms":				//Symptoms
			switch (data[1]) {
				case "lossOfTaste":			//Loss of taste
				case "lossOfSmell":			//Loss of smell
				case "fever":				//Fever
					groups[0]++;
					break;
				case "shortnessOfBreath":	//Shortness of breath
				case "chestPain":			//Chest pain
				case "cough":				//Cough
					groups[1]++;
					break;
				case "fatigue":				//Fatigue
				case "muscleAche":			//Muscle Ache
				case "headache":			//Headache
					groups[2]++;
					break;
				case "vomiting":			//Vomiting
				case "diarrhea":			//Diarrhea
					groups[3]++;
					break;
				case "runnyNose":			//Runny nose
				case "soreThroat":			//Sore throat
					groups[4]++;
					break;
			}
			break;
		case "phone": break;			//Phone Number
		case "email": break;			//Email
	}
}