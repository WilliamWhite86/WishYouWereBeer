$(document).ready(function () {
$("#SearchButton").on('click', function () {
    $("#searchField").empty();
    $("#names").empty();
    event.preventDefault();
        var stateinput = $("#searchField").val().trim();
        url = `https://api.openbrewerydb.org/breweries?by_state=${stateinput}`;
        $.ajax({
            url: url,
            method: "GET"
        }).done(function (response) {
            console.log(response);
        Object.values(response).forEach((value) => {
            var place = $("<tr>");
            var name = $("<td>");
            var website = $("<td>");
            console.log(value.name);
            name.text(value.name);
            website.text(value.website_url)
            $("#names").append(place);
            place.append(name, website);
            
            var destination = value.street + value.city;
            console.log(destination);
            apiKey = "AIzaSyAU_8wi9cIK0CHy40pS_wW2X6lGnc81pkg"
            $.get("https://ipinfo.io", function (response) {
                console.log(response.ip, response.country);
                city = response.city;
                region = response.region;
            
                url2 = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${city},${region}&destinations=${destination}&key=${apiKey}`
        
                $.ajax({
                    url: url2,
                    method: "POST",
                }).done(function (response) {
                    
                    var distanceArray = [];
                    distanceArray.push(response.rows[0].elements[0].distance.text);
                    console.log(distanceArray);
                    for (var i = 0; i < distanceArray.length; i++){
                        var distance = $("<td>");
                        distance.text(distanceArray[i]);
                        place.append(distance);
                    }

                    //place.append(destination);
                    //place.append(distance);

                });
            }, "jsonp")


            });
        });
    });
});

