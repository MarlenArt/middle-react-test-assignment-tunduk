export interface ICandidateRes {
  id: string;
  name: string;
  position: string;
  pos_label: string;
  file?: string;
  email: string;
  phone?: string | null;
  city?: string;
  tg: string;
  exp: string[][];
  total_exp: string;
  stack: string;
  edu: string;
  verdict: string;
  vc: string;
  criteria: string[][];
  summary: string;
  questions: string[];
  status: string;
  createdAt: string;
}

export interface IInitialStateCandidates {
  list: ICandidateRes[];
  filteredList: ICandidateRes[];
  listLoading: boolean;
  listError?: string | null;
  candidateDetail?: ICandidateRes | null;
  candidateLoading?: boolean;
  candidateError?: string | null;
  isUpdateLoading?: boolean;
  updateError?: string | null;
}

export interface IInitialStateFilters {
  name: string;
  verdict: string;
  sort: string;
  currentPage: number;
  itemsPerPage: number;
}

export type TSortOption = 'name' | 'date' | 'exp' | 'default';
