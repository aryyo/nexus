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
          id: "calendar",
          label: "Calendar",
          icon: "./icons/calendar.png",
          activeIcon: "./icons/calendar-g.png",
        },
        {
          id: "products",
          label: "Products",
          icon: "./icons/attendance.png",
          activeIcon: "./icons/attendance-g.png",
        },
        {
          id: "notifications",
          label: "Notifications",
          icon: "./icons/bell.png",
          activeIcon: "./icons/bell-g.png",
        },
      ],
    },
    {
      title: "MANAGEMENT",
      buttons: [
        {
          id: "inventory",
          label: "Inventory",
          icon: "./icons/employee.png",
          activeIcon: "./icons/employee-g.png",
        },
        {
          id: "performance",
          label: "Performance",
          icon: "./icons/diagram.png",
          activeIcon: "./icons/diagram-g.png",
        },
        {
          id: "payrolls",
          label: "Payrolls",
          icon: "./icons/finance.png",
          activeIcon: "./icons/finance-g.png",
        },
        {
          id: "invoice",
          label: "Invoice",
          icon: "./icons/invoice.png",
          activeIcon: "./icons/invoice-g.png",
        },
        {
          id: "hiring",
          label: "Recruitment",
          icon: "./icons/hiring.png",
          activeIcon: "./icons/hiring-g.png",
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
          id: "help",
          label: "Help Center",
          icon: "./icons/help.png",
          activeIcon: "./icons/help-g.png",
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
