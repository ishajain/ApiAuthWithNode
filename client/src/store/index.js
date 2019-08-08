import { createStore , applyMiddleware} from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export const store = createStoreWithMiddleware(reducers,reduxDevTools)