import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../App'

type CartState = {
  itens: Produto[]
}

const initialState: CartState = {
  itens: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<Produto>) => {
      state.itens.push(action.payload)
    }
  }
})

export const { adicionar } = cartSlice.actions
export default cartSlice.reducer
