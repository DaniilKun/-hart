// betHistorySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Bet {
  amount: number;
  direction: string;
  result: number; // 0 - проигрыш, 1 - выигрыш
  timestamp: string;
}

export interface BetHistoryState {
  bets: Bet[];
}

const initialState: BetHistoryState = {
  bets: [],
};

export const betHistorySlice = createSlice({
  name: 'betHistory',
  initialState,
  reducers: {
    addBet: (state, action: PayloadAction<Bet>) => {
      state.bets.push(action.payload);
    },
  },
});

export const { addBet } = betHistorySlice.actions;
export default betHistorySlice.reducer;