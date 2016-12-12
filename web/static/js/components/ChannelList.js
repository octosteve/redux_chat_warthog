import React from 'react'
import { connect } from 'react-redux'

const ChannelList = () => {
  return (
    <div>
      <h1>Channels</h1>
      <div className="channel-name">
        General
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels
  }
}

export default ChannelList
