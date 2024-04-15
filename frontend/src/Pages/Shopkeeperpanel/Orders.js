import React from 'react'
import Navbar from '../../Components/Atoms/Navbar'
import '../../Styles/PagesStylescss/shopkeeperpage/orderspage.css'

export default function Orders() {
  return (
    <div>
       <Navbar  userRole="shopkeeper"/>
       <div className='orders-content'>
            <h2> orders page</h2>
          </div>
    </div>
  )
}
