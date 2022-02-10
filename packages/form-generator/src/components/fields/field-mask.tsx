import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import InputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { getValueByFieldId } from '../../core/selectors'
import { formActions } from '../../core/slice'
import { Field } from '../../types'

export const FieldMask: React.FC<{ field: Field }> = ({ field }) => {
  const value = useSelector(getValueByFieldId(field.id))
  const dispatch = useDispatch()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      formActions.updateValueByKey({
        key: field.id,
        value: e.currentTarget.value,
      })
    )
  }
  return (
    <FormControl isRequired={field.mandatory} isReadOnly={field.readonly}>
      <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
      <Input
        as={InputMask}
        onChange={handleChange}
        value={value}
        placeholder={field.placeholder}
        mask={field?.attributes?.mask}
      />
    </FormControl>
  )
}
