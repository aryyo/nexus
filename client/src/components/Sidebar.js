import "../styles/Sidebar.css";

const Sidebar = ({ active, setActive, previous, setPrevious, isOpen, onClose }) => {
  const handleClick = (id) => {
    setActive((currentActive) => {
      if (currentActive !== "log-out") {
        setPrevious(currentActive);
      }
      if (window.innerWidth <= 1024) {
        onClose(); // Close sidebar on mobile after clicking a menu item
      }
      return currentActive === id ? currentActive : id;
    });
  };

  const sections = [
    {
      title: "GENERAL",
      buttons: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: "./icons/compass.png",
          activeIcon: "./icons/compass-g.png",
        },
        {
          id: "orders",
          label: "Orders",
          icon: "./icons/project.png",
          activeIcon: "./icons/project-g.png",
        },
        {
          id: "products",
          label: "Products",
          icon: "./icons/product.png",
          activeIcon: "./icons/product-g.png",
        },
        {
          id: "billing",
          label: "Billing",
          icon: "./icons/invoice.png",
          activeIcon: "./icons/invoice-g.png",
        },
      ],
    },
    {
      title: "ACCOUNT",
      buttons: [
        {
          id: "my-account",
          label: "My Account",
          icon: "./icons/user.png",
          activeIcon: "./icons/user-g.png",
        },
        {
          id: "get-help",
          label: "Get Help",
          icon: "./icons/help.png",
          activeIcon: "./icons/help-g.png",
        },
        {
          id: "report",
          label: "Report",
          icon: "./icons/report.png",
          activeIcon: "./icons/report-g.png",
        },
      ],
    },
    {
      title: "OTHERS",
      buttons: [
        {
          id: "settings",
          label: "Settings",
          icon: "./icons/settings.png",
          activeIcon: "./icons/settings-g.png",
        },
        {
          id: "log-out",
          label: "Log Out",
          icon: "./icons/log.png",
          activeIcon: "./icons/log-g.png",
        },
      ],
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`}>
      {sections.map((section) => (
        <div key={section.title} className={section.title.toLowerCase()}>
          <p>{section.title}</p>
          {section.buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => handleClick(button.id)}
              className={`${
                button.label === "Log Out"
                  ? active === button.id
                    ? "logoutActiveButton"
                    : "logoutDormantButton"
                  : active === button.id
                  ? "activeButton"
                  : "dormantButton"
              }`}
            >
              <img
                src={active === button.id ? button.activeIcon : button.icon}
                alt=""
              />
              {button.label}
            </button>
          ))}
        </div>
      ))}
      {active === "log-out" && (
        <div className="logout-modal">
          <p>Are you sure you want to log out?</p>
          <div className="logout-options">
            <button className="logout-cancel" onClick={() => handleClick(previous)}>Cancel</button>
            <button className="logout-confirm">Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
