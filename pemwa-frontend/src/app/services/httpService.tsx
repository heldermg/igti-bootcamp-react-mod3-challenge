import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

const axiosInstance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  withCredentials: true,
})

export async function get(url: string) {
  const { data } = await axiosInstance.get(url)
  return data
}

export async function post(url: string, body: any, headers: any) {
  const { data } = await axiosInstance.post(url, body, { headers } )
  return data
}