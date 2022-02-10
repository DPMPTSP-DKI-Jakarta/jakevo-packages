import { AxiosError } from 'axios'

export type APIErrorResponseType = {
  error: string
  error_description: string
  hint: ''
  message: string
}

export type APIResponse = any | AxiosError<APIErrorResponseType> | null

export type ParamsType = {
  id_in?: string
  page?: number
  limit?: number
  filter?: string
  sort?: string
  with?: string
  [key: string]: any
}
