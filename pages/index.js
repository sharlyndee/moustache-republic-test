import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import classictee from '../public/classic-tee.jpg'
import CartCard from '../components/CartCard'
import DropDown from '../components/Dropdown'
import { render } from 'react-dom'
import axios from 'axios'

export default function Home() {
  const [post, setPost]= useState([])
  const [cart, setCart] = useState([])
  const [size, setSize] = useState(null)
  const [sku, setSKU] = useState([])
  const [cartlength, setCartlength] = useState (0)
  
  useEffect(()=>{
    var newcount = 0
    cart.map(product => {
      newcount += product.quantity
    })
    setCartlength(newcount)
    },[cart])

  useEffect(()=>{
    axios.get('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
    .then(res => {
      console.log(res)
      setPost(res.data)
      setSKU(res.data.sizeOptions)
    })
    
    .catch (err => {
      console.log(err)
    })
  }, [])

  const addToCart = () => {
    if (size) {
      var item = {
        title: post.title,
        price: post.price,
        size: size,
        imageURL: post.imageURL,
        price: post.price,
        quantity: 1,
      }
      var doesnotexist = true
      var newcart = []
      cart.map(cart_item=> {
        if (cart_item.size.id == item.size.id){
          var newItem = {
            ...cart_item,
            quantity: 1+cart_item.quantity
          }
          newcart.push(newItem)
          doesnotexist = false
        }
        else{
        
          newcart.push(cart_item)
        }
        })
      if (doesnotexist){
        newcart.push(item)
      }
      setSize(null)
      setCart(newcart)
    }
    else{
      alert('Error! Please select size!')
    }
  }


    return (
      <div className='container'>
        <Head>
          <title>Moustache Republic</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <div>
        <div className='header'>
        <div className="dropdown">
      <div className="dropbtn">
        <span className='contentcontainer'>
         <div className='mycart'> My cart ({cartlength}) </div>
         <div className='cart'><Image src={cart}></Image> </div>
        </span>
      </div>
      <div className="dropdown-content">
        {cart.map(cart_item=> {
          if (cart_item){
            return(
              <CartCard this_item={cart_item}></CartCard>
             )
            }

           }
          )
        }
        


        </div>
    </div>
        </div>
        <div className='columncontainer'>
          <div className='rowimg'>
            <div className='imagecontainer'>
              <Image src={classictee}></Image>
            </div>
          </div>
          <div className='row'>
 
              <div className='classictee'>{post.title}</div>
        
              
              <hr></hr>
              <div><b>${post.price}</b></div>
              <hr></hr>
              <div className='text'>{post.description}</div>
              <div className='flex'>
                <div className='size'>SIZE</div>
                <div className='as'>*</div>
              </div>
                {sku.map(sku_item => {
                return(
                  <button className={`buttonsize ${size?.id == sku_item.id ? `buttonclicked` : null}`} onClick={()=>setSize(sku_item)}>{sku_item.label}</button>
                )
                })}
               <br></br>
              <button className='addtocart' onClick={()=>addToCart()}> ADD TO CART </button>
      
          </div>
        </div>
    
      </div>
      </div>
    )
  }

