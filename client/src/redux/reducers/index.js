import {
  GET_COMMENTS,
  // GET_MY_ARTICLES,
  SET_ERROR,
  SET_LOADING,
} from "../constants/action-types";

const initialState = {
  comments: [],
  // myArticles: [],
  error: "",
  loading: false,
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_COMMENTS) {
    console.log(action.payload);
    return Object.assign({}, state, {
      comments: action.payload,
      loading: false,
    });
  }
  // if (action.type === GET_MY_ARTICLES) {
  //   // console.log(action.payload);
  //   return Object.assign({}, state, {
  //     myArticles: action.payload,
  //     loading: false,
  //   });
  // }
  if (action.type === SET_ERROR) {
    // console.log(action.payload);
    return Object.assign({}, state, {
      error: action.payload,
    });
  }
  if (action.type === SET_LOADING) {
    // console.log(action.payload);
    return Object.assign({}, state, { loading: action.payload });
  }
  return state;
}

export default rootReducer;
