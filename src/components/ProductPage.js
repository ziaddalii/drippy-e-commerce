import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import "../styles/product-page.css"
import { productsData } from './../data/productsData';
import { productsReviews } from './../data/productsReviews';
import { colors } from './../data/colors';

// Images
import whiteShoppingBagIcon from "../images/icons/white-shopping-bag.png"
import shoppingBagIcon from "../images/icons/shopping-bag.png"
import addedToBag from "../images/icons/added-to-bag.png"
import heartIcon from "../images/icons/heart.png"
import faved from "../images/icons/faved.png"
import saleTag from "../images/icons/sale-tag.png"
import star from "../images/icons/star.png"
import { useProducts } from './../contexts/ProductsContext';



const ProductPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const { productId } = useParams();
    const {setProducts, addToCart, addToFavs, products,productCheck, cart, favorites} = useProducts();

    const targetedProduct = productsData.find((product) => product.id === productId);
    const [myProduct, setMyProduct] = useState(targetedProduct)

    const productsSameCategory = productsData.filter(productData => productData.category === myProduct.category && productData.id !== productId);
    const [relatedProducts, setRelatedProducts] = useState(productsSameCategory)
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        const newTargetedProduct = products.find((product) => product.id === productId);
        setMyProduct(newTargetedProduct)
        setRelatedProducts(productCheck(cart,favorites, productsSameCategory))
    }, [productId])

    useEffect(() => {
        const productsSameCategory = productsData.filter(productData => productData.category === myProduct.category && productData.id !== myProduct.id);
        setRelatedProducts(productCheck(cart, favorites, productsSameCategory))
        setProducts(productCheck(cart, favorites, productsData))
    }, [cart, favorites, myProduct])

    useEffect(() => {
        const updatedProduct = products.find((product) => product.id === productId);
        setMyProduct(updatedProduct)
    }, [products])

    const handleColorClick = (color) => {
        if (color.available) {
            setActiveId(color.id);
        }
    }

    return (
        <div className='product-page-section section'>
            <div className='container'>
                <div className='col-12 row m-0 p-0 align-items-center'>
                    <div className='col-md-6 pt-4'>
                        <img className='product-page-img w-100' src={myProduct.img}/>
                    </div>
                    <div className='col-md-6 py-4'>
                        <h2 className='text-uppercase font-weight-bold'>{myProduct.title}</h2>
                        
                        <div className='reviews-section'>
                        <h5 className='text-uppercase'>reviews: {productsReviews.length}</h5>
                            <div className='reviews px-1 py-2'>
                            {
                                productsReviews.map((review) => {
                                    return (
                                        <div className='reviews-item' key={review.id}>
                                            <div className='row col-12 p-0 m-0 d-flex justify-content-between align-items-center'>
                                                <div className='user d-flex align-items-center col-8 p-0'>
                                                    <img className='mr-1' src={review.userImg}/>
                                                    <span className='text-capitalize font-weight-bold'>{review.userName}</span>
                                                </div>
                                                <div className='rate d-flex align-items-center justify-content-end col-4 p-0'>
                                                    <img className='star p-0' src={star}/>
                                                    <span>{review.rate}</span>
                                                </div>
                                            </div>
                                            <p className='feedback col-12 p-0'>{review.content}</p>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <p className={myProduct.salePrice ? 'price-on-sale mb-0 mt-2' : "font-weight-bold product-price mt-2"}>EGP {myProduct.price}</p>
                            {myProduct.salePrice ? <p className='product-price-sale'>EGP {myProduct.salePrice}</p> : ""}
                        </div>
                        <div className='colors-option'>
                            <h5 className='text-uppercase'>color</h5>
                            <div className='colors d-flex justify-content-start'>
                                {colors.map((color)=>{
                                    const isActive = color.id === activeId;
                                    return (
                                            <div onClick={() => handleColorClick(color)} className={`color col-2 ${color.available ? "" : "not-available"} ${isActive ? "active" : ""}`} key={color.id} style={{backgroundColor: color.myColor}}></div>
                                            )
                                        })}
                            </div>
                        </div>
                        <div className='product-buttons d-flex align-items-center'>
                            <button onClick={(event) => addToCart(myProduct, event)} className='add-to-bag-btn text-uppercase d-flex align-items-center justify-content-center mt-4'><img className='shopping-bag mr-1' src={myProduct.carted ? addedToBag : whiteShoppingBagIcon}/>add to bag</button>
                            <button onClick={(event) => addToFavs(myProduct, event)} className='add-to-favs-btn text-uppercase d-flex align-items-center mt-4'><img className='fav-heart' src={myProduct.faved ? faved : heartIcon}/></button>
                        </div>
                    </div>
                </div>
                <div className='related m-4'>
                    <div className='d-flex col-12 row m-0 p-0'>
                        <h3 className='text-uppercase col-12 m-0 font-weight-bold my-2'>related products</h3>
                        {
                            relatedProducts.map((product =>{
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
                            }))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
