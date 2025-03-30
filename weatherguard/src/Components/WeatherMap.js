import React from "react";
import { MapContainer, TileLayer, useMap} from "react-leaflet";

const UpdateMapView = ({position}) => {
    const map = useMap(); 
    map.setView(position, 7)
    return null;
};

const WeatherMap = ({ weatherData }) => {
    if (!weatherData) return null; 

    const position = [weatherData.coord.lat, weatherData.coord.lon]; 

    return (
        <MapContainer center={position} zoom={7} style={{ height: "600px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <TileLayer
                url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=b8da38f286323d8f0e29d5ae5deb63a5`}
                attribution='&copy; <a href="https://openweathermap.org">OpenWeather</a>'
            />
            <UpdateMapView position={position} />
        </MapContainer>
    );
}

export default WeatherMap;