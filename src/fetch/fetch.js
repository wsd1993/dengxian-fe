import axios from 'axios'
import { message } from 'antd'
import NProgress from "nprogress"
import { createHashHistory } from 'history'

const router = createHashHistory()
export const fetch = axios.create({
  timeout: 5000
})

fetch.interceptors.request.use(
  (config) => {
    NProgress.start()
    return config
  },
  (error) => {
    console.warn(error)
    Promise.reject(error)
  }
)

fetch.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response
  },
  (error) => {
    NProgress.done()
    if(!error.response){
      message.error("无法连接服务器");
    }else if (error.response.status === 401) {
      router.push('/login')
      message.error(error.response.data.msg)
    } else if (error.response.status === 403) {
      alert(1)
      localStorage.removeItem('Authorization')
      router.push('/login')
      message.error(error.response.data.msg)
    } else {
      message.error('系统异常')
    }
  }
)