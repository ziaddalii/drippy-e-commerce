import React from 'react'
import "../styles/why-us.css"
import worldwide from '../images/illustrations/worldwide.svg'
import fashionTrends from '../images/illustrations/fashion-trends.svg'
import discount from '../images/illustrations/discount.svg'

function WhyUs() {
  return (
    <div className='why-us-section'>
        <p className='section-title'>why us?</p>
        <div className="container">
            <div className='col-12 row p-0 m-0 align-items-center justify-content-center'>
                <div className='why-us-card col-md-4 col-12 justify-content-center'>
                    <img className='w-100' src={fashionTrends}/>
                    <h5 className='font-weight-bold text-uppercase text-center mt-2'>fashion trends</h5>
                    <p className='text-center'>up-to-date fashion trends</p>
                </div>
                <div className='why-us-card col-md-4 col-12 justify-content-center'>
                    <img className='w-100' src={worldwide}/>
                    <h5 className='font-weight-bold text-uppercase text-center mt-2'>worldwide shipping</h5>
                    <p className='text-center'>we will catch you wherever you are </p>
                </div>
                <div className='why-us-card col-md-4 col-12 justify-content-center'>
                    <img className='w-100' src={discount}/>
                    <h5 className='font-weight-bold text-uppercase text-center mt-2'>our discounts</h5>
                    <p className='text-center'>your pocket is in safe hands</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WhyUs