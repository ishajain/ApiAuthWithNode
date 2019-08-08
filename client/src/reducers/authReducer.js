import {AUTH_SIGN_UP, AUTH_ERROR,AUTH_SIGN_OUT,AUTH_SIGN_IN } from '../actions/types'
const jwt_token = localStorage.getItem("JWT_TOKEN") || '' 
const DEFAULT_STATE = {
    isAuthenticated: jwt_token ? true : false,
    token: jwt_token,
    errorMessage: ''
}
export default  (state = DEFAULT_STATE,action) => {

   switch(action.type){
       case AUTH_SIGN_UP:
            return {...state,token:action.payload, isAuthenticated:true, errorMessage : ''}
      case AUTH_SIGN_IN:
            return {...state,token:action.payload, isAuthenticated:true, errorMessage : ''}
      case AUTH_ERROR:
            return {...state,token:"", isAuthenticated:false, errorMessage : action.payload}
      case AUTH_SIGN_OUT: 
            return {...state,token:action.payload, isAuthenticated:false, errorMessage : action.payload}

      default: 
            return state
   }

}