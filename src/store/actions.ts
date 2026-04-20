import { createAsyncThunk } from '@reduxjs/toolkit';
import candidatesMock from '@/mock/candidates-large.json';
import type { ICandidateRes } from './types';

export const fetchCandidatesAction = createAsyncThunk<
  ICandidateRes[],
  void,
  { rejectValue: string }
>('candidate/fetchCandidates', async (_, { rejectWithValue }) => {
  try {
    await new Promise((res) => setTimeout(res, 500));
    return candidatesMock;
  } catch {
    return rejectWithValue('Ошибка при получение данных кандидатов');
  }
});

export const fetchCandidateDetailAction = createAsyncThunk<
  ICandidateRes,
  { id: string },
  { rejectValue: string }
>('candidate/fetchCandidateDetail', async ({ id }, { rejectWithValue }) => {
  try {
    await new Promise((res) => setTimeout(res, 300));

    const candidate = candidatesMock.find((item) => item.id === id);

    if (!candidate) {
      return rejectWithValue('Такой кандидат не найдет');
    }

    return candidate as ICandidateRes;
  } catch {
    return rejectWithValue('Такой кандидат не найдет');
  }
});

export const updateCandidateStatusAction = createAsyncThunk<
  { id: string; status: string },
  { id: string; status: string; oldStatus: string },
  { rejectValue: string }
>('candidate/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.3) return reject(new Error());
        resolve(true);
      }, 1000);
    });

    return { id, status };
  } catch (error) {
    return rejectWithValue('Не удалось обновить статус. Попробуйте позже.');
  }
});
