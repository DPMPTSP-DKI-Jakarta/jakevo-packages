import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getValueByFieldId } from '../../core/selectors'
import { formActions } from '../../core/slice'
import { Field } from '../../types'

export const FieldRadio: React.FC<{ field: Field }> = ({ field }) => {
  const value = useSelector(getValueByFieldId(field.id))
  const dispatch = useDispatch()
  const handleChange = (e: string) => {
    dispatch(
      formActions.updateValueByKey({
        key: field.id,
        value: e,
      })
    )
  }
  return (
    <FormControl isRequired={field.mandatory} isReadOnly={field.readonly}>
      <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
      <RadioGroup defaultValue={value} onChange={handleChange}>
        <Stack>
          {field?.attributes?.['data-options']?.map(
            (option: { label: string; value: string }) => (
              <Radio value={option.value}>{option.label}</Radio>
            )
          )}
        </Stack>
      </RadioGroup>
    </FormControl>
  )
}
