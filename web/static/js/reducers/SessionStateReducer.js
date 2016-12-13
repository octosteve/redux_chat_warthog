import { CHANGE_ROOM } from '../actions/types'
import faker from 'Faker'

let defaultState = {username: faker.Internet.userName(), currentRoom: "General"}
export default function SessionStateReducer(state=defaultState, action) {
  switch (action.type) {
    case CHANGE_ROOM:
      return Object.assign({}, state, {currentRoom: action.payload})
    default:
      return state
  }
}
