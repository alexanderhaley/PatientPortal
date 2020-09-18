/* VIEW JS */

$( document ).ready(function() {
	$('body').bootstrapMaterialDesign();

	setupLoginPageLogic();
});

function showMain () {
	$("div.main").show();
}

function hideLoginPage (loginPageHiddenCallback) {
	$("div.loginPage").fadeOut(300, loginPageHiddenCallback);
}

function showSidenav () {
	$("div.sidenav").fadeIn();
}

/**
 * We can choose what page to load based on what code the user enters
 */
function clickedLoginContinue () {
	var codeEntered = getLoginPageCode();

	// Code we should use the first time the user logs in
	var firstLoginCode = "1234";

	// Code we should use the second time the user logs in
	var secondLoginCode = "5678";

	if (codeEntered === firstLoginCode) {
		userLoggedInTheFirstTime();
	} else if (codeEntered === secondLoginCode) {
		userLoggedInSecondTime();
	}

	/**
	 * Use this function to set the pages up the first time the user logs in
	 */
	function userLoggedInTheFirstTime () {
		hideLoginPage(() => {
			showSidenav();
			showMain();
		});

		loadView("General Information");
	}

	/**
	 * Use this function to set the pages up the second time the user logs in
	 */
	function userLoggedInSecondTime () {
		userLoggedInTheFirstTime();
	}
}

function setupLoginPageLogic () {
	var inputs = $("div.loginPage input");
	var continueButton = $('div.loginPage button');

	setUpEventListeners();
	focusFirstDigit();

	function setUpEventListeners () {
		inputs[0].addEventListener("input", inputEvent => focusNextInputIfEntered(inputEvent, 1));
		inputs[1].addEventListener("input", inputEvent => focusNextInputIfEntered(inputEvent, 2));
		inputs[2].addEventListener("input", inputEvent => focusNextInputIfEntered(inputEvent, 3));
		inputs[3].addEventListener("input", enteredLastCodeDigit);
	}

	function focusFirstDigit() {
		inputs[0].focus();
	}

	function focusNextInputIfEntered (inputEvent, nextIndexToFocus) {
		var inputValue = inputEvent.target.value;
		var inputIsEmpty = inputValue === "";

		if (!inputIsEmpty) {
			inputs[nextIndexToFocus].focus();
		}
	}

	function enteredLastCodeDigit () {
		continueButton.focus();
		continueButton[0].style.opacity = "1";
	}
}

function getLoginPageCode () {
	var inputs = $("div.loginPage input");
	
	var code = "";
	code += inputs[0].value;
	code += inputs[1].value;
	code += inputs[2].value;
	code += inputs[3].value;

	return code;
}

function loadView( viewName ){
	$(".link").css("fontWeight","400");
	$(".section").hide();
	switch(viewName) {
		case "Upcoming Appointments":
			$("#upcommingAppointments").show();
			break;
		case "General Information":
			$("#generalInformation").show();
			break;
		case "Personal Health History":
			$("#personalHealthHistory").show();
			break;
		case "Medical History":
			$("#medicalHistory").show();
			break;
		case "Family Medical History":
			$("#familyMedicalHistory").show();
			break;
		case "Social History":
			$("#socialHistory").show();
			break;
		case "Personal Safety":
			$("#personalSafety").show();
			break;
		case "Other Information":
			$("#otherInformation").show();
			break;
		default:
			document.write("404 Page Not Found");
	}
}

function markAsSaved(viewName){
	switch(viewName) {
		case "Upcoming Appointments":
			break;
		case "General Information":
			$("#generalInformation_circle").removeClass( "openCircle" );
			$("#generalInformation_circle").addClass( "selectedCircle" );
			break;
		case "Personal Health History":
			$("#personalHealthHistory_circle").removeClass( "openCircle" );
			$("#personalHealthHistory_circle").addClass( "selectedCircle" );
			break;
		case "Medical History":
			$("#medicalHistory_circle").removeClass( "openCircle" );
			$("#medicalHistory_circle").addClass( "selectedCircle" );
			break;
		case "Family Medical History":
			$("#familyMedicalHistory_circle").removeClass( "openCircle" );
			$("#familyMedicalHistory_circle").addClass( "selectedCircle" );
			break;
		case "Social History":
			$("#socialHistory_circle").removeClass( "openCircle" );
			$("#socialHistory_circle").addClass( "selectedCircle" );
			break;
		case "Personal Safety":
			$("#personalSafetyCircle").removeClass( "openCircle" );
			$("#personalSafetyCircle").addClass( "selectedCircle" );
			break;
		case "Other Information":
			$("#otherInformationCircle").removeClass( "openCircle" );
			$("#otherInformationCircle").addClass( "selectedCircle" );
			break;
	}
}
let diseases = [
	"Alcohol Abuse",
	"Bowel Disorder",
	"Hepatitis C",
	"Migraines",
	"Anemia",
	"Breast Cancer",
	"High Blood Pressure",
	"Osteoporosis",
	"Anxiety Disorder",
	"Cervical Cancer",
	"High Cholesterol",
	"Prostate Cancer",
	"Arthritis",
	"Colon Cancer",
	"HIV",
	"Reflux / Gerd",
	"Asthma",
	"Depression",
	"Hives",
	"Seizures",
	"Autoimmune Problems",
	"Diabetes",
	"Kidney Disease",
	"Severe Allergy",
	"Birth Defects",
	"Hearing Impairment",
	"Liver Cancer",
	"STD",
	"Bladder Problems",
	"Heart Attack",
	"Liver Disease",
	"Skin Cancer",
	"Bleeding Disease",
	"Heart Pain / Angina",
	"Lung Cancer",
	"Other",
	"Blood Transfusions",
	"Hepatitis B",
	"Mental Illness"
];

function loadDiseases( id ){
	let table = "<div class='table'>";
	table += "<div class='row'>";
	let j = 0;
	for(let i = 0; i < diseases.length; i++){
		table += "<div class='cell align-left'>";
		table += "<input type='checkbox' id='"+id+i+"' class='chk-btn' />";
		table += "<label for='"+id+i+"'>"+diseases[i]+"</label>";
		table += "</div>";
		j++;
		if( j == 4 && i+1 < diseases.length ){
			table += "</div>";
			table += "<div class='row'>";
			j = 0;
		}
	}
	table += "</div>";
	table += "</div>";
	$("#"+id).html(table);
}


 
loadDiseases("yourDiseases");
