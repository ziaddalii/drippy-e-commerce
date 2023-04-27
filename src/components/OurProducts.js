import React, {useState,useEffect,useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../styles/our-products.css";
import "../styles/popup.css"
import { productsData } from '../data/productsData';
import { useProducts } from '../contexts/ProductsContext';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation} from "swiper";

// Firebase
import { useAuth } from '../contexts/AuthContext';

// IMAGES
import shoppingBagIcon from "../images/icons/shopping-bag.png"
import addedToBag from "../images/icons/added-to-bag.png"
import heartIcon from "../images/icons/heart.png"
import faved from "../images/icons/faved.png"
import searchIcon from "../images/icons/search.png"
import menuIcon from "../images/icons/menu.png"
import slideIcon from "../images/icons/slide.png"
import saleTag from "../images/icons/sale-tag.png"
import checked from "../images/icons/checked.png"


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);


function OurProducts() {
  const {currentUser} = useAuth()
  const { products, setProducts, addToCart, addToFavs, cart, favorites,checkCarted, checkFaved, productCheck} = useProducts();

  const [productsEmpty, setProductsEmpty] = useState(false) ;
  const swiperProductsRef = useRef(null);

  const [isWide, setIsWide] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    checkCarted(cart, products)
    localStorage.setItem("productsInCart" , JSON.stringify(cart))

  }, [cart]) 

  useEffect(() => {
    checkFaved(favorites, products)
    localStorage.setItem("productsInFavs" , JSON.stringify(favorites))

  }, [favorites]) 

  useEffect(() => {    
    const searchInputValue = document.querySelector(".search-input").value
    handleSearchInputChange(searchInputValue)

    function handleWidth() {
      if (window.innerWidth >= 767) {
        setIsWide(true);
      } else {
        setIsWide(false);
        }
      }
      handleWidth()
  
      window.addEventListener('resize', handleWidth);
  
      return () => {
        window.removeEventListener('resize', handleWidth);
      };
    }, []);

    // SEARCH FILTER
    const [searchedProducts, setSearchedProducts] = useState([])
    const handleSearchInputChange = (searchInputValue) => {
      const newProducts = productsData.filter(product => {
          return product.title.toLowerCase().includes(searchInputValue.toLowerCase());
        })
      if (newProducts.length === 0) {
        setProductsEmpty(true)
      }else{
        setProductsEmpty(false)
      }
      setSearchedProducts(newProducts)
    };

    useEffect(() => {
      filterSecondHand(searchedProducts)
    }, [searchedProducts])

    // Sort Products
    const [activeSortButton, setActiveSortButton] = useState('highest price');
    const sortProducts = (products) =>{
      if (activeSortButton === "highest price") {
        sortProductsByHighestPrice(products)
      } else {
        sortProductsByLowestPrice(products)
      }
    }

    const sortProductsByHighestPrice = (searchedProducts) =>{
      const sortedProductsData = searchedProducts.sort((a, b) => {
        const aPrice = a.salePrice !== undefined ? a.salePrice : a.price;
        const bPrice = b.salePrice !== undefined ? b.salePrice : b.price;
        return bPrice - aPrice;
    });
      setProducts(productCheck(cart, favorites , sortedProductsData))
      setActiveSortButton("highest price")
    }

    const sortProductsByLowestPrice = (products) =>{
      const sortedProductsData = products.sort((a, b) => {
        const aPrice = a.salePrice !== undefined ? a.salePrice : a.price;
        const bPrice = b.salePrice !== undefined ? b.salePrice : b.price;
        return aPrice - bPrice;
      });
      setProducts(productCheck(cart, favorites , sortedProductsData))
      setActiveSortButton("lowest price")
    }

    const [showMenu, setShowMenu] = useState(false)
    const [showSwiper, setShowSwiper] = useState(true)

    const handleShowMenu = () => {
      if (!showMenu) {
        setShowSwiper(false)
        setShowMenu(true)
      }
    }
    const handleShowSwiper = () => {
      if (!showSwiper) {
        setShowSwiper(true)
        setShowMenu(false)
      }
    }

    const [secondhandCheck, setSecondhandCheck] = useState(true);
    const handleCheckboxChange = () => {
      setSecondhandCheck(!secondhandCheck);
      filterSecondHand(products, !secondhandCheck);
    }

    const filterSecondHand = (searchedProducts) =>{
      if (secondhandCheck) {
        setProducts(productCheck(cart, favorites, [...searchedProducts]));
        sortProducts([...searchedProducts])
      }else{
        const filtered = searchedProducts.filter((product) => product.secondHand === undefined || product.secondHand === false);
        setProducts(productCheck(cart, favorites, [...filtered]));
        sortProducts([...filtered])
      }
    }

    useEffect(() => {
      filterSecondHand(searchedProducts);
    }, [secondhandCheck])

    // Popup
    const [popup, setPopup] = useState(false)

    const togglePopup = () => {
        if(currentUser){
            setPopup(!popup)
          }else{
            navigate("/signin")
          }
    }

    if (popup) {
      document.body.classList.add("active-popup")
    }else{
      document.body.classList.remove("active-popup")
    }
    
    const [uploadErr, setUploadErr] = useState("")
    const [loading, setLoading] = useState(false)
    const [imgUrl, setImgUrl] = useState(null)
    const [productUploaded, setProductUploaded] = useState(false)
    const productTitleRef = useRef(false);
    const productPriceRef = useRef(false);


    async function handleUpload(event) {
      event.preventDefault();
      const productTitle = productTitleRef.current.value.trim();
      const productPrice = productPriceRef.current.value.trim();
      const imgInput = document.getElementsByClassName("img-input")[0]
      const productImgUrl = imgUrl

      if(productTitle === "" || productPrice === "" || imgUrl === null){
        setUploadErr("all fields are required")
      }else{
        try{
          setLoading(true)
          const newProduct = {
            title: productTitle,
            price: productPrice,
            img: productImgUrl,
            id:Math.random(),
            secondHand: true,
          };
          console.log(newProduct);
          setProducts(productCheck(cart, favorites , [...products, newProduct]))
          setTimeout(() => {
            setPopup(false)
            setProductUploaded(false)
          }, 1000);
          setLoading(false)
          setProductUploaded(true)
          setUploadErr("");  
        }catch{
          setLoading(false)
          setUploadErr("Failed1")
        }
      }
    }

    const checkImage = (event) => {
      let files = event.target.files;
      let file = files[0];    
      let types = ["image/jpeg" , "image/png"];
      const imgInput = document.getElementsByClassName("img-input")[0]
      
      if (!files || files.length === 0) {
        setUploadErr('Please select an image to upload');
      }else{
        if(types.indexOf(file.type) === -1){
          setUploadErr('image type must be (png/jpg)')
          imgInput.value = "";
        }else{
          if(file.size > 2 * 1024 * 1024){
              setUploadErr("image size must be smaller than 2MB");
              imgInput.value = "";
          }else{
            getImageBase64(file);
              setUploadErr("");
          }
        }
      }
    }
  
    const getImageBase64 = async (file) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = await function (){
          const productImage = reader.result;
          setImgUrl(productImage)
        };
        
        reader.onerror = function(){
          setUploadErr("error uploading the product, please try again");
        };
    }
    return (
      <section>
        <div className='our-products-section section'>
          <span className='section-title'>our products</span>
          <div className='filter-tools row col-12 justify-content-between align-items-center section-container my-2 mx-auto' >
              <div className='col-xl-3 col-md-6 col-sm-6 mt-2 p-0'>
                <div className='filter-option search-input-container d-flex align-items-center justify-content-start'>
                  <input className='search-input' onChange={(e) => {handleSearchInputChange(e.currentTarget.value.toLowerCase(), products)}} placeholder='Search...' type="text"/>
                  <img className='search-icon' src={searchIcon} alt="search icon"/>
                </div>
              </div>
              <div className="filter-option justify-content-end mt-2 p-0 col-xl-3 col-md-6 col-sm-6 btn-group sort-group">
                <button type="button" className="sort-btn dropdown-toggle text-capitalize font-weight-bold" data-toggle="dropdown" aria-expanded="false">
                  sort by: <span className='text-capitalize font-weight-normal'>{activeSortButton}</span>
                </button>
                <div className="dropdown-menu">
                  <button onClick={() => sortProductsByLowestPrice(products)} className={`dropdown-item text-capitalize ${activeSortButton === 'lowest price' ? 'active-sort-btn' : ''}`} href="#">lowest price</button>
                  <button onClick={() => sortProductsByHighestPrice(products)} className={`dropdown-item text-capitalize ${activeSortButton === 'highest price' ? 'active-sort-btn' : ''}`} href="#">highest price</button>
                </div>
              </div>
              <div className='filter-option filter-show p-0 mt-2 col-xl-3 col-md-6 col-sm-6 justify-content-center show-option d-flex align-items-center'>
                <span className='text-capitalize font-weight-bold mr-1'>show:</span>
                <button onClick={handleShowMenu} className='show-btn d-flex justify-content-center align-items-center mr-2'>
                  <img src={menuIcon} className={showMenu ? "active-show-btn" : ""} alt="menu"/>
                </button>
                <button onClick={handleShowSwiper} className='show-btn d-flex justify-content-center align-items-center'>
                  <img src={slideIcon} className={showSwiper ? "active-show-btn" : ""} alt="slide"/>
                </button>
              </div>
              <div className='filter-option second-hand-check p-0 mt-2 col-xl-3 col-md-6 col-sm-6 d-flex align-items-center justify-content-end ml-15'>
                <input type="checkbox" checked={secondhandCheck} onChange={handleCheckboxChange} />
                <label className='m-0 ml-2'>Second-Hand products</label>
              </div>
          </div>
          <div className={productsEmpty ? "d-block justify-content-center text-center empty-msg" : "d-none text-center"}>no matching search, try something else...</div>
          {
            showSwiper
            ?
            <Swiper className='products-container d-flex col-12 justify-content-between'
            ref={swiperProductsRef}
            navigation
            slidesPerView = {isWide ? 3 : 1}
            >
              <div className='section-container'>
                {
                    products.map((product) => {
                    return (
                      <SwiperSlide className='product-item col-md-4 justify-content-center' key={product.id}>
                      {product.salePrice? <img className='sale-tag' src={saleTag}/> : ""}
                      
                        <Link to={`/products/${product.id}`}>
                          <div className='product-buttons'>
                              <img onClick={(event) => addToCart(product, event)} className='product-icon add-to-cart-icon' src={product.carted ? addedToBag : shoppingBagIcon} alt="add to cart"/>
                              <img onClick={(event) => addToFavs(product, event)} className='product-icon add-to-favs-icon' src={product.faved ? faved : heartIcon} alt="add to favorites"/>
                            </div>
                            <div className='product-img-container'>
                                <img className="product-img" src={product.img} alt={product.title} />
                            </div>
                            <div className='product-info'>
                                <span className='product-title'>{product.title}</span>
                                <p className={product.salePrice ? 'price-on-sale mb-0' : "product-price"}>EGP {product.price}</p>
                                {product.salePrice ? <p className='product-price-sale'>EGP {product.salePrice}</p> : ""}
                            </div>
                          </Link>
                        </SwiperSlide>
                      )
                  })
                }
              </div>
            </Swiper>
            :
            <div className='section-container'>
            <div className='d-flex row m-0 p-0'>
          {
              products.map((product) => {
                return (
                  <div className='product-item col-md-4 col-sm-6 justify-content-center' key={product.id}>
                  {product.salePrice? <img className='sale-tag' src={saleTag}/> : ""}
                    <Link to={`/products/${product.id}`}>
                        <div className='product-buttons'>
                          <img onClick={(event) => addToCart(product, event)} className='product-icon add-to-cart-icon' src={product.carted ? addedToBag : shoppingBagIcon} alt="add to cart"/>
                          <img onClick={(event) => addToFavs(product, event)} className='product-icon add-to-favs-icon' src={product.faved ? faved : heartIcon} alt="add to favorites"/>
                        </div>
                        <div className='product-img-container'>
                            <img className="product-img" src={product.img} alt={product.title} />
                        </div>
                        <div className='product-info'>
                            <span className='product-title'>{product.title}</span>
                            <p className={product.salePrice ? 'price-on-sale mb-0' : "product-price"}>EGP {product.price}</p>
                            {product.salePrice ? <p className='product-price-sale'>EGP {product.salePrice}</p> : ""}
                        </div>
                      </Link>
                    </div>
                )
              })
            }
              </div>
            </div>
          }
          <div className='d-flex justify-content-center'>
              <button onClick={togglePopup} className='sell-btn'>
                + Sell Your Used Products
              </button>
          </div>
          {
            popup &&
            <div className='popup'>
              <div className='overlay'>
                  <div className='popup-content'>
                    <form>
                      <div className="form-group">
                        <label htmlFor="productTitle" className='text-capitalize'>product title:</label>
                        <input ref={productTitleRef} type="text" className="form-control" id="productTitle"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="productPrice" className='text-capitalize'>product price:</label>
                        <div className='d-flex align-items-center'>
                          <span className='mr-1'>EGP</span>
                          <input ref={productPriceRef} type="number" className="form-control" id="productPrice"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlFile1" className='text-capitalize'>product image:</label>
                        <input onChange={(event) => {checkImage(event)}} type="file" className="img-input form-control-file" id="exampleFormControlFile1" accept="image/png, image/jpeg" />
                        <small className='text-secondary'>preferred 1:1 ratio image</small>
                      </div>
                      <p className='text-danger'>{uploadErr}</p>
                      <button onClick={(event) => {handleUpload(event)}} disabled={loading} type="submit" className="btn-submit">Submit</button>
                    </form>
                    <button onClick={togglePopup} className='close-popup'>X</button>
                  </div>
                  <div className={productUploaded ? "submitted" : "not-submitted"}>
                    <img className='check-img' src={checked}/>
                  </div>
              </div>
            </div>

          }
        </div>
      </section>
        
  )
}

export default OurProducts;


