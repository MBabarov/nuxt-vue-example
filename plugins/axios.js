import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3004/',
  timeout: 1000,
  headers: {
    Authorization: 'Bearer token'
  }
})

export default instance
