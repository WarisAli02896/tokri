import React from 'react'
import Navbar from '../../Components/Atoms/Navbar'
import '../../Styles/PagesStylescss/shopkeeperpage/orderspage.css'

export default function Orders({userRole}) {
  return (
    <div>
       <Navbar  userRole={userRole}/>
       <div className='orders-content'>
            <h2> orders page</h2>
          </div>
    </div>
  )
}
