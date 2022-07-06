import {applyMiddleware, createStore} from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import reducer from'./reducer/index'
import thunk from 'redux-thunk'

const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
      // other store enhancers if any
    )
  );

// creamos el store de redux y su middelware para acciones asincronas
// const store = createStore(reducer, applyMiddleware(thunk))

export default store;