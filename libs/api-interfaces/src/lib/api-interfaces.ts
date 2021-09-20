export interface FactPagination {
  current_page: number;
  data: Fact[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface Fact {
  fact: string;
  length: number;
}

export const emptyFact = {
  fact: '',
  length: 0,
};

export interface Link {
  url: number;
  label: string;
  active: boolean;
}
