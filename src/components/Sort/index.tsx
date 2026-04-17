import { memo, type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router';
import { useAppSelector } from '@/hooks/redux.ts';

import styles from './styles.module.scss';

const SORT_OPTIONS = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'name', label: 'По имени' },
  { value: 'exp', label: 'По опыту' },
  { value: 'date', label: 'По дате' },
];

export const Sort = memo(() => {
  const [_, setSearchParams] = useSearchParams();
  const selectedSortFilter = useAppSelector((state) => state.filters.sort);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (value && value !== 'default') {
          next.set('sort', value);
        } else {
          next.delete('sort');
        }

        next.set('page', '1');
        return next;
      },
      { replace: true }
    );
  };

  return (
    <div className={styles.container}>
      <label htmlFor={'filterBySort'} className={styles.title}>
        Сортировка:
      </label>
      <select
        id={'filterBySort'}
        onChange={handleChange}
        value={selectedSortFilter}
        className={styles.select}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
});
