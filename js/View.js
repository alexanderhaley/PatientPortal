/* VIEW JS */

$( document ).ready(function() {
	$('body').bootstrapMaterialDesign();

	//Load this page on intialize
	loadView("Medical History");
});

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
