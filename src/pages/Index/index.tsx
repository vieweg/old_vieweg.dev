import React, { useCallback, useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  IconButton,
  InputBase,
  Avatar,
  Container,
  Button,
} from '@material-ui/core';

import {
  FiFrown,
  FiList,
  FiSearch,
  FiStar,
  FiUser,
  FiUserCheck,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';
import { useToast } from '../../hooks/toast';
import Layout from '../Layout';
import CardItem from './cardItem';

import { IProfile, getCandidatos, getLastPosts, IPost } from './data';
import SEO from '../../components/SEO';
import BackToTop from '../../components/BackToTop';

const Index: React.FC = () => {
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingPrefeito, setLoadingPrefeito] = useState(true);
  const [loadingVereador, setLoadingVereador] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const [lastPosts, setLastPosts] = useState<IPost[]>([]);
  const [favoriteProfiles, setFavoriteProfiles] = useState<IProfile[]>(() => {
    const localFavorites = localStorage.getItem('@PorNavegantes:favorites');
    if (localFavorites) {
      return JSON.parse(localFavorites) as IProfile[];
    }
    return [] as IProfile[];
  });
  const [findProfiles, setFindProfiles] = useState<IProfile[]>([]);
  const [vereadores, setVereadores] = useState<IProfile[]>([]);
  const [prefeitos, setPrefeitos] = useState<IProfile[]>([]);

  const { addToast } = useToast();
  const classes = useStyles();

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const responsePosts = await getLastPosts(5);
        setLastPosts(responsePosts.data);
        setLoadingPost(false);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao processar sua solicitação',
        });
      } finally {
        setLoadingPost(false);
      }
    }
    getData();
  }, [addToast]);

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const responsePrefeitos = await getCandidatos({
          search: 'prefeito',
          per_page: 500,
        });
        setPrefeitos(responsePrefeitos.data);
        setLoadingPrefeito(false);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro ao processar sua solicitação',
        });
      } finally {
        setLoadingPrefeito(false);
      }
    }
    getData();
  }, [addToast]);

  const loadVereadores = useCallback(async () => {
    setLoadingVereador(true);
    try {
      const responseVereadores = await getCandidatos({
        search: 'vereador',
        per_page: 500,
        page: 1,
      });
      setVereadores(responseVereadores.data);
      setLoadingVereador(false);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao processar sua solicitação',
      });
    } finally {
      setLoadingVereador(false);
    }
  }, [addToast]);

  const handleSearch = useCallback(
    async e => {
      e.preventDefault();
      const findUsers = await getCandidatos({ search: inputSearch });
      setFindProfiles(findUsers.data);
    },
    [inputSearch],
  );

  const toggleFavorite = useCallback(
    (profile: IProfile) => {
      const newFavoriteProfiles = [] as IProfile[];
      const favoriteIndex = favoriteProfiles.findIndex(
        favoriteProfile => favoriteProfile.id === profile.id,
      );
      if (favoriteIndex >= 0) {
        favoriteProfiles.splice(favoriteIndex, 1);
        Object.assign(newFavoriteProfiles, [...favoriteProfiles]);
        setFindProfiles(
          findProfiles.map(findProfile => {
            if (findProfile.id === profile.id) {
              Object.assign(findProfile, { isFavorite: false });
            }
            return findProfile;
          }),
        );
      } else {
        Object.assign(profile, { isFavorite: true });
        Object.assign(newFavoriteProfiles, [...favoriteProfiles, profile]);
      }
      setFavoriteProfiles(newFavoriteProfiles);
      localStorage.setItem(
        '@PorNavegantes:favorites',
        JSON.stringify(newFavoriteProfiles),
      );
    },
    [favoriteProfiles, findProfiles],
  );

  const renderSearchField = useCallback(() => {
    return (
      <Grid item xs={12} className={classes.search}>
        <Box padding="80px 0" marginBottom={5}>
          <Box marginBottom={1} textAlign="center" fontSize={22} color="#fff">
            <b>LOCALIZE SEU CANDIDATO</b>
          </Box>
          <form className={classes.inputSearch} onSubmit={e => handleSearch(e)}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <FiUser />
            </IconButton>
            <InputBase
              className={classes.input}
              value={inputSearch}
              onChange={e => setInputSearch(e.target.value)}
              placeholder="Nome, numero, partido,..."
              inputProps={{ 'aria-label': 'Nome, numero, partido,...' }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <FiSearch />
            </IconButton>
          </form>
        </Box>
      </Grid>
    );
  }, [classes, inputSearch, handleSearch]);

  const renderSearchResult = useCallback(() => {
    if (findProfiles.length > 0) {
      return (
        <Grid item xs={12}>
          <div className={classes.wrapperCard}>
            {findProfiles.map(profile => (
              <CardItem
                profile={profile}
                key="search"
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </Grid>
      );
    }
    return null;
  }, [classes, findProfiles, toggleFavorite]);

  const renderVereadores = useCallback(() => {
    if (!loadingVereador) {
      return (
        vereadores.length > 0 &&
        vereadores.map(profile => (
          <CardItem
            profile={profile}
            key={`vereador-${profile.id}`}
            toggleFavorite={toggleFavorite}
          />
        ))
      );
    }
    return null;
  }, [vereadores, loadingVereador, toggleFavorite]);

  const renderPrefeitos = useCallback(() => {
    if (!loadingPrefeito) {
      return (
        prefeitos.length > 0 &&
        prefeitos.map(profile => (
          <CardItem
            profile={profile}
            key={`prefeito-${profile.id}`}
            toggleFavorite={toggleFavorite}
          />
        ))
      );
    }
    return null;
  }, [prefeitos, loadingPrefeito, toggleFavorite]);

  const renderFavorites = useCallback(() => {
    return (
      <Grid item container direction="column" xs={12} spacing={1}>
        <Grid
          item
          container
          spacing={1}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <FiStar size={22} color="#3c89b5" />
          </Grid>
          <Grid item>
            <Box color="#3c89b5">
              <Typography variant="h5">Meus Favoritos</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container item>
          <Box width="100%" mt={4}>
            <div className={classes.wrapperCard}>
              {favoriteProfiles.length > 0 ? (
                favoriteProfiles.map(profile => (
                  <CardItem
                    profile={profile}
                    key={`favorite-${profile.id}`}
                    toggleFavorite={toggleFavorite}
                  />
                ))
              ) : (
                <Box textAlign="center" color="#999" fontSize="1rem">
                  <FiUserCheck size={42} style={{ marginBottom: '10px' }} />
                  <Typography>
                    Clique na
                    <FiStar />
                    para adicionar seu candidato aos favoritos.
                  </Typography>
                </Box>
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
    );
  }, [classes, favoriteProfiles, toggleFavorite]);

  const renderNewsItem = useCallback(
    (post: IPost) => {
      return (
        <Link
          key={post.id}
          to={`/${post.user.slug}/p/${post.slug}`}
          title="Ver postagem"
        >
          <div className={classes.itemNews}>
            <div className={classes.itemNewsAvatar}>
              <Avatar alt={post.user.name} src={post.user.avatar_url} />
            </div>
            <div className={classes.itemNewsContent}>
              <div>{post.title}</div>
              <ul className={classes.itemNewsDetails}>
                <li>{`${post.user.name} (${post.user.number})`}</li>
                <li>|</li>
                <li>{post.formatedDate}</li>
              </ul>
            </div>
          </div>
        </Link>
      );
    },
    [classes],
  );

  const renderNews = useCallback(() => {
    if (!loadingPost) {
      return lastPosts.length > 0 ? (
        lastPosts.map(item => renderNewsItem(item))
      ) : (
        <Box textAlign="center" p={9} color="#999" fontSize="1rem">
          <FiFrown size={42} style={{ marginBottom: '18px' }} />
          <Typography>Sem novidades por enquanto!</Typography>
        </Box>
      );
    }
    return null;
  }, [renderNewsItem, lastPosts, loadingPost]);

  return (
    <Layout>
      <Container>
        <Box mb={8} px={2}>
          <Grid container spacing={8}>
            {renderSearchField()}
            {renderSearchResult()}
            <Grid
              container
              direction="row"
              spacing={2}
              style={{ marginTop: '25px' }}
            >
              <Grid item xs={12} md={7}>
                {renderFavorites()}
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems="center"
                  xs={12}
                  spacing={1}
                >
                  <Grid
                    item
                    container
                    spacing={1}
                    xs={12}
                    direction="row"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item>
                      <FiList size={22} color="#3c89b5" />
                    </Grid>
                    <Grid item>
                      <Box color="#3c89b5">
                        <Typography variant="h5">
                          Últimas atualizações
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Box width="100%" mt={4}>
                      {renderNews()}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" xs={12} spacing={1}>
              <Grid
                item
                container
                spacing={1}
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <FiStar size={22} color="#3c89b5" />
                </Grid>
                <Grid item>
                  <Box color="#3c89b5">
                    <Typography variant="h5">Candidatos a Prefeito</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item>
                <Box width="100%" mt={4}>
                  <div className={classes.wrapperCard}>{renderPrefeitos()}</div>
                </Box>
              </Grid>
            </Grid>
            <Grid item container direction="column" xs={12} spacing={1}>
              <Grid
                item
                container
                spacing={1}
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <FiStar size={22} color="#3c89b5" />
                </Grid>
                <Grid item>
                  <Box color="#3c89b5">
                    <Typography variant="h5">Candidatos a Vereador</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item>
                <Box width="100%" mt={4}>
                  <div className={classes.wrapperCard}>
                    {vereadores.length > 0 ? (
                      renderVereadores()
                    ) : (
                      <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        onClick={loadVereadores}
                      >
                        {loadingVereador
                          ? 'Carregando...'
                          : 'Carregar candidatos a vereador'}
                      </Button>
                    )}
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <BackToTop />
      <SEO
        title="#PorNavegantes :: Acompanhe os candidatos de Navegantes"
        author="#PorNavegantes"
        description="Acompanhe os candidatos de Navegantes"
        image=""
      />
    </Layout>
  );
};

export default Index;
