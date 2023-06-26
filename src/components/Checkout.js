import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'
import { useProducts } from '../contexts/ProductsContext'
import { Link } from 'react-router-dom'

function Checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const PUBLIC_KEY = "pk_test_51NJC4yHJSAygrcUp5cNzRAAcPEl4P2moYmzoiTbSeoKzakxGJHtSgkC88dWrVjDerixICvIaXLVxjYb0S81zzw4r00M4JHUEka"
    const stripeTestPromise = loadStripe(PUBLIC_KEY)

    const {cart} = useProducts();
    useEffect(() => {
      calcTotalPrice()
  }, [cart])

    const [displayedPrice, setDisplayedPrice] = useState()
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
        const f = new Intl.NumberFormat("en-us")
        let totalFormatted = f.format(totalPrice)
        setDisplayedPrice(totalFormatted)
    }
  return (
    <div className='checkout-section section mt-5'>
    <div className='container'>
    <Elements stripe={stripeTestPromise}>
          <div className='d-flex'>
          <div className='row col-12 p-0'>
          {cart.map((cartItem) => {
            return (
                  <Link className='col-12 col-md-6' to={`/products/${cartItem.id}`} key={cartItem.id}>
                    <div className='cart-payment-item d-flex col-12 p-0 align-items-center justify-content-between'>
                      <div className='d-flex align-items-center col-7 p-0 mr-1'>
                        <img className='cart-img' src={cartItem.img} alt={cartItem.title}/>
                        <span className='cart-title'>{cartItem.title}</span>
                      </div>
                      <span className='cart-price col-2 p-0 mr-1'>EGP {cartItem.salePrice ? cartItem.salePrice : cartItem.price}</span>
                      <div className='cart-quantity d-flex algin-items-center justify-content-end col-2 p-0'>
                        <span className=''>{cartItem.quantity}</span>
                      </div>
                    </div>
                  </Link>
                  )
                })}
                </div>
              </div>
              {
                cart.length != 0 &&
                <p className='mt-2'>TOTAL: EGP {displayedPrice}</p>
              }
          <PaymentForm/>
          </Elements>
          </div>
      </div>
  )
}

export default Checkout