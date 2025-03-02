import "../styles/Settings.css";

const Settings = () => {

  const changeTheme = () => {
    const html = document.querySelector("html");
    const currTheme = html.getAttribute("data-theme");
    if (currTheme === "dark") {
      html.setAttribute("data-theme", "light");
    } else {
      html.setAttribute("data-theme", "dark");
    }
  };

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
          <label className="toggle-label">
            <input type="checkbox" name="some-setting" className="toggle-input" />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="transparent-sidebar">
          <div className="interface-header">
            <h3>Dark Mode</h3>
            <p>Toggle Dark Mode.</p>
          </div>
          <label className="toggle-label">
            <input type="checkbox" name="some-setting" className="toggle-input" onChange={changeTheme}/>
            <span className="toggle-slider"></span>
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
