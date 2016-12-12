import { expect } from 'chai'
import { INITIAL_STATE } from '../../../web/static/js/actions/types'
import { NEW_MESSAGE } from '../../../web/static/js/actions/types'
import { REMOVE_MESSAGE } from '../../../web/static/js/actions/types'
import { EDIT_MESSAGE } from '../../../web/static/js/actions/types'
import ChannelsReducer from '../../../web/static/js/reducers/ChannelsReducer'

describe("ChannelsReducer", () => {
  it("starts with an empty object as its default state", () =>{
    let nextState = ChannelsReducer(undefined, {type: ""})
    expect(nextState).to.eql({})
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
    let nextState = ChannelsReducer(undefined, action)
    let expectedNextState = {
      "General": [
          { 
            id: 1,
            user: "StevenNunez",
            content: "I Love Programming"
          }
        ],
      "React": [
          { 
            id: 2,
            user: "StevenNunez",
            content: "Why are forms so hard?"
          }
      ]
    }
    expect(nextState).to.eql(expectedNextState)
  })

  it("updates a room's messages on NEW_MESSAGE", () => {
    let state = {
      "General": [
          { 
            id: 1,
            user: "StevenNunez",
            content: "I Love Programming"
          }
        ],
      "React": [
          { 
            id: 2,
            user: "StevenNunez",
            content: "Why are forms so hard?"
          }
      ]
    }
    let payload = { channel: "General", id: 3, user: "LoganHasson", content: "How about now?"}
    let action = {type: NEW_MESSAGE, payload: payload}
    let nextState = ChannelsReducer(state, action)
    let expectedNextState = {
      "General": [
          { 
            id: 1,
            user: "StevenNunez",
            content: "I Love Programming"
          },
          { 
            id: 3,
            user: "LoganHasson",
            content: "How about now?"
          }
        ],
      "React": [
          { 
            id: 2,
            user: "StevenNunez",
            content: "Why are forms so hard?"
          }
      ]
    }
    
    expect(nextState).to.eql(expectedNextState)
  })
  it("creates a new room in state", () => {
    let state = {
      "General": [
          { 
            id: 1,
            user: "StevenNunez",
            content: "I Love Programming"
          }
        ],
    }
    let payload = { channel: "React", id: 2, user: "StevenNunez", content: "Why are forms so hard?"}
    let action = {type: NEW_MESSAGE, payload: payload}
    let nextState = ChannelsReducer(state, action)
    let expectedNextState = {
      "General": [
          { 
            id: 1,
            user: "StevenNunez",
            content: "I Love Programming"
          },
        ],
      "React": [
          { 
            id: 2,
            user: "StevenNunez",
            content: "Why are forms so hard?"
          }
      ]
    }
    
    expect(nextState).to.eql(expectedNextState)
  })

  it("removes a message", () => {
    let state = {
      "General": [
          { 
            id: 1,
            user: "StevenNunez",
            content: "I Love Programming"
          }
        ],
    }
    let payload = { channel: "General", id: 1 }
    let action = {type: REMOVE_MESSAGE, payload: payload}
    let nextState = ChannelsReducer(state, action)
    let expectedNextState = {
      "General": [],
    }
    
    expect(nextState).to.eql(expectedNextState)
  })

  it("edits a message", () => {
    let state = {
      "General": [
          { 
            id: 1,
            user: "StevenNunez",
            content: "I Love Programming"
          }
        ],
    }
    let payload = { channel: "General", id: 1, content: "I REALLY LOVE PROGRAMMING" }
    let action = {type: EDIT_MESSAGE, payload: payload}
    let nextState = ChannelsReducer(state, action)
    let expectedNextState = {
      "General": [
          { 
            id: 1,
            user: "StevenNunez",
            content: "I REALLY LOVE PROGRAMMING",
            edited: true
          }
        ],
    }
    
    expect(nextState).to.eql(expectedNextState)
  })

  it("preserves the order of messages when editting", () => {
    let state = {
      "General": [
          { 
            id: 1,
            user: "StevenNunez",
            content: "I Love Programming"
          },
          { 
            id: 2,
            user: "StevenNunez",
            content: "Do all the things!"
          }
        ],
    }
    let payload = { channel: "General", id: 1, content: "I REALLY LOVE PROGRAMMING" }
    let action = {type: EDIT_MESSAGE, payload: payload}
    let nextState = ChannelsReducer(state, action)
    let expectedNextState = {
      "General": [
          { 
            id: 1,
            user: "StevenNunez",
            content: "I REALLY LOVE PROGRAMMING",
            edited: true
          },
          { 
            id: 2,
            user: "StevenNunez",
            content: "Do all the things!",
          }
        ],
    }
    
    expect(nextState).to.eql(expectedNextState)
  })
})
