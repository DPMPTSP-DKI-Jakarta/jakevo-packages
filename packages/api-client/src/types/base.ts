export type JakevoApiError = {
  message: string | null,
  status: number | null,
  description: number | null,
  name: string | null,
  hint: string | null
}

export type JakevoApiResponse<T> = {
  data: T | null
  error?: JakevoApiError
  meta?: Meta
  links?: Link
}

export type Link = {
  first: string | null,
  last: string | null,
  prev: string | null,
  next: string | null
}

export type Meta = {
  current_page: number,
  from: number,
  path: string,
  per_page: number,
  to: number
}
