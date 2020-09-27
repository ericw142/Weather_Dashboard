// Function that takes value of search text input, runs ajax query to Weather API
// Within .then, organizes that data and generates elements on the page
// Last, generates an li with an event listener to redo this
$(document).ready(function() {
    function clearAll() {
        $("#overview").empty();
    }

    function citySearch(){
        var apikey = "7f0107959f91d24fd331487876d42456";
        var city = $("#search").val();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + apikey;

        clearAll();

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            var overview = $("#overview");
            // Convert Kelvin to Farenheit
            var F = (response.main.temp - 273.15) * 1.80 + 32;
            // Generate Weather Overview
            var title = $("<h4>");
            title.text(response.name);
            overview.append(title);
            // Temperature
            var p = $("<p>");
            p.text("Temperature: " + F);
            overview.append(p);
            // Humidity
            var h = $("<p>");
            h.text("Humidity: " + response.main.humidity + "%");
            overview.append(h);
            // Wind
            var w = $("<p>");
            w.text("Wind Speed: " + response.wind.speed + "MPH");
            overview.append(w);

            var nextQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude={part}&appid=" + apikey;
            $.ajax({
                url: nextQuery,
                method: 'GET'
            }).then(function(response){
                // UV Index
                var uv = $("<p>");
                console.log(response.current.uvi);
                uv.text("UV Index: " + response.current.uvi);
                overview.append(uv);

                // Generate Forecast
            })


            
    
            // Generate li button
        })
    };
    
    $("#searchBtn").on("click", function(){
        citySearch();
    });

    $("#search").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            citySearch();
        }
    });
});


