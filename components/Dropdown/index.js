import React from 'react'
import CartCard from '../CartCard'
import cart from "../../public/basket.png"
import Image from 'next/image'

const Dropdown = (cart) => {
    return(
      <div className="dropdown">
      <div className="dropbtn">
        <span className='contentcontainer'>
         <div className='mycart'> My cart ({cart.length}) </div>
         <div className='cart'><Image src={cart}></Image> <div>helloow</div> </div>
        </span>
      </div>
      <div className="dropdown-content">
           <CartCard></CartCard>
           <CartCard></CartCard>

        </div>
    </div>



    )
}

export default Dropdown

