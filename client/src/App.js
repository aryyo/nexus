import './styles/App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Homepage from './pages/Homepage'
import Login from "./pages/Login";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
            path="/*" 
            element={isLoggedIn ? <Homepage /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
