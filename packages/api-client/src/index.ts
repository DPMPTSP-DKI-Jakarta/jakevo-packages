import { JakevoClientOptions, JakevoClient } from './client'

export * from './types'

const createClient = (
  options: JakevoClientOptions
): JakevoClient => new JakevoClient(options)

export {
  createClient,
  JakevoClientOptions
}
