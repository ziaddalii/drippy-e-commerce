import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import "../styles/app.css"
import Home from './Home'
import Signup from './Signup'
import Signin from './Signin'
import Footer from './Footer'
import Chat from './Chat'
import Addresses from './Addresses';
import ProductPage from './ProductPage'
import AuthProvider from '../contexts/AuthContext'
import ProductsContext from '../contexts/ProductsContext';
import Accessories from './Accessories'
import Shoes from './Shoes';
import Jackets from './Jackets';
import Sales from './Sales';
import Checkout from './Checkout'


function App() {


  return (
    <BrowserRouter basename='/drippy-e-commerce'>
    <AuthProvider>
      <ProductsContext>
        <Navbar />
        
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />      
          <Route path='/signin' element={<Signin/>} />  
          <Route path="/products/:productId" element={<ProductPage/>} />  
          <Route path="/addresses" element={<Addresses/>} />  
          <Route path="/accessories" element={<Accessories/>} />  
          <Route path="/shoes" element={<Shoes/>} />  
          <Route path="/jackets" element={<Jackets/>} />  
          <Route path="/sales" element={<Sales/>} />  
          <Route path="/checkout" element={<Checkout/>} />  
            
        </Routes>
        <Footer/>
        <Chat/>
          </ProductsContext>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App