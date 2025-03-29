import React from "react";
// import { useParams } from "react-router-dom";
import '../CSS/sidebar.css';
import Sidebar from "../Components/Sidebar";

const Analytics = () => {
   // const { city } = useParams(); 
    return(
        <>
            <Sidebar  />
            <div>
                <h1>Analytics page updates and selected after main page</h1>
            </div>
        </>
    )
}

export default Analytics;