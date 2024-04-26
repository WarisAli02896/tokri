import React, { useState, useEffect, useCallback } from 'react';
import '../../Styles/ComponentStylecss/table.css';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../Components/Atoms/SearchBar';
import Button from '../../Components/Atoms/Button'; 
import DropdownButton from './DropdownButton';

const Table = ({ headers, showAddButton, showSearchBar, showDropdown, userRole }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('mydata.json');
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterData = useCallback((searchTerm) => {
    if (searchTerm.trim() === '') {
      return setFilteredData(data);
    }

    const filteredData = data.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.slice(0, 2).toUpperCase().includes(searchTerm.slice(0, 2).toUpperCase())
      )
    );
    setFilteredData(filteredData);
  }, [data]);

  useEffect(() => {
    filterData(searchTerm);
  }, [filterData, searchTerm]);

  const handleEditActionClick = () => {
    if (userRole === 'admin') {
      navigate('/ep');
    } else if (userRole === 'shopkeeper') {
      navigate('/addshop');
    } else if (userRole === 'customer') {
      navigate('/customer');
    }
  };

  const dropdownOptions = [
    { value: 'option1', text: 'Option 1'},
  ];

  const handleAddButtonClick = () => {
    if (userRole === 'shopkeeper') {
      if (currentPage === 'shops') {
        navigate('/addshop');
      } else if (currentPage === 'pfs') {
        navigate('/pfsp');
      }
    }
  };

  return (
    <div className="table-container">
       <div className='table-header'>
      {showDropdown && <DropdownButton buttonText="Dropdown" options={dropdownOptions} className="dropdown" /> }
      {showSearchBar && <SearchBar onSearch={setSearchTerm} className="search-bar" /> }
      {showAddButton && <Button 
        label="Add"
        onClick={handleAddButtonClick}
        type="button"
        className="add-button"
      /> }
    </div>
     
      <table className="table">
        <thead>
          <tr>
        
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map((item, rowIndex) => (
            <tr key={rowIndex}>
              
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>{item[header]}</td> 
              ))}
               <td>
                <Button
                  label="Edit"
                  onClick={handleEditActionClick}
                  type="button"
                  className="edit-button"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
