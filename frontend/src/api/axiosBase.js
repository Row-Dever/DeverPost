import axios from 'axios'

const url = 'http://localhost:8800/'
export const instance = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 이미지 인스턴스
export const imgInstance = axios.create({
  baseURL: url,
  headers: { 'Content-Type': 'multipart/form-data' }
})

// 로그인된 유저 인스턴스
export const accessInstance = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json'
  }
})
