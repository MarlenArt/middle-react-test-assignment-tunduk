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
import { applyAllFilters } from '@/store/candidateSlice.ts';

export const CandidatesList = () => {
  const dispatch = useAppDispatch();
  const candidatesList = useAppSelector((state) => state.candidate.list);

  const [searchParams] = useSearchParams();

  const { filteredList, listLoading } = useSelector(
    (state: RootState) => state.candidate
  );

  useEffect(() => {
    dispatch(fetchCandidatesAction());
  }, [dispatch]);

  // Достаем ВСЕ данные из URL (это наш главный источник)
  const name = searchParams.get('name') || '';
  const verdict = searchParams.get('verdict') || 'все';
  const sort = (searchParams.get('sort') as TSortOption) || 'default';

  useEffect(() => {
    // Синхронизируем фильтры в сторе (чтобы инпуты и селекты обновились)
    dispatch(setNameFilter(name));
    dispatch(setVerdictFilter(verdict));
    dispatch(setSortFilter(sort));

    // Вызываем ОДНУ общую фильтрацию
    dispatch(applyAllFilters({ name, verdict, sort }));
  }, [name, verdict, sort, dispatch, candidatesList]);

  if (listLoading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Sort />
        <FilterByName />
        <FilterByVerdict />
      </div>
      <div className={styles.cards}>
        {filteredList.map((item: ICandidateRes) => (
          <CandidateCard key={item.id} card={item} />
        ))}
      </div>
    </div>
  );
};
