import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../src/Pages/LoginPage';
import HomePage from '../src/Pages/HomePage';
import ShopPage from './Pages/ShopPage';
import ShopFormPage from './Pages/ShopFormPage';
import ProductForRentPage from './Pages/ProductForRentPage';
// import '../src/App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
      <Routes>
        <Route path="/" element={<LoginPage showRememberMe showForgotPassword showShopButton />} />
        <Route path="/admin" element={<HomePage userRole="admin" />} />
        <Route path="/customer" element={<HomePage userRole="customer" />} />
        <Route path="/shopkeeper" element={<HomePage userRole="shopkeeper" />} />
        <Route path="/shop" element={<ShopPage/>}/>
        <Route path="/srp" element={<ShopFormPage/>}/>
        <Route path="/pfrp" element={<ProductForRentPage/>}/>
      </Routes>
      </div>
    </Router>
  );
};

export default App;
