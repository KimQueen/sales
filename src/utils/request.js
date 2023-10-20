import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/8d0d9df4b3468be564d092325e81abab/api',
  timeout: 10000
})

const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: { 'Content-Type': 'application/json' }
    }).then((reponse) => {
      resolve(reponse?.data)
    }, (reason) => {
      reject(reason)
    })
  })
}

const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((reponse) => {
      resolve(reponse?.data)
    }, (reason) => {
      reject(reason)
    })
  })
}
export { post, get }
