import api from '../../../services/api';

export interface ISection {
  id: string;
  title: string;
  order?: number;
  posts?: any[];
}

export interface ISortSections {
  sections: Omit<ISection, 'title'>[];
}

export async function fetchSectionsList(): Promise<ISection[]> {
  const response = await api.get('dashboard/sections');

  return response.data;
}

export async function fetchSectionCreate({
  title,
  order,
}: Omit<ISection, 'id'>): Promise<ISection> {
  const response = await api.post('dashboard/sections', { title, order });

  return response.data;
}

export async function fetchSectionUpdate({
  id,
  title,
}: ISection): Promise<ISection> {
  const response = await api.put(`/dashboard/sections/${id}`, { title });

  return response.data;
}

export async function fetchSectionSort({
  sections,
}: ISortSections): Promise<ISection[]> {
  const response = await api.post(`/dashboard/sections/sort`, { sections });

  return response.data;
}

export async function fetchSectionRemove({
  id,
}: Pick<ISection, 'id'>): Promise<void> {
  await api.delete(`/dashboard/sections/${id}`);
}
