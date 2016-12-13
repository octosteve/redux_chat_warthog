import { combineReducers } from 'redux'

import ChannelListReducer from './ChannelListReducer'
import ChannelsReducer from './ChannelsReducer'
import UsersReducer from './UsersReducer'
import SessionStateReducer from './SessionStateReducer'

export default combineReducers({
  channelList: ChannelListReducer,
  channels: ChannelsReducer,
  users: UsersReducer,
  sessionState: SessionStateReducer
})
