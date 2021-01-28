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
import Button from '../../components/formik/Button';
import Layout from '../Layout';

interface IContentResponse {
  totalItems: number;
  totalPages: number;
  currentItems: number;
  prevPage: number | false;
  currentPage: number;
  nextPage: number | false;
  sectionTitle: string;
  data: IArticleItem[];
}

const Section: React.FC = () => {
  const { profileSlug, sectionSlug } = useParams<{
    profileSlug: string;
    sectionSlug: string;
  }>();
  const { search } = useLocation();
  const { push } = useHistory();
  const { addToast } = useToast();

  const { getProfile, profile, menuItems } = useProfile();
  const [contentTitle, setContentTitle] = useState('');
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
        .get<IContentResponse>(
          `/posts/user/${profile.id}/section/${sectionSlug}?page=${currentPage}`,
        )
        .then(responseContent => {
          const response = responseContent.data;
          setContentTitle(response.sectionTitle);
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
  }, [profile.id, sectionSlug, addToast, currentPage]);

  useLayoutEffect(() => {
    // const top = currentPage === 1 ? 0 : 320;
    const top = 300;
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
      <HeaderProfile data={profile} />
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
              <SEO
                title={`${profile.name}(${profile.number}) - ${contentTitle}`}
                author={profile.name}
                description={`${contentTitle} - Acompanhe ${profile.name}(${profile.number}) no portal #PorNavegantes`}
                image={profile.avatar_url}
              />
              <Title>{contentTitle}</Title>
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
      <BackToTop />
    </Layout>
  );
};

export default Section;
