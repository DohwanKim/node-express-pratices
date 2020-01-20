import axios from 'axios';

const API_KEY = "a2456e15a53b6b362e8cc9a9e047fa83";
const BASE_URL = "https://api.themoviedb.org/3";

export function findMovieByTitle(title) {
  const uri = `/search/movie?api_key=${API_KEY}&query=${title}`;
  const method = "GET";

  return axios({
    method,
    url: BASE_URL+uri,
  })
}

export function findRanking() {
  const uri = `/trending/movie/day?api_key=${API_KEY}`;
  const method = "GET";

  return axios({
    method,
    url: BASE_URL+uri,
  })
}