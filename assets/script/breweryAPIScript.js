


 $(document).ready(function () {


$("#SearchButton").on('click', function () {
    $("#searchField").empty();
    event.preventDefault();
   
        var stateinput = $("#searchField").val().trim();
        url = `https://api.openbrewerydb.org/breweries?by_state=${stateinput}`;
        $.ajax({
            url: url,
            method: "GET"
        }).done(function (response) {
            console.log(response);

        });
    
});

});
