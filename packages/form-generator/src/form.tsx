import { Heading, Stack } from '@chakra-ui/react'
import React, { useImperativeHandle, useRef } from 'react'
import { Provider, useSelector } from 'react-redux'
import { Field } from './components/field'
import { getValues } from './core/selectors'
import { store } from './core/store'
import { Accordion, Field as IField, FormRef } from './types'

export const BaseForm = React.forwardRef<FormRef, any>(
  (
    {
      structure,
      onSubmit,
    }: {
      structure: Accordion[]
      onSubmit: (v: any) => void
    },
    ref
  ) => {
    const btnRef = useRef<HTMLButtonElement>(null)
    const values = useSelector(getValues)

    useImperativeHandle(ref, () => ({
      submit(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        btnRef?.current?.click()
      },
      values,
    }))

    const _handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit(values)
    }
    return (
      <form onSubmit={_handleSubmit}>
        <Stack spacing={12}>
          {structure?.map((accordion: Accordion) => (
            <Stack>
              <Heading as="h3">{accordion.text}</Heading>
              {accordion.children.map((field: IField) => (
                <Field field={field} />
              ))}
            </Stack>
          ))}
        </Stack>
        <button type="submit" ref={btnRef} hidden>
          Submit
        </button>
      </form>
    )
  }
)

export const Form: React.FC<{
  structure: Accordion[]
  formRef?: React.RefObject<any>
  onSubmit: (v: any) => void
}> = ({ structure, onSubmit, formRef }) => (
  <Provider store={store}>
    <BaseForm structure={structure} onSubmit={onSubmit} ref={formRef} />
  </Provider>
)
