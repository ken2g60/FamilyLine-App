import axios from 'axios'
import QueryString from 'query-string'
import { API_URL } from 'Utils/variables'
import { IDelete, IGet, IPatch, IPost, IPut } from 'Interfaces/axios.interface'

class HttpFacade {
  private http
  constructor() {
    this.http = axios.create({
      baseURL: API_URL,
      headers: { 'Content-Type': 'application/json' }
    })

    this.http.interceptors.request.use(
      config => {
        const token = window.sessionStorage.getItem('_fl_ut_')
        if (token && config.headers) {
          config.headers.Authorization = 'Bearer ' + token
        }
        return config
      },
      error => Promise.reject(error)
    )

    this.http.interceptors.response.use(
      response => response,
      error => {
        if ([401, 403].includes(error?.response?.status)) {
          // TODO: show login
        }
        return Promise.reject(error.response)
      }
    )
  }

  post = async ({ url, body }: IPost) => {
    const response = await this.http.post(url, body)
    return response.data
  }

  patch = async ({ url, body }: IPatch) => {
    const response = await this.http.patch(url, body)
    return response.data
  }

  get = async ({ url, query = {} }: IGet) => {
    const queryString = '?' + QueryString.stringify(query)
    const response = await this.http.get(`${url + queryString}`)
    return response.data
  }

  delete = async ({ url }: IDelete) => {
    const response = await this.http.delete(url)
    return response.data
  }

  put = async ({ url, body }: IPut) => {
    const response = await this.http.put(url, body)
    return response.data
  }
}

export default new HttpFacade()
