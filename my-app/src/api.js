import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // update if deployed
})

// Auto attach JWT if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default API
