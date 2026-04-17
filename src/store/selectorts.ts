import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/index.ts';

const selectFilteredList = (state: RootState) => state.candidate.filteredList;
const selectCurrentPage = (state: RootState) => state.filters.currentPage;
const selectItemsPerPage = (state: RootState) => state.filters.itemsPerPage;

export const selectPaginatedCandidates = createSelector(
  [selectFilteredList, selectCurrentPage, selectItemsPerPage],
  (filteredList, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredList.slice(startIndex, endIndex);
  }
);

export const selectTotalPages = createSelector(
  [selectFilteredList, selectItemsPerPage],
  (filteredList, itemsPerPage) => {
    return Math.ceil(filteredList.length / itemsPerPage);
  }
);
