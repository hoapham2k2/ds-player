import axios from 'axios'

export const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

// console.log the request and response
api.interceptors.request.use((req) => {
  console.log('Request:', req)
  return req
})

api.interceptors.response.use((res) => {
  console.log('Response:', res)
  return res
})
