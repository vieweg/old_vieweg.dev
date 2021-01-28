import api from '../../../services/api';

export interface ILink {
  id: string;
  title: string;
  url: string;
  views?: number;
  order?: number;
}

export interface ISortLinks {
  links: Omit<ILink, 'title' | 'url'>[];
}

export async function fetchLinksList(): Promise<ILink[]> {
  const response = await api.get('dashboard/links');

  return response.data;
}

export async function fetchLinkCreate({
  title,
  url,
  order,
}: Omit<ILink, 'id'>): Promise<ILink> {
  const response = await api.post('dashboard/links', { title, url, order });

  return response.data;
}

export async function fetchLinkUpdate({
  id,
  title,
  url,
}: ILink): Promise<ILink> {
  const response = await api.put(`/dashboard/links/${id}`, { title, url });

  return response.data;
}

export async function fetchLinkSort({ links }: ISortLinks): Promise<ILink[]> {
  const response = await api.post(`/dashboard/links/sort`, { links });

  return response.data;
}

export async function fetchLinkRemove({
  id,
}: Pick<ILink, 'id'>): Promise<void> {
  await api.delete(`/dashboard/links/${id}`);
}
