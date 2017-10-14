import axios from 'axios';

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const FETCH_CATEGORIES = 'FECTH_CATEGORIES';
export const FETCH_ALL_COMMENTS = 'FETCH_ALL_COMMENTS';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_COMMENT_DETAILS = 'FETCH_COMMENT_DETAILS';
export const FETCH_POST_DETAILS = 'FETCH_POST_DETAILS';
export const ORDER_BY_TIME = 'ORDER_BY_TIME';
export const ORDER_BY_VOTES = 'ORDER_BY_VOTES';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const VOTE_POST = 'VOTE_POST';

const ROOT_URL = 'http://localhost:5001'

let token = localStorage.token;

if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Accept' : 'application.json',
  'Authorization': token,
}

export function deleteComment(postsid, commentid) {
  const request = axios.delete(`${ROOT_URL}/comments/${commentid}`, {headers});

  return dispatch => {
    request.then(() => {
      dispatch({
        type: DELETE_COMMENT,
        payload: {
          postsid,
          commentid,
        }
      })
    })
  }
}

export function deletePost(postsid, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${postsid}`, {headers});

  return dispatch => {
    request.then(() => {
      dispatch({
        type: DELETE_POST,
        payload: postsid,
      })
    }).then(() => callback())
  }
}

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`, {headers});

  return {
    type: FETCH_CATEGORIES,
    payload: request,
  }
}

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`,
  {headers});

  return {
    type:FETCH_POSTS,
    payload: request,
  }
}

export function fetchPostDetails(postsid) {
  const request = axios.get(`${ROOT_URL}/posts/${postsid}`, {headers});

  return {
    type: FETCH_POST_DETAILS,
    payload: request,
  }
}

export function fetchCommentDetails(postsid, commentsid) {
  const request = axios.get(`${ROOT_URL}/comments/${commentsid}`, {headers});

  return dispatch => {
    request.then((data) => {
      dispatch({
        type: FETCH_COMMENT_DETAILS,
        payload: {
          postsid,
          data
        }
      })
    })
  }
}

export function createPost(fieldValues, callback) {
  const request = axios.post(`${ROOT_URL}/posts`, fieldValues, {headers});

  return dispatch => {
    request.then(({data}) => {
      dispatch({
        type: CREATE_POST,
        payload: data
      })
    }).then(() => callback())
  }
}

export function createComment(postsid, fieldValues, callback) {
  const request = axios.post(`${ROOT_URL}/comments`, fieldValues, {headers});

  return dispatch => {
    request.then(({data}) => {
      dispatch({
        type: CREATE_COMMENT,
        payload: {
          postsid,
          data
        }
      })
    }).then(() => callback())
  }
}

export function editPost(postsid, fieldValues, callback) {
  const request = axios.put(`${ROOT_URL}/posts/${postsid}`, fieldValues, {headers});

  return dispatch => {
    request.then(({data}) => {
      dispatch({
        type: EDIT_POST,
        payload:data,
      })
    }).then(() => callback())
  }
}

export function editComment(postsid, commentsid, fieldValues, callback) {
  const request = axios.put(`${ROOT_URL}/comments/${commentsid}`, fieldValues, {headers});
  fieldValues['timestamp'] = Date.now();
  return dispatch => {
    request.then(({data}) => {
      dispatch({
        type: EDIT_COMMENT,
        payload: {
          postsid,
          data
        }
      })
    }).then(() => callback())
  }
}

export function fetchComments(postsid) {
  const request = axios.get(`${ROOT_URL}/posts/${postsid}/comments`, {headers});

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_ALL_COMMENTS,
        payload: {
          data,
          postsid,
        }
      })
      }
    )
  }
}

export function votePost(postsid, option) {
  const request = axios.post(`${ROOT_URL}/posts/${postsid}`, {option}, {headers});

  return {
    type: VOTE_POST,
    payload: request,
  }
}

export function voteComment(postsid, commentId, option) {
  const request = axios.post(`${ROOT_URL}/comments/${commentId}`, {option}, {headers});

  return dispatch => {
    request.then(({data}) => {
      dispatch({
        type: VOTE_COMMENT,
        payload: {
          data,
          postsid
        }
      })
    })
  }
}

export function orderByVote(topic, order="byVotes") {
  return {
    type: ORDER_BY_VOTES,
    topic,
    order,
  }
}

export function orderByTime(topic, order="byTime") {
  return {
    type: ORDER_BY_TIME,
    topic,
    order,
  }
}