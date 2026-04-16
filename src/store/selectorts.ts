import type { RootState } from '@/store/index.ts';

export const selectPaginatedCandidates = (state: RootState) => {
  const { filteredList, currentPage, itemsPerPage } = state.candidate;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filteredList.slice(startIndex, endIndex);
};

export const selectTotalPages = (state: RootState) => {
  return Math.ceil(
    state.candidate.filteredList.length / state.candidate.itemsPerPage
  );
};
