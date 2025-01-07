import "../styles/Settings.css";

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="settings-title">
        <p>Settings</p>
      </div>
      <div className="settings-content">
        <div className="interface-theme">
          <div className="interface-header">
            <h3>Interface theme</h3>
            <p>Select or customize your UI theme.</p>
          </div>
          <div className="interface-cards">
            <div className="interface-card">
              <img src="/theme.jpg" alt="" />
            </div>
            <div className="interface-card">
              <img src="/theme-dark.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="transparent-sidebar">
          <div className="interface-header">
            <h3>Transparent sidebar</h3>
            <p>Make the sidebar transparent.</p>
          </div>
          <label class="toggle-label">
            <input type="checkbox" name="some-setting" class="toggle-input" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div className="tables-view">
          <div className="interface-header">
            <h3>Tables view</h3>
            <p>How are tables displayed in the app.</p>
          </div>
          <div className="interface-cards">
            <div className="interface-card">
              <img src="/theme.jpg" alt="" />
            </div>
            <div className="interface-card">
              <img src="/theme-dark.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
