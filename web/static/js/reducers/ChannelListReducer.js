import { INITIAL_STATE } from '../actions/types'
import { NEW_MESSAGE } from '../actions/types'

export default function ChannelListReducer(state=[], action) {
  switch (action.type) {
    case INITIAL_STATE:
      return action.payload.map((channel) => channel.name)
    case NEW_MESSAGE:
      let channels = new Set(state)
      return Array.from(
        channels.add(action.payload.channel)
      ).sort()
    default:
      return state
  }
}
