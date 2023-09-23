import React from 'react';

// Routes
import { Route, Routes } from 'react-router-dom';

// CSS BASE
import './style/App.css';

// Pages
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/carteira" element={ <Wallet /> } />
    </Routes>
  );
}

export default App;
