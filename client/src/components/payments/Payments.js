import React from 'react'
import { BsFillCartCheckFill } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom'
import "./Payments.scss"
import Cart from '../cart/Cart';
import { useDispatch } from 'react-redux';
import { resetCart } from '../../redux/cartSlice';

function Payments() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const params=useParams();
    const Status=params.status;

    const infoData={
        success:{
            message:"Your order has been placed",
            cta:"Shop More",
            icon:<BsFillCartCheckFill/>
        },
        failed:{
            message:"Payment Failed",
            cta:"Try Again",
            icon:<BiErrorCircle/>
        }
    };

    if(Status==="success"){
        dispatch(resetCart)
    }

    return (
        <div className='Payments'>
            <div className="icon">{infoData[Status].icon}</div>
            <h2 className="message">{infoData[Status].message}</h2>
            <button className="btn-primary" onClick={()=> navigate('/')}>{infoData[Status].cta}</button>
        </div>
    )
}

export default Payments