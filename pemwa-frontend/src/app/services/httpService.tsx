import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

const axiosInstance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  withCredentials: true,
})

export async function getAllData(url: string) {
  const { data } = await axiosInstance.get(url)
  return data
}

export async function post(url: string, body: any, headers: any) {
  const response = await axiosInstance.post(url, body, { headers } )
  console.log('response');
  console.log(response);
  
  return response.data
}