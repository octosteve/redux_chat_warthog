import { INITIAL_STATE } from '../actions/types'
import { NEW_MESSAGE } from '../actions/types'
import { REMOVE_MESSAGE } from '../actions/types'
import { EDIT_MESSAGE } from '../actions/types'

export default function ChannelsReducer(state={}, action) {
  switch (action.type) {
    case INITIAL_STATE:
      {
        let nextState = {}
        action.payload.forEach((channel) => {
          nextState[channel.name] = channel.messages
        })

        return nextState
      }
    case NEW_MESSAGE:
      {
        let messages = state[action.payload.channel] || []
        let {id, user, content} = action.payload
        return Object.assign({}, state, {[action.payload.channel]: [...messages, {id, user, content}]})
      }
    case REMOVE_MESSAGE:
      {
        let messages = state[action.payload.channel] || []
        let filteredMessages = messages.filter((message) => message.id != action.payload.id)
        return Object.assign({}, state, {[action.payload.channel]: filteredMessages})
      }
    case EDIT_MESSAGE:
      {
        let messages = state[action.payload.channel] || []
        let messageBeingEditted = messages.find((message) => message.id == action.payload.id)
        let editedMessage = Object.assign({}, messageBeingEditted, {edited: true, content: action.payload.content})
        let indexOfMessageBeingEditted = messages.indexOf(messageBeingEditted)
        let newMessages = [
          ...messages.slice(0, indexOfMessageBeingEditted), 
          editedMessage, 
          ...messages.slice(indexOfMessageBeingEditted + 1)
        ]
        return Object.assign({}, state, {[action.payload.channel]: newMessages})
      }
    default:
      return state
  }
}
