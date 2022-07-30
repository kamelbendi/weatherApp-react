
function App() {

    //setting up lattitude and longtitude

    const [lat, setLat] = React.useState([]);
    const [long, setLong] = React.useState([]);
    const [data, setData] = React.useState([]);
    

    //useEffect to fetch the data from the API

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

   
    return (
        <div className="main">
            
            {(typeof data.main != 'undefined') ? (
                <Weather weatherData={data}/>
            ): (
                <div>
                    cannot access your location!
                    {console.log(data)}
                </div>
                )}
        </div>
    );

}

const refresh = () => {
    window.location.reload();
  }

function Weather({weatherData}){
    return (
        <>
            <div className="top">
                <div className="header">{weatherData.name}</div>
                <button onClick={refresh}>Refresh Page</button>
            </div>
            <div className="flex">
                <p className="temp">wind speed : {weatherData.wind.speed} Klm/h</p>
                <p className="temp">Temprature: {Math.round(weatherData.main.temp - 273.15)} &deg;C</p>
            </div>
            <div className="flex">
                <p className="temp">Humidity: {weatherData.main.humidity} %</p>
                <p className="description">Description: {weatherData.weather[0].main}</p>
                </div>
            <div className="flex">
                <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
            </div>
        </>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));