import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:5000/' })
// const API = axios.create({ baseURL: 'https://famed-v1.herokuapp.com/' })
// const API = axios.create({ baseURL: 'http://www.med.uem.mz:5000/' })
// const API = axios.create({ baseURL: 'https://www.med.uem.mz/' })
// const API = axios.create({ baseURL: 'https://api.med.uem.mz/' })
const API = axios.create({ baseURL: 'http://192.168.88.109:5000/' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('famedv1_user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('famedv1_user')).token
    }`
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
