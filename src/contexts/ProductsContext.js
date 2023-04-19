import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {useNavigate } from 'react-router-dom';
import { productsData } from '../data/productsData';


const ProductsContext = React.createContext();

export function useProducts(){
    return useContext(ProductsContext)
}

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(productsData);

    const cartFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart') || "[]")
    const [cart, setCart] = useState(cartFromLocalStorage);
    const [totalPrice, setTotalPrice] = useState()
    const [cartEmpty, setCartEmpty] = useState(true)
    const [favsEmpty, setFavsEmpty] = useState(true)


    const favsFromLocalStorage = JSON.parse(localStorage.getItem('productsInFavs') || "[]")
    const [favorites, setFavorites] = useState(favsFromLocalStorage || []);
    
    const {currentUser} = useAuth()
    const navigate = useNavigate()
        
    const addToCart = (product, e) => {
    e.preventDefault()
    if(currentUser){
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart') || "[]")
    const existingProductIndex = cartFromLocalStorage.findIndex(item => item.id === product.id);
    handleCarted(product)
    if(existingProductIndex < 0) {
      const updatedCart = [...cartFromLocalStorage, {...product, quantity: 1,carted: true}];
      setCart(updatedCart);
      localStorage.setItem("productsInCart" , JSON.stringify(updatedCart))
    }else{
      if (cartFromLocalStorage.length === 1) {
        localStorage.setItem("productsInCart", JSON.stringify([]));
        const updatedCart = JSON.parse(localStorage.getItem('productsInCart'))
        setCart(updatedCart)
      }else{
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart') || "[]")
        cartFromLocalStorage.splice(existingProductIndex, 1);
        localStorage.setItem("productsInCart", JSON.stringify(cartFromLocalStorage));
        const updatedCart = JSON.parse(localStorage.getItem('productsInCart'))
        setCart(updatedCart)
        }
    }}else{
      navigate("/signin")
    }
  }

  function checkCarted(list, products) {
    if(list.length === 0){
      products.forEach(product => product.carted = false)
  }else{
      for (let i = 0; i < products.length; i++) {
          for (let j = 0; j < list.length; j++) {
              if (products[i].id === list[j].id) {
                products[i].carted = true;
                  break;
              }else{
                products[i].carted = false;
              }
          }
      }
    }
    return([...products])
}

  const handleCarted = (product) => {
    setProducts(prevState => prevState.map(item => {
      if(item.id === product.id) {
        return {...item, carted: !item.carted};
      }
      return item;
    }))
  }

  const increaseQuantity = (product) => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart') || "[]")
    const existingProductIndex = cartFromLocalStorage.findIndex(item => item.id === product.id);
    
    const updatedCart = [...cartFromLocalStorage];
    updatedCart[existingProductIndex].quantity += 1;
    setCart(updatedCart);
    localStorage.setItem("productsInCart" , JSON.stringify(updatedCart)|| "[]")
    calcTotalPrice()
  }

  // Decrease Quantity
  const decreaseQuantity = (product) => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart') || "[]")
    const existingProductIndex = cartFromLocalStorage.findIndex(item => item.id === product.id);

    // if the quantity is 1 and the length of the array is 1 so the cart will be empty
    if (cartFromLocalStorage[existingProductIndex].quantity === 1) {
      if (cartFromLocalStorage.length === 1) {
        // if it was the last product in cart so the cart will set to empty
      localStorage.setItem("productsInCart", JSON.stringify([]));
      setCartEmpty(true)
      const updatedCart = JSON.parse(localStorage.getItem('productsInCart')|| "[]")
      setCart(updatedCart)
      calcTotalPrice()
    }else{
      // if the quantity is 1 so when decrease it will be 0 so it get removed
      const cartFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart') || "[]")
      cartFromLocalStorage.splice(existingProductIndex, 1);
      localStorage.setItem("productsInCart", JSON.stringify(cartFromLocalStorage));
      const updatedCart = JSON.parse(localStorage.getItem('productsInCart'))
      setCart(updatedCart)
      calcTotalPrice()
      }

    } else {
      // just decrease the number if its above 1
      const cartFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart') || "[]")
      cartFromLocalStorage[existingProductIndex].quantity -= 1;
      localStorage.setItem("productsInCart", JSON.stringify(cartFromLocalStorage));
      const updatedCart = JSON.parse(localStorage.getItem('productsInCart')|| "[]")
      setCart(updatedCart)
      calcTotalPrice()
    }
  }

  useEffect(() => {
    setProducts(checkCarted(cart, products))
    localStorage.setItem("productsInCart" , JSON.stringify(cart))
  }, [cart]) 

  const productCheck = (cart, favorites, products)=>{
    const cartedProducts = checkCarted(cart, products);
    const checkedProducts = checkFaved(favorites, cartedProducts); 
    return checkedProducts;
  }

  useEffect(() => {
    setProducts(productCheck(cart, favorites, products))
  }, [])

  useEffect(() => {
    // PASSING THE FAVS ITEMS TO THE PARENT AS A PROP
    setProducts(checkFaved(favorites, products))
    localStorage.setItem("productsInFavs" , JSON.stringify(favorites))
  }, [favorites]) 

  function checkFaved(list, products) {
    if(list.length === 0){
      products.forEach(product => product.faved = false)
  }else{
      for (let i = 0; i < products.length; i++) {
          for (let j = 0; j < list.length; j++) {
              if (products[i].id === list[j].id) {
                products[i].faved = true;
                  break;
              }else{
                products[i].faved = false;
              }
          }
      }
  }
  return([...products])
}

  const removeFromCart = (product) =>{
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart') || "[]")
    const existingProductIndex = cartFromLocalStorage.findIndex(item => item.id === product.id);
    if (cartFromLocalStorage.length === 1) {
      localStorage.setItem("productsInCart", JSON.stringify([]));
      setCartEmpty(true)
      const updatedCart = JSON.parse(localStorage.getItem('productsInCart'))
      setCart(updatedCart)
    }else{
      const cartFromLocalStorage = JSON.parse(localStorage.getItem('productsInCart') || "[]")
      cartFromLocalStorage.splice(existingProductIndex, 1);
      localStorage.setItem("productsInCart", JSON.stringify(cartFromLocalStorage));
      const updatedCart = JSON.parse(localStorage.getItem('productsInCart'))
      setCart(updatedCart)
      calcTotalPrice()
      }
  }

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

  const addToFavs = (product, e) => {
    e.preventDefault()
    if (currentUser) {
    const favsFromLocalStorage = JSON.parse(localStorage.getItem('productsInFavs') || "[]")
    const existingProductIndex = favsFromLocalStorage.findIndex(item => item.id === product.id);
    handleFaved(product)
    if(existingProductIndex < 0) {
      // Add
      const updatedFavs = [...favsFromLocalStorage, {...product, faved: true}];
      setFavorites(updatedFavs);
      localStorage.setItem("productsInFavs" , JSON.stringify(updatedFavs))
    }else{
      if (favsFromLocalStorage.length === 1) {
        // Remove and empty the list
        localStorage.setItem("productsInFavs", JSON.stringify([]));
        const updatedFavs = JSON.parse(localStorage.getItem('productsInFavs'))
        setFavorites(updatedFavs)
      }else{
        // Remove and keep other products in the list
        const favsFromLocalStorage = JSON.parse(localStorage.getItem('productsInFavs') || "[]")
        favsFromLocalStorage.splice(existingProductIndex, 1);
        localStorage.setItem("productsInFavs", JSON.stringify(favsFromLocalStorage));
        const updatedFavs = JSON.parse(localStorage.getItem('productsInFavs'))
        setFavorites(updatedFavs)
        }
    }
    } else {
      navigate("/signin")
    }
  }

  const removeFromFavs = (product) =>{
    const favsFromLocalStorage = JSON.parse(localStorage.getItem('productsInFavs'))
    const existingProductIndex = favsFromLocalStorage.findIndex(item => item.id === product.id);
    if (favsFromLocalStorage.length === 1) {
        // Remove and empty the list
        localStorage.setItem("productsInFavs", JSON.stringify([]));
        const updatedFavs = JSON.parse(localStorage.getItem('productsInFavs'))
        setFavsEmpty(true)
        setFavorites(updatedFavs)
      }else{
        // Remove and keep other products in the list
        favorites.splice(existingProductIndex, 1);
        localStorage.setItem("productsInFavs", JSON.stringify(favorites));
        const updatedFavs = JSON.parse(localStorage.getItem('productsInFavs'))
        setFavorites(updatedFavs)
        }
  }

  const handleFaved = (product) => {
    setProducts(prevState => prevState.map(item => {
      if(item.id === product.id) {
        return {...item, faved: !item.faved};
      }
      return item;
    }))
  }

  return (
    <ProductsContext.Provider
      value={{
        setProducts,
        products,
        cart,
        setCart,
        favorites,
        setFavorites,
        increaseQuantity,
        decreaseQuantity,
        checkCarted,
        addToCart,
        removeFromCart,
        addToFavs,
        removeFromFavs,
        checkFaved,
        productCheck,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
