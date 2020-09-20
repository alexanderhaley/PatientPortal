/* VIEW JS */

$( document ).ready(function() {
	$('body').bootstrapMaterialDesign();

	setupLoginPageLogic();
});

function showMain () {
	$("div.main").fadeIn(400);
}

function hideLoginPage (loginPageHiddenCallback) {
	$("div.loginPage").fadeOut(400, loginPageHiddenCallback);
}

function showSidenav () {
	$("div.sidenav").fadeIn(400);
}

function unhideFirstUpcomingAppointmentsPage () {
	$("section#upcommingAppointments div.centerSection.firstSignIn").show();
}

function unhideSecondUpcomingAppointmentsPage () {
	$("section#upcommingAppointments div.centerSection.secondSignIn").show();
}

function unhidePastAppointments () {
	setupLastMenuItemWithUnderline();
	$("div.sidenav div#navigation div.row.pastAppointments").css("display", "table-row");

	function setupLastMenuItemWithUnderline () {
		$("div.sidenav div#navigation div.row.personalSafety div.cell").addClass("buttonWithUnderline");
	}
}

function getAllInputFields () {
	var inputValues = $("div.main input").map((index, element) => {
		if (element.type === "text" || element.type === "email" || element.type === "date") {
			return {
				type: element.type,
				value: element.value
			};
		} else if (element.type === "radio" || element.type === "checkbox") {
			return {
				type: element.type,
				checked: element.checked
			};
		}
	});

	return inputValues;
}

function loadInputValuesFromLocalStorage () {
	var stringifiedInputValues = localStorage.getItem("inputValues");
	var storedInputValues = JSON.parse(stringifiedInputValues);

	$("div.main input").each((index, element) => {
		if (element.type === "text" || element.type === "email" || element.type === "date") {
			element.value = storedInputValues[index].value;

			if (element.value !== "") {
				var parentElement = element.parentElement;
				if (parentElement.className.includes("bmd-form-group")) {
					parentElement.classList.add("is-filled");
				}
			}
		} else if (element.type === "radio" || element.type === "checkbox") {
			element.checked = storedInputValues[index].checked;
		}
	});
}

function saveInputValuesToLocalStorage () {
	var inputValues = $.makeArray(getAllInputFields());
	var stringifiedInputValues = JSON.stringify(inputValues);

	localStorage.setItem("inputValues", stringifiedInputValues);
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
}

/**
 * Use this function to set the pages up the first time the user logs in
 */
function userLoggedInTheFirstTime () {
	hideLoginPage(() => {
		showSidenav();
		showMain();
		unhideFirstUpcomingAppointmentsPage();
	});

	loadView("General Information");
}

/**
 * Use this function to set the pages up the second time the user logs in
 */
function userLoggedInSecondTime () {
	loadInputValuesFromLocalStorage();
	hideLoginPage(() => {
		showSidenav();
		showMain();
		unhideSecondUpcomingAppointmentsPage();
		unhidePastAppointments();
	});

	loadView("Upcoming Appointments");
	markAllPagesAsSaved();
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
	window.scrollTo(0, 0)
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
		case "Past Appointments":
			$("#pastAppointments").show();
			break;
		default:
			document.write("404 Page Not Found");
	}
}

function markAllPagesAsSaved () {
	markAsSaved("Upcoming Appointments");
	markAsSaved("General Information");
	markAsSaved("Personal Health History");
	markAsSaved("Medical History");
	markAsSaved("Family Medical History");
	markAsSaved("Social History");
	markAsSaved("Personal Safety");
	markAsSaved("Past Appointments");
}

function markAsSaved(viewName){
	saveInputValuesToLocalStorage();
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
		case "Past Appointments":
			$("#pastAppointmentsCircle").removeClass( "openCircle" );
			$("#pastAppointmentsCircle").addClass( "selectedCircle" );
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
loadDiseases("familyDiseases");
