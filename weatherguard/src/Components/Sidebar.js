/*************************************************************/
/// Code for side bar that is used for navigation between pages
/*************************************************************/

import React from "react";
import { Link } from "react-router-dom";


const Sidebar =({city}) => {
    return(
        <div className="sidebar">
            
            <nav>
                <h2>WeatherGuard</h2>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to={`/weather/${city}`}>Weather</Link>
                    </li>
                    <li>
                        <Link to={`/analytics/${city}`}>Analytics</Link>
                    </li>
                    <li>
                        <Link to={`/history/${city}`}>History</Link>
                    </li>
                    <li>
                        <Link to={`/settings/${city}`}>Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
