import axois from 'axios';

export const FETCH_CATEGORIES = 'FECTH_CATEGORIES';
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS';
export const FETCH_POSTS = 'FETCH_POSTS';
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
  const request = axois.get(`${ROOT_URL}/categories`,{headers});

  return {
    type: FETCH_CATEGORIES,
    payload: request,
  }
}

export function fetchPosts() {
  const request = axois.get(`${ROOT_URL}/posts`,
  {headers});

  return {
    type:FETCH_POSTS,
    payload: request,
  }
}

export function fetchCategoryPosts(cats) {
  const request = axois.get(`${ROOT_URL}/${cats}/posts`, {headers});

  return {
    type:FETCH_CATEGORY_POSTS,
    payload: request,
  };
}