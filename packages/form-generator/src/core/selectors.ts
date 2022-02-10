import { RootState } from './store'

export const getValues = (state: RootState): any => state.form.values

export const getValueByFieldId =
  (fieldId: string) =>
  (state: RootState): any => getValues(state)[fieldId]
