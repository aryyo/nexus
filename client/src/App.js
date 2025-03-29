import "./styles/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Homepage from "./pages/Homepage";
import Login from "./pages/Auth";
import { useUserSettings } from "./hooks/useUserSettings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if there's a token in localStorage on initial load
    return !!localStorage.getItem("token");
  });

  const { settings, loading: settingsLoading } = useUserSettings();

  useEffect(() => {
    if (settings) {
      if (settings.interfaceTheme) {
        document.documentElement.setAttribute("data-theme", settings.interfaceTheme);
      }

      if (settings.transparentSidebar) {
        document.documentElement.setAttribute("data-sidebar-transparent", "true");
      } else {
        document.documentElement.removeAttribute("data-sidebar-transparent");
      }

      if (settings.tablePreference === "compact") {
        document.documentElement.setAttribute("data-compact-view", "true");
      } else {
        document.documentElement.removeAttribute("data-compact-view");
      }
    }
  }, [settings]);

  if (isLoggedIn && settingsLoading) {
    return null; //leave blank to avoid mismatch spinners
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <Homepage setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
