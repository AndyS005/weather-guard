import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import MonthlySummary from '../Components/HistoryComponents/MonthlySummary';
import RecentEvents from '../Components/HistoryComponents/RecentEvents';
import NotablePatterns from '../Components/HistoryComponents/NotablePatterns';
import '../CSS/Analytics.css';

const AnalyticsPage = () => {
    const { city } = useParams();
    const [recommendation, setRecommendation] = useState("Fetching recommendations...");

    // Function to generate farming recommendations
    const generateRecommendations = (patterns) => {
        if (!patterns || patterns.length === 0) return "No data available.";

        for (const pattern of patterns) {
            if (pattern.type.includes('Drought') || pattern.type.includes('Heatwave')) {
                return "Conditions are too dry/hot. Increase irrigation and monitor crops closely.";
            }
            if (pattern.type.includes('Flood') || pattern.type.includes('Heavy Rain')) {
                return "Excessive rain detected. Ensure proper drainage to avoid waterlogging.";
            }
        }
        return "Weather conditions are normal. Great time for farming!";
    };

    useEffect(() => {
        // Simulating fetch from NotablePatterns (normally this would be fetched from an API)
        const mockPatterns = [{ type: "Normal" }]; // Replace with real fetched data
        setRecommendation(generateRecommendations(mockPatterns));
    }, [city]);

    return (
        <div className="analytics-page">
            <Sidebar city={city} />
            <div className="main-content">
                <h2 className="analytics-header">Farm Analytics - {city}</h2>

                <div className="analytics-grid">
                    {/* Monthly Overview Section */}
                    <div className="analytics-section">
                        <header className="section-header">
                            <span className="icon">📅</span>
                            <h3>Monthly Overview</h3>
                        </header>
                        <MonthlySummary city={city} />
                    </div>

                    {/* Recent Alerts Section */}
                    <div className="analytics-section">
                        <header className="section-header">
                            <span className="icon">⚠️</span>
                            <h3>Recent Alerts</h3>
                        </header>
                        <RecentEvents city={city} />
                    </div>

                    {/* Weather Patterns Section */}
                    <div className="analytics-section full-width">
                        <header className="section-header">
                            <span className="icon">📈</span>
                            <h3>Weather Patterns</h3>
                        </header>
                        <NotablePatterns city={city} />
                    </div>

                    {/* Recommendations Section */}
                    <div className="analytics-section full-width">
                        <header className="section-header">
                            <span className="icon">🌱</span>
                            <h3>Farming Recommendations</h3>
                        </header>
                        <div className="recommendation-card">
                            <p>{recommendation}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
