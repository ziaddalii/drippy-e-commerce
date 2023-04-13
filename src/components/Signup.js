import React, {useState, useEffect} from 'react'
import {auth} from "./firebase"

import "../styles/signup.css";
import { Link, useNavigate } from 'react-router-dom';
import checked from "../images/icons/checked.png"

import { useAuth } from '../contexts/AuthContext';

import google from "../images/icons/google.png"


const USER_REGEX = /^(?:[a-zA-Z]{3,})(?:[a-zA-Z\s]+)?$/;
const TLD_REGEX = /\.(com|edu|gov|net|org)$/i;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
const PASS_REGEX = /^([/s\S]){8,24}$/;


function Signup() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // FIREBASE CODE
  const {signup, SignInWithGoogle} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  async function handleSubmit() {
    try{
      setError("")
      setLoading(true)
      await signup(username, email, pass);
      setUserSubmitted(true)
      setTimeout(() => {
        navigate("/signin")
      }, 1000);
    }catch{
      setLoading(false)
      setError("Failed to Create an acccount")
    }
  }

  async function handleGoogleSubmit() {
    try{
      setError("")
      setLoading(true)
      await SignInWithGoogle();
      setUserSubmitted(true)
      setTimeout(() => {
        navigate("/")
      }, 1000);
    }catch{
      setLoading(false)
      setError("Failed to Create an acccount")
    }
  }

  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)
  const [userMsg, setUserMsg] = useState(false)


  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(false)
  const [emailMsg, setEmailMsg] = useState(false)


  const [pass, setPass] = useState("")
  const [validPass, setValidPass] = useState(false)
  const [passMsg, setPassMsg] = useState(false)
  
  const [matchPass, setMatchPass] = useState("")
  const [validMatchPass, setValidMatchPass] = useState(false)
  const [matchPassMsg, setMatchPassMsg] = useState(false)
  
  const [checkbox, setCheckbox] = useState(false)
  const [checkboxMsg, setCheckboxMsg] = useState(false)
  
  const [errMsg, setErrMsg] = useState(false)
  const [userSubmitted, setUserSubmitted] = useState(false)
  
  const handleUsername = (username) => {
    setUsername(username)
    if (USER_REGEX.test(username)) {
      setUserMsg("Valid")
      setValidUsername(true)
    }else{
      setUserMsg("at least 3 english letters")
      setValidUsername(false)
    }
  }

    const handleEmail = (email) => {
      setEmail(email)
      // If it match the regex
      if (EMAIL_REGEX.test(email) && TLD_REGEX.test(email)){
        // check if it already exist in the firebase
        auth.fetchSignInMethodsForEmail(email)
        .then(function(signInMethods) {
          if (signInMethods.length === 0) {
            setEmailMsg("Valid")
            setValidEmail(true)
        } else {
            setEmailMsg("e-mail already exist")
            setValidEmail(false)
        }
      })
      .catch(function(error) {
        console.error("Error fetching sign in methods for email", error);
      });
      // if it doesn't match the regex
      }else{
        setValidEmail(false)
        setEmailMsg("not a valid e-mail, should be in this form example@example.com")
      }
    }
  
    const handlePass = (pass) => {
      setPass(pass)
    if (PASS_REGEX.test(pass)) {
      setValidPass(true)
      setPassMsg("valid")
      if (matchPass === pass) {
        setValidMatchPass(true)
        setMatchPassMsg("Matches")
      } else {
        setMatchPassMsg("password doesn't match")
        setValidMatchPass(false)
    }
  } else {
      setValidPass(false)
      setPassMsg("password must have 8 characters at least ")
  }
  }


  const handleMatchPass = (matchPass) => {
    setMatchPass(matchPass)
    if (pass) {
      if (matchPass === pass) {
        setValidMatchPass(true)
        setMatchPassMsg("Matches")
      } else {
        setMatchPassMsg("password doesn't match")
        setValidMatchPass(false)
    }
    }else{
      setMatchPassMsg("password doesn't match")
    }
  }

  const checkUser = (e) => {
    e.preventDefault()
    if (validUsername && validEmail && validMatchPass && checkbox) {
      handleSubmit()
    } else {
      handleUsername(username)
      handleEmail(email)
      handlePass(pass)
      handleMatchPass(matchPass)
      handleCheckboxMsg()
      setErrMsg(true)
    }
  }

  const handleCheckbox = () => {
    if (checkbox) {
      setCheckbox(false)
    }else{
      setCheckbox(true)
    }
  }

  const handleCheckboxMsg = () => {
    if (checkbox) {
      setCheckboxMsg(false)
    }else{
      setCheckboxMsg("check the box to continue")
    }
  }

  return (
    <div className='signup d-flex justify-content-center align-items-center'>
    <div className={userSubmitted ? "submitted" : "not-submitted"}>
      <img className='check-img' src={checked}/>
    </div>
    <div className='signup-form-container'>
      <h2 className=''>sign up</h2>
      <p></p>
      <form className='signup-form'>
        <div className="form-group">
          <label htmlFor="username">name:
          </label>
          <input required onChange={(e) => {handleUsername(e.currentTarget.value.toLowerCase())}} type="text" autoComplete='off' className="form-control" id="username"/>
          <small className={validUsername ? "text-success" : "text-danger"}>
            {userMsg ? userMsg : ""}
          </small>
          </div>
        <div className="form-group">
          <label htmlFor="InputEmail1">email address:</label>
          <input onChange={(e) => {handleEmail(e.currentTarget.value)}} type="email" required autoComplete='on' className="form-control" id="InputEmail1"/>
          <small id="emailHelp" className={emailMsg ? validEmail ? "text-success" :"text-danger" : "d-none"}>
            {emailMsg ? emailMsg : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword1">password:</label>
          <input type="password" onChange={(e) => {handlePass(e.currentTarget.value)}} required autoComplete='on' className="form-control" id="InputPassword1"/>
          <small className={passMsg ? validPass ? "text-success" :"text-danger" : "d-none"}>
            {passMsg ? passMsg : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword2">confirm password:</label>
          <input type="password" onChange={(e) => {handleMatchPass(e.currentTarget.value)}} required autoComplete='on' className="form-control" id="InputPassword2"/>
          <small className={matchPassMsg ? validMatchPass ? "text-success" :"text-danger" : "d-none"}>
            {matchPassMsg ? matchPassMsg : ""}
          </small>
        </div>
        <div className="form-group form-check">
          <input onClick={() => handleCheckbox()} type="checkbox" required className="form-check-input" id="Check1"/>
          <label className="form-check-label" htmlFor="Check1">i agree to the terms and conditions.</label>
          </div>
          <small className={checkboxMsg? checkbox ? "d-none" :"text-danger d-block" : "d-none"}>
            {checkboxMsg ? checkboxMsg: ""}
          </small>
        <p className={errMsg ? "text-danger" : "d-none"}>please fill all fields with valid values</p>
        <button disabled={loading} type="submit" className="btn signup-btn" onClick={(e) => {checkUser(e)}}>Submit</button>
        <button className='d-flex justify-content-center align-items-center btn google-btn' onClick={handleGoogleSubmit}>
        <img className='google-img' src={google}/>
        Sign in with Google</button>
        <p>already have an account? <Link className='signin-link' to="/signin">Sign in</Link></p>
      </form>
      </div>

    </div>
  )
}

export default Signup