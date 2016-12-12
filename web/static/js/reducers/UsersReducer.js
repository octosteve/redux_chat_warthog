import { INITIAL_STATE } from '../actions/types'
import { NEW_MESSAGE } from '../actions/types'

export default function UsersReducer(state=[], action) {
  switch (action.type) {
    case INITIAL_STATE:
      {
        let users = new Set()
        action.payload.map((channel) => {
          channel.messages.map((message) => {
            users.add(message.user)
          })
        })
        return Array.from(users).sort()
      }
    case NEW_MESSAGE:
      {
        let users = new Set(state)
        return Array.from(
          users.add(action.payload.user)
        ).sort()
      }
    default:
      return state
  }
}
