import { type ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { List, type RowComponentProps } from 'react-window';

import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { fetchCandidatesAction } from '@/store/actions.ts';
import type { TSortOption } from '@/store/types.ts';
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
  setCurrentPage,
  setItemsPerPage,
} from '@/store/filtersSlice.ts';
import { applyAllFilters } from '@/store/candidateSlice.ts';
import { Pagination } from '@/components/Pagination';
import { selectPaginatedCandidates } from '@/store/selectorts.ts';

export const CandidatesList = () => {
  const dispatch = useAppDispatch();

  const paginateCandidates = useAppSelector(selectPaginatedCandidates);
  const itemsPerPage = useAppSelector((state) => state.filters.itemsPerPage);

  const isMobile = window.innerWidth < 768;

  const [searchParams] = useSearchParams();

  const { listLoading, list } = useSelector(
    (state: RootState) => state.candidate
  );

  useEffect(() => {
    if (list.length) return;
    dispatch(fetchCandidatesAction());
  }, [dispatch, list.length]);

  const name = searchParams.get('name') || '';
  const verdict = searchParams.get('verdict') || 'все';
  const sort = (searchParams.get('sort') as TSortOption) || 'default';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(setVerdictFilter(verdict));
    dispatch(setSortFilter(sort));
    dispatch(setCurrentPage(page));
    dispatch(setNameFilter(name));

    if (list.length > 0) {
      dispatch(applyAllFilters({ name, verdict, sort }));
    }
  }, [name, verdict, sort, page, dispatch, list.length]);

  const Row = ({ index, style }: RowComponentProps) => {
    const candidate = paginateCandidates[index];

    if (!candidate) return null;

    return (
      <div style={style}>
        <CandidateCard card={candidate} />
      </div>
    );
  };

  const handleChangeItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setItemsPerPage(e.target.value as unknown as number));
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Sort />
        <FilterByName />
        <FilterByVerdict />
      </div>

      {listLoading ? (
        <h1>Загрузка...</h1>
      ) : paginateCandidates.length ? (
        <div className={styles.cards}>
          <List
            rowComponent={Row}
            rowHeight={isMobile ? 350 : 200}
            rowCount={paginateCandidates.length}
            rowProps={{ data: paginateCandidates }}
          />
        </div>
      ) : (
        <h1>Кандидаты не найдены</h1>
      )}

      <div className={styles.pagination}>
        <Pagination />
        <select
          className={styles.select_count}
          value={itemsPerPage}
          onChange={handleChangeItemsPerPage}
        >
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};
