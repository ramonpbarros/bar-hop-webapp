//Variables to store data retrieved
var barId;
var breweryName;
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

var favArray = []
var routeArray = []
getFavLocalStorage();
getRouteLocalStorage();

if (favArray === null) {
    var favArray = []
}
if (routeArray === null) {
    var routeArray = []
}
console.log(favArray, routeArray);

//===================== Functions =======================================
// get Input from text box on Search click
function getZipCodeInput(zipCodeFromText) {
    var zipCodeInput = $(zipCodeFromText).val().trim();
    console.log(zipCodeInput);// Works
    return zipCodeInput;
}
//Search by zip code only
function getBreweryDataUsingZip(zipCodeSearch) {
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_postal=" + zipCodeSearch,
        method: "GET"
    }).then(function (response) {

        //Create a card for each reutrned bar
        for (var i = 0; i < response.length; i++) {

            //Saving ajax data in each variable
            websiteUrl = response[i].website_url
            breweryName = response[i].name
            breweryType = response[i].brewery_type
            street = response[i].street
            phone = response[i].phone
            barId = response[i].id

            //Creating card elements and giving them their proper style
            var card = $("<div>")
            card.addClass("card align-middle color")

            var cardDividerButtons = $("<div>")
            cardDividerButtons.addClass("card-divider color")

            var cardSection = $("<div>")
            cardSection.addClass("card-section")


            //Creating route button and adding all of its attributes
            var routeButton = $("<button>")
            routeButton.addClass("button change-button")
            routeButton.attr({ id: "route-button", barid: barId })
            routeButton.attr("barid", barId)


            //Setting route button text
            routeButton.text("Add To Route")


            //Creating route button and adding all of its attributes
            var favoritesButton = $("<button>")
            favoritesButton.addClass("button change-button")
            favoritesButton.attr({ id: "favorites-button", barid: barId })
            // favoritesButton.attr("barid", barId)

            //Setting favorites button text
            favoritesButton.text("Add To Favs")


            //Appending buttons to card
            cardDividerButtons.append(favoritesButton)
            cardDividerButtons.append(routeButton)

            //Append the following data to the card
            cardSection.append("<h5>Bar Name: </h5><a target='_blank' href='" + websiteUrl + "'> <h5>" + breweryName + "</h5></a>")
            cardSection.append("<h5> Bar Type: " + breweryType + "</h5>")
            cardSection.append("<h5> Bar Address: " + street + "</h5>")
            cardSection.append("<h5> Phone #:" + phone + "</h5>")


            //Appending card proper location
            card.append(cardSection)
            card.append(cardDividerButtons)
            $("#append-card").append(card)
            $("#append-card").append("<br>");
        }
        $(document).on("click", "#favorites-button", function () {
            var favBarId = $(this)[0].attributes[2].value;
            if (favArray.indexOf(favBarId) < 0) {
                favArray.push(favBarId);
                saveLocalStorage(favArray, "favArray");
                getFavLocalStorage();
            };
        })
        $(document).on("click", "#route-button", function () {
            var favBarId = $(this)[0].attributes[2].value;
            if (routeArray.indexOf(favBarId) < 0) {
                routeArray.push(favBarId);
                saveLocalStorage(routeArray, "routeArray");
                getRouteLocalStorage();
            };

        })

    })
}
function getFavLocalStorage() {
    favArray = JSON.parse(localStorage.getItem("favArray"));    
}
function getRouteLocalStorage() {
    routeArray = JSON.parse(localStorage.getItem("routeArray"));
}
function saveLocalStorage(arr, arrayNum) {
    localStorage.setItem(arrayNum, JSON.stringify(arr));
}
//Search by zip code and type
function getBreweryDataUsingZipAndType(zipCodeSearch, type) {
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_postal=" + zipCodeSearch + "&by_type=" + type,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        //return response;
    })
}
//========================== End Functions ======================================================
// ========================= Events ============================
// Event when search button is pressed
$("#search-button").on("click", function () {
    $("#append-card").empty();
    zipCodeInput = getZipCodeInput("#zip-code");
    typeInput = $("#bar-type").val();
    console.log(typeInput);
    if (typeInput === "all") {
        data = getBreweryDataUsingZip(zipCodeInput);
        // console.log(data)
    } else {
        data = getBreweryDataUsingZipAndType(zipCodeInput, typeInput);
        // console.log(data);
    }
    // console.log(data);
})


//When 




//When 


//Add to add to favs button is clicked 

//Save that bars id to local storage under the favoritesId key





// ========================= End Events