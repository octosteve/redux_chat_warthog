import { expect } from 'chai'
import { INITIAL_STATE } from '../../../web/static/js/actions/types'
import { NEW_MESSAGE } from '../../../web/static/js/actions/types'
import UsersReducer from '../../../web/static/js/reducers/UsersReducer'

describe("UsersReducer", () => {
  it("starts with an empty array as its default state", () =>{
    let nextState = UsersReducer(undefined, {type: ""})
    expect(nextState).to.eql([])
  })

  it("captures all users across rooms and sorts them", () => {
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
              user: "LoganHasson",
              content: "Why are forms so hard?"
            }
          ]
      }
    ]

    let action = {type: INITIAL_STATE, payload: payload}
    let nextState = UsersReducer(undefined, action)
    let expectedNextState = ["LoganHasson", "StevenNunez"]
    expect(nextState).to.eql(expectedNextState)
  })

  it("does nothing if a new message comes in from an existing user", () => {
    let state = ["StevenNunez"]
    let payload = { channel: "General", id: 3, user: "StevenNunez", content: "How about now?"}
    let action = {type: NEW_MESSAGE, payload: payload}
    let nextState = UsersReducer(state, action)
    let expectedNextState = ["StevenNunez"]
    expect(nextState).to.eql(expectedNextState)
  })

  it("adds the user if a messages comes from a new user", () => {
    let state = ["StevenNunez"]
    let payload = { channel: "General", id: 3, user: "LoganHasson", content: "How about now?"}
    let action = {type: NEW_MESSAGE, payload: payload}
    let nextState = UsersReducer(state, action)
    let expectedNextState = ["LoganHasson", "StevenNunez"]
    expect(nextState).to.eql(expectedNextState)
  })
})
