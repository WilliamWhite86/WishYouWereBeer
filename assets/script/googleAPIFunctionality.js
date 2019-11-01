$(document).ready(function () {
    var lat;
    var lng;
    var destination = "231 Corporate Dr., Portsmouth, NH"
    apiKey = "AIzaSyAU_8wi9cIK0CHy40pS_wW2X6lGnc81pkg"
    url = `https://cors-anywhere.herokuapp.com/https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`;
    $.ajax({
        url: url, 
        method: "POST",  
        headers: {'Access-Control-Allow-Origin': '*' },
        
    }).done(function (response) {
        
        console.log(response);
        lat = response.location.lat;
        lng = response.location.lng;
    });
});