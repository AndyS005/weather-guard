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
                    <h1>History page updates and selected after main page</h1>
                </header>
            </div>
        </div>
    )
}

export default History;