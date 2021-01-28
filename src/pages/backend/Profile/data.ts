import api from '../../../services/api';

export interface IProfile {
  id: string;
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
  old_password: string;
  password_confirmation: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  linkedin: string;
}

export async function updateProfile(
  data: Omit<IProfile, 'slug' | 'id' | 'email' | 'role'>,
): Promise<IProfile> {
  const {
    name,
    message,
    number,
    candidate_for,
    candidate_vice,
    party,
    coalition,
    whatsapp,
    password,
    old_password,
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
    ...(old_password
      ? {
          old_password,
          password,
          password_confirmation,
        }
      : {}),
  };

  const response = await api.put('/dashboard/profile', formData);

  return response.data;
}

export async function updateAvatar(file: File | undefined): Promise<IProfile> {
  const data = new FormData();
  try {
    if (file) {
      data.append('avatar', file);
    }
    const response = await api.patch(`/dashboard/profile/avatar`, data);

    return response.data;
  } finally {
    if (file) {
      data.delete('avatar');
    }
  }
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
