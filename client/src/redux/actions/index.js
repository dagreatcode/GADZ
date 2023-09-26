import axios from "axios";
import {
  GET_COMMENTS,
  // GET_MY_ARTICLES,
  SET_ERROR,
  SET_LOADING,
} from "../constants/action-types";

export function getComments() {
  return function (dispatch) {
    dispatch({ type: SET_LOADING, payload: true });
    return axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        dispatch({ type: GET_COMMENTS, payload: response.data });
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({ type: SET_ERROR, payload: err.message });
      });
  };
}

// export function getArticlesById() {
//   return function (dispatch) {
//     return axios
//       .get("https://jsonplaceholder.typicode.com/comments")
//       .then((response) => {
//         const filteredPosts = response.data.filter(post => post.userId === 2)
//         dispatch({ type: GET_MY_ARTICLES, payload: filteredPosts });
//       })
//       .catch((err) => {
//         console.log(err.message);
//         dispatch({ type: SET_ERROR, payload: err.message });
//       });
//   };
// }

// export function getArticlesById() {
//   return function (dispatch) {  
//     return axios
//       .get("/blogPost/getPosts")
//       .then((response) => {
//         // const filteredPosts = response.data.filter(post => post.userId === 2)
//         dispatch({ type: GET_MY_ARTICLES, payload: response.data });
//       })
//       .catch((err) => {
//         console.log(err.message);
//         dispatch({ type: SET_ERROR, payload: err.message });
//       });
//   };
// }