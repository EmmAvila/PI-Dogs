import {applyMiddleware, createStore} from 'redux'
import reducer from'./reducer/index'
import thunk from 'redux-thunk'

// creamos el store de redux y su middelware para acciones asincronas
const store = createStore(reducer, applyMiddleware(thunk))

export default store;