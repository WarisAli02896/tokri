import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Orders from './Pages/Shopkeeperpanel/Orders';
import HomePage from './Pages/Adminpanel/HomePage';
import ShopPage from './Pages/Adminpanel/ShopPage';
import ShopFormPage from './Pages/Adminpanel/ShopFormPage';
import ProductForRentPage from './Pages/Shopkeeperpanel/ProductForRentPage';
import AddShopPage from './Pages/Shopkeeperpanel/AddShopPage';
import ProductSellPage from './Pages/Shopkeeperpanel/ProductSellPage'
import Shopspage from './Pages/Shopkeeperpanel/Shopspage'
import AdminLogin from './Pages/Adminpanel/AdminLogin.js';
import SkLogin from './Pages/Shopkeeperpanel/SkLogin.js';
import CustomerLogin from './Pages/CustomerPanel/CustomerLogin.js';
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
