import React from 'react'
import "../styles/hot.css"
import newCollection from "../images/hot/new-collection.jpg"
import hoodies from "../images/hot/hoodies.jpg"
import sportswear from "../images/hot/sportswear.jpg"

function Hot() {
  return (
    <div className='hot-section'>
        <div className='container'>
            <h3 className='font-weight-bold text-uppercase col'>what's hot</h3>
            <div className='col-12 row m-0 p-0 d-flex'>
                <div className='hot-item col-md-4'>
                    <img className='w-100 hot-img' src={sportswear}/>
                    <button className='hot-btn'>sportswear</button>
                </div>
                <div className='hot-item col-md-4'>
                    <img className='w-100 hot-img' src={newCollection}/>
                    <button className='hot-btn'>new collection</button>
                </div>
                <div className='hot-item col-md-4'>
                    <img className='w-100 hot-img' src={hoodies}/>
                    <button className='hot-btn'>hoodies</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hot