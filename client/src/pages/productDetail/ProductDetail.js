import "./ProductDetail.scss"
import spider from "../../assets/spider.jpeg"
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
const ProductDetail=()=>{
    const params=useParams();
    const [product,setProduct]=useState(null);
    const dispatch=useDispatch();

    const cart=useSelector(state => state.cartReducer.cart);
    const quantity=cart.find(item => item.key===params.productId)?.quantity || 0;

    const fetchData=async ()=>{
        const productResponse=await axiosClient.get(`/products?filters[key][$eq]=${params.productId}&populate=*`)
        // console.log(productResponse)
        if(productResponse.data.data.length>0){
            setProduct(productResponse.data.data[0])
        }
    }

    useEffect(()=>{
        setProduct(null);
        fetchData();
    },[params])

    if(!product){
        return <Loader/>
    }

    return(
        <div className="ProductDetail">
            <div className="container">
                <div className="product-layout">
                    <div className="product-image">
                    <div className="product-img center">
                        {/* {console.log(product?.attributes.category.data.attributes.title=="Super Heroes")} */}
                        {product?.attributes.category.data.attributes.title=="Super Heroes" ? <img src={product?.attributes.image.data.attributes.url} alt={product?.attributes.title} style={{transform: "scale(0.7)"}}/> : <img src={product?.attributes.image.data.attributes.url} alt={product?.attributes.title} />}
                        
                    </div>
                    </div>
                    <div className="product-info">
                        <h1 className="heading">
                            {product?.attributes.title}
                        </h1>
                        <h3 className="price">Rs {product?.attributes.price}</h3>
                        <p className="description">
                            {product?.attributes.desc}
                        </p>
                        <div className="cart-options">
                            <div className="quantity-selector">
                                <span className="btn decrement" onClick={()=> dispatch(removeFromCart(product))}>-</span>
                                <span className="quantity">{quantity}</span>
                                <span className="btn increment" onClick={()=> dispatch(addToCart(product))}>+</span>
                            </div>
                            <button className="btn-primary add-to-cart" onClick={()=> dispatch(addToCart(product))}>Add to Cart</button>
                        </div>
                        <div className="return-policy">
                            <ul className="policy">
                                <li>Rules create an environment of discipline in the organization.</li>
                                <li>Every employee has to wear formals in the office on all working days except on Wednesdays</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;