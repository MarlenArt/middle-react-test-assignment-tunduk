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
    <nav className={styles.pagination}>
      <button
        className={styles.nav_btn}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Назад
      </button>

      <div className={styles.page_list}>
        {pages.map((page) => (
          <button
            key={page}
            className={currentPage === page ? styles.active : ''}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.nav_btn}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Вперед
      </button>
    </nav>
  );
});
