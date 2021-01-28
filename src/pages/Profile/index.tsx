import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';

import HeaderProfile from '../../components/HeaderProfile';
import Menu from '../../components/Menu';
import Card, { SkeletonCard, IArticleItem } from '../../components/Card';
import ErroMessage from '../../components/ErrorMessage';
import BackToTop from '../../components/BackToTop';
import SEO from '../../components/SEO';

import { useProfile } from '../../hooks/profile';
import { useToast } from '../../hooks/toast';

import { Container, Content, Title } from './styles';
import Layout from '../Layout';

import Button from '../../components/formik/Button';

interface IContentResponse {
  totalItems: number;
  totalPages: number;
  currentItems: number;
  prevPage: number | false;
  currentPage: number;
  nextPage: number | false;
  data: IArticleItem[];
}

const Profile: React.FC = () => {
  const { profileSlug } = useParams<{ profileSlug: string }>();
  const { search } = useLocation();
  const { push } = useHistory();
  const { addToast } = useToast();

  const { getProfile, profile, menuItems } = useProfile();

  const [contentItems, setContentItems] = useState<IContentResponse>(
    {} as IContentResponse,
  );

  const useQuery = useCallback(() => {
    return new URLSearchParams(search);
  }, [search]);

  const query = useQuery();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(query.get('page')) || 1,
  );
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState(false);

  useEffect(() => {
    async function fetchProfile(slug: string): Promise<void> {
      await getProfile({ profileSlug: slug });
    }

    fetchProfile(profileSlug);
  }, [profileSlug, getProfile]);

  useEffect(() => {
    const page = Number(query.get('page')) || 1;
    if (Number(page) !== currentPage) {
      setCurrentPage(page);
    }
  }, [query, currentPage]);

  useEffect(() => {
    if (profile.id) {
      setContentLoading(true);
      api
        .get<IContentResponse>(`/posts/user/${profile.id}?page=${currentPage}`)
        .then(responseContent => {
          const response = responseContent.data;
          const formatedArticleItems = response.data.map(item => {
            const formatedDate = format(
              parseISO(item.updated_at),
              "dd 'de ' MMMM 'de ' yyyy",
              { locale: pt },
            );
            return {
              ...item,
              formatedDate,
            };
          });
          setContentItems({ ...response, data: formatedArticleItems });
        })
        .catch(() => {
          setContentError(true);
          addToast({
            title: 'Erro ao buscar o conteúdo do servidor',
            type: 'error',
          });
        })
        .finally(() => setContentLoading(false));
    }
  }, [profile.id, addToast, currentPage]);

  useLayoutEffect(() => {
    const top = 320;
    if (!contentLoading) {
      window.scrollTo({ behavior: 'smooth', top });
    }
  }, [contentLoading, currentPage]);

  const handleNextPage = useCallback(() => {
    if (contentItems.nextPage) {
      push(`${window.location.pathname}?page=${contentItems.nextPage}`);
    }
  }, [contentItems.nextPage, push]);

  const handlePrevPage = useCallback(() => {
    if (contentItems.prevPage) {
      push(`${window.location.pathname}?page=${contentItems.prevPage}`);
    }
  }, [contentItems.prevPage, push]);

  return (
    <Layout>
      <SEO
        title={`Santinho Virtual - ${profile.name}(${profile.number})`}
        author={profile.name}
        description={`Acompanhe ${profile.name}(${profile.number}) no portal #PorNavegantes -> ${profile?.message}`}
        image={profile.avatar_url}
      />
      <HeaderProfile data={profile} />
      {profile.role === 'user' ? (
        <Container>
          <Menu items={menuItems} position="left" />
          <Content>
            {contentError && (
              <ErroMessage
                title="Não foi possivel carregar este conteúdo!"
                message="Verifique sua internet e tente novamente."
              />
            )}
            {contentLoading && <SkeletonCard />}
            {!contentLoading && !contentError && (
              <>
                <Title>Últimas Atualizações</Title>
                {contentItems.data.length === 0 && (
                  <div id="empty">Sem registros para exibir</div>
                )}
                {contentItems.data.map(item => (
                  <Card key={item.id} data={item} />
                ))}
              </>
            )}
            <div>
              {!!contentItems.prevPage && (
                <Button
                  onClick={handlePrevPage}
                  loading={contentLoading}
                  style={{
                    background: '#282a36',
                    width: 'none',
                    float: 'left',
                    borderRadius: '10px',
                  }}
                >
                  Mais recentes
                </Button>
              )}
              {!!contentItems.nextPage && (
                <Button
                  onClick={handleNextPage}
                  loading={contentLoading}
                  style={{
                    background: '#282a36',
                    width: 'none',
                    float: 'right',
                    borderRadius: '10px',
                  }}
                >
                  Mais Antigas
                </Button>
              )}
            </div>
          </Content>
        </Container>
      ) : (
        <Container>
          <div style={{ width: '85%', margin: '0 auto', textAlign: 'center' }}>
            <ErroMessage
              title="Você candidato, gostaria de adicionar conteúdo nesta página?"
              message="Mantenha sua campanha organizada por categorias, diponibilize seu plano de governo, fotos, jingles...Enfim, seu SANTINHO VIRTUAL TURBINADO!"
            />
            <br />
            <h4>Interessado(a)?</h4>
            <br />
            <br />
            Entre em contato pelo whats 47 9 9993 2802,
            <a
              href="https://wa.me/5547999932802"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              ou CLIQUE AQUI
            </a>
            <br />
            Ativação em minutos, por um preço justo!
          </div>
        </Container>
      )}
      <BackToTop />
    </Layout>
  );
};

export default Profile;
