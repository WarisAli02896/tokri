import React, { useState, useEffect, useCallback } from 'react';
import '../../Styles/ComponentStylecss/table.css';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../Components/Atoms/SearchBar';
import Button from '../../Components/Atoms/Button'; // Assuming Button component is in the same directory

const Table = ({ headers }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleActionClick = () => {
    navigate('/srp');
  };

  return (
    <div className="table-container">
      <SearchBar onSearch={setSearchTerm} />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>{item[header]}</td> 
              ))}
               <td>
                <Button
                  label="Edit"
                  onClick={handleActionClick}
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
