import React, { useState } from 'react'
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import {BsCart2} from "react-icons/bs"
import Cart from '../cart/Cart';
import { useSelector } from 'react-redux';

function Navbar() {
  const [openCart,setOpenCart]=useState(false);
  const categories=useSelector(state => state.categorySlice.categories);
  const cart=useSelector(state => state.cartReducer.cart);
  let totalItems=0;
  cart.forEach(item => totalItems += item.quantity);

  return (
    <>
      <nav className="Navbar">
        <div className="container nav-container">
          <div className='nav-left'>
            <ul className='link-group'>
              {
                categories?.map(category=>(
                  <li key={categories.id} className='hover-link'><Link className='link' to={`/category/${category.attributes.key}`}>{category.attributes.title}</Link></li>
                ))
              }
            </ul>
          </div>
          <div className='nav-center'><Link to="/"><h1 className='banner'>Art.Posterio</h1></Link></div>
          <div className='nav-right'>
            <div className='nav-cart hover-link' onClick={()=> setOpenCart(!openCart)}>
              <BsCart2 className="icon"/>
              {totalItems> 0 && <span className='cart-count center'>{totalItems}</span> }
            </div>
          </div> 
        </div>
      </nav>
      {openCart && <Cart onClose={()=> setOpenCart(false)}/>}
    </>
  )
}

export default Navbar