import { JakevoClientOptions, JakevoClient } from './client'

export * from './types'

export const createClient = (
  jakevoApiUrl: string,
  options: JakevoClientOptions
): JakevoClient => new JakevoClient(jakevoApiUrl, options)
