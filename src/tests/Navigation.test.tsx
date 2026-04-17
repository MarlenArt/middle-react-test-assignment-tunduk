import { screen, fireEvent } from '@testing-library/react';
import { Route, Routes } from 'react-router';
import { renderWithProviders } from '@/utils/test-utils';
import { CandidatesList } from '@/pages/CandidatesList';
import { CandidateDetail } from '@/pages/CandidateDetail';
import type { ICandidateRes } from '@/store/types.ts';

const TestApp = () => (
  <Routes>
    <Route path="/" element={<CandidatesList />} />
    <Route path="/candidate/:id" element={<CandidateDetail />} />
  </Routes>
);

describe('Интеграция: Навигация', () => {
  const mockCandidate: ICandidateRes = {
    id: '123',
    name: 'Иван Иванов',
    position: 'Frontend Developer',
    status: 'new',
    verdict: 'подходит',
    vc: 'bg-green-500',
    stack: 'React, TypeScript, Redux',
    exp: [
      ['2020-2024', 'Google', 'Senior Developer', '4 года'],
      ['2019-2020', 'Startup', 'Junior Developer', '1 год'],
    ],
    criteria: [
      ['success', 'Технические навыки соответствуют'],
      ['warning', 'Требуется подтянуть английский'],
    ],
    pos_label: 'React — ведущий программист',
    email: 'ivanov@email.com',
    tg: '@ivanov_dev',
    total_exp: '~3.5 г',
    summary: 'Фронтенд-разработчик с опытом React 3 года.',
    city: 'Бишкек',
    edu: 'КНУ, Информатика, 2020',
    questions: [
      'Redux Toolkit — какой опыт работы?',
      'Next.js — готовы ли изучать?',
    ],
    createdAt: '',
  };

  test('переход из списка в детальную карточку при клике на кандидата', async () => {
    renderWithProviders(<TestApp />, {
      preloadedState: {
        candidate: {
          list: [mockCandidate],
          filteredList: [mockCandidate],
          listLoading: false,
        },
        filters: {
          name: '',
          sort: '',
          verdict: '',
          currentPage: 1,
          itemsPerPage: 10,
        },
      },
      initialEntries: ['/'],
    });

    const candidateName = screen.getByText('Иван Иванов');
    fireEvent.click(candidateName);

    // Теперь, когда данные полные, страница не упадет
    const detailHeader = await screen.findByRole('heading', {
      name: 'Иван Иванов',
    });

    expect(detailHeader).toBeInTheDocument();
  });
});
