import React from "react";
import { useParams } from "react-router-dom";
import '../CSS/History.css'
import '../CSS/sidebar.css';
import Sidebar from "../Components/Sidebar";

const History = () => {
    const { city } = useParams(); 
    return(
        <div className="history-page">
            <Sidebar  city = {city}/>
            <div className="main-content">
                <header>
                    <h1>{city}</h1>
                    <br/>
                    <h2>Weather history</h2>
                </header>
                <div className="weather-history">
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}

export default History;