import styles from './styles.module.scss';
import { useAppSelector } from '@/hooks/redux.ts';
import type { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router';

export const FilterByVerdict = () => {
  const [_, setSearchParams] = useSearchParams();

  const selectVerdictFilter = useAppSelector((state) => state.filters.verdict);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value && value !== 'все') next.set('verdict', value);
      else next.delete('verdict');
      return next;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>фильтр по вердикту:</div>
      <select onChange={handleChange} value={selectVerdictFilter}>
        <option value="все">Все</option>
        <option value="подходит">Подходит</option>
        <option value="частично">Частично</option>
        <option value="не соответствует">Не подходит</option>
      </select>
    </div>
  );
};
