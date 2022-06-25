import { actionTypes } from "./action";

export const initState = {
  isLoggedIn: false,
  id: "",
  firstname: "",
  lastname: "",
  username: "",
  gender: "",
  email: "",
  bio: "",
  location: "",
  phone_number:"",
  token: "",
  user_role: ""
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      // console.log(action)
      return {
        ...state,
        ...{ isLoggedIn: true },
        ...{ id: action.user.id },
        ...{ firstname: action.user.firstname },
        ...{ lastname: action.user.lastname },
        ...{ username: action.user.username },
        ...{ gender: action.user.gender },
        ...{ email: action.user.email },
        ...{ bio: action.user.bio ? action.user.bio : `I am ${action.user.firstname} ${action.user.lastname}` },
        ...{ location: action.user.location ? action.user.location : "" },
        ...{ phone_number: action.user.phone_number ? action.user.phone_number : "" },
        ...{ token: action.user.token },
        ...{ user_role: action.user.user_role },
      };
    case actionTypes.LOGOUT_SUCCESS:
      // console.log(action)
      return {
        ...state,
        ...{ isLoggedIn: false },
        ...{ id: "" },
        ...{ firstname: "" },
        ...{ lastname: "" },
        ...{ username: "" },
        ...{ gender: "" },
        ...{ email: "" },
        ...{ bio: "" },
        ...{ location: "" },
        ...{ phone_number: "" },
        ...{ token: "" },
        ...{ user_role: "" },
      };
    default:
      return state;
  }
}

export default reducer;
