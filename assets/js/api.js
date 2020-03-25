// =======================================For Testing===============================
var barId = [286, 430, 573, 814, ]


//To test values saved in local storage
function saveBarIds(){
    localStorage.setItem("barId", JSON.stringify(barId))
}

saveBarIds()



// =======================================Actual code==============================

//Assign bar's user saved here
var barId = [];

//Assign name coords for each of the bars used here 
var barCoords = [];

var firstBarLat;
var firstBarLng;

var nextBarLat;
var nextBarLng;

//Marker labels
var markerLabels = "ABCDEFIGHIJKLMNOPQRSTUVWXYZ";
var markerLabelsIndex = 0;

//Global variable map is set as
var map;

//Get the barId's for the bars the user saved 
function getBarIds(){
    barId = JSON.parse(localStorage.getItem("barId"));
}


getBarIds()


// Make an ajax request for the first id's name lat and lng
$.ajax({

    url: "https://api.openbrewerydb.org/breweries/" + barId[0],
    method: "GET"

}).then(function(result){

    //Saving lat and lng to firstBar variables
    firstBarLat = parseFloat(result.latitude)
    firstBarLng = parseFloat(result.longitude)

    //Creates a map for using the first bar as the center
    displayMap(firstBarLat,firstBarLng)

    //Creating a marker for that first bar
    displayMarker(firstBarLat,firstBarLng)

    //Ajax call for lat and lng of the rest if the bars
    for(var i = 1; i < barId.length;i++){

        $.ajax({
            
            url: "https://api.openbrewerydb.org/breweries/" + barId[i],
            method: "GET"
            
        }).then(function(result){
            var nextBarLat = parseFloat(result.latitude)
            var nextBarLng = parseFloat(result.longitude)
            displayMarker(nextBarLat, nextBarLng)
        })
    } 
})

//Creates map based on the first bar saved
function displayMap(lat, lng){

    //Creates and displays a new map
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: lat, lng: lng},
        zoom: 10
    });
}

//Displays a marker on each of the  bars saved
function  displayMarker(lat, lng){

    //Creates a new marker
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng}, 
        map: map,
        label: markerLabels.charAt(markerLabelsIndex)
    });

    //Moves onto the next label
    markerLabelsIndex++
}

