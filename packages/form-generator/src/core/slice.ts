import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { values: any } = {
  values: {},
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateValueByKey: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state.values[action.payload.key] = action.payload.value
    },
  },
})

// Action creators are generated for each case reducer function
export const formActions = formSlice.actions

export default formSlice.reducer
