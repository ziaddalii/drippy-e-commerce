import React, {useEffect,useState} from 'react'
import "../styles/cart.css";

import { useProducts } from '../contexts/ProductsContext';
import { Link, useNavigate } from 'react-router-dom';
 


const Cart = React.forwardRef(({className }, ref) => {
  const navigate = useNavigate()

  const {cart,decreaseQuantity, removeFromCart , increaseQuantity} = useProducts();

  const [totalPrice, setTotalPrice] = useState()


  const [cartEmpty, setCartEmpty] = useState(true)

  const handleCheckout = () => {
    navigate("/checkout")
  }

  useEffect(() => {
    calcTotalPrice()
    if (cart.length !== 0) {
      setCartEmpty(false)
    }else{
      setCartEmpty(true)
    }
  }, [cart])


  const calcTotalPrice = () => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart')|| "[]")
    let totalPrice = 0;
    cartFromLocalStorage.forEach(product => {
      if(product.hasOwnProperty('salePrice')){
          totalPrice += product.salePrice * product.quantity;
      }
      else{
          totalPrice += product.price * product.quantity;
      }
    });
    setTotalPrice(totalPrice);
}

  return (
    <div ref={ref} className={`cart ${className}`}>
      <div>{
      cartEmpty ?
      <span className='d-flex justify-content-center'>your cart is empty!!</span>
      :
        <>
          <div className='cart-table d-flex col-12 align-items-center justify-content-start'>
            <span className='col-7 p-0 mr-1'>product:</span>
            <span className='col-2 p-0 mr-1'>price:</span>
            <span className='col-2 p-0'>qty:</span>
          </div>
          {cart.map((cartItem) => {
            return (
            <Link to={`/products/${cartItem.id}`} key={cartItem.id}>
              <div className='cart-item d-flex col-12 align-items-center justify-content-start'>
                <div className='d-flex align-items-center col-7 p-0 mr-1'>
                  <img className='cart-img' src={cartItem.img} alt={cartItem.title}/>
                  <span className='cart-title'>{cartItem.title}</span>
                </div>
                <span className='cart-price col-2 p-0 mr-1'>EGP {cartItem.salePrice ? cartItem.salePrice : cartItem.price}</span>
                <div className='cart-quantity d-flex algin-items-center justify-content-center col-2 p-0'>
                  <button onClick={(e) => { e.preventDefault(); increaseQuantity(cartItem)}} className='btn-plus'>&#43;</button>
                  <span className=''>{cartItem.quantity}</span>
                  <button onClick={(e) => { e.preventDefault(); decreaseQuantity(cartItem)}} className='btn-minus'>&#8722;</button>
                </div>
                <div className='col-1 p-0'>
                  <button onClick={(e) => { e.preventDefault(); removeFromCart(cartItem)}} className='remove-item-btn'>&#10005;</button>
                </div>
              </div>
            </Link>
            )
          })}
          <p className='my-1'>total: egp {totalPrice}</p>
          <button onClick={handleCheckout} className='checkout-btn btn btn-success d-flex justify-content-center mx-auto'>checkout</button>
        </>
      }
      </div>

    </div>
  );
})
 
 export default Cart