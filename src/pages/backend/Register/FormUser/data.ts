import api from '../../../../services/api';

export interface IProfile {
  id?: string;
  slug: string;
  role: 'guest' | 'user' | 'admin';
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
  password?: string;
  password_confirmation: string;
  socialLinks?: [
    {
      id: number;
      name: string;
      link: string;
    },
  ];
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
}

export async function updateProfile(
  data: Omit<IProfile, 'slug'>,
): Promise<IProfile> {
  const {
    id,
    email,
    role,
    name,
    message,
    number,
    candidate_for,
    candidate_vice,
    party,
    coalition,
    whatsapp,
    password,
    password_confirmation,
    facebook,
    instagram,
    twitter,
    youtube,
    linkedin,
  } = data;

  const socialLinks = [
    facebook && { name: 'facebook', link: facebook },
    instagram && { name: 'instagram', link: instagram },
    twitter && { name: 'twitter', link: twitter },
    youtube && { name: 'youtube', link: youtube },
    linkedin && { name: 'linkedin', link: linkedin },
  ];

  const formData = {
    name,
    number,
    email,
    role,
    candidate_for,
    ...(candidate_for === 'Prefeito'
      ? {
          candidate_vice,
        }
      : {}),
    party,
    coalition,
    whatsapp,
    message,
    socialLinks,
    ...(password
      ? {
          password,
          password_confirmation,
        }
      : {}),
  };
  let response;
  if (id && id !== null && id !== '') {
    response = await api.put<IProfile>(
      `/dashboard/register/users/${id}`,
      formData,
    );
  } else {
    response = await api.post<IProfile>('/dashboard/register/users/', formData);
  }

  return response.data;
}

export async function updateAvatar(
  file: File | undefined,
  id: string,
): Promise<IProfile> {
  const data = new FormData();
  try {
    if (file) {
      data.append('avatar', file);
    }
    const response = await api.patch(`/dashboard/register/users/${id}`, data);

    return response.data;
  } finally {
    if (file) {
      data.delete('avatar');
    }
  }
}

export async function getUser({ id }: { id: string }): Promise<IProfile> {
  const response = await api.get<IProfile>(`/dashboard/register/users/${id}`);
  return response.data;
}

export const partidos = [
  'AVANTE - AVANTE',
  'CIDADANIA - Cidadania',
  'DC - Democracia Cristã',
  'DEM - Democratas',
  'MDB - Movimento Democrático Brasileiro',
  'PATRIOTA - Patriota',
  'PDT - Partido Democrático Trabalhista',
  'PL - Partido Liberal',
  'PP - PROGRESSISTAS',
  'PRTB - Partido Renovador Trabalhista Brasileiro',
  'PSC - Partido Social Cristão',
  'PSD - Partido Social Democrático',
  'PSL - Partido Social Liberal',
  'PSOL - Partido Socialismo e Liberdade',
  'PT - Partido dos Trabalhadores',
  'REPUBLICANOS - REPUBLICANOS',
  'SOLIDARIEDADE - Solidariedade',
];
