import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Orders from './Shopkeeper Panel/Pages/Orders.js';
import HomePage from './Admin Panel/Pages/HomePage.js';
import ShopPage from './Admin Panel/Pages/ShopPage.js';
import ShopFormPage from './Admin Panel/Pages/ShopFormPage.js';
import AddShopPage from './Shopkeeper Panel/Pages/AddShopPage.js';
import ProductSellPage from './Shopkeeper Panel/Pages/ProductSellPage.js';
import ShopsPage from './Shopkeeper Panel/Pages/ShopsPage.js';
import AdminLoginPage from './Admin Panel/Pages/AdminLoginPage.js';
import ShopkeeperLoginPage from './Shopkeeper Panel/Pages/ShopkeeperLoginPage.js';
import CustomerLoginPage from './Customer Panel/Pages/CustomerLoginPage.js';
import RegistrationPage from './Pages/RegistrationPage.js';
import EditPage from './Admin Panel/Pages/EditPage.js';
import ProductSellFormPage from './Shopkeeper Panel/Pages/ProductSellFormPage.js';

const App = () => {
  return (
    <Router>
      <div className="app-container">
      <Routes>
        <Route path="/" element={<AdminLoginPage showRememberMe showForgotPassword showShopButton/>} />
        <Route path="/sklogin" element={<ShopkeeperLoginPage showRememberMe showForgotPassword showShopButton />} />
        <Route path="/customerlogin" element={<CustomerLoginPage showRememberMe showForgotPassword showShopButton />} />
        <Route path="/admin" element={<HomePage userRole='admin'/>} />
        <Route path="/customer" element={<HomePage userRole="customer" />} />
        <Route path="/shopkeeper" element={<HomePage userRole="shopkeeper" />} />
        <Route path="/shop" element={<ShopPage/>}/>
        <Route path="/srp" element={<ShopFormPage/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/addshop' element={<AddShopPage/>}/>
        <Route path='/pfs' element={<ProductSellPage/>}/>
        <Route path='/shops' element={<ShopsPage/>}/>
        <Route path='/rp' element={<RegistrationPage/>}/>
        <Route path='/ep' element={<EditPage/>}/>
        <Route path='/psfp' element={<ProductSellFormPage/>}/>
      </Routes>
      </div>
    </Router>
  );
};

export default App;
