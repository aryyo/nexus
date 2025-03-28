import React, { useState, useEffect } from "react";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingState";
import { useUserSettings } from "../hooks/useUserSettings";
import "../styles/Settings.css";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [transparentSidebar, setTransparentSidebar] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const { loading, error, updateSettings, settings } = useUserSettings();

  useEffect(() => {
    // Initialize settings from the backend
    if (settings) {
      setTheme(settings.interfaceTheme || "light");
      setTransparentSidebar(settings.transparentSidebar || false);
      setCompactView(settings.tablePreference === "compact");
    }
  }, [settings]);

  const handleSettingChange = (setting, value) => {
    const updates = {
      ...settings,
      [setting]: value
    };
    updateSettings(updates);
  };

  const handleThemeChange = (selectedTheme) => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    setTheme(selectedTheme);
    handleSettingChange("interfaceTheme", selectedTheme);
  };

  const handleSidebarTransparencyChange = (e) => {
    const value = e.target.checked;
    setTransparentSidebar(value);
    handleSettingChange("transparentSidebar", value);
  };

  const handleCompactViewChange = (e) => {
    const value = e.target.checked;
    setCompactView(value);
    handleSettingChange("tablePreference", value ? "compact" : "default");
  };

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (error) {
    return <ErrorMessage message={error} fullPage />;
  }

  return (
    <div className="settings-page">
      <div className="overview">
        <p>Settings</p>
      </div>

      <div className="settings-content">
        <div className="settings-card">
          <div className="card-header">
            <h3>Interface Preferences</h3>
          </div>

          <div className="settings-options">
            <div className="settings-item">
              <div className="settings-info">
                <h4>Theme Mode</h4>
                <p>Choose between light and dark theme for the interface</p>
              </div>
              <div className="theme-selector">
                <button
                  className={`theme-button ${theme === "light" ? "active" : ""}`}
                  onClick={() => handleThemeChange("light")}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  Light
                </button>
                <button
                  className={`theme-button ${theme === "dark" ? "active" : ""}`}
                  onClick={() => handleThemeChange("dark")}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  Dark
                </button>
              </div>
            </div>

            <div className="settings-item">
              <div className="settings-info">
                <h4>Sidebar Transparency</h4>
                <p>Enable transparent effect for the sidebar background</p>
              </div>
              <label className="settings-toggle">
                <input 
                  type="checkbox" 
                  checked={transparentSidebar}
                  onChange={handleSidebarTransparencyChange}
                />
                <span className="settings-toggle-slider"></span>
              </label>
            </div>

            <div className="settings-item">
              <div className="settings-info">
                <h4>Compact View</h4>
                <p>Reduce padding and margins for a more compact layout</p>
              </div>
              <label className="settings-toggle">
                <input 
                  type="checkbox" 
                  checked={compactView}
                  onChange={handleCompactViewChange}
                />
                <span className="settings-toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* <div className="settings-card">
          <div className="card-header">
            <h3>Notifications</h3>
          </div>

          <div className="settings-options">
            <div className="settings-item">
              <div className="settings-info">
                <h4>Email Notifications</h4>
                <p>Receive email updates about your account activity</p>
              </div>
              <label className="settings-toggle">
                <input type="checkbox" />
                <span className="settings-toggle-slider"></span>
              </label>
            </div>

            <div className="settings-item">
              <div className="settings-info">
                <h4>Push Notifications</h4>
                <p>Get push notifications for important updates</p>
              </div>
              <label className="settings-toggle">
                <input type="checkbox" />
                <span className="settings-toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <h3>Privacy</h3>
          </div>

          <div className="settings-options">
            <div className="settings-item">
              <div className="settings-info">
                <h4>Activity Status</h4>
                <p>Show when you're active in the application</p>
              </div>
              <label className="settings-toggle">
                <input type="checkbox" />
                <span className="settings-toggle-slider"></span>
              </label>
            </div>

            <div className="settings-item">
              <div className="settings-info">
                <h4>Data Collection</h4>
                <p>Allow collection of usage data to improve our service</p>
              </div>
              <label className="settings-toggle">
                <input type="checkbox" />
                <span className="settings-toggle-slider"></span>
              </label>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Settings;
