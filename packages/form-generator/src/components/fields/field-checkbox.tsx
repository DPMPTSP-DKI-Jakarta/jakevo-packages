import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getValueByFieldId } from '../../core/selectors'
import { formActions } from '../../core/slice'
import { Field } from '../../types'

export const FieldCheckbox: React.FC<{ field: Field }> = ({ field }) => {
  const value = useSelector(getValueByFieldId(field.id))
  const dispatch = useDispatch()
  const handleChange = (e: (string | number)[]) => {
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
      <CheckboxGroup defaultValue={value} onChange={handleChange}>
        <Stack>
          {field?.attributes?.['data-options']?.map(
            (option: { label: string; value: string }) => (
              <Checkbox value={option.value}>{option.label}</Checkbox>
            )
          )}
        </Stack>
      </CheckboxGroup>
    </FormControl>
  )
}
