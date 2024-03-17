import React, { useState, useEffect } from 'react';
import '../../Styles/ComponentStylecss/table.css';
import { useNavigate } from "react-router-dom";

const Table = ({ searchTerm, headers }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm]);

  const handleEdit = () => {
    navigate(`/srp`);
  };

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

  const filterData = () => {
    if (searchTerm.trim() === '') {
      return setFilteredData(data);
    }

    const filteredData = data.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toUpperCase().includes(searchTerm.toUpperCase())
      )
    );
    setFilteredData(filteredData);
  };

  return (
    <div className="container">
      <table>
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
              <td><button onClick={handleEdit} id='btn'>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
