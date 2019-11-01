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
            console.log(value.name);
            place.text(value.name);
            $("#names").append(place);
            });
        });
    });
});

