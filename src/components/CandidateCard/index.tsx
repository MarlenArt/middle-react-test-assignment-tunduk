import type { ICandidateCardProps } from './types.ts';

import styles from './styles.module.scss';
import { useNavigate } from 'react-router';

export const CandidateCard = ({ card }: Readonly<ICandidateCardProps>) => {
  const navigate = useNavigate();

  const onClickCard = () => {
    navigate(`/product/${card.id}`);
  };
  return (
    <div className={styles.card} onClick={onClickCard}>
      <div className={styles.card_item}>
        <div className={styles.card_item__label}>ФИО: &ensp;</div>
        <div className={styles.card_item__value}>{card.name}</div>
      </div>
      <div className={styles.card_item}>
        <div className={styles.card_item__label}>Город: &ensp;</div>
        <div className={styles.card_item__value}>{card.city}</div>
      </div>
      <div className={styles.card_item}>
        <div className={styles.card_item__label}>Общий опыт: &ensp;</div>
        <div className={styles.card_item__value}>{card.total_exp}</div>
      </div>
      <div className={styles.card_item}>
        <div className={styles.card_item__label}>Стэк: &ensp;</div>
        <div className={styles.card_item__value}>{card.stack}</div>
      </div>
      <div className={styles.card_item}>
        <div className={styles.card_item__label}>Дата: &ensp;</div>
        <div className={styles.card_item__value}>{card.createdAt}</div>
      </div>
      <div className={styles.card_item}>
        <div className={styles.card_item__label}>Вердикт: &ensp;</div>
        <div
          className={styles.card_item__value}
          style={{ backgroundColor: card.vc.split('-')[1] }}
        >
          {card.verdict}
        </div>
      </div>
      <div className={styles.card_item}>
        <div className={styles.card_item__label}>status: &ensp;</div>
        <div>{card?.status}</div>
      </div>
    </div>
  );
};
