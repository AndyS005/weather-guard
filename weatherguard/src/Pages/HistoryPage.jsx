import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import '../CSS/History.css'
import '../CSS/sidebar.css';
import Sidebar from "../Components/Sidebar";
import RecentEvents from "../Components/HistoryComponents/RecentEvents";
import NotablePatterns from "../Components/HistoryComponents/NotablePatterns";
import MonthlySummary from "../Components/HistoryComponents/MonthlySummary";

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
]; // All possible UK Cities that the weather application displays 

const History = () => {
    const { city } = useParams(); 
    const navigate = useNavigate();

    const handleCityChange = async(e) => {
        const selectedCity = e.target.value;
        if (selectedCity !== "Lonsdads"){ //prevents the api from trying to display data for the placeholder city
            navigate(`/history/${selectedCity}`);
        };
    } // re renders the history page with the new city that the user has selected.

    return(
        <div className="history-page">
            <Sidebar  city = {city}/> {/* Calls the sidebar component with the city attribute */}
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
                </header> {/* displays the header containing the city name and the select element allowing the user to change the region they are viewing */}
                <header>
                    <h2>Weather history</h2>
                </header>
                <div className="history-content">
                    {/* calls individual components that display relevant information depending on the city */}
                    <div className="weather-history">
                        <RecentEvents city={city}/>
                    </div>
                    <div className="summary-section">
                        <MonthlySummary city ={ city }/>
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
