import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../../services/api';

export interface ISection {
  title: string;
  id: string;
}

export interface IPhoto {
  id: string;
  name?: string;
  original_name?: string;
  description?: string;
  foto_url: string;
}

export interface IPost {
  id: string;
  title: string;
  active: boolean;
  views: number;
  slug: string;
  content?: string;
  image?: string;
  image_url?: string;
  section?: {
    id: string;
    title: string;
  };
  photos: IPhoto[];
  user: {
    slug: string;
  };
  created_at: string;
  formatedDate: string;
}

interface IContentResponse {
  totalItems: number;
  totalPages: number;
  currentItems: number;
  prevPage: number | false;
  currentPage: number;
  nextPage: number | false;
  data: IPost[];
}

interface IFetchPostsProps {
  page?: number;
  perPage?: number;
  active?: string;
  search?: string;
  sortField?: string;
  sortDir?: string;
}

export interface IFetchPostSave {
  id?: string;
  title: string;
  active: boolean;
  content: string;
  section: {
    value: string;
    label: string;
  };
}

export async function fetchAllPosts({
  page = 1,
  perPage = 10,
  sortField = 'created_at',
  sortDir = 'ASC',
  active,
  search,
}: IFetchPostsProps): Promise<IContentResponse> {
  const response = await api.get<IContentResponse>(
    `dashboard/posts?${
      active !== undefined ? `active=${active}&` : ``
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

export async function fetchPostRemove({
  id,
}: Pick<IPost, 'id'>): Promise<void> {
  await api.delete(`dashboard/posts/${id}`);
}

export async function fetchPost({ id }: Pick<IPost, 'id'>): Promise<IPost> {
  const response = await api.get(`dashboard/posts/${id}`);

  return response.data;
}

export async function fetchPostSave({
  id,
  title,
  active,
  content,
  section,
}: IFetchPostSave): Promise<IPost> {
  let response;
  if (id !== undefined) {
    response = await api.put<IPost>(`dashboard/posts/${id}`, {
      title,
      active,
      content,
      ...(section.value ? { section: section.value } : {}),
    });
  } else {
    response = await api.post<IPost>(`dashboard/posts`, {
      title,
      active,
      content,
      ...(section.value ? { section: section.value } : {}),
    });
  }

  return response.data;
}

export async function fetchSections(): Promise<ISection[]> {
  const response = await api.get('dashboard/sections');

  return response.data;
}

export async function fetchSendFile(
  idPost: string,
  file: File,
): Promise<IPhoto | false> {
  const data = new FormData();
  try {
    data.append('photo', file);
    const response = await api.post(`/dashboard/posts/photo/${idPost}`, data);

    return response.data;
  } catch (err) {
    console.log(err.response.error);
    return false;
  } finally {
    data.delete('photo');
  }
}

export async function fetchRemoveFile(idPhoto: string): Promise<void> {
  await api.delete(`/dashboard/posts/photo/${idPhoto}`);
}

export async function fetchImagePost(
  idPost: string,
  file: File | undefined,
): Promise<IPost> {
  const data = new FormData();
  try {
    if (file) {
      data.append('image', file);
    }
    const response = await api.patch(`/dashboard/posts/photo/${idPost}`, data);

    return response.data;
  } finally {
    if (file) {
      data.delete('image');
    }
  }
}
