
function App() {

    //setting up lattitude and longtitude

    const [lat, setLat] = React.useState([]);
    const [long, setLong] = React.useState([]);
    const [data, setData] = React.useState([]);
    /* const [markUp, setMarkUp] = React.useState('') */

    React.useEffect(() => {

        const fetchData = async () => {
          navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
          });
            var apiKey = 'dcd17df9ff1af5e8853086f7f8b82a0b';
            
            var url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+apiKey;
          await fetch(url)
          .then(res => res.json())
          .then(result => {
            setData(result);
            console.log(result);
          });
        }
        fetchData();
      }, [lat,long])

    // main function that retrieves data

    /* function weather() {

        var apiKey = 'dcd17df9ff1af5e8853086f7f8b82a0b';
        var url = 'https://api.openweathermap.org/data/2.5/weather?lat='+{lat}+'&lon='+{long}+'&appid='+apiKey;
    
        navigator.geolocation.getCurrentPosition(success, error);
    
        
        function success(position) {

          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          
          /* location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°'; */
          /*
          setMarkUp('Latitude is {lat} and longitude is {long}');
          
           $.getJSON(url, function(data) {
            $('#temp').html(data.currently.temperature + '° F');
            $('#minutely').html(data.minutely.summary);
          });
        }
    
        function error() {
          /* location.innerHTML = "Unable to retrieve your location"; */
          /*
          setMarkUp('Unable to retrieve your location');
        }
    
        /* location.innerHTML = "Locating..."; */
        /*
        setMarkUp('Locating...');
        
      }
 */
    

    return (
        <div>
            <h1>FreeCodeCamp Weather App</h1>
            
            {/* <div id="location" dangerouslySetInnerHTML={{__html: markUp}}/>
            <div id="temp"></div>
            <div id="minutely"></div> */}

        {(typeof data.main != 'undefined') ? (
            <Weather weatherData={data}/>
        ): (
            <div>No data to be shown</div>
            )}
            

        </div>
    );

}

function Weather({weatherData}){
    return (
        <>
            <h3>{weatherData.name}</h3>

            <p>wind speed : {weatherData.wind.speed}</p>
            <p>Temprature: {Math.round(weatherData.main.temp - 273.15)} &deg;C</p>
            <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
            <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
            <p>Description: {weatherData.weather[0].main}</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            
        </>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));