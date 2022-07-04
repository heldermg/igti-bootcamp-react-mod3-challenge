import { getAllData, post } from './httpService'
import { AxiosError } from "axios"
import { IUser } from '../components'

export async function apiGetAllExpenses(yearMonth?: string) {
  const params = yearMonth ? `?yearMonth=${yearMonth}&_sort=day` : '?_sort=day'
  const allExpenses = await getAllData(`/expenses${params}`)
  return [...allExpenses]
}

export async function login(email: string, password: string): Promise<IUser> {
  try {
    const headers = {
      "Content-Type": "application/json"
    }
    const data = JSON.stringify({email, password})
    return await post('/session/create', data, headers)
  } catch (err: unknown) {
    const typedError = err as AxiosError
    throw new Error(typedError.response?.data.message)
  }
}

export async function logout(): Promise<void> {
  try {
    const headers = {
      "Content-Type": "application/json"
    }
    await post('/session/end', {}, headers)
  } catch (err: unknown) {
    const typedError = err as AxiosError
    throw new Error(typedError.response?.data.message)
  }
}

export async function getUserAth() {
  try {
    return await getAllData('/session/user')
  } catch (err: unknown) {
    const typedError = err as AxiosError
    throw new Error(typedError.message)
  }
}