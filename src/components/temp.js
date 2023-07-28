import React, { useState, useEffect } from "react";
import Citycard from "./citycard";
import "./style.css";

const Temp = () => {
  // initial value ke lia

  const [searchvalue, setsearchvalue] = useState("Delhi");

  //to store the state of new city
const[tempinfo, settempinfo] = useState({});


  const getweatherinfo = async () => {
    try {
      //with API we fetch the information regarding the perticular city searched by passing the value of input in url
      //we add units=metric to get values in diff unit syatem like celcius
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue} &units=metric&appid=f004d14d4d47bd8c82f76d11783fa0d2`;

      //to fetch the response
      const response = await fetch(url);

      //  to convert the response received
      const data = await response.json();

      //in API response we have a temperature , humidity and diff  value in the  object main the temp is in farenheit
      const { temp, humidity, pressure } = data.main;

      //weather is an array of objects  se we are acessing the first obj of weather array
      //main key contains the value we have changed its name to weathermood
      const { main: weathermood } = data.weather[0];
      console.log(weathermood);

      //name of city
      const { name } = data;

      //to get the speed of winds it is in wind key
      const { speed } = data.wind;

      //to get country name and its sunset time
      const { country, sunset } = data.sys;


      // a obj with all the values of diff parameters
      const myNewWeatherInfo={
        temp, humidity, pressure,
        weathermood,
        name,
        speed,
        country, sunset,

        
      };
      

      //set the value of tempinfo with with the new found values
      settempinfo(myNewWeatherInfo);
    } catch (error) {
      //we use try catch block so as to handle any error in which data is not fetched
      console.log("Error");
      alert("🤔🤔 Invalid Search... Try Again");
    }
  };

  //when page is reloaded it gives the value of weather at delhi  (defaault location)
  //empty array means wehnever the page is reloaded run the useEffect
  useEffect(() => {
    getweatherinfo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          {/* for taking input of city */}
          <input
            type="search"
            placeholder="🙄🙄search..."
            id="search"
            autoFocus
            className="searchTerm"
            value={searchvalue} //to get what the user is giving as input .what the user is searching for
            onChange={(e) => setsearchvalue(e.target.value)} //to fire the state change event
          />
          <button
          //for searching
            className="searchButton"
            type="button"
            onClick={getweatherinfo}
          >
            {" "}
            Search
          </button>
        </div>
      </div>

     {/* component for each city searched */}
     {/* pass the values fetched as props in the citycard component */}
      <Citycard tempinfo={tempinfo}/>
    </>
  );
};

export default Temp;
