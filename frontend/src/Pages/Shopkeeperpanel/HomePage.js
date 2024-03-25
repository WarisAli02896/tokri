import React from 'react'
import Navbar from '../../Components/Atoms/Navbar';
import '../../Styles/PagesStylescss/shopkeeperpage/homepage.css';

export default function HomePage({userRole}) {
  return (
    <div>
        <Navbar  userRole={userRole}/>
          <div className='shopkeeper-content'>
            <h2> Hello Shopkeeper</h2>
          </div>
    </div>
  )
}
