import { AxiosInstance } from 'axios'
import { JakevoClientOptions } from '.'
import { JakevoApiClientHelper } from './client-helper'
import { isBrowser } from './helpers'
import { SignInCredentials, SignInResponse, SignUpCredentials, SignUpResponse, User } from './types/auth'
import { JakevoApiResponse } from './types/base'

const ENDPOINT = {
  SIGN_IN: '/oauth/token',
  REGISTER: '/api/register',
  ME: '/api/user'
}

export class JakevoAuthClient extends JakevoApiClientHelper {
  private httpClient: AxiosInstance
  protected currentUser: User | null
  protected options: JakevoClientOptions

  constructor(axiosInstance: AxiosInstance, options: JakevoClientOptions) {
    super()
    this.httpClient = axiosInstance
    this.currentUser = null
    this.options = options
  }

  public signIn(
    credentials: SignInCredentials
  ): Promise<JakevoApiResponse<SignInResponse>> {
    return new Promise<JakevoApiResponse<SignInResponse>>(async resolve => {
      const { grantType, clientId, clientSecret } = this.options.authOptions
      try {
        this.removeToken()
        const res = await this.httpClient.post(
          ENDPOINT.SIGN_IN, {
            ...credentials,
            grant_type: grantType,
            client_id: clientId,
            client_secret: clientSecret,
          }
        )
        this.setToken(res.data.access_token)
        resolve(this._resolveSuccess(res))
      } catch (error) {
        resolve(this._resolveError(error))
      }
    })
  }

  public signOut() {
    this.removeToken()
    this.currentUser = null
  }

  public signUp(
    credentials: SignUpCredentials
  ): Promise<JakevoApiResponse<SignUpResponse>> {
    return new Promise<JakevoApiResponse<SignUpResponse>>(async resolve => {
      try {
        const res = await this.httpClient.post(
          ENDPOINT.REGISTER, credentials
        )
        resolve(this._resolveSuccess(res))
      } catch (error) {
        resolve(this._resolveError(error))
      }
    })
  }


  public me(): Promise<JakevoApiResponse<User>> {
    return new Promise<JakevoApiResponse<User>>(async resolve => {
      try {
        const res = await this.httpClient.get(
          ENDPOINT.ME
        )
        resolve(this._resolveSuccess(res))
      } catch (error) {
        resolve(this._resolveError(error))
      }
    })
  }

  private setToken(session: string) {
    const { authOptions } = this.options
    const { storageKey } = authOptions
    if (isBrowser()) {
      window.localStorage.setItem(storageKey, session)
    }
  }

  public getToken(): string | null {
    const { authOptions } = this.options
    const { storageKey } = authOptions

    if (isBrowser()) {
      return window.localStorage.getItem(storageKey)
    }
    return null
  }

  private removeToken() {
    const { authOptions } = this.options
    const { storageKey } = authOptions

    if (isBrowser()) {
      window.localStorage.removeItem(storageKey)
    }
  }

}
