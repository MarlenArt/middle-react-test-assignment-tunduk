import { type ChangeEvent, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import useDebounce from '@/hooks/useDebounce.ts';
import { setNameFilter } from '@/store/filtersSlice.ts';

import styles from './styles.module.scss';

export const FilterByName = () => {
  const dispatch = useAppDispatch();
  const selectNameFilter = useAppSelector((state) => state.filters.name);
  const [searchParams, setSearchParams] = useSearchParams();

  const nameParams = searchParams.get('name') || '';
  const debouncedValue = useDebounce(selectNameFilter, 300);
  const isMounted = useRef(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNameFilter(e.target.value));
  };

  useEffect(() => {
    // Пропускаем первый рендер, чтобы не сбрасывать URL при инициализации
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);

        if (debouncedValue === nameParams) return prev;

        if (debouncedValue) {
          newParams.set('name', debouncedValue);
        } else {
          newParams.delete('name');
        }

        newParams.set('page', '1');
        return newParams;
      },
      { replace: true }
    );
  }, [debouncedValue, setSearchParams, nameParams]);

  return (
    <div className={styles.container}>
      <label htmlFor={'filterByName'} className={styles.label}>
        Поиск:
      </label>
      <input
        id={'filterByName'}
        type="text"
        placeholder="напишите имя"
        onChange={handleChange}
        value={selectNameFilter}
        aria-label="Поиск кандидата по имени"
        className={styles.input}
      />
    </div>
  );
};
