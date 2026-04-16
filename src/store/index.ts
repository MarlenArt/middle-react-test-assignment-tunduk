import { configureStore } from '@reduxjs/toolkit';
import { candidateReducer } from '@/store/candidateSlice.ts';
import { filtersReducer } from '@/store/filtersSlice.ts';

export const store = configureStore({
  reducer: {
    candidate: candidateReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
