import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { JakevoClientOptions } from './client'
import { APIResponse, ParamsType } from './types'

export class ApiBuilder {
  private url: string

  service: AxiosInstance

  private _params: string

  private options: JakevoClientOptions

  constructor(url: string, options: JakevoClientOptions) {
    const service = axios.create()
    service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service = service
    this.url = url
    this._params = ''
    this.options = options
  }

  handleSuccess(response: AxiosResponse<any>): AxiosResponse<any> {
    return response.data
  }

  handleError(error: AxiosError<any>): Promise<AxiosError<any>> {
    return Promise.reject(error)
  }

  private getOptions(name: keyof JakevoClientOptions): any {
    return this.options[name]
  }

  private async _getHeaders(): Promise<AxiosRequestConfig['headers']> {
    const session: any = await this.getOptions('sessionProvider')()

    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    headers.Authorization = `${session?.accessToken?.token_type} ${session?.accessToken?.access_token}`

    return headers
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
    if (this._params) {
      url = `${url}?${this._params}`
    }
    return url
  }

  params(params?: ParamsType): this {
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

    this._params = queryParams
    return this
  }

  async getAll(): Promise<APIResponse> {
    const headers = await this._getHeaders()
    const url = this.getUrlWithParams()
    return await this.service.get(url, {
      responseType: 'json',
      headers,
    })
  }

  async find(id: string): Promise<APIResponse> {
    const headers = await this._getHeaders()
    const url = this.getUrlWithParams(id)
    return await this.service.get(url, {
      responseType: 'json',
      headers,
    })
  }

  async delete(ids: Array<string>): Promise<APIResponse> {
    const headers = await this._getHeaders()
    const url = this.getUrl()
    return await this.service.delete(url, {
      responseType: 'json',
      data: JSON.stringify({ ids }),
      headers,
    })
  }

  async duplicate(id: string): Promise<APIResponse> {
    const headers = await this._getHeaders()
    const url = this.getUrlWithParams(id)
    return await this.service.post(url, null, {
      responseType: 'json',
      headers,
    })
  }

  async create<T>(body: T): Promise<APIResponse> {
    const headers = await this._getHeaders()
    const url = this.getUrl()
    return await this.service.post(url, JSON.stringify(body), {
      responseType: 'json',
      headers,
    })
  }

  async update<T>(id: string, body: T): Promise<APIResponse> {
    const headers = await this._getHeaders()
    const url = this.getUrl(id)
    return await this.service.put(url, JSON.stringify(body), {
      responseType: 'json',
      headers,
    })
  }
}
