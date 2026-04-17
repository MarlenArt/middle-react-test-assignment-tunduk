import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialStateFilters } from '@/store/types.ts';

const initialState: IInitialStateFilters = {
  name: '',
  sort: '',
  verdict: '',
  currentPage: 1,
  itemsPerPage: 10,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSortFilter: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setVerdictFilter: (state, action: PayloadAction<string>) => {
      state.verdict = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;

export const {
  setNameFilter,
  setVerdictFilter,
  setSortFilter,
  setCurrentPage,
} = filtersSlice.actions;
