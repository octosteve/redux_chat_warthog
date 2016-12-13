import React from 'react'
import { connect } from 'react-redux'
import { CHANGE_ROOM} from '../actions/types'

const ChannelList = (props) => {
  return (
    <div>
      <h1>Channels</h1>
      <h4>Hi, {props.username}</h4>
      {props.channelList.map((channel) => {
        return (
          <div key={channel} className="channel-name">
            <a href="#" onClick={() => props.changeRoom(channel)} className={channel === props.currentRoom ? 'current' : ''}>{channel}</a>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    channelList: state.channelList,
    username: state.sessionState.username,
    currentRoom: state.sessionState.currentRoom
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    changeRoom: (room) => {dispatch({type: CHANGE_ROOM, payload: room})}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)
