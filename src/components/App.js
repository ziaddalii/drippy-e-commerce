import React from 'react'
import { HashRouter , Route, Routes } from 'react-router-dom'
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


function App() {


  return (
    <HashRouter base="/">
    <AuthProvider>
      <ProductsContext>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />      
          <Route path='/signin' element={<Signin/>} />  
          <Route path="/products/:productId" element={<ProductPage/>} />  
          <Route path="/addresses" element={<Addresses/>} />  
          <Route path="/accessories" element={<Accessories/>} />  
          <Route path="/shoes" element={<Shoes/>} />  
          <Route path="/jackets" element={<Jackets/>} />  
          <Route path="/sales" element={<Sales/>} />  
            
        </Routes>
        <Footer/>
        <Chat/>
          </ProductsContext>
        </AuthProvider>
    </HashRouter>
  )
}

export default App