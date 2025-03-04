import './styles/App.css'
import { useState } from 'react';
import Homepage from './pages/Homepage'
import Login from "./pages/Login";


function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      {isLoggedIn ? <Homepage/> : <Login/>}
    </div>
  );
}

export default App;
