import React, {useState, useEffect, useRef} from 'react';
import "../styles/navbar.css";
import Cart from './Cart';
import Favs from './Favs';
import {useLocation, Link} from 'react-router-dom'

// Images
import logo from "../images/logo.png"
import whiteLogo from "../images/white-logo.png"
import searchIcon from "../images/icons/search.png"
import whiteSearchIcon from "../images/icons/white-search.png"
import heartIcon from "../images/icons/heart.png"
import whiteHeartIcon from "../images/icons/white-heart.png"
import shoppingBagIcon from "../images/icons/shopping-bag.png"
import whiteShoppingBagIcon from "../images/icons/white-shopping-bag.png"
import sidebar from "../images/icons/sidebar.png"
import whiteSidebar from "../images/icons/white-sidebar.png"
import whiteUserIcon from "../images/icons/white-user.png"
import userIcon from "../images/icons/user.png"
import { useAuth } from '../contexts/AuthContext';
import {auth, firestore } from "./firebase";
import { useProducts } from './../contexts/ProductsContext';



function Navbar() {
  const { cart, favorites} = useProducts();
    
  const {currentUser} = useAuth()
    const saveCartAndFavsToDatabase = () => {
        return new Promise((resolve, reject) => {
          const user = currentUser;
          const cartFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart') || "[]");
          const favsFromLocalStorage = JSON.parse(localStorage.getItem('productsInFavs') || "[]");
          const data = {
            cart: cartFromLocalStorage,
            favs: favsFromLocalStorage
          }
          // Reference to the "users" collection in Firestore
          const usersRef = firestore.collection("users");
          // Add a document to the "users" collection with the user's ID as the document ID
          usersRef.doc(user.uid).set(
            data, { merge: true }
          )
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      };
      


    const [locationHome, setLocationHome] = useState(false);
    const location = useLocation();
    const currentLocation = location.pathname;
    useEffect(() => {
      if (currentLocation === '/') {
        setLocationHome(true);
      }else{
        setLocationHome(false);
      }
      
    }, [currentLocation]);

// Check Window Scroll To Change Navbar Color from transparent to white
    const [isNotTop, setNotTop] = useState(false);    
    useEffect(() => {
        const handleScroll = () =>{
            if (!locationHome) {
                setNotTop(true);
            }else{
                if (window.scrollY > 10) {
                    setNotTop(true);
                }else{
                    setNotTop(false);
                }
            }
        }
        handleScroll()

        window.addEventListener("scroll", handleScroll)
    }, [locationHome])

// CHECK IF CART IS EMPTY
    const [cartEmpty, setCartEmpty] = useState(true)
    
    useEffect(() => {
      if (cart.length !== 0) {
        setCartEmpty(false)
      }else{
        setCartEmpty(true)
      }
    }, [cart])


// CHECK IF FAVS IS EMPTY
    const [favsEmpty, setFavsEmpty] = useState(true)
    
    useEffect(() => {
      if (favorites.length !== 0) {
        setFavsEmpty(false)
      }else{
        setFavsEmpty(true)
      }
    }, [favorites])

// Handle Cart Icon Toggle
    const [displayCart, setDisplayCart] = useState(false)
    const toggleCart = () => {
        setDisplayCart(prevDisplayCart => !prevDisplayCart);
    }

      const cartRef = useRef(null);
      const cartBtnRef = useRef(null);
      const displayCartRef = useRef(false);

      useEffect(() => {
        displayCartRef.current = displayCart;
      }, [displayCart]);

      useEffect(() => {
        function handleClickOutside(event) {
            if (    
                cartRef.current &&
                !cartRef.current.contains(event.target) &&
                !cartBtnRef.current.contains(event.target) &&
                !event.target.classList.contains('remove-item-btn')) {
              if (displayCartRef.current) {
                setDisplayCart(false)
              }
            }
        }
      
          document.addEventListener('click', handleClickOutside);
          
          return () => {
            document.removeEventListener('click', handleClickOutside);
          };
        });

const [displayFavs, setDisplayFavs] = useState(false)

const toggleFavs = () => {
    setDisplayFavs(prevDisplayFavs => !prevDisplayFavs);
}

  const favsRef = useRef(null);
  const favsBtnRef = useRef(null);
  const displayFavsRef = useRef(false);

  useEffect(() => {
    displayFavsRef.current = displayFavs;
  }, [displayFavs]);

  useEffect(() => {
    function handleClickOutside(event) {
        if (    
            favsRef.current &&
            !favsRef.current.contains(event.target) &&
            favsBtnRef.current &&
            !favsBtnRef.current.contains(event.target)&&
            !event.target.classList.contains('remove-item-btn')) {
          if (displayFavsRef.current) {
            setDisplayFavs(false)
          }
        }
    }
  
      // Add event listener to document object
      document.addEventListener('click', handleClickOutside);
      
      // Remove event listener on unmount
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    });


// FIREBASE

// LOGOUT USER
const logout = async () => {
    saveCartAndFavsToDatabase().then(() => {
        localStorage.setItem("productsInCart", JSON.stringify([]));
        localStorage.setItem("productsInFavs", JSON.stringify([]));
        return auth.signOut();
    }).then(() => {
        window.location.reload();
    });
}
// CHECK IF USER LOGGED IN
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (currentUser) {
          setUsername(currentUser.displayName)
        }
    
  }, [currentUser]);

  return (
    <div className={isNotTop ? 'navbar-section bg-light nav-shadow' : 'navbar-section' }>
        <div className='section-container'>
            <nav className='d-flex align-items-center navbar navbar-expand-lg d-flex justify-content-between align-items-center row col-12 p-0 m-0'>
                <Link to="/" className='nav-brand col-2 justify-content-start align-items-center p-0'>
                    <img  className='nav-logo' src={isNotTop ? logo : whiteLogo}/>
                </Link>
                
                <div className='collapse navbar-collapse justify-content-center width' id="collapseWidthExample">
                  <button className='close-sidebar' data-toggle="collapse" data-target="#collapseWidthExample" aria-controls="collapseWidthExample" aria-expanded="false" aria-label="Toggle navigation">X</button>
                    
                  <div className='nav-sidebar-logo d-none justify-content-center p-0'>
                    <img className='nav-logo' src={logo}/>
                  </div>
                  <ul className="navbar-nav d-flex mt-4">
                    <li className='nav-item' data-toggle="collapse" data-target="#collapseWidthExample" aria-controls="collapseWidthExample" aria-expanded="false" aria-label="Toggle navigation">
                        <Link to="/jackets" className={isNotTop ? 'nav-link' : "nav-link text-white"}>jackets</Link>
                    </li>
                    <li className='nav-item' data-toggle="collapse" data-target="#collapseWidthExample" aria-controls="collapseWidthExample" aria-expanded="false" aria-label="Toggle navigation">
                        <Link to="/shoes" className={isNotTop ? 'nav-link' : "nav-link text-white"}>shoes</Link>
                    </li>
                    <li className='nav-item' data-toggle="collapse" data-target="#collapseWidthExample" aria-controls="collapseWidthExample" aria-expanded="false" aria-label="Toggle navigation">
                        <Link to="/accessories" className={isNotTop ? 'nav-link' : "nav-link text-white"}>accessories</Link>
                    </li>
                    <li className='nav-item' data-toggle="collapse" data-target="#collapseWidthExample" aria-controls="collapseWidthExample" aria-expanded="false" aria-label="Toggle navigation">
                        <Link to="/sales" className={isNotTop ? 'nav-link nav-sales' : "nav-link text-white nav-sales"}>sales</Link>
                    </li>
                  </ul>
                </div>
                <div className='d-flex justify-content-end align-items-center nav-icons col-4'>
                    <div className='search-input-container d-flex align-items-center justify-content-start'>
                        <input className={isNotTop ? 'nav-search-input' : "nav-search-input-white"} placeholder='Search...' type="text"/>
                        <img className='nav-search-icon' src={isNotTop ? searchIcon : whiteSearchIcon }/>
                    </div>
                    <button ref={cartBtnRef} onClick={toggleCart} className='nav-btn bag-btn'>
                        <img className='nav-bag-icon nav-icon' src={isNotTop ? shoppingBagIcon : whiteShoppingBagIcon}/>
                        <span className={cartEmpty ? "d-none " :'cart-number'}>{cart.length}</span>
                        </button>
                        <Cart ref={cartRef} className={displayCart ? "" : "d-none"}/>

                    <button ref={favsBtnRef} onClick={toggleFavs} className='nav-btn heart-btn'>
                        <img className='nav-fav-icon nav-icon' src={isNotTop ? heartIcon : whiteHeartIcon}/>
                        <span className={favsEmpty ? "d-none " :'fav-number'}>{favorites.length}</span>
                    </button>
                    <Favs ref={favsRef} className={displayFavs ? "" : "d-none"}/>
                    <div className="dropdown">
                        <button className="nav-btn p-0" type="button" data-toggle="dropdown" aria-expanded="false">
                            <img className='nav-user-icon nav-icon' src={isNotTop ? userIcon : whiteUserIcon}/>
                        </button>
                        <div className="dropdown-menu">
                            <Link className={currentUser ? "dropdown-item" : "d-none"} to="#">Hello { username} :)</Link>
                            <Link className={currentUser ? "dropdown-item" : "d-none"} to="#" onClick={()=>{logout()}}>Logout</Link>
                            <Link className={currentUser ? "d-none" : "dropdown-item"} to="/signup">sign up</Link>
                            <Link className={currentUser ? "d-none" : "dropdown-item"} to="/signin">sign in</Link>
                        </div>
                    </div>
                    
                </div>
                <div className='nav-sidebar navbar-toggler col-2' data-toggle="collapse" data-target="#collapseWidthExample" aria-controls="collapseWidthExample" aria-expanded="false" aria-label="Toggle navigation">
                    <img className='nav-sidebar-icon nav-icon navbar-toggler-icon p-1' src={isNotTop ? sidebar : whiteSidebar}/>
                </div>
            </nav>
        </div>
    </div>
  )
}

export default Navbar