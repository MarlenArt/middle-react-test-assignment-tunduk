import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { type ChangeEvent, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce.ts';
import { useSearchParams } from 'react-router';
import { setNameFilter } from '@/store/filtersSlice.ts';

export const FilterByName = () => {
  const dispatch = useAppDispatch();
  const selectNameFilter = useAppSelector((state) => state.filters.name);

  const [_, setSearchParams] = useSearchParams();

  const debouncedValue = useDebounce(selectNameFilter, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setNameFilter(value));
  };

  console.log({ debouncedValue, selectNameFilter });

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);

        const currentInUrl = newParams.get('name') || '';

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
  }, [debouncedValue, dispatch, setSearchParams]);

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
