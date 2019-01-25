function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 

function load() {
    
    /*For the sake of example, I have put the sample json file on an online 
    	server to load it in and avoid chrome issues with cross origins.*/
    loadJSON("https://api.myjson.com/bins/qwyg4", function(response) {
        var patient = JSON.parse(response);
        
        //Retrieving patient name
        var firstName = patient.name[0].given;
        var lastName = patient.name[0].family;
        var fullName = firstName + ' ' + lastName;
        document.getElementById('name').innerHTML = "Name of patient: " + fullName;

        //Retrieving organization name
        var organization = patient.managingOrganization.display;
        document.getElementById('organization').innerHTML = "Organization name: " + organization;

        //Retrieving gender
        var gender = patient.gender;
        document.getElementById('gender').innerHTML = "Gender: " + gender;

        //Retrieving number of condition
        var numOfConditions = patient.conditions.length;
        document.getElementById('numOfConditions').innerHTML = "Number of conditions they have: " + numOfConditions;

        //Retrieving conditions
        var conditions = [];
        for (i = 0; i < numOfConditions; i++) {
        	conditions.push(patient.conditions[i]);
        }

        var allConditions = "";

        for (i = 0 ; i < conditions.length; i++) {
       		 allConditions += "- " + conditions[i] + "<br>";
        }

        document.getElementById('conditions').innerHTML = "List of all conditions: " + "<br>" + allConditions ;



    });
 
}

load();