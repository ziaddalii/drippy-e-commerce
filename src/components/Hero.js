import React,{useEffect} from 'react'
import "../styles/hero.css"

// Images
import menSlide from "../images/hero-slides/men.jpg"
import womenSlide from "../images/hero-slides/women.jpg"
import kidsSlide from "../images/hero-slides/kids.jpg"

function Hero() {
  useEffect(() => {
    const nextButton = document.querySelector('.carousel-control-next-icon');
    nextButton.click();
  }, [])
  return (
  <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <div className='hero-carousel-img-container'>
            <img src={womenSlide} className="hero-carousel-img d-block w-100" alt="..."/>
        </div>
        <div className='carousel-form'>
          <span className='carousel-title'>women collection</span>
          <p className='carousel-desc'>we are in the industry since 1890.</p>
          <button className='btn carousel-btn-shop'>shop now</button>
        </div>
      </div>
      <div className="carousel-item">
        <div className='hero-carousel-img-container'>
          <img src={menSlide} className="hero-carousel-img d-block w-100" alt="..."/>
        </div>
        <div className='carousel-form'>
        <span className='carousel-title'>men collection</span>
        <p className='carousel-desc'>we are in the industry since 1890.</p>
        <button className='btn carousel-btn-shop'>shop now</button>
      </div>
      </div>
      <div className="carousel-item">
        <div className='hero-carousel-img-container'>
          <img src={kidsSlide} className="hero-carousel-img d-block w-100" alt="..."/>
        </div>
        <div className='carousel-form'>
        <span className='carousel-title'>kids collection</span>
        <p className='carousel-desc'>we are in the industry since 1890.</p>
        <button className='btn carousel-btn-shop'>shop now</button>
      </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-target="#carouselExampleFade" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-target="#carouselExampleFade" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </button>
  </div>
  )
}

export default Hero