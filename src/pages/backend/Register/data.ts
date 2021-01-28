import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../../services/api';

export interface UserProps {
  id: string;
  slug: string;
  name: string;
  email: string;
  message?: string;
  number: string;
  candidate_for: 'Prefeito' | 'Vereador';
  candidate_vice?: string;
  party: string;
  coalition?: string;
  whatsapp?: string;
  avatar_url?: string;
  role: 'guest' | 'user' | 'admin';
  socialLinks?: [
    {
      id: number;
      name: string;
      link: string;
    },
  ];
  created_at: string;
  updated_at: string;
}

interface IContentResponse {
  totalItems: number;
  totalPages: number;
  currentItems: number;
  prevPage: number | false;
  currentPage: number;
  nextPage: number | false;
  data: UserProps[];
}

interface IFetchProps {
  page?: number;
  perPage?: number;
  role?: string;
  search?: string;
  sortField?: string;
  sortDir?: string;
}

export async function fetchAllUsers({
  page = 1,
  perPage = 10,
  sortField = 'created_at',
  sortDir = 'ASC',
  role,
  search,
}: IFetchProps): Promise<IContentResponse> {
  const response = await api.get<IContentResponse>(
    `dashboard/register/users?${
      role !== undefined ? `role=${role}&` : ``
    }page=${page}&per_page=${perPage}&sort_field=${sortField}&sort_dir=${sortDir}${
      search && `&search=${search}`
    }`,
  );

  const formatedData = response.data.data.map(item => {
    const formated_date = format(
      parseISO(item.created_at),
      "dd'/'MM'/'yy HH:mm",
      {
        locale: pt,
      },
    );
    return { ...item, formated_date };
  });

  Object.assign(response.data.data, formatedData);
  return response.data;
}

export async function fetchUserRemove({
  id,
}: Pick<UserProps, 'id'>): Promise<void> {
  await api.delete(`dashboard/register/users/${id}`);
}
