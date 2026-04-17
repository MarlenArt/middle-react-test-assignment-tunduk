import { memo, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { selectTotalPages } from '@/store/selectorts.ts';
import { setCurrentPage } from '@/store/filtersSlice';
import { useSearchParams } from 'react-router';

import styles from './styles.module.scss';

export const Pagination = memo(() => {
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.filters.currentPage);
  const totalPages = useAppSelector(selectTotalPages);

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    dispatch(setCurrentPage(page));
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('page', String(page));
        return next;
      },
      { replace: true }
    );
  };

  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Навигация по страницам">
      <button
        className={styles.navBtn}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Назад
      </button>

      <ul className={styles.pageList}>
        {pages.map((page) => (
          <li key={page}>
            <button
              className={currentPage === page ? styles.active : ''}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        className={styles.navBtn}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Вперед
      </button>
    </nav>
  );
});
