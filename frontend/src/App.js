import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Orders from './Pages/Shopkeeperpanel/Orders';
import LoginPage from '../src/Pages/LoginPage';
import HomePage from './Pages/Adminpanel/HomePage';
import ShopPage from './Pages/Adminpanel/ShopPage';
import ShopFormPage from './Pages/Adminpanel/ShopFormPage';
import ProductForRentPage from './Pages/Shopkeeperpanel/ProductForRentPage';
import AddShopPage from './Pages/Shopkeeperpanel/AddShopPage';
// import '../src/App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
      <Routes>
        <Route path="/" element={<LoginPage showRememberMe showForgotPassword showShopButton />} />
        <Route path="/admin" element={<HomePage userRole='admin'/>} />
        <Route path="/customer" element={<HomePage userRole="customer" />} />
        <Route path="/shopkeeper" element={<HomePage userRole="shopkeeper" />} />
        <Route path="/shop" element={<ShopPage/>}/>
        <Route path="/srp" element={<ShopFormPage/>}/>
        <Route path="/pfrp" element={<ProductForRentPage/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/addshop' element={<AddShopPage/>}/>
      </Routes>
      </div>
    </Router>
  );
};

export default App;
