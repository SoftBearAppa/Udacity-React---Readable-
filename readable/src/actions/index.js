import axois from 'axios';

export const FETCH_CATEGORIES = 'FECTH_CATEGORIES';
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