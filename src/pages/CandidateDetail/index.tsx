import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { type ChangeEvent, useEffect, useMemo } from 'react';
import {
  fetchCandidateDetailAction,
  updateCandidateStatusAction,
} from '@/store/actions.ts';

import styles from './styles.module.scss';
import { setCandidateDetail } from '@/store/candidateSlice.ts';
import { Status } from '@/components/Status';
import { toast } from 'react-toastify';

export const CandidateDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    candidateDetail: candidate,
    candidateLoading,
    list,
  } = useAppSelector((state) => state.candidate);

  useEffect(() => {
    const candidateInList = list.find((item) => item.id === String(id));
    console.log({ candidateInList });
    if (candidateInList) {
      dispatch(setCandidateDetail(candidateInList));
    } else {
      dispatch(fetchCandidateDetailAction({ id: String(id) }));
    }
  }, [id, dispatch, list]);

  const handleBackBtn = () => {
    navigate(-1);
    dispatch(setCandidateDetail(null));
  };

  if (candidateLoading) return <h1>Загрузка...</h1>;
  if (!candidate) return <h1>Кандидат не найден</h1>;

  const options = useMemo(
    () => [
      { label: 'Новый', key: 'new' },
      { label: 'На рассмотрении', key: 'review' },
      { label: 'Приглашён', key: 'invited' },
      { label: 'Отклонён', key: 'rejected' },
    ],
    []
  );

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    const updatePromise = dispatch(
      updateCandidateStatusAction({
        id: candidate.id,
        status: value,
        oldStatus: candidate.status,
      })
    ).unwrap();

    toast.promise(updatePromise, {
      pending: 'Обновление статуса...',
      success: 'Статус успешно изменен!',
      error: 'Ошибка при обновлении',
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={handleBackBtn}>
          Назад к списку
        </button>
        <select
          onChange={handleChangeStatus}
          value={candidate?.status.split('-')[0].trim()}
        >
          {options.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </select>
        <div className={styles.main_info}>
          <h1>{candidate.name}</h1>
          <p className={styles.pos_label}>{candidate.pos_label}</p>
          <div
            style={{ backgroundColor: candidate.vc.split('-')[1] }}
            className={styles.verdict_badge}
          >
            {candidate.verdict}
          </div>
        </div>
        <Status status={candidate.status} />
      </header>

      <main className={styles.grid}>
        <section className={styles.section}>
          <h3>Контакты</h3>
          <ul className={styles.contacts_list}>
            <li>
              <span>Город:</span> {candidate.city}
            </li>
            <li>
              <span>Почта:</span> {candidate.email}
            </li>
            <li>
              <span>Телефон:</span> {candidate.phone}
            </li>
            <li>
              <span>Телеграм:</span> {candidate.tg}
            </li>
          </ul>

          <div className={styles.section}>
            <h3>Стек технологий</h3>
            <div className={styles.tags}>
              {candidate.stack.split(', ').map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3>Образование: </h3>
            <p>{candidate.edu}</p>
          </div>
        </section>

        <section className={styles.section}>
          <h3>Опыт работы (Всего: {candidate.total_exp})</h3>
          <div className={styles.exp_timeline}>
            {candidate.exp.map(([period, company, role, duration], index) => (
              <div key={index} className={styles.expItem}>
                <div className={styles.exp_meta}>
                  <div className={styles.period}>Период: {period}</div>
                  <div className={styles.duration}>
                    Длительность: {duration}
                  </div>
                </div>
                <div className={styles.exp_details}>
                  <div>Компания:{company}</div>
                  <div>Роль:{role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3>Критерии оценки</h3>
          <div className={styles.criteriaList}>
            {candidate.criteria.map(([status, description], index) => (
              <div
                key={index}
                className={`${styles.criteria_item} ${styles[status]}`}
              >
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3>Summary</h3>
          <div className={styles.summaryBox}>{candidate.summary}</div>
        </section>

        <section className={styles.section}>
          <h3>Вопросы для собеседования</h3>
          <ul className={styles.questions_list}>
            {candidate.questions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};
