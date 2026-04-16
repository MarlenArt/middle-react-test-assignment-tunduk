import { type ChangeEvent } from 'react';

import styles from './styles.module.scss';
import { useAppSelector } from '@/hooks/redux.ts';
import { useSearchParams } from 'react-router';

export const Sort = () => {
  const [_, setSearchParams] = useSearchParams();

  const selectedSortFilter = useAppSelector((state) => state.filters.sort);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value && value !== 'default') {
        next.set('sort', value);
      } else {
        next.delete('sort');
      }
      next.set('page', '1');
      return next;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>сортировка:</div>
      <select id="sort" onChange={handleChange} value={selectedSortFilter}>
        <option value="default">по умолчанию</option>
        <option value="name">по имени</option>
        <option value="exp">по опыту</option>
        <option value="date">по дате</option>
      </select>
    </div>
  );
};
