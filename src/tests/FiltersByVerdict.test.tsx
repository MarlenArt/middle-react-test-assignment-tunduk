import { screen, fireEvent, act } from '@testing-library/react';
import { FilterByVerdict } from '@/components/FilterByVerdict';
import { renderWithProviders } from '@/utils/test-utils';
import { setVerdictFilter } from '@/store/filtersSlice.ts';

describe('FilterByVerdict', () => {
  test('должен изменять значение селекта', () => {
    const { store } = renderWithProviders(<FilterByVerdict />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'подходит' } });

    act(() => {
      store.dispatch(setVerdictFilter('подходит'));
    });

    expect(select).toHaveValue('подходит');
  });

  test('должен удалять параметр из URL, если выбрано "Все"', () => {
    renderWithProviders(<FilterByVerdict />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'все' } });

    expect(window.location.search).not.toContain('verdict=');
  });
});
