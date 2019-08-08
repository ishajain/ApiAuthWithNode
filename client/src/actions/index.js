import axios from 'axios'
import { AUTH_SIGN_UP,AUTH_ERROR,AUTH_SIGN_OUT,AUTH_SIGN_IN ,DASHBOARD_SECRET} from './types'
const jwt_token = localStorage.getItem("JWT_TOKEN")

axios.defaults.baseURL = "http://localhost:8000/users";
axios.defaults.headers.common['authorization'] = jwt_token

export const signUp = ({email,password}) => async dispatch => {
   try{
      const response =  await axios.post("/signup",{email,password})
      dispatch({
      type: AUTH_SIGN_UP,
      payload : response.data.token   
      })
      localStorage.setItem('JWT_TOKEN', response.data.token)
   }
   catch(error)
   {
      dispatch({
         type: AUTH_ERROR,
         payload : "Email is already in use."
         })
    
   }
}

export const signIn = ({email,password}) => async dispatch => {
   try{
      const response =  await axios.post("/signin",{email,password})
      dispatch({
      type: AUTH_SIGN_IN,
      payload : response.data.token   
      })
      localStorage.setItem('JWT_TOKEN', response.data.token)
   }
   catch(error)
   {
      dispatch({
         type: AUTH_ERROR,
         payload : "Email and Password combination is not valid."
         })
    
   }
}

export const signUpWithGoogle = (data) => async dispatch => {
   try{
      const {   accessToken  } = data;

      const response =  await axios.post("/oauth/google",{access_token:accessToken})
      dispatch({
         type: AUTH_SIGN_UP,
         payload : response.data.token   
         })
         localStorage.setItem('JWT_TOKEN', response.data.token)
      }
      catch(error)
      {
         dispatch({
            type: AUTH_ERROR,
            payload : "Email is already in use."
            })
       
      }
}

export const signInWithGoogle = (data) => async dispatch => {
   try{
      const {   accessToken  } = data;
      const response =  await axios.post("/oauth/google",{access_token:accessToken})
      dispatch({
         type: AUTH_SIGN_IN,
         payload : response.data.token   
         })
         localStorage.setItem('JWT_TOKEN', response.data.token)
      }
      catch(error)
      {
         dispatch({
            type: AUTH_ERROR,
            payload : "Email and Password combination is not valid."
            })
       
      }
}

export const signUpWithFacebook = (data) => async dispatch => {
   try{
     
      const {   accessToken  } = data;
      const response =  await axios.post("/oauth/facebook",{access_token:accessToken})
      dispatch({
         type: AUTH_SIGN_UP,
         payload : response.data.token   
         })
         localStorage.setItem('JWT_TOKEN', response.data.token)
      }
      catch(error)
      {
         dispatch({
            type: AUTH_ERROR,
            payload : "Email is already in use."
            })
       
      }
}

export const signInWithFacebook = (data) => async dispatch => {
   try{
     
      const {   accessToken  } = data;
      const response =  await axios.post("/oauth/facebook",{access_token:accessToken})
      dispatch({
         type: AUTH_SIGN_IN,
         payload : response.data.token   
         })
         localStorage.setItem('JWT_TOKEN', response.data.token)
      }
      catch(error)
      {
         dispatch({
            type: AUTH_ERROR,
            payload : "Email and Password combination is not valid."
            })
       
      }
}

export const signOut = () => {
   localStorage.removeItem('JWT_TOKEN')
      return {
         type: AUTH_SIGN_OUT,
         payload : ''
      } 
}

export const getSecretResource = () => async dispatch => {

   try{
      const response =  await axios.get("/secret", Headers)
      dispatch({
         type: DASHBOARD_SECRET,
         payload : response.data.secret   
         })
      console.log(response.data.secret)
       }
      catch(error)
      {
         console.error('Error:', error)
       
      }

}

