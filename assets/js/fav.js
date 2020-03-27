//Assign bar's user saved here
var barId = [];
var routeArray = [];
var arr = [];

getRouteLocalStorage();
getBarIds()

if (routeArray === null) {
    var routeArray = [];
}
if (barId === null) {
    var barId = []
}

for (var i = 0; i < barId.length; i++) {

    $.ajax({

        url: "https://api.openbrewerydb.org/breweries/" + barId[i],
        method: "GET"

    }).then(function(result) {

        //variables to create a card
        websiteUrl = result.website_url;
        breweryName = result.name;
        breweryType = result.brewery_type;
        street = result.street;
        phone = result.phone;

        createCard(websiteUrl, breweryName, breweryType, street, phone)

        $(document).on("click", "#route-button", function() {
            var favBarId = $(this)[0].attributes[2].value;
            if (routeArray.indexOf(favBarId) < 0) {
                routeArray.push(favBarId);
                saveLocalStorage(routeArray, "routeArray");
                getRouteLocalStorage();
            };

        })
    })
}

$(document).on("click", "#remove-button", function() {
    var removeAttr = $(this)[0].attributes[2].value;

    for (var j = 0; j < arr.length; j++) {
        var arrAttr = arr[j][0].attributes[1].value;
        if (arrAttr === removeAttr) {
            arr[j].empty()

            var removeItem = barId[j];
            console.log(removeItem)
            barId = $.grep(barId, function(value) {
                return value != removeItem;
            })
        }
    }
    localStorage.setItem('favArray', JSON.stringify(barId));
    location.reload();
});

// Get the barId's for the bars the user saved 
function getBarIds() {
    barId = JSON.parse(localStorage.getItem("favArray"));
}

function getRouteLocalStorage() {
    routeArray = JSON.parse(localStorage.getItem("routeArray"));
}

function saveLocalStorage(arr, arrayNum) {
    localStorage.setItem(arrayNum, JSON.stringify(arr));
}

//Create a card for each brewery
function createCard(websiteUrl, breweryName, breweryType, street, phone) {

    var card = $("<div>");
    card.addClass("card align-middle color");
    card.attr("barname", breweryName);

    var cardDividerButtons = $("<div>");
    cardDividerButtons.addClass("card-divider color")

    var cardSection = $("<div>");
    cardSection.addClass("card-section");

    //Creating route button and adding all of its attributes
    var routeButton = $("<button>");
    routeButton.addClass("button change-button");
    routeButton.attr({ id: "route-button", barid: barId });

    //Setting route button text
    routeButton.text("Add To Route");

    //Creating route button and adding all of its attributes
    var removeButton = $("<button>");
    removeButton.addClass("button change-button");
    removeButton.attr({ id: "remove-button", barname: breweryName });

    //Setting favorites button text
    removeButton.text("Remove");

    //Appending buttons to card
    cardDividerButtons.append(removeButton);
    cardDividerButtons.append(routeButton);

    //Append the following data to the card
    cardSection.append("<h5><b>Bar Name:</b> </h5><a target='_blank' href='" + websiteUrl + "'> <h5>" + breweryName + "</h5></a>");
    cardSection.append("<h5><b>Bar Type:</b> " + breweryType + "</h5>");
    cardSection.append("<h5><b>Bar Address:</b> " + street + "</h5>");
    cardSection.append("<h5><b>Phone #:</b> " + phone + "</h5>");

    //Appending card proper location
    card.append(cardSection);
    card.append(cardDividerButtons);

    $("#append-card").append(card);
    $("#append-card").append("<br>");

    arr.push(card)

}