import React, {useState} from 'react';
import Table from '../Components/Atoms/Table';
import Navbar from '../Components/Atoms/Navbar';
import SearchBar from '../Components/Atoms/SearchBar';
import '../Styles/PagesStylescss/shoppage.css';

const currentUser = {
  profileImage: 'profile.jpg',
  role: 'admin', // or 'user'
};

 const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className='shop-page'>
      <Navbar userRole="admin" user={currentUser}/>
      <div className="search-table-container">
        <div className="search-form">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="container">
          <Table 
            searchTerm={searchTerm} 
            headers={['ID','Name','Email','OwnerName','CNIC', 'NTN', 'Area', 'Status']} 
          />
        </div>
      </div>
    </div>
  );
}

export default ShopPage;