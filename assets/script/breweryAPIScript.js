$(document).ready(function () {
    state = "New Hampshire"
    url = `https://api.openbrewerydb.org/breweries?by_state=new_hampshire`;
    $.ajax({
        url: url,
        method: "GET"
    }).done(function (response) {
        Object.values(response).forEach((value) => {
            var place = $("<tr>");
            console.log(value.name);
            place.text(value.name);
            $("#test").append(place);
        });
    });
});