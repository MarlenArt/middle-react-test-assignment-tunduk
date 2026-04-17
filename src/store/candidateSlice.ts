import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  ICandidateRes,
  IInitialStateCandidates,
  TSortOption,
} from './types';
import {
  fetchCandidateDetailAction,
  fetchCandidatesAction,
  updateCandidateStatusAction,
} from './actions';
import { parseExperience } from '@/utils/parseExperience.ts';

const initialState: IInitialStateCandidates = {
  list: [],
  filteredList: [],
  listLoading: false,
  listError: null,
  candidateDetail: null,
  candidateLoading: false,
  candidateError: null,
  isUpdateLoading: false,
  updateError: null,
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
    setCandidateDetail: (
      state,
      action: PayloadAction<ICandidateRes | null>
    ) => {
      state.candidateDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidatesAction.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchCandidatesAction.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchCandidatesAction.rejected, (state) => {
        state.listLoading = false;
        state.listError = 'Ошибка загрузки';
      })
      .addCase(fetchCandidateDetailAction.pending, (state) => {
        state.candidateLoading = true;
        state.candidateError = null;
      })
      .addCase(fetchCandidateDetailAction.fulfilled, (state, action) => {
        state.candidateLoading = false;
        state.candidateDetail = action.payload;
      })
      .addCase(fetchCandidateDetailAction.rejected, (state) => {
        state.candidateLoading = false;
        state.candidateError = 'Ошибка загрузки';
      })
      .addCase(updateCandidateStatusAction.pending, (state, action) => {
        const { id, status } = action.meta.arg;
        const newStatus = `${status} - изменен`;

        state.isUpdateLoading = true;

        const update = (item: ICandidateRes) => {
          if (item.id === id) item.status = newStatus;
        };

        state.list.forEach(update);
        state.filteredList.forEach(update);
        if (state.candidateDetail?.id === id) {
          state.candidateDetail.status = newStatus;
        }
      })
      .addCase(updateCandidateStatusAction.fulfilled, (state) => {
        state.candidateLoading = false;
      })
      .addCase(updateCandidateStatusAction.rejected, (state, action) => {
        state.candidateLoading = false;

        const { id, oldStatus } = action.meta.arg;
        const revert = (item: ICandidateRes) => {
          if (item.id === id) item.status = oldStatus;
        };

        state.list.forEach(revert);
        state.filteredList.forEach(revert);
        if (state.candidateDetail?.id === id) {
          state.candidateDetail.status = oldStatus;
        }

        state.candidateError = action.payload as string;
      });
  },
});

export const candidateReducer = candidateSlice.reducer;
export const { applyAllFilters, setCandidateDetail } = candidateSlice.actions;
