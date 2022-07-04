import { get, post } from './httpService'
import { AxiosError } from "axios"
import { IUser } from '../components'

export async function apiGetAllExpenses(yearMonth?: string) {
  const params = yearMonth ? `?yearMonth=${yearMonth}&_sort=day` : '?_sort=day'
  const allExpenses = await get(`/expenses${params}`)
  return [...allExpenses]
}

export function apiLogin(email: string, password: string): Promise<IUser> {
  const headers = {
    "Content-Type": "application/json"
  }
  const data = JSON.stringify({email, password})
  return post('/session/create', data, headers)
}

export async function apiLogout(): Promise<void> {
  const headers = {
    "Content-Type": "application/json"
  }
  await post('/session/end', {}, headers)
}

export async function apiGetUserAth() {
  try {
    return await get('/session/user')
  } catch (err: unknown) {
    const typedError = err as AxiosError
    throw new Error(typedError.message)
  }
}