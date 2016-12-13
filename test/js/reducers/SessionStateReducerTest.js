import { expect } from 'chai'
import { CHANGE_ROOM } from '../../../web/static/js/actions/types'
import SessionStateReducer from '../../../web/static/js/reducers/SessionStateReducer'


describe("SessionStateReducer", () => {
  it("has a default room of General", () =>{
    let nextState = SessionStateReducer(undefined, {type: ""})
    expect(nextState.currentRoom).to.eql("General")
  })

  it("has a username", () =>{
    let nextState = SessionStateReducer(undefined, {type: ""})
    expect(nextState.username).to.not.undefined
  })

  it("can change the current room", () => {
    let action = {type: CHANGE_ROOM, payload: "Random"}
    let nextState = SessionStateReducer(undefined, action)
    expect(nextState.currentRoom).to.eql("Random")
  })
})
