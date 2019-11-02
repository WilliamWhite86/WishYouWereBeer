$(document).ready(function() {

    var arr = JSON.parse(localStorage.getItem("myarea")) || [];

    renderMyPlaces();







    state = "New Hampshire"
    url = `https://api.openbrewerydb.org/breweries?by_state=new_hampshire`;
    $.ajax({
        url: url,
        method: "GET"
    }).done(function(response) {
        console.log(response);
    });


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


        setTimeout(function() {

            overlay.remove();

        }, 3000);
    };


    // function removeOverlay() {

    // }










    srx.on("click", function() {



        displayOverlay('<img src="https://media.giphy.com/media/21I1WgRqKQaT8TRdmq/giphy.gif">');






        var sound = new Audio("assets/bottle_sound.wav");

        sound.play();

        console.log("working");



    });


    // giphyKey = "hoKvwwGpkod07r23TMg1Ksg56Kzt7RNH";

    $("#SearchButton").on('click', function() {
        $("#searchField").empty();
        $("#names").empty();
        event.preventDefault();

        addPlace();


        var stateinput = $("#searchField").val().trim();




        url = `https://api.openbrewerydb.org/breweries?by_state=${stateinput}`;
        $.ajax({
            url: url,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            Object.values(response).forEach((value) => {
                var place = $("<tr>");
                console.log(value.name);
                place.text(value.name);
                $("#names").append(place);




            });
        });
    });

    $("#searchHistoryField").on("change", function() {
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