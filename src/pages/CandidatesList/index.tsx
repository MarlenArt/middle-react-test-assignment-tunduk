import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { fetchCandidatesAction } from '@/store/actions.ts';
import type { ICandidateRes, TSortOption } from '@/store/types.ts';
import type { RootState } from '@/store';

import { CandidateCard } from '@/components/CandidateCard';

import styles from './styles.module.scss';
import { Sort } from '@/components/Sort';
import { FilterByName } from '@/components/FilterByName';
import { FilterByVerdict } from '@/components/FilterByVerdict';
import { useSearchParams } from 'react-router';
import {
  setNameFilter,
  setVerdictFilter,
  setSortFilter,
} from '@/store/filtersSlice.ts';
import { applyAllFilters, setCurrentPage } from '@/store/candidateSlice.ts';
import { Pagination } from '@/components/Pagination';
import { selectPaginatedCandidates } from '@/store/selectorts.ts';

export const CandidatesList = () => {
  const dispatch = useAppDispatch();
  const candidatesList = useAppSelector((state) => state.candidate.list);
  const paginateCandidates = useAppSelector(selectPaginatedCandidates);
  const [searchParams] = useSearchParams();

  const { listLoading } = useSelector((state: RootState) => state.candidate);

  useEffect(() => {
    dispatch(fetchCandidatesAction());
  }, [dispatch]);

  const name = searchParams.get('name') || '';
  const verdict = searchParams.get('verdict') || 'все';
  const sort = (searchParams.get('sort') as TSortOption) || 'default';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(setVerdictFilter(verdict));
    dispatch(setSortFilter(sort));
    dispatch(setCurrentPage(page));

    if (name) {
      dispatch(setNameFilter(name));
    }

    if (candidatesList.length > 0) {
      dispatch(applyAllFilters({ name, verdict, sort }));
    }
  }, [name, verdict, sort, page, dispatch, candidatesList.length]);

  if (listLoading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Sort />
        <FilterByName />
        <FilterByVerdict />
      </div>
      <div className={styles.cards}>
        {paginateCandidates.map((item: ICandidateRes) => (
          <CandidateCard key={item.id} card={item} />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination />
      </div>
    </div>
  );
};
