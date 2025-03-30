import React from "react";
import { useParams } from "react-router-dom";
import '../CSS/sidebar.css';
import Sidebar from "../Components/Sidebar";

const Analytics = () => {
   const { city } = useParams(); 
    return(
        <div>
            <Sidebar  city = { city }/>
            <div>
                <h1>Analytics page updates and selected after main page</h1>
            </div>
        </div>
    )
}

export default Analytics;