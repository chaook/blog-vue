import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8080/chao',
  timeout: 20 * 1000, // Timeout
})

// axios请求拦截器
http.interceptors.request.use(
  config => {
    // NProgress.start()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// axios响应拦截器
http.interceptors.response.use(
  response => {
    // NProgress.done();
    const res = response.status === 200 ? Promise.resolve(response) : Promise.reject(response);
    return res;
  },
  error => {
    return Promise.reject(error)
  },
)

export default http;