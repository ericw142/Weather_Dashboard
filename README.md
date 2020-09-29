My goal for this project was to create a weather dashboard that allowed the user to search for a city, and then display the current weather and a five day forecast
of that city. It also displays all of your previous searches underneath the search bar, and if you click on them it will re-display the corresponding weather data.

The current weather display shows the user the name of the city they searched with the current date, temperature, humidity, wind speed, and UV index. The UV index will
change color based on the value; higher numbers resulting in orange, red or purple, and lower numbers resulting in green or yellow. The forecast display shows the user
a summary of the weather for the next five days, along with icons appropriate for the weather.

In order to complete this I used the Open Weather API. Specifically, I used the Current Weather Data API and the One Call API. The Current Weather Data API returns
basic information about today's weather, as well as latitude and longitude of the city. Using the latitude and longitude returned, the site will then use the 
One Call API to search for more detailed weather data. This is when I receive data for the UV index, as well as for the forecast.

![Weather Dashboard](/Assets/images/dashboard.png?raw=true "Weather Dashboard")

GitHub Repository: https://github.com/ericw142/Weather_Dashboard

GitHub Pages: https://ericw142.github.io/Weather_Dashboard/