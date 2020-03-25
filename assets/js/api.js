// =======================================For Testing===============================
var barId = [5494, 299, 2, 44]


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

    barCoords.push(result.name)
    barCoords.push(parseFloat(result.latitude))
    barCoords.push(parseFloat(result.longitude))

    firstBarLat = barCoords[1]
    firstBarLng = barCoords[2]
    displayMap(firstBarLat,firstBarLng)

})

//Creates map
function displayMap(lat, lng){

    //Creates and display a new map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},
        zoom: 15
    });

}
