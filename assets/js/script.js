//Variables to store data retrieved
var id;
var name;
var breweryType;
var street;
var city;
var state;
var postalCode;
var country;
var lon;
var lat;
var phone;
var websiteUrl;

//Var of user input to store zip code
var zipCodeInput;
var typeInput;
// zip code search: #zip-code
// search button: #search-button
var zipCodeFromTextBoxID = "zip-code";
var searchButtonID = "search-button";

//===================== Functions =======================================
// get Input from text box on Search click
function getZipCodeInput(zipCodeFromText){
    var zipCodeInput = $("#" + zipCodeFromText).val().trim();
    return zipCodeInput;
}
//get the text of type of bar selected
function getBarTypeValue(barTypeFromDropID){
    $("#" + barTypeFromDropID).change(function(){
        var selectedText = $(this).find("option:selected").text();
        return selectedText;
    })
}
//Search by zip code only
function getBreweryDataUsingZip(zipCodeSearch){
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_postal=" + zipCodeSearch,
        method: "GET"
    }).then(function(response){
        return response;
    })
}
//Search by zip code and type
function getBreweryDataUsingZipAndType(zipCodeSearch,type){
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_postal=" + zipCodeSearch + "&by_type=" + type,
        method: "GET"
    }).then(function(response){
        return response;
    })
}
//========================== End Functions ======================================================
// ========================= Events ============================

// ========================= End Events
getBreweryDataUsingZip("92123");
