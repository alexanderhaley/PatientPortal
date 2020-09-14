/* VIEW JS */

$( document ).ready(function() {
	//Load this page on intialize
   loadView("Upcoming Appointments");
});

function loadView( viewName ){
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