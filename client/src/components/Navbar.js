import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="nav">
      <nav className="navbar">
        <div className="logo">
          <img src="./icons/linux.png" alt="" className="logo-image"></img>
          <p>Nexus</p>
          <div className="search">
            <img src="./icons/search.png" alt="" className="search-image"></img>
            <input placeholder="Quick Search"></input>
            <div className="command-f">
              <img src="./icons/command.png" alt=""></img>F
            </div>
          </div>
        </div>

        <div className="buttons">
          <button className="mail">
            <img src="./icons/mail.png" alt="Mail"></img>
          </button>
          <button className="notification">
            <img src="./icons/bell.png" alt="Notification"></img>
          </button>
          <button className="plans">Account Plans</button>
          <button className="support">Support</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
