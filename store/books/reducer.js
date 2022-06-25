import { actionTypes } from "./action";

export const initState = [];

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.ADD_BOOKS:
      // console.log(action)
      return [
        ...state,
        ...action.books,
      ];
    case actionTypes.REMOVE_BOOKS:
      // console.log(action)
      return [
        ...state,
        ];
    default:
      return state;
  }
}

export default reducer;
