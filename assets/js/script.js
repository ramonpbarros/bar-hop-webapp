//Variables from data
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

function getBreweryData(zipCodeSearch){
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_postal=" + zipCodeSearch,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
}
getBreweryData("92123");
