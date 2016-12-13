import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChannelList from './ChannelList'
import ChannelDetails from './ChannelDetails'

import { getInitialState } from '../actions/index'

class App extends Component {
  constructor(){
    super()
  }

  componentDidMount() {
    this.props.getInitialState()
  }

  render() {
    return (
      <div className="general">
        <div className="sidebar">
          <ChannelList />
        </div>
        <div className="main-content">
          <ChannelDetails />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.sessionState.username,
  }
}

export default connect(mapStateToProps, {getInitialState})(App)
