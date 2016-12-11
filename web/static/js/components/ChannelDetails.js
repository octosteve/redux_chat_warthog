import React from 'react'

const ChannelDetails = () => {
  return (
    <div className="channel-details">
      <h2>General</h2>
      <div className="channel-messages">
        <div className="message-item">
          <strong>Steven</strong>: Coding is great
        </div>
        <div className="message-item">
          <strong>Steven</strong>: Actually it sucks
        </div>
      </div>
      <div className="message-input-container">
        <textarea className="message-input" />
      </div>
    </div>
  )
}

export default ChannelDetails
