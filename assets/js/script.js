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
var data;
// zip code search: #zip-code
// search button: #search-button
var zipCodeFromTextBoxID = "#zip-code";
var searchButtonID = "#search-button";

var card = $("<div class='card align-middle color'>")
var cardDivider = $("<div class='card-divider color'>")
var cardDividerButtons = $("<div class='card-divider color'>")
var cardSection = $("<div class='card-section'>")

//===================== Functions =======================================
// get Input from text box on Search click
function getZipCodeInput(zipCodeFromText){
    var zipCodeInput = $(zipCodeFromText).val().trim();
    console.log(zipCodeInput);// Works
    return zipCodeInput;
}
//Search by zip code only
function getBreweryDataUsingZip(zipCodeSearch){
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_postal=" + zipCodeSearch,
        method: "GET"
    }).then(function(response){
        var arr = response;
        // Create an array of cards
        for(var i = 0; i < response.length; i++){
            $(card).append(cardDivider)
            $(cardSection).append("<a href='"+response[i].url+"'> <h5>Bar Name: "+response[i].name+"</h5></a>")
            $(cardSection).append("<h5> Bar Type: "+response[i].brewery_type+"</h5>")
            $(cardSection).append("<h5> Bar Address: "+response[i].street+"</h5>")
            $(cardSection).append("<h5> Phone #:"+response[i].phone+"</h5>")
            $(cardDividerButtons).append("<a class='button primary ' id='favorites-button' style='margin-bottom: 16px;'>Add To Favs</a>")
            $(cardDividerButtons).append("<a class='button primary ' id='route-button' style='margin-bottom: 16px;'>Add To Route</a>")
            $(card).append("<br>");
            $(card).append(cardSection)
            $(card).append(cardDividerButtons)
            $("#append-card").append(card)
        }
        // Create cards for each element in the array
        console.log(response)
       
    })
}
//Search by zip code and type
function getBreweryDataUsingZipAndType(zipCodeSearch,type){
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_postal=" + zipCodeSearch + "&by_type=" + type,
        method: "GET"
    }).then(function(response){
        // console.log(response);
        //return response;
    })
}
//========================== End Functions ======================================================
// ========================= Events ============================
// Event when search button is pressed
$("#search-button").on("click", function(){
    zipCodeInput = getZipCodeInput("#zip-code");
    typeInput = $("#bar-type").val();
    console.log(typeInput);
    if(typeInput === "all"){
        data = getBreweryDataUsingZip(zipCodeInput);
        // console.log(data)
    }else{
        data = getBreweryDataUsingZipAndType(zipCodeInput,typeInput);
        // console.log(data);
    }
    // console.log(data);
})
// ========================= End Events
