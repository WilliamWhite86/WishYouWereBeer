$(document).ready(function () {
    var destination = "231 Corporate Dr., Portsmouth, NH"
    apiKey = "AIzaSyAU_8wi9cIK0CHy40pS_wW2X6lGnc81pkg"
    url = `https://cors-anywhere.herokuapp.com/https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`;
    $.get("https://ipinfo.io", function (response) {
        city = response.city;
        region = response.region;
    
        url2 = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${city},${region}&destinations=${destination}&key=${apiKey}`

        $.ajax({
            url: url2,
            method: "POST",
        }).done(function (response) {
            console.log(response);
        });
    }, "jsonp")
});