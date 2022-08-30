import React from 'react'
import propTypes from 'prop-types'
import Image from 'next/image'
import classictee from '../../public/classic-tee.jpg'




const CartCard = ({this_item}) => {
    return(
       
        <div className='cardcontainer'>
          <div className='rowpic'>
            <div className='imagecontainer'>
                <Image src={classictee}></Image>
            </div>
          </div>
            <div className='rowtext'>
                <div className='tee'> {this_item.title}</div>
                <div> {this_item.quantity}x <b>${this_item.price}</b></div>
                <div>Size: {this_item.size.label}</div>
            </div>
          

        </div>       
      
    )
}

export default CartCard
