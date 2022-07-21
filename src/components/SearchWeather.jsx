import React, { useState, useEffect } from 'react';

import TimeAndLocation  from './TimeAndLocation';
import './SearchWeather.css'
const Searchweather = () => {
    const [search, setSearch] = useState('atlanta');
    const [data, setData] = useState({});
    const [input, setInput] = useState('');
    
    let componentMounted = true;
    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b2a19613fba7e9964719aa4567659917`);
            if (componentMounted) {
                setData(await response.json());
                console.log(data);
            }
            return () => {
                componentMounted = false;
            }
        }
        fetchWeather();
    }, [search]);

    //  date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString('default', { month: 'long' });
    let day = d.toLocaleString('default', { weekday: 'long' });

    //Time
    let time = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    
   
    
    let emoji = null;
    if (typeof data.main !== 'undefined') {
        if (data.weather[0].main === 'Clouds') {
            emoji ='fa-cloud'
        } else if (data.weather[0].main === 'Clear') {
            emoji ='fa-sun'
        } else if (data.weather[0].main === 'Thunderstorm') {
            emoji = 'fa-bolt'
        } else if (data.weather[0].main === 'Drizzle') {
            emoji = 'fa-cloud-drizzle'
        } else if (data.weather[0].main === 'Rain') {
            emoji = 'fa-cloud-rain'
        } else if (data.weather[0].main === 'Snow') {
            emoji = 'fa-snowflakes'
        } else {
            emoji ='fa-smog'
        }
    } else {
        return (
            <div>...loading</div>

        )
    }
    //submit search 
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);
    }

    let temp = ((data.main.temp - 273.15) * 1.8 + 32).toFixed(2);
    let temp_min = ((data.main.temp_min - 273.15) * 1.8 + 32).toFixed(2);
    let temp_max = ((data.main.temp_max - 273.15) * 1.8 + 32).toFixed(2);
    let feels_like = ((data.main.feels_like - 273.15) * 1.8 + 32).toFixed(2);
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5">
                      <div className="card text-white text-center border-0" >
                            <img src={`https://images.unsplash.com/photo-1655025510212-e5e150aa0a61?${data.weather[0].main}`} className="card-img" alt="" />
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4">
                                        <input
                                            type="search"
                                            className="form-control py-2"
                                            placeholder="Search City"
                                            aria-label="Search City"
                                            aria-describedby="basic-addon2"
                                            name='search'
                                            value={input}
                                            onChange={(e) => setInput(e.target.value ) }
                                            required
                                        />
                                        <button type="submit" className="input-group-text" id="basic-addon2">
                                           <i className="fas fa-search"></i>
                                        </button>
                                  </div>
                                 </form>
                                 <div className=" bg-dark bg-opacity-50 mx-2 py-1">
                                     <h5 className="card-title pt-3">{data.name}, {data.sys.country}</h5>
                                       <p className="card-text lead">
                                        {day}, {month} {date}, {year}
                                        <br />
                                    </p>
                                    <TimeAndLocation data={data} />
                                    <i className={`fas ${emoji} fa-3x`}></i>
                                    <h2 className="fw-bolder mb-3 mt-2">{temp} &deg;F</h2>
                                    <p className="lead fw-bolder">{data.weather[0].main}</p>
                                    <p className="lead my-1">Feels like : {feels_like}&deg;F</p>
                                     <p className="lead my-2">{temp_min}&deg;F | {temp_max}&deg;F</p>
                                    
                                    
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Searchweather;