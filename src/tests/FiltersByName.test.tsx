import { screen, fireEvent, act } from '@testing-library/react';
import { useSearchParams } from 'react-router';
import { FilterByName } from '@/components/FilterByName';
import { renderWithProviders } from '@/utils/test-utils';

let currentParams: URLSearchParams;
const SearchParamsSpy = () => {
  [currentParams] = useSearchParams();
  return null;
};

describe('FilterByName', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('должен обновлять Redux сразу, но URL только после задержки (debounce)', async () => {
    const { store } = renderWithProviders(
      <>
        <FilterByName />
        <SearchParamsSpy />
      </>
    );

    const input = screen.getByPlaceholderText('напишите имя');

    fireEvent.change(input, { target: { value: 'Мария' } });

    expect(store.getState().filters.name).toBe('Мария');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(currentParams.get('name')).toBe('Мария');
    expect(currentParams.get('page')).toBe('1');
  });
});
