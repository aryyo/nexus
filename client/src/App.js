import './styles/App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Homepage from './pages/Homepage'
import Login from "./pages/Auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if there's a token in localStorage on initial load
    return !!localStorage.getItem('token');
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/login" 
            element={isLoggedIn ? 
              <Navigate to="/" replace /> : 
              <Login setIsLoggedIn={setIsLoggedIn} />
            } 
          />
          <Route 
            path="/*" 
            element={isLoggedIn ? 
              <Homepage setIsLoggedIn={setIsLoggedIn} /> : 
              <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
