import React from "react";
import { useParams } from "react-router-dom";

const Analytics = () => {
    const { city } = useParams(); 
    return(
        <div>
            <h1>Analytics page updates and selected after main page</h1>
        </div>
    )
}

export default Analytics;