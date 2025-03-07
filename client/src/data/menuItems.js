import { Icons } from "../components/Icons";

export const menuItems = {
  main: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Icons.compass,
      activeIcon: Icons.compassG,
    },
    {
      id: "orders",
      label: "Orders",
      icon: Icons.project,
      activeIcon: Icons.projectG,
    },
    {
      id: "products",
      label: "Products",
      icon: Icons.product,
      activeIcon: Icons.productG,
    },
    {
      id: "billing",
      label: "Billing",
      icon: Icons.invoice,
      activeIcon: Icons.invoiceG,
    },
  ],
  secondary: [
    {
      id: "account",
      label: "My Account",
      icon: Icons.user,
      activeIcon: Icons.userG,
    },
    {
      id: "help",
      label: "Get Help",
      icon: Icons.help,
      activeIcon: Icons.helpG,
    },
    {
      id: "report",
      label: "Report",
      icon: Icons.report,
      activeIcon: Icons.reportG,
    },
  ],
  bottom: [
    {
      id: "settings",
      label: "Settings",
      icon: Icons.settings,
      activeIcon: Icons.settingsG,
    },
    {
      id: "log-out",
      label: "Log Out",
      icon: Icons.logout,
      activeIcon: Icons.logoutG,
    },
  ],
}; 