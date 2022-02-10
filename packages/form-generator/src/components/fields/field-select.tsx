import { FormControl, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { getValueByFieldId } from '../../core/selectors'
import { formActions } from '../../core/slice'
import { Field } from '../../types'

export const FieldSelect: React.FC<{ field: Field }> = ({ field }) => {
  const value = useSelector(getValueByFieldId(field.id))
  const dispatch = useDispatch()
  const handleChange = (v: any) => {
    dispatch(
      formActions.updateValueByKey({
        key: field.id,
        value: v,
      })
    )
  }
  return (
    <FormControl isRequired={field.mandatory} isReadOnly={field.readonly}>
      <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
      <Select
        isMulti={field.type == 'input:multi-select'}
        options={field?.attributes?.['data-options']}
        defaultValue={value}
        onChange={handleChange}
        placeholder={field.placeholder}
      />
    </FormControl>
  )
}
