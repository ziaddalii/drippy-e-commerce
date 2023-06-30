import React, { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useProducts } from '../contexts/ProductsContext'
import "../styles/paymentForm.css"
import ReactConfetti from 'react-confetti'
import { useWindowSize } from 'react-use'
function PaymentForm() {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const { width, height } = useWindowSize()

    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "black",
                backgroundColor: "white",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                ":-webkit-autofill": { color: "black" },
                "::placeholder": { color: "black" }
            },
        }
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)
        })
    if(!error){
        try {
            const {id} = paymentMethod
            const response = await axios.post(process.env.REACT_APP_SERVER_URL, {
                amount: totalPrice,
                id
            })
            if(response.data.success){
                console.log("Succeccful payment");
                setSuccess(true)
                setCart([])
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }else{
        console.log(error.message);
        setLoading(false)
    }
}
const {cart, setCart} = useProducts();
const [totalPrice, setTotalPrice] = useState()
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
    let totalPriceCents = totalPrice * 100
    setTotalPrice(totalPriceCents);
}

useEffect(() => {
    calcTotalPrice()
}, [cart])

  return (
    <div className='payment-section'>
        {
            !success ?
            <form onSubmit={handleSubmit}>
                <fieldset className='FormGroup'>
                    <div className='FormRow'>
                        <CardElement options={CARD_OPTIONS}></CardElement>
                    </div>
                    </fieldset>
                    <p className='text-secondary card-number-test'>use 4242 4242 4242 4242 card number for testing</p>
                <button disabled={loading} className='payment-btn btn-success'>Pay</button>
            </form>
            :
            <div>
                <ReactConfetti
                width={width}
                height={height}
                />
                <h2 className='mt-2'>Payment Succeeded</h2>
            </div>
        }
    </div>
  )
}

export default PaymentForm