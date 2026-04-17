import { memo, type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router';
import { useAppSelector } from '@/hooks/redux.ts';
import styles from './styles.module.scss';

const VERDICT_OPTIONS = [
  { value: 'все', label: 'Все' },
  { value: 'подходит', label: 'Подходит' },
  { value: 'частично', label: 'Частично' },
  { value: 'не соответствует', label: 'Не подходит' },
];

export const FilterByVerdict = memo(() => {
  const [_, setSearchParams] = useSearchParams();
  const selectVerdictFilter = useAppSelector((state) => state.filters.verdict);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (value && value !== 'все') {
          next.set('verdict', value);
        } else {
          next.delete('verdict');
        }

        next.set('page', '1');
        return next;
      },
      { replace: true }
    );
  };

  return (
    <div className={styles.container}>
      <label htmlFor={'filterByVerdict'} className={styles.title}>
        Фильтр по вердикту:
      </label>
      <select
        id={'filterByVerdict'}
        onChange={handleChange}
        value={selectVerdictFilter}
        className={styles.select}
      >
        {VERDICT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
});
