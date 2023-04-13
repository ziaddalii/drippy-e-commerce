import React, { useState, useRef,useEffect } from 'react'
import "../styles/signin.css";
import checked from "../images/icons/checked.png"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import google from "../images/icons/google.png"
import {firestore } from "./firebase";


function Signin () {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate()

  const {signin, SignInWithGoogle} = useAuth()

  const emailRef = useRef();
  const passRef = useRef();
  
  const [errMsg, setErrMsg] = useState(false)
  const [userSubmitted, setUserSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

// get the user's fav and cart list from firestore
const getDataFromFireStore = async (currentUser) =>{
  try {
    const user = currentUser.user
    const doc = await firestore.collection("users").doc(user.uid).get();
    if (doc.exists) {
      const data = doc.data();
      const cart = data.cart;
      const favs = data.favs;
      // Save the data to local storage
      localStorage.setItem("productsInCart", JSON.stringify(cart));
      localStorage.setItem("productsInFavs", JSON.stringify(favs));
    } else {
    }
  } catch (error) {
  }
}

  async function handleSubmit(e, email, pass) {
    e.preventDefault()
    try{
      setErrMsg("")
      setLoading(true)
      const currentUser = await signin(email, pass);
      
      await getDataFromFireStore(currentUser)
      setUserSubmitted(true)
      setTimeout(() => {
        navigate("/")
      }, 1000);
    }catch(error){
      setLoading(false)
      setErrMsg("email or password may be wrong");
    }
  }

async function handleGoogleSubmit(event) {
  event.preventDefault()
  try {
    setErrMsg("");
    setLoading(true);
    const currentUser = await SignInWithGoogle();
    await getDataFromFireStore(currentUser).then(() => {
      setUserSubmitted(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    });
  } catch (error) {
    setLoading(false);
    setErrMsg("Something went wrong");
  }
}
  return (
    <div className='signin d-flex justify-content-center align-items-center'>
    <div className={userSubmitted ? "submitted" : "not-submitted"}>
      <img className='check-img' src={checked}/>
    </div>
    
    <div className='signin-form-container'>
      <h2 className=''>sign in</h2>
      <p></p>
      <form className='signin-form '>
        <div className="form-group">
          <label htmlFor="email">e-mail:
          </label>
          <input required ref={emailRef} type="email" autoComplete='off' className="form-control" id="username"/>
          </div>
        <div className="form-group">
          <label htmlFor="InputPassword1">password:</label>
          <input type="password" ref={passRef} required autoComplete='on' className="form-control" id="InputPassword1"/>
        </div>
        <p className={errMsg ? "text-danger" : "d-none"}>{errMsg}</p>
        <button disabled={loading} onClick={(e) => handleSubmit(e, emailRef.current.value, passRef.current.value)} className="btn signin-btn">sign in</button>
        <button className='d-flex justify-content-center align-items-center btn google-btn' onClick={(event) => handleGoogleSubmit(event)}>
        <img className='google-img' src={google}/>
        Sign in with Google</button>
        <p>don't have an account? <Link className='signup-link' to="/signup">Sign up</Link></p>
      </form>
      </div>
    </div>
  )
}

export default Signin