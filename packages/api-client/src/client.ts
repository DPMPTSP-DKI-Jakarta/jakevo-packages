import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { JakevoApiBuilder } from './builder'
import { JakevoAuthClient } from './auth-client'
import { getAxiosInstance } from './service/http'

export interface JakevoClientOptions {
  url: string
  axiosOptions: AxiosRequestConfig 
  authOptions: {
    storageKey: string
    grantType: string
    clientId: string
    clientSecret: string
  }
}

export class JakevoClient {
  auth: JakevoAuthClient

  protected baseUrl: string
  protected httpClient: AxiosInstance
  protected options: JakevoClientOptions

  constructor(options: JakevoClientOptions) {
    if (!options.url) throw new Error('Jakevo API url is required.')
    this.baseUrl = options.url 
    this.options = options
    this.httpClient = getAxiosInstance(options.url)
    this.auth = this._initJakevoAuthClient(this.httpClient, this.options)

    this.httpClient.interceptors.request.use((config) => {
      const token = this.auth.getToken()
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      }
      return {
        ...config,
        ...this.options.axiosOptions
      }
    });
  }

  from(path: string): JakevoApiBuilder {
    const url = `${this.baseUrl}${path}`
    return new JakevoApiBuilder(this.httpClient, {
      ...this.options,
      url
    })
  }


  private _initJakevoAuthClient(axiosInstance: AxiosInstance, options: JakevoClientOptions): JakevoAuthClient {
    return new JakevoAuthClient(axiosInstance, options)
  }
}
