import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import App from './components/app'
import rootReducer from './reducers/index'

import SocketInterface from './adapters/SocketInterface'

import socket from './socket'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

new SocketInterface(store, socket)

render(
    <Provider store={store}>
      <App />
    </Provider>
  , document.getElementById('container'))
