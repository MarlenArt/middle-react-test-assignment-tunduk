import { createAsyncThunk } from "@reduxjs/toolkit";
import candidatesMock from "@/mock/candidates.json";
import type { ICandidateRes } from "./types";

export const fetchCandidatesAction = createAsyncThunk<
  ICandidateRes[],
  void,
  { rejectValue: string }
>("candidate/fetchCandidates", async (_, { rejectWithValue }) => {
  try {
    await new Promise((res) => setTimeout(res, 500));
    return candidatesMock;
  } catch {
    return rejectWithValue("Ошибка при получение данных кандидатов");
  }
});
