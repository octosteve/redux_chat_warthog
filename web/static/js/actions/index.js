import * as t from "./types"
import FakeApi from '../api/fakeApi'
export const getInitialState = () => {
  return (dispatch) => {
    return FakeApi.getAllMessages().then((payload) => {
      dispatch({type: t.INITIAL_STATE, payload: "Banana"})
    })
  }
}
