// store.ts
import { configureStore } from '@reduxjs/toolkit';
import currentBalanceReducer from './currentWallet/currentBalanceSlice'; // Импортируем правильный редюсер
import betHistoryReducer from './betHistory/betHistorySlice';

export const store = configureStore({
  reducer: {
    currentBalance: currentBalanceReducer, // Обозначаем редюсер с правильным именем
    betHistory: betHistoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;