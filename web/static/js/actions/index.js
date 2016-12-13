import * as t from "./types"
import axios from 'axios'

export const getInitialState = () => {
  return (dispatch) => { 
    axios.get("/api/messages").then(({data}) => {
      dispatch({type: t.INITIAL_STATE, payload: data}) 
    })
  }
}

export const createNewMessage = ({user, channel, content}) => {
  return (dispatch) => {
    axios.post("/api/messages", {message: {user, channel, content}})
      .then(({data}) => {
        dispatch({type: t.NEW_MESSAGE, payload: data}) 
      })
  }
}
