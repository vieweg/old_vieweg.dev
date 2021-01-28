import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Masonry from 'react-masonry-component';
import FsLightbox from 'fslightbox-react';
import { FiClock } from 'react-icons/fi';

import Skeleton from 'react-loading-skeleton';
import api from '../../services/api';

import HeaderProfile from '../../components/HeaderProfile';
import Menu from '../../components/Menu';
import SEO from '../../components/SEO';

import ErroMessage from '../../components/ErrorMessage';
import { useToast } from '../../hooks/toast';

import { Container, Content, Title, Section } from './styles';
import ShareIt from '../../components/ShareIt';
import { useProfile } from '../../hooks/profile';
import BackToTop from '../../components/BackToTop';
import Layout from '../Layout';

interface IArticleItem {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  updated_at: string;
  formatedDate: string;
  premium_account: boolean;
  content: string;
  photos?: [
    {
      id: string;
      original_name?: string;
      description?: string;
      foto_url: string;
    },
  ];
}

const SketetonContent: React.FC = () => {
  return (
    <>
      <Section>
        <Skeleton width="100%" height="350px" />
        <br />
        <Title>
          <h1>
            <Skeleton width="80%" height="32px" />
          </h1>
          <span>
            <Skeleton width="110px" height="20px" />
          </span>
        </Title>
        <p>
          <Skeleton width="100%" count={5} />
        </p>
      </Section>
      <div>
        <Skeleton width="110px" height="20px" />
      </div>
    </>
  );
};

const Single: React.FC = () => {
  const { getProfile, profile, menuItems } = useProfile();

  const [article, setArticle] = useState<IArticleItem>({} as IArticleItem);
  const [mansoryElements, setMansoryElements] = useState<JSX.Element[]>([]);
  const [lightBoxSource, setlightBoxSource] = useState<string[]>([]);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  const [contentLoading, setContentLoading] = useState(true);
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [contentError, setContentError] = useState(false);
  const [imageIsError, setImageIsError] = useState(false);

  const { profileSlug, articleSlug } = useParams<{
    profileSlug: string;
    articleSlug: string;
  }>();

  const contentRef = useRef<HTMLDivElement>(null);

  const { addToast } = useToast();

  useEffect(() => {
    async function fetchProfile(slug: string): Promise<void> {
      await getProfile({ profileSlug: slug });
    }
    fetchProfile(profileSlug);
  }, [profileSlug, getProfile]);

  useEffect(() => {
    if (profile.id) {
      api
        .get<IArticleItem>(`/posts/user/${profile.id}/post/${articleSlug}`)
        .then(responseContent => {
          const item = responseContent.data;
          const formatedDate = format(
            parseISO(item.updated_at),
            "dd 'de ' MMMM 'de ' yyyy",
            { locale: pt },
          );
          setArticle({ ...item, formatedDate });
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
  }, [profile.id, articleSlug, addToast]);

  useMemo(() => {
    if (article.photos) {
      const urls = article.photos.map(photo => photo.foto_url);
      setlightBoxSource(urls);
    }
  }, [article.photos]);

  const openLightboxOnSlide = useCallback(
    position => {
      setLightboxController({
        toggler: !lightboxController.toggler,
        slide: position,
      });
    },
    [lightboxController],
  );

  useMemo(() => {
    if (article.photos) {
      const photos = article.photos.map((photo, index) => {
        return (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => openLightboxOnSlide(index + 1)}
            >
              <img
                src={photo.foto_url}
                title={photo.original_name}
                alt={photo.description}
              />
            </button>
          </li>
        );
      });
      setMansoryElements(photos);
    }
  }, [article.photos, openLightboxOnSlide]);

  useLayoutEffect(() => {
    if (!contentLoading && contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [contentLoading]);

  return (
    <Layout>
      <SEO
        title={`${article.title} - ${profile.name}(${profile.number})`}
        author={profile.name}
        description={`${article?.content}`}
        image={profile.avatar_url}
      />
      <HeaderProfile data={profile} />
      <Container ref={contentRef}>
        <Menu items={menuItems} position="left" />
        <Content>
          {contentError && (
            <ErroMessage
              title="Não foi possivel carregar este conteúdo!"
              message="Verifique sua internet e tente novamente."
            />
          )}
          {contentLoading && <SketetonContent />}
          {!contentLoading && !contentError && (
            <>
              <Section>
                {article.image_url && (
                  <>
                    {imageIsLoading && !imageIsError && (
                      <Skeleton width="100%" height="350px" />
                    )}
                    <img
                      src={article.image_url}
                      alt={article.title}
                      onLoad={() => setImageIsLoading(false)}
                      onError={() => setImageIsError(true)}
                      style={{ display: imageIsLoading ? 'none' : 'block' }}
                    />
                  </>
                )}
                <Title>
                  <h1>{article.title}</h1>
                  <span>
                    <FiClock />
                    {article.formatedDate}
                  </span>
                </Title>
                {article.content && <p>{article.content}</p>}
                {article.photos && article.photos.length > 0 && (
                  <>
                    <FsLightbox
                      toggler={lightboxController.toggler}
                      sources={lightBoxSource}
                      slide={lightboxController.slide}
                      type="image"
                    />
                    <div className="masonry">
                      <strong>Imagens relacionadas</strong>
                      <Masonry elementType="ul" updateOnEachImageLoad>
                        {mansoryElements}
                      </Masonry>
                    </div>
                  </>
                )}
              </Section>
              <ShareIt
                path={`/${profile.slug}/p/${article.slug}`}
                title={article.title}
              />
            </>
          )}
        </Content>
      </Container>
      <BackToTop />
    </Layout>
  );
};

export default Single;
