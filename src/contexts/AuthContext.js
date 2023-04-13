import React, {useContext, useState, useEffect} from 'react'
import {auth,GoogleProvider} from "../components/firebase"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    function signup(username, email, password) {
      
        return auth.createUserWithEmailAndPassword(email, password).then(function (userCredential) {
          // User was created successfully
          const user = userCredential.user;
          user.updateProfile({
            displayName: username
          }).then(function() {
          }).catch(function(error) {
            console.error("Error adding username to displayName: ", error);
          });
        }).catch(function(error) {
          console.error("Error creating user: ", error);
        });
      }
    // Sign In with GOOGLE
      const SignInWithGoogle = async () => {
        return auth.signInWithPopup(GoogleProvider);
    };
    // Sign In with EMAIL and PASSWORD
    function signin (email, password){
      return auth.signInWithEmailAndPassword(email, password)
  }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signin,
        signup,
        SignInWithGoogle
    }

  return (
    <AuthContext.Provider value = {value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider