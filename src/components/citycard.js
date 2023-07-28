import React ,{useState, useEffect}from 'react'

const Citycard = ({tempinfo}) => {
    // to set the icon of weather
    const[iconstate, seticonstate] = useState("");

    const {
        temp, humidity, pressure,
        weathermood,
        name,
        speed,
        country, sunset,
    } = tempinfo;


    //change the icon according to the weather
    useEffect(() => {
        if(weathermood){
            switch(weathermood){
                case "Clouds":
                    seticonstate("wi-day-cloudy");
                    break;
                  case "Haze":
                    seticonstate("wi-fog");
                    break;
                  case "Clear":
                    seticonstate("wi-day-sunny");
                    break;
                  case "Mist":
                    seticonstate("wi-dust");
                    break;
          
                  default:
                    seticonstate("wi-day-sunny");
                    break;
            }
        }
        
    }, [weathermood]);

    //sunset if fetched in seconds we need to convert it into proper time
    let sec=sunset;
    let date=new Date(sec* 1000);  //  time in miliseconds
    let sunsettime = `${date.getHours()}: ${date.getMinutes()}`
      
  return (
    <>

    
     <article className="widget">
        <div className="weatherIcon">
          {/* for the image icon */}
          <i className={`wi ${iconstate}`}></i>
        </div>
        <div className="weatherInfo">
          {/* div for weather information */}
          <div className="temperature">
            <span>{temp}&deg;</span>
          </div>
          <div className="description">
            <div className="weatherCondition">{weathermood}</div>
            <div className="place">{name} ,{country}</div>
          </div>
        </div>
        <div className="date">{new Date().toLocaleString()}</div>{" "}
        {/*for current date */}
        {/* various data */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className="wi wi-sunset"></i>
              </p>
              <p className="extra-info-leftside">
                {sunsettime} PM <br />Sunset
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className="wi wi-humidity"></i>
              </p>
              <p className="extra-info-leftside">
                   {humidity}     <br />  Humidity 
              </p>
            </div>
          </div>

          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p>
                <i className="wi wi-rain"></i>
              </p>
              <p className="extra-info-leftside">
              {pressure} <br />
                Pressure
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className="wi wi-strong-wind"></i>
              </p>
              <p className="extra-info-leftside">
                {speed}
                <br />
                wind
              </p>
            </div>
          </div>
        </div>
      </article> 
    </>
  )
}

export default Citycard
