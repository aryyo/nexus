import "./styles/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Homepage from "./pages/Homepage";
import Login from "./pages/Auth";
import { useUserSettings } from "./hooks/useUserSettings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const { settings, loading: settingsLoading } = useUserSettings();

  useEffect(() => {
    if (settings?.interfaceTheme) {
      document.documentElement.setAttribute("data-theme", settings.interfaceTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [settings]);

  if (isLoggedIn && settingsLoading) {
    return null;
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
