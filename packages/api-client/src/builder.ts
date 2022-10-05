import {
  AxiosInstance,
} from 'axios'
import { JakevoClientOptions } from './client'
import { JakevoApiClientHelper } from './client-helper'
import { ParamsType } from './types'
import { JakevoApiResponse } from './types/base'

export class JakevoApiBuilder extends JakevoApiClientHelper {
  private url: string
  private httpClient: AxiosInstance
  private queryParams: string
  private options: JakevoClientOptions

  constructor(axiosInstance: AxiosInstance, options: JakevoClientOptions) {
    super()
    this.httpClient = axiosInstance
    this.url = options.url
    this.queryParams = ''
    this.options = options
  }

  public params(params?: ParamsType): this {
    if (!params) {
      return this
    }
    const queryParams = Object.keys(params)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            (params as any)[key]
          )}`
      )
      .join('&')

    this.queryParams = queryParams
    return this
  }


  private getUrl(id?: string): string {
    let { url } = this
    if (id) {
      url = `${url}/${id}`
    }
    return url
  }

  private getUrlWithParams(id?: string): string {
    let url = this.getUrl()
    if (id) {
      url = `${url}/${id}`
    }
    if (this.queryParams) {
      url = `${url}?${this.queryParams}`
    }
    return url
  }

  async getAll<T>(): Promise<JakevoApiResponse<T>> {
    return new Promise<JakevoApiResponse<T>>(async (resolve) => {
      try {
        const url = this.getUrlWithParams()
        const res = await this.httpClient.get(url)
        resolve(this._resolveSuccess(res))
      } catch (err) {
        resolve(this._resolveError(err))
      }
    })
  }

  async find<T>(id: number | string): Promise<JakevoApiResponse<T>> {
    return new Promise<JakevoApiResponse<T>>(async (resolve) => {
      try {
        const url = this.getUrlWithParams(id as string)
        const res = await this.httpClient.get(url)
        resolve(this._resolveSuccess(res))
      } catch (err) {
        resolve(this._resolveError(err))
      }
    })
  }

  async delete<T>(ids: Array<string>): Promise<JakevoApiResponse<T>> {
    return new Promise<JakevoApiResponse<T>>(async (resolve) => {
      try {
        const url = this.getUrl()
        const res = await this.httpClient.delete(url, {
          data: JSON.stringify({ ids }),
          ...this.options.axiosOptions
        })
        resolve(this._resolveSuccess(res))
      } catch (err) {
        resolve(this._resolveError(err))
      }
    })
  }

  async create<T>(body: T): Promise<JakevoApiResponse<T>> {
    return new Promise<JakevoApiResponse<T>>(async (resolve) => {
      try {
        const url = this.getUrl()
        const res = await this.httpClient.post(url, JSON.stringify(body))
        resolve(this._resolveSuccess(res))
      } catch (err) {
        resolve(this._resolveError(err))
      }
    })
  }

  async update<T>(id: string, body: T): Promise<JakevoApiResponse<T>> {
    return new Promise<JakevoApiResponse<T>>(async (resolve) => {
      try {
        const url = this.getUrl(id)
        const res = await this.httpClient.put(url, JSON.stringify(body))
        resolve(this._resolveSuccess(res))
      } catch (err) {
        resolve(this._resolveError(err))
      }
    })
  }
}
