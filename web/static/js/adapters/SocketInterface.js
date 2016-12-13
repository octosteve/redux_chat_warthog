import { NEW_MESSAGE } from '../actions/types'
export default class ChatSocket {
  constructor(store, socket, room="General") {
    this.store = store
    this.socket = socket
    this.channel = null
    this.room = room
    this.joinRoom()
    this.attachToStore()
  }

  attachToStore(){
    this.store.subscribe(() => {
      let {sessionState: {currentRoom}} = this.store.getState()
      if (currentRoom === this.room) { return false }
      this.leaveRoom()
      this.room = currentRoom
      this.joinRoom()
    })
  }

  joinRoom(){
    this.channel = this.socket.channel(`chat:${this.room}`)
    this.channel.join()
        .receive("ok", resp => { console.log("Joined successfully", resp, this.room) })
        .receive("error", resp => { console.log("Unable to join", resp) })
    this.channel.on("new_message", (message) => {
      this.store.dispatch({type: NEW_MESSAGE, payload: message})
    })
  }

  leaveRoom(){
    this.channel.leave()
  }
}
