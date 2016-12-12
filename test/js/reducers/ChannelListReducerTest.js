import { expect } from 'chai'
import { INITIAL_STATE } from '../../../web/static/js/actions/types'
import { NEW_MESSAGE } from '../../../web/static/js/actions/types'
import ChannelListReducer from '../../../web/static/js/reducers/ChannelListReducer'

describe("ChannelListReducer", () => {
  it("starts with an empty list as its default state", () =>{
    let nextState = ChannelListReducer(undefined, {type: ""})
    expect(nextState).to.eql([])
  })

  it("transforms initial server message", () => {
    let payload = [
      {
        name: "General",
        messages: [ { 
            id: 1,
            user: "StevenNunez",
            content: "I Love Programming"
          }
        ]
      },
      {
        name: "React",
          messages: [
            { 
              id: 2,
              user: "StevenNunez",
              content: "Why are forms so hard?"
            }
          ]
      }
    ]

    let action = {type: INITIAL_STATE, payload: payload}
    let nextState = ChannelListReducer(undefined, action)
    let expectedNextState = ["General", "React"]
    expect(nextState).to.eql(expectedNextState)
  })

  it("does nothing if a message for an existing room come in", () => {
    let state = ["General", "React"]
    let payload = { channel: "General", id: 3, user: "LoganHasson", content: "How about now?"}

    let action = {type: NEW_MESSAGE, payload: payload}
    let nextState = ChannelListReducer(state, action)
    let expectedNextState = ["General", "React"]
    expect(nextState).to.eql(expectedNextState)
  })

  it("adds a room if a messaged mentioning a new room comes", () => {
    let state = ["General"]
    let payload = { channel: "React", id: 2, user: "StevenNunez", content: "Forms ey?"}

    let action = {type: NEW_MESSAGE, payload: payload}
    let nextState = ChannelListReducer(state, action)
    let expectedNextState = ["General", "React"]
    expect(nextState).to.eql(expectedNextState)
  })

  it("keeps rooms stored in alphabetical order", () => {
    let state = ["Zebras Rule"]
    let payload = { channel: "React", id: 2, user: "StevenNunez", content: "Forms ey?"}

    let action = {type: NEW_MESSAGE, payload: payload}
    let nextState = ChannelListReducer(state, action)
    let expectedNextState = ["React", "Zebras Rule"]
    expect(nextState).to.eql(expectedNextState)
  })
})
