import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';

export interface IProfile {
  id: string;
  slug: string;
  name: string;
  party: string;
  number: string;
  candidate_for: string;
  candidate_vice?: string;
  avatar_url?: string;
  premium_account?: boolean;
  role: string;
  isFavorite?: boolean;
  hasNews?: boolean;
}

export interface IPost {
  id: string;
  title: string;
  slug: string;
  user: {
    slug: string;
    avatar_url: string;
    name: string;
    number: string;
  };
  created_at: string;
  formatedDate: string;
}

interface IResponseCadidatos {
  data: IProfile[];
  update_at?: number;
}

interface IResponsePosts {
  data: IPost[];
}

type GetProps = {
  [key: string]: any;
};

export async function getCandidatos(
  condictions: GetProps,
): Promise<IResponseCadidatos> {
  /* const localItems = localStorage.getItem(
    `@PorNavegantes:${JSON.stringify(condictions)}`,
  );
  if (localItems) {
    const storage = JSON.parse(localItems) as IResponseCadidatos;
    if (
      storage.update_at &&
      differenceInMinutes(Date.now(), storage.update_at) < 30
    ) {
      return storage;
    }
  } */

  const response = await api.get<IResponseCadidatos>('/users', {
    params: { ...condictions },
  });

  const data = response.data.data.filter(
    user => user.slug !== 'modelo-completo',
  );

  const formattedData = data.map(user => {
    const premium_account = user.role === 'user';
    return { ...user, premium_account };
  });

  response.data.data = formattedData;

  /* response.data.update_at = Date.now();
  localStorage.setItem(
    `@PorNavegantes:${JSON.stringify(condictions)}`,
    JSON.stringify(response.data),
  ); */

  return response.data;
}

export async function getLastPosts(qtd: number): Promise<IResponsePosts> {
  const response = await api.get<IResponsePosts>('/posts', {
    params: { per_page: qtd },
  });
  const posts = response.data.data.filter(
    post => post.user.slug !== 'modelo-completo',
  );

  const formatedPosts = posts.map(post => {
    const formatedDate = format(
      parseISO(post.created_at),
      "dd'/'MM'/'yy HH:mm",
      {
        locale: pt,
      },
    );
    return { ...post, formatedDate };
  });

  response.data.data = formatedPosts;
  return response.data;
}
