$(document).ready(function() {
    function clearAll() {
        $("#overview").empty();
        $("#forecast").empty();
    }

    function citySearch(){
        var apikey = "7f0107959f91d24fd331487876d42456";
        var city = $("#search").val();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + apikey;
        clearAll();

        // Ajax to get the latitude and longitude
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {

            var overview = $("#overview");
            // Convert Kelvin to Farenheit
            var F = (response.main.temp - 273.15) * 1.80 + 32;
            // Generate Weather Overview
            var title = $("<h4>");

            var today = new Date();
            var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();

            title.text(response.name + " " + "(" + date + ")");
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

            generateForecast(response.coord.lat, response.coord.lon);

            // Creates an li with an event listener to redo the citysearch() with the current text as the city
            var li = $("<li>");
            li.text(city);
            li.on("click", function(){
                var apikey = "7f0107959f91d24fd331487876d42456";
                var name = $(this).text();
                var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=" + apikey;

                clearAll();

                $.ajax({
                    url: queryURL,
                    method: 'GET'
                }).then(function(response) {
        
                    var overview = $("#overview");
                    // Convert Kelvin to Farenheit
                    var F = (response.main.temp - 273.15) * 1.80 + 32;
                    // Generate Weather Overview
                    var title = $("<h4>");
        
                    var today = new Date();
                    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
        
                    title.text(response.name + " " + "(" + date + ")");
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
        
                    generateForecast(response.coord.lat, response.coord.lon);
                });
            });
            $("#prevSearch").prepend(li);
        });
    }

    // Functions to get the next five days from today
    function GetDates(startDate, daysToAdd) {
        var aryDates = [];
    
        for (var i = 0; i <= daysToAdd; i++) {
            var currentDate = new Date();
            currentDate.setDate(startDate.getDate() + i);
            aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear());
        }
    
        return aryDates;
    }
    function MonthAsString(monthIndex) {
        var d = new Date();
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
    
        return month[monthIndex];
    }
    function DayAsString(dayIndex) {
        var weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";
    
        return weekdays[dayIndex];
    }
    // Generate Forecast
    function generateForecast(x, y) {
        var apikey = "7f0107959f91d24fd331487876d42456";
        var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + x + "&lon=" + y + "&exclude={part}&appid=" + apikey;

        $.ajax({
            url: forecastURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response);

            var cards = $("<div>");

            for (var i = 0; i < 5; i++) {
                var newCard = $("<div>");
                newCard.addClass("card");

                // Date
                var startDate = new Date();
                var aryDates = GetDates(startDate, 5);

                var d = $("<p>");
                d.addClass("card-title");
                d.text(aryDates[i]);
                newCard.append(d);

                // Icon
                var img = $("<img>");
                img.attr("src", "Assets/images/"+response.daily[i].weather[0].icon+".png");
                newCard.append(img);

                // Temperature
                var F = (response.daily[i].temp.day - 273.15) * 1.80 + 32;
                var temp = $("<p>");
                temp.addClass("card-text");
                temp.text("Temperature: " + F);
                newCard.append(temp);

                // Humidity
                var h = $("<p>");
                h.addClass("card-text");
                h.text("Humidity: " + response.daily[i].humidity);
                newCard.append(h);

                cards.append(newCard)
            }

            $("#forecast").append(cards);
    })
       
    }
    
    $("#searchBtn").on("click", function(){
        citySearch();
    });

    $("#search").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            citySearch();
        }
    });

})