import { screen, fireEvent, act } from '@testing-library/react';
import { useSearchParams } from 'react-router';
import { Sort } from '@/components/Sort';
import { renderWithProviders } from '@/utils/test-utils';

let currentParams: URLSearchParams;
const SearchParamsSpy = () => {
  [currentParams] = useSearchParams();
  return null;
};

describe('Sort Component', () => {
  test('должен устанавливать параметр сортировки в URL', async () => {
    renderWithProviders(
      <>
        <Sort />
        <SearchParamsSpy />
      </>
    );

    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'exp' } });

    await act(async () => {
      await Promise.resolve();
    });

    expect(currentParams.get('sort')).toBe('exp');
    expect(currentParams.get('page')).toBe('1');
  });
});
