import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import '../CSS/SettingsPage.css';
import { Bell, Globe, Thermometer } from 'lucide-react';
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
);

const SettingSelector = ({ label, options, value, onChange }) => (
  <div className="setting-item">
    <span>{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const SettingsPage = () => {
  const { city } = useParams();

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("settings_");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          tempUnit: 'Celsius',
          timeFormat: '24h',
          language: 'English',
          notifications: true,
          alerts: true,
          darkMode: true,
        };
  });
  

  console.log(JSON.stringify(settings));
  const updateSetting = (key, value) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    localStorage.setItem("settings_", JSON.stringify(updatedSettings));
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
              onChange={(value) => updateSetting('notifications', value)}
            />
            <SettingToggle
              label="Weather Alerts"
              enabled={settings.alerts}
              onChange={(value) => updateSetting('alerts', value)}
            />
          </div>
          <div className="settings-section">
            <h2><Globe /> Display & Language</h2>
            <SettingSelector
              label="Language"
              options={["English", "Français", "Español", "Deutsch"]}
              value={settings.language}
              onChange={(value) => updateSetting('language', value)}
            />
            <SettingToggle
              label="Dark Mode"
              enabled={settings.darkMode}
              onChange={(value) => updateSetting('darkMode', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
