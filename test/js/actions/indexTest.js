import { expect } from 'chai'
import  { getInitialState } from '../../../web/static/js/actions/index'
import  * as t from '../../../web/static/js/actions/types'

describe("Actions", () => {
  describe("getInitialState", (done) => {
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
    let dispatchedAction;
    let fakeDispatch = (action) => {
      dispatchedAction = action
      done()
    }

    getInitialState()(fakeDispatch).then(() => {
      console.log("I GOT CALLED!")
      expect(dispatchedAction).to.eql({type: t.INITIAL_STATE, payload: "Bananaaaa"})
      done()
    })
  })
})
