import React from 'react'
import ChannelList from './ChannelList'
import ChannelDetails from './ChannelDetails'

const App = () => {
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

export default App
