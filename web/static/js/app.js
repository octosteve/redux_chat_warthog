import React from 'react'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app'

const store = createStore(function(store=[], action){
  return store
})
render(
    <Provider store={store}>
      <App />
    </Provider>
  , document.getElementById('container'))
