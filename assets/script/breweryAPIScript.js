
$(document).ready(function () {
        
        $(document).on('click', '.maplocation', function () {
        var lati = $(this).attr("data-lat");
        var long = $(this).attr("data-lon");
        // // Initialize and add the map

        // // The location of location
        var location = { lat: parseFloat(lati), lng: parseFloat(long) };
        // // The map, centered at location
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 15, center: location });
        // // The marker, positioned at the location
        //var marker = new google.maps.Marker({ position: location, map: map })
        });
    
    var arr = JSON.parse(localStorage.getItem("myarea")) || [];
    var placeObj = [];
    
    function renderMyPlaces() {
        $("#searchHistoryField").empty();
        console.log("working");
        for (i = 0; i < arr.length; i++) {
            var newEl = $("<option>");
            newEl.text(arr[i])
            newEl.prependTo("#searchHistoryField");
        }
    };
    renderMyPlaces();
    $("#SearchButton").on('click', function () {
        // $("#searchField").empty();
        $("#names").empty();
        event.preventDefault();
        renderMyPlaces();
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

            $(img).css({

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
            Object.values(response).forEach((value) => {

                var place = {};
                place.name = value.name;
                place.website = value.website_url;
                place.longitude = value.longitude;
                place.latitude = value.latitude;

                var destination = value.street + value.city;
                apiKey = "AIzaSyAU_8wi9cIK0CHy40pS_wW2X6lGnc81pkg"
                $.get("https://ipinfo.io", function (response) {
                    city = response.city;
                    region = response.region;

                    url2 = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${city},${region}&destinations=${destination}&key=${apiKey}`

                    $.ajax({
                        url: url2,
                        method: "POST",
                    }).done(function (response) {
                        var distanceArray = [];
                        distanceArray.push(response.rows[0].elements[0].distance.text);
                        for (var i = 0; i < distanceArray.length; i++) {
                            place.distance = parseInt(distanceArray[i].split(" ")[0]);

                        }
                        $("#searchHistoryField").empty();
                    });
                }, "jsonp")
                placeObj.push(place);



            });
            setTimeout(sortList, 3500);
            function sortList() {
                placeObj.sort(function (a, b) {
                    return a.distance - b.distance;
                });
            };

            setTimeout(printList, 4000)
            function printList() {
                Object.values(placeObj).forEach((value) => {
                    var place = $("<tr>");
                    place.addClass("maplocation")
                    var name = $("<td>");
                    var website = $("<td>");
                    var distance = $("<td>");                    
                    place.attr("data-lat", value.latitude)
                    place.attr("data-lon", value.longitude)
                    name.text(value.name);
                    website.text(value.website)
                    distance.text(value.distance + " miles")
                    place.append(name, website, distance);
                    $("#names").append(place);
                })
            }

        });

        $("#searchHistoryField").on("change", function () {
        });

        function addPlace() {
            var stateinput = $("#searchField").val().trim();
            arr.push(stateinput);
            localStorage.setItem("myarea", JSON.stringify(arr));
            renderMyPlaces();
        }
        // function renderMyPlaces() {
        //     $("#searchHistoryField").empty();
        //     console.log("working");
        //     for (i = 0; i < arr.length; i++) {
        //         var newEl = $("<option>");
        //         newEl.text(arr[i])
        //         newEl.prependTo("#searchHistoryField");
        //     }
        // };
    });
});