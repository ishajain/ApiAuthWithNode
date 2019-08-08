import {DASHBOARD_SECRET } from '../actions/types'
export default (state= {}, action) => {
    switch(action.type){
        case DASHBOARD_SECRET: 
             return {...state, secret: action.payload}
        default: return state
    }

}