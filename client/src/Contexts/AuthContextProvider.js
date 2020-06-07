import React, { createContext, useLayoutEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import AuthReducer from '../Reducers/AuthReducer'

export const AuthContext = createContext()

const AuthContextProvider = (props) =>{
  const inialState = {
    name : "",
    email : "",
    img : null,
    token : "",
    auth : false,
    loading : true,
    error : ""
  }
  const [state, dispatch] = useReducer(AuthReducer, inialState)
  const history = useHistory()

  let headers = {
    Authorization: "Bearer " + state.token
  }

  const logged = async () => {
    try {
      const existed = localStorage.getItem("token")
      if(existed && existed !== ""){
        const res = await axios.get("/user/me",{ 
          headers : { 
            Authorization: "Bearer " + existed 
          }
        })

        let { name, email, img } = res.data

        const payload = {
          name ,
          email ,
          img ,
          auth : true,
          token : existed
        }

        dispatch({ type : "LOGIN", payload })
        history.push("/")
      }
    } catch (error) {
      console.log(error)
      dispatch({ type : "ERROR" })
    }
  }
   
  useLayoutEffect(() => {
    logged()
  }, [])


  const login = async (formData) => {
    try {
      const res = await axios.post("/user/login", formData)
      const {token, user} = await res.data
     
      const payload = {
        name : user.name ,
        email : user.email ,
        img : user.img ,
        auth : true,
        token 
      }

      localStorage.setItem("token", token)
      dispatch({ type : "LOGIN", payload })
      history.push("/")                    
    } catch (error) {
      console.log(error)
      dispatch({ type : "ERROR" })
      throw new Error(error)
    }
  }

  const updatePic = async (imgName) => {
    try {
      dispatch({ type : "IMG", payload : {imgName} })
    } catch (error) {
      console.log(error)
      dispatch({ type : "ERROR" })
    }
  }

  const logout = async () =>{
    try {
      await axios.post("/user/logout",{},{headers})
      localStorage.removeItem("token")
      dispatch({ type : "LOGOUT" })
      history.push("/login")
    } catch (error) {
      console.log(error)
      dispatch({ type : "ERROR" })
    }
  }

  const deleteAcc = async () =>{
    try {
      await axios.delete("/user", {headers})
      localStorage.removeItem("token")
      dispatch({ type : "LOGOUT" })
      history.push("/signup")
    } catch (error) {
      console.log(error)
      dispatch({ type : "ERROR" })
    }
  }

  return(
      <AuthContext.Provider value={{
        name : state.name, 
        email : state.email, 
        img : state.img, 
        token : state.token,
        auth : state.auth, 
        headers, 
        login,
        updatePic, 
        logout,
        deleteAcc
      }}>
          {props.children}
      </AuthContext.Provider>
  );
}

export default AuthContextProvider