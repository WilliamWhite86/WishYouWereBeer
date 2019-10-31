$(document).ready(function() {
    state = "New Hampshire"
    url = `https://api.openbrewerydb.org/breweries?by_state=new_hampshire`;
    $.ajax({
        url: url,
        method: "GET"
    }).done(function(response) {
        console.log(response);
    });


    var srx = $("#SearchButton")

    srx.on("click", function() {

        var sound = new Audio("assets/bottle_sound.wav");

        sound.play();

        console.log("working");



    });
});