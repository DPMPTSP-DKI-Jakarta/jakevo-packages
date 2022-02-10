import React from 'react'
import { Field as IField } from '../types'
import { FieldCheckbox } from './fields/field-checkbox'
import { FieldDate } from './fields/field-date'
import { FieldInput } from './fields/field-input'
import { FieldMask } from './fields/field-mask'
import { FieldNumber } from './fields/field-number'
import { FieldRadio } from './fields/field-radio'
import { FieldTextArea } from './fields/field-textarea'
import { FieldSelect } from './fields/field-select'
import { FieldSign } from './fields/field-sign'

export const Field: React.FC<{ field: IField }> = React.memo(({ field }) => {
  switch (field.type) {
    case 'input:text':
      return <FieldInput field={field} />
    case 'input:mask':
      return <FieldMask field={field} />
    case 'input:number':
      return <FieldNumber field={field} />
    case 'input:textarea':
      return <FieldTextArea field={field} />
    case 'input:date':
      return <FieldDate field={field} />
    case 'input:checkbox':
      return <FieldCheckbox field={field} />
    case 'input:radio':
      return <FieldRadio field={field} />
    case 'input:select':
      return <FieldSelect field={field} />
    case 'input:multi-select':
      return <FieldSelect field={field} />
    case 'input:sign':
      return <FieldSign field={field} />
    default:
      return <p>Unsupported field type: {field.type}</p>
  }
})
