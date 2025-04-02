import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import '../CSS/History.css'
import '../CSS/sidebar.css';
import Sidebar from "../Components/Sidebar";
import RecentEvents from "../Components/HistoryComponents/RecentEvents";
import NotablePatterns from "../Components/HistoryComponents/NotablePatterns";

const regions = [
    { name: "Lonsdads", region: "Choose Region" },
    { name: "Nottingham", region: "East Midlands" },
    { name: "Birmingham", region: "West Midlands" },
    { name: "Manchester", region: "North West" },
    { name: "Liverpool", region: "North West" },
    { name: "Leeds", region: "Yorkshire and the Humber" },
    { name: "London", region: "London" },
    { name: "Bristol", region: "South West" },
    { name: "Tonbridge", region: "South East" },
    { name: "Cardiff", region: "Wales" },
    { name: "Edinburgh", region: "Scotland" },
    { name: "Ballymena", region: "Northern Ireland" },
];

const History = () => {
    const { city } = useParams(); 
    const navigate = useNavigate();
    console.log (city);

    const handleCityChange = async(e) => {
        const selectedCity = e.target.value;
        navigate(`/history/${selectedCity}`);
    }

    return(
        <div className="history-page">
            <Sidebar  city = {city}/>
            <div className="main-content">
                <header className="main-header">
                    <h1>{city}</h1>
                    <select onChange={handleCityChange} value={city}>
                        {regions.map((region, index) => (
                            <option key={index} value={region.name}>
                                {region.region}
                            </option>
                        ))}
                    </select>
                </header>
                <header>
                    <h2>Weather history</h2>
                </header>
                <div className="history-content">
                    <div className="weather-history">
                        <RecentEvents city={city}/>
                    </div>
                    <div className="weather-history">
                        <h2>Monthly Summary</h2>
                    </div>
                    <div className="weather-history">
                        <NotablePatterns city={city}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;