import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialStateCandidates, TSortOption } from './types';
import { fetchCandidatesAction } from './actions';
import { parseExperience } from '@/utils/parseExperience.ts';

const initialState: IInitialStateCandidates = {
  list: [],
  filteredList: [],
  listLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 10,
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    applyAllFilters: (
      state,
      action: PayloadAction<{
        name: string;
        verdict: string;
        sort: TSortOption;
      }>
    ) => {
      const { name, verdict, sort } = action.payload;

      let result = [...state.list];

      if (name) {
        const search = name.toLowerCase().trim();
        result = result.filter((item) =>
          item.name.toLowerCase().includes(search)
        );
      }

      if (verdict && verdict !== 'все') {
        result = result.filter(
          (item) => item.verdict.toLowerCase() === verdict.toLowerCase()
        );
      }

      if (sort && sort !== 'default') {
        result.sort((a, b) => {
          switch (sort) {
            case 'name':
              return a.name.localeCompare(b.name);
            case 'exp':
              return (
                parseExperience(b.total_exp) - parseExperience(a.total_exp)
              );
            case 'date':
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            default:
              return 0;
          }
        });
      }

      state.filteredList = result;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidatesAction.pending, (state) => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(fetchCandidatesAction.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
        state.filteredList = action.payload;
      })
      .addCase(fetchCandidatesAction.rejected, (state) => {
        state.listLoading = false;
        state.error = 'Ошибка загрузки';
      });
  },
});

export const candidateReducer = candidateSlice.reducer;
export const { applyAllFilters, setCurrentPage } = candidateSlice.actions;
