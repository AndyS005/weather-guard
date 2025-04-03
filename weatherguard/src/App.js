import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/HomePage';
import WeatherPage from './Pages/WeatherPage';
import Analytics from './Pages/AnalyticsPage';
import History from './Pages/HistoryPage';
import Settings from './Pages/SettingsPage';



export default function App(){

  

  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/weather/:city" element={<WeatherPage />} />
          <Route path="/analytics/:city" element={<Analytics />} />
          <Route path="/history/:city" element={<History />} />
          <Route path="/settings/:city" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}