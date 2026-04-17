import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { selectTotalPages } from '@/store/selectorts.ts';
import { setCurrentPage } from '@/store/filtersSlice';

import styles from './styles.module.scss';
import { useSearchParams } from 'react-router';

export const Pagination = () => {
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.filters.currentPage);
  const totalPages = useAppSelector(selectTotalPages);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(page));
      return next;
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Назад
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={currentPage === page ? styles.active : ''}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Вперед
      </button>
    </div>
  );
};
