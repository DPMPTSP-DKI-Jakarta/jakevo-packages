import { ApiBuilder } from './builder'

export interface JakevoClientOptions {
  sessionProvider: any
}
export class JakevoClient {
  private readonly jakevoApiUrl: string

  private options: JakevoClientOptions

  constructor(jakevoApiUrl: string, options: JakevoClientOptions) {
    if (!jakevoApiUrl) throw new Error('Jakevo API url is required.')
    this.jakevoApiUrl = jakevoApiUrl
    this.options = options
  }

  from(url: string): ApiBuilder {
    return new ApiBuilder(this.jakevoApiUrl + url, this.options)
  }
}
