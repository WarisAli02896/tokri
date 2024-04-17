import React from 'react'
import Navbar from '../../Components/Atoms/Navbar';
import '../../Styles/PagesStylescss/adminpage/homepage.css';

export default function HomePage({userRole}) {
  return (
    <div>
        <Navbar  userRole={userRole}/>
          <div className='admin-content'>
            <h2> Admin</h2>
          </div>
    </div>
  )
}
