import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CurrentBalanceState {
  balance: number
}

const initialState: CurrentBalanceState = {
  balance: 1000
};

export const currentBalanceSlice = createSlice({
  name: 'currentBalance',
  initialState,
  reducers: {
    setCurrentBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    increaseBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    decreaseBalance: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentBalance, increaseBalance, decreaseBalance } = currentBalanceSlice.actions;

export default currentBalanceSlice.reducer;
