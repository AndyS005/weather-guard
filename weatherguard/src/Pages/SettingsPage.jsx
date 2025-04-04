import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import '../CSS/SettingsPage.css';
import { Bell, Globe, Thermometer, UserPen} from 'lucide-react';
import { useParams } from 'react-router-dom';

const SettingToggle = ({ label, enabled, onChange }) => (
  <div className="setting-item">
    <span>{label}</span>
    <button
      onClick={() => onChange(!enabled)}
      className={`toggle-button ${enabled ? 'enabled' : ''}`}
    >
      <span className="toggle-circle" />
    </button>
  </div>
);/// Function to implement toggle buttons in setting where applicable/needed.

const SettingSelector = ({ label, options, value, onChange }) => (
  <div className="setting-item">
    <span>{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);/// Function to implement the selection list where needed in settings.

const SettingsPage = () => {
  /// city variable initialised for access after a change in page.
  const { city } = useParams();

  /// an array of extreme weather condidtion codes
  const alertCodes = [212,221,504,511,522,531,612,613,622,771,781,800];

  /// Initialisation of settings constant using a condition
  /// if settings already in localStorage, retrive
  /// else initialize with default
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("settings_");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          tempUnit: 'Celsius',
          timeFormat: '24h',
          language: 'English',
          notifications: true,
          recommendations: true,
          darkMode: true,
          Alert_1: 212,
          Alert_2: 212,
          personalisedAlerts: false,
        };
  });
  
  /// Function to update the settings constant and localStorage
  const updateSetting = (key, value) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    localStorage.setItem("settings_", JSON.stringify(updatedSettings));
  };

  /// Function to update notification setting
  /// Raises a system alert/notification (here, in web browser)
  const changeNotifications = (key, value) => {
    updateSetting(key, value);

    if (settings.notifications === false){
      alert("Notifications are now on.");
    } else{
      alert("Notifications are now off.")
    }
  };

  return (
    <div className="settings-page">
      <Sidebar city={city}/>
      <div className="main-content">
        <header className="main-header">
          <h1>Settings</h1>
        </header>
        <div className="settings-content">
          <div className="settings-section">
            <h2><Thermometer /> Units & Format</h2>
            <SettingSelector
              label="Temperature Unit"
              options={["Celsius", "Fahrenheit"]}
              value={settings.tempUnit}
              onChange={(value) => updateSetting('tempUnit', value)}
            />
            <SettingSelector
              label="Time Format"
              options={["12h", "24h"]}
              value={settings.timeFormat}
              onChange={(value) => updateSetting('timeFormat', value)}
            />
          </div>
          <div className="settings-section">
            <h2><Bell /> Notifications</h2>
            <SettingToggle
              label="Enable Notifications"
              enabled={settings.notifications}
              onChange={(value) => changeNotifications('notifications', value)}
            />
            <SettingToggle
              label="Recommendations"
              enabled={settings.recommendations}
              onChange={(value) => updateSetting('recommendations', value)}
            />
          </div>
          <div id="pnotify" className="settings-section">
            <h2><UserPen /> Personalised Alerts</h2>
            <SettingSelector
              label="Alert 1"
              options={alertCodes}
              value={settings.Alert_1}
              onChange={(value) => updateSetting('Alert_1', value)}
            />
            <SettingSelector
              label="Alert 2"
              options={alertCodes}
              value={settings.Alert_2}
              onChange={(value) => updateSetting('Alert_2', value)}
            />
            <SettingToggle
              label="Personalised Alerts"
              enabled={settings.personalisedAlerts}
              onChange={(value) => updateSetting('personalisedAlerts', value)}
            />
          </div>
          <div className="settings-section">
            <h2><Globe /> Display & Language</h2>
            <SettingSelector
              label="Language"
              options={["English"]}
              value={settings.language}
              onChange={(value) => updateSetting('language', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
