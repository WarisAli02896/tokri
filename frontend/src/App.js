import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Orders from './Shopkeeper Panel/Pages/Orders.js';
import HomePage from './Admin Panel/Pages/HomePage.js';
import ShopPage from './Admin Panel/Pages/ShopPage.js';
import ShopFormPage from './Admin Panel/Pages/ShopFormPage.js';
import ProductForRentPage from './Shopkeeper Panel/Pages/ProductForRentPage.js';
import AddShopPage from './Shopkeeper Panel/Pages/AddShopPage.js';
import ProductSellPage from './Shopkeeper Panel/Pages/ProductSellPage.js';
import Shopspage from './Shopkeeper Panel/Pages/Shopspage.js';
import AdminLogin from './Admin Panel/Pages/AdminLogin.js';
import SkLogin from './Shopkeeper Panel/Pages/SkLogin.js';
import CustomerLogin from './Customer Panel/Pages/CustomerLogin.js';
import CreateAccountPage from './Pages/CreateAccountPage.js';

// import '../src/App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
      <Routes>
        <Route path="/" element={<AdminLogin showRememberMe showForgotPassword showShopButton />} />
        <Route path="/sklogin" element={<SkLogin showRememberMe showForgotPassword showShopButton />} />
        <Route path="/customerlogin" element={<CustomerLogin showRememberMe showForgotPassword showShopButton />} />
        <Route path="/admin" element={<HomePage userRole='admin'/>} />
        <Route path="/customer" element={<HomePage userRole="customer" />} />
        <Route path="/shopkeeper" element={<HomePage userRole="shopkeeper" />} />
        <Route path="/shop" element={<ShopPage/>}/>
        <Route path="/srp" element={<ShopFormPage/>}/>
        <Route path="/pfrp" element={<ProductForRentPage/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/addshop' element={<AddShopPage/>}/>
        <Route path='/pfs' element={<ProductSellPage/>}/>
        <Route path='/shops' element={<Shopspage/>}/>
        <Route  path='/createaccount' element={<CreateAccountPage/>}/>
        
        
        
      </Routes>
      </div>
    </Router>
  );
};

export default App;
