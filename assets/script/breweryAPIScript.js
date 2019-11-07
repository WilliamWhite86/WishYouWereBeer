
$(document).ready(function () {
    $(document).on('click', '.maplocation', function () {
        console.log("test")
        var lati = $(this).attr("data-lat");
        var long = $(this).attr("data-lon");
        // Initialize and add the map
        console.log(parseFloat(lati), parseFloat(long))

        // The location of location
        var location = { lat: parseFloat(lati), lng: parseFloat(long) };
        // The map, centered at location
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 15, center: location });
        // The marker, positioned at the location
        var marker = new google.maps.Marker({ position: location, map: map });


    })
    var arr = JSON.parse(localStorage.getItem("myarea")) || [];

    $("#SearchButton").on('click', function () {
        $("#searchField").empty();
        $("#names").empty();
        event.preventDefault();

        var srx = $("#SearchButton");

        var pic = $(".overlay");

        function displayOverlay(img) {
            var overlay = $("<div>").css({
                "position": "fixed",
                "top": 0,
                "left": 0,
                "width": "100%",
                "height": "100%",
                "background-color": "rgba(0,0,0,.5)",
                "z-index": 10000,
                "vertical-align": "middle",
                "color": "#fff",
                "font-size": "30px",
                "font-weight": "bold",
                "cursor": "wait",

            }).appendTo("body");

            var pic = $(img).css({

                "position": "fixed",
                "left": "25%",
                "margin": "auto",
                "z-index": 10001,
                "width": "50%"

            }).appendTo(overlay);


            setTimeout(function () {

                overlay.remove();

            }, 3000);
        };


        displayOverlay('<img src="https://media.giphy.com/media/21I1WgRqKQaT8TRdmq/giphy.gif">');

        var sound = new Audio("assets/bottle_sound.wav");
        sound.play();

        console.log("working");
        $("#searchField").empty();
        $("#names").empty();
        event.preventDefault();

        addPlace();

        var stateinput = $("#searchField").val().trim();
        url = `https://api.openbrewerydb.org/breweries?by_state=${stateinput}`;
        $.ajax({
            url: url,
            method: "GET"
        }).done(function (response) {
            console.log(response);

            Object.values(response).forEach((value) => {
                var place = $("<tr>");
                place.attr("data-lat", value.latitude)
                place.attr("data-lon", value.longitude)
                place.addClass("maplocation")
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
                        for (var i = 0; i < distanceArray.length; i++) {
                            var distance = $("<td>");
                            distance.text(distanceArray[i]);
                            place.append(distance);
                        }

                        //place.append(destination);
                        //place.append(distance);
                        $("#searchHistoryField").empty();
                    });
                }, "jsonp")




            });
        });

        $("#searchHistoryField").on("change", function () {
            var city = $(this).val();
            console.log(city);
        });

        function addPlace() {

            var stateinput = $("#searchField").val().trim();

            arr.push(stateinput);

            localStorage.setItem("myarea", JSON.stringify(arr));

            renderMyPlaces();
        }

        function renderMyPlaces() {

            $("#searchHistoryField").empty();

            for (i = 0; i < arr.length; i++) {

                var newEl = $("<option>");


                newEl.text(arr[i])

                newEl.prependTo("#searchHistoryField");

            }












        };





    });
});