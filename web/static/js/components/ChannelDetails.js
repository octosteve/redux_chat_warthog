import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewMessage } from '../actions/index'

class ChannelDetails extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    let message = {
      user: this.props.username,
      channel: this.props.currentRoom,
      content: this.messageInput.value,
    }
    this.props.sendMessage(message)
    this.messageInput.value = ""
  }
  render() {
    return (
      <div className="channel-details">
        <h2>General</h2>
        <div className="channel-messages">
          {this.props.messages.map((message) => {
            return (
              <div key={message.id}>
                <div className="message-item">
                  <strong>{message.user}</strong>: {message.content}
                </div>
              </div>
            )
          })}
        </div>
        <div className="message-input-container">
          <form onSubmit={this.handleSubmit}>
            <textarea 
              className="message-input" 
              ref={ (input) => this.messageInput = input }
            />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: (state.channels[state.sessionState.currentRoom] || []),
    username: state.sessionState.username,
    currentRoom: state.sessionState.currentRoom,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => { dispatch(createNewMessage(message)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetails)
