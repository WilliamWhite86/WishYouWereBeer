$(document).ready(function () {
    state = "New Hampshire"
    url = `https://api.openbrewerydb.org/breweries?by_state=${state}`;
    $.ajax({
        url: url,
        method: "GET"
    }).done(function (response) {
        console.log(response);
    });
});