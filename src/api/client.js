import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })
// const API = axios.create({ baseURL: 'https://famed-v1.herokuapp.com/' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('famedv1_user')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('famedv1_user')).token}`
  }
  return req
})

export { API }





// import axios from 'axios'

// const API = axios.create({ baseURL: 'https://famed-api.herokuapp.com' })

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('profile')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
//   }
//   return req
// })

// export { API }


