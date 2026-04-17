import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { type ChangeEvent, useEffect, useRef } from 'react';
import useDebounce from '@/hooks/useDebounce.ts';
import { useSearchParams } from 'react-router';
import { setNameFilter } from '@/store/filtersSlice.ts';

export const FilterByName = () => {
  const dispatch = useAppDispatch();
  const selectNameFilter = useAppSelector((state) => state.filters.name);

  const [searchParams, setSearchParams] = useSearchParams();

  const nameParams = searchParams.get('name');

  const debouncedValue = useDebounce(selectNameFilter, 300);

  const isMounted = useRef(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setNameFilter(value));
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);

        const currentInUrl = nameParams || '';

        if (debouncedValue === currentInUrl) return prev;

        if (debouncedValue) {
          newParams.set('name', debouncedValue);
        } else if (!debouncedValue || !selectNameFilter) {
          newParams.delete('name');
        }
        newParams.set('page', '1');
        return newParams;
      },
      { replace: true }
    );
  }, [debouncedValue, dispatch, setSearchParams, nameParams]);

  return (
    <div className={styles.container}>
      <div>поиск:</div>
      <input
        type="text"
        placeholder="напишите имя"
        onChange={handleChange}
        value={selectNameFilter}
      />
    </div>
  );
};
