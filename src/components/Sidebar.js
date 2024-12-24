import "../styles/Sidebar.css";

const Sidebar = ({ active, setActive }) => {
  const handleClick = (id) => {
    setActive((prev) => (prev === id ? prev : id));
    //an arrow function without braces implicitly returns a value(expression)
    //prev here serves as a local variable so updating it be default doesn't do anything, you must return the value
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
        {
          id: "customers",
          label: "Customers",
          icon: "./icons/customer.png",
          activeIcon: "./icons/customer-g.png",
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
    <div className="sidebar">
      {sections.map((section) => (
        <div key={section.title} className={section.title.toLowerCase()}>
          <p>{section.title}</p>
          {section.buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => handleClick(button.id)}
              className={`${
                active === button.id ? "activeButton" : "dormantButton"
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
    </div>
  );
};

export default Sidebar;
