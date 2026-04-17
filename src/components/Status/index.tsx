import styles from './styles.module.scss';
import type { IStatusProps } from '@/components/Status/types.ts';

export const Status = ({ status }: IStatusProps) => {
  if (!status) return;

  return <div className={styles.status}>{status}</div>;
};
