import { combineReducers } from 'redux'
import {  reducer as formReducer} from 'redux-form'
import authReducer from './authReducer'
import dashboardReducer from './dashboardReducer'
export default combineReducers({
    form: formReducer,
    auth: authReducer,
    dashboard: dashboardReducer
})

