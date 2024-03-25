import React from 'react'
import Navbar from '../../Components/Atoms/Navbar';
import '../../Styles/PagesStylescss/customerpage/homepage.css';
export default function HomePage({userRole}) {
  return (
    <div>
        <Navbar userRole={userRole}/>
          <div className='customer-content'>
            Welcome to Customer Home Page
          </div>
    </div>
  )
}
