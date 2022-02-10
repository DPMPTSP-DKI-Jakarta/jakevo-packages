export interface FormRef {
  submit: () => void
  values: any
}

export interface Field {
  id: string
  label: string
  placeholder: string
  type: string
  attributes: any
  mandatory: boolean
  readonly: boolean
  [key: string]: any
}

export interface Accordion {
  type: string
  text: string
  children: Field[]
}
