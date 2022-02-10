import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getValueByFieldId } from '../../core/selectors'
import { formActions } from '../../core/slice'
import { Field } from '../../types'

export const FieldNumber: React.FC<{ field: Field }> = ({ field }) => {
  const value = useSelector(getValueByFieldId(field.id))
  const dispatch = useDispatch()
  const handleChange = (v: string) => {
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
      <NumberInput
        onChange={handleChange}
        value={value}
        placeholder={field.placeholder}
      >
        <NumberInputField />
      </NumberInput>
    </FormControl>
  )
}
