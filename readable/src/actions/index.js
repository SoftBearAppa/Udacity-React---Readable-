import axios from 'axios';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const FETCH_CATEGORIES = 'FECTH_CATEGORIES';
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS';
export const FETCH_ALL_COMMENTS = 'FETCH_ALL_COMMENTS';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST_DETAILS = 'FETCH_POST_DETAILS';
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

export function fetchCategoryPosts(cats) {
  const request = axios.get(`${ROOT_URL}/${cats}/posts`, {headers});

  return {
    type:FETCH_CATEGORY_POSTS,
    payload: request,
  };
}

export function fetchPostDetails(postsid) {
  const request = axios.get(`${ROOT_URL}/posts/${postsid}`, {headers});

  return {
    type: FETCH_POST_DETAILS,
    payload: request,
  }
}

export function createPost(fieldValues) {
  const request = axios.post(`${ROOT_URL}/posts`, fieldValues, {headers});

  return {
    type: CREATE_POST,
    payload: request,
  }
}

export function createComment(fieldValues) {
  const request = axios.post(`${ROOT_URL}/comments`, fieldValues, {headers});

  return {
    type: CREATE_COMMENT,
    payload: request,
  }
}

export function editPost(postsid, fieldValues) {
  const request = axios.put(`${ROOT_URL}/posts/${postsid}`, fieldValues, {headers});

  return {
    type:EDIT_POST,
    payload: request,
  }
}

export function fetchComments(postsid) {
  const request = axios.get(`${ROOT_URL}/posts/${postsid}/comments`, {headers});

  return {
    type: FETCH_ALL_COMMENTS,
    payload: request,
  }
}

export function votePost(postsid, option) {
  const request = axios.post(`${ROOT_URL}/posts/${postsid}`, {option}, {headers});

  return {
    type: VOTE_POST,
    payload: request,
  }
}

export function voteComment(commentId, option) {
  const request = axios.post(`${ROOT_URL}/comments/${commentId}`, {option}, {headers});

  return {
    type: VOTE_COMMENT,
    payload: request,
  }
}