import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FiExternalLink, FiEye, FiEyeOff } from 'react-icons/fi';
import {
  Paper,
  Grid,
  InputBase,
  IconButton,
  Button,
  Box,
  makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Formik, Form } from 'formik';

import { useToast } from '../../../hooks/toast';
import { useTheme } from '../../../hooks/theme';

import Layout from '../layout';

import { TableTitle, Spinner, SearchResult } from './styles';
import { fetchAllPosts, fetchPostRemove, IPost } from './data';
import ErroMessage from '../../../components/ErrorMessage';
import Dialog from '../../../components/Dialog';
import Tooltip from '../../../components/Tooltip';

const useStyles = makeStyles(theme => ({
  actionButtom: {
    [theme.breakpoints.down(415)]: {
      marginBottom: theme.spacing(2),
    },
  },
}));

const Post: React.FC = () => {
  const { addToast } = useToast();
  const { isDark } = useTheme();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortField, setSortField] = useState('post.created_at');
  const [sortDir, setSortDir] = useState<'DESC' | 'ASC'>('DESC');
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<'TRUE' | 'FALSE' | undefined>('TRUE');
  const [inputSearch, setInputSearch] = useState('');
  const [postSelected, setPostSelected] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { push, location } = useHistory();
  const classes = useStyles();

  const fetchData = useCallback(async () => {
    const response = await fetchAllPosts({
      page,
      perPage,
      sortField,
      sortDir,
      active,
      search,
    });
    setPosts(response.data);
    setTotalRows(response.totalItems);
  }, [page, perPage, sortField, sortDir, search, active]);

  useEffect(() => {
    async function callFetchData(): Promise<void> {
      try {
        setLoading(true);
        await fetchData();
      } catch (e) {
        addToast({
          type: 'error',
          title: 'Erro ao carregar lista de posts',
        });
      } finally {
        setLoading(false);
      }
    }
    callFetchData();
  }, [addToast, fetchData]);

  const handleRemove = useCallback(async () => {
    setModalOpen(false);
    if (postSelected) {
      try {
        setLoading(true);
        const { id } = postSelected;
        await fetchPostRemove({ id });
        await fetchData();
        addToast({
          type: 'success',
          title: 'Solicitação processada com sucesso',
        });
      } catch (e) {
        addToast({
          type: 'error',
          title: 'Erro ao processar sua solicitação',
        });
      } finally {
        setLoading(false);
        setPostSelected(null);
      }
    }
  }, [postSelected, addToast, fetchData]);

  const handleSort = useCallback((column, sortDirection) => {
    setSortField(column.sortableField);
    setSortDir(sortDirection.toUpperCase());
  }, []);

  const handleSubmitSearch = useCallback(() => {
    setSearch(inputSearch);
  }, [inputSearch]);

  const toggleActive = useCallback(() => {
    setActive(a => {
      if (a === 'TRUE') return 'FALSE';
      return 'TRUE';
    });
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen(() => !modalOpen);
  }, [modalOpen]);

  const remove = useCallback((item: IPost) => {
    setPostSelected(item);
    setModalOpen(true);
  }, []);

  const handleFormClear = useCallback(() => {
    setSearch('');
    setInputSearch('');
    setPage(1);
  }, []);

  const columns = useMemo(() => {
    return [
      {
        name: 'Titulo',
        selector: 'title',
        sortableField: 'post.title',
        sortable: true,
        cell: (post: IPost) => (
          <TableTitle>
            {post.title}
            <ul>
              <li>
                <a
                  href={`/${post.user.slug}/p/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Tooltip title="Visualize seu Post/Artigo em uma nova aba">
                    Visualizar
                    <FiExternalLink />
                  </Tooltip>
                </a>
              </li>
              <li>
                <button
                  onClick={() =>
                    push(`/dashboard/posts/cadastro/${post.id}`, location.state)
                  }
                  type="button"
                >
                  Editar
                </button>
              </li>
              <li>
                <button type="button" onClick={() => remove(post)}>
                  Remover
                </button>
              </li>
            </ul>
          </TableTitle>
        ),
      },
      {
        name: 'Status',
        seletor: 'active',
        sortable: true,
        sortableField: 'post.active',
        width: '100px',
        center: true,
        cell: (post: IPost) =>
          post.active ? (
            <Tooltip title="Artigo publicado">
              <FiEye color="#4a90e2" />
            </Tooltip>
          ) : (
            <Tooltip title="Rascunho, não visivel para o publico">
              <FiEyeOff color="#ff0b8f" />
            </Tooltip>
          ),
      },
      {
        name: 'Seção',
        sortable: true,
        sortableField: 'section.title',
        width: '250px',
        cell: (post: IPost) =>
          post.section ? post.section.title : 'Sem seção definida',
      },
      {
        name: 'Views',
        selector: 'views',
        sortable: true,
        sortableField: 'post.views',
        center: true,
        width: '75px',
      },
      {
        name: 'Criado em',
        selector: 'formated_date',
        sortable: true,
        sortableField: 'post.created_at',
        center: true,
        width: '140px',
      },
    ];
  }, [remove, location.state, push]);

  return (
    <Layout title="Artigos (Posts)">
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        wrap="wrap-reverse"
      >
        <Grid item>
          <Paper>
            <Formik
              initialValues={{ search: inputSearch }}
              onSubmit={handleSubmitSearch}
            >
              <Form>
                <InputBase
                  placeholder="Filtre seus artigos"
                  inputProps={{ 'aria-label': 'Filtre seus artigos' }}
                  onChange={e => setInputSearch(e.target.value)}
                  style={{ marginLeft: '10px' }}
                  value={inputSearch}
                />
                <IconButton
                  type="submit"
                  aria-label="search"
                  style={{ padding: '10px' }}
                >
                  <SearchIcon />
                </IconButton>
              </Form>
            </Formik>
          </Paper>
        </Grid>
        <Grid item>
          <Box className={classes.actionButtom}>
            <Button variant="outlined" color="secondary" onClick={toggleActive}>
              {active === 'TRUE' ? 'Exibir Rascunhos' : 'Ocultar Rascunhos'}
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.actionButtom}>
            <Button
              onClick={() => push('/dashboard/posts/cadastro', location.state)}
              variant="contained"
              color="secondary"
            >
              Novo Artigo
            </Button>
          </Box>
        </Grid>
      </Grid>
      {search && (
        <SearchResult>
          Filtrado por:
          <b>{search}</b>
          <button type="button" onClick={handleFormClear}>
            Limpar
          </button>
        </SearchResult>
      )}

      <Box mt={5}>
        <DataTable
          columns={columns}
          data={posts}
          progressPending={loading}
          paginationTotalRows={totalRows}
          paginationComponentOptions={{
            rangeSeparatorText: 'de',
            rowsPerPageText: 'Exibir',
          }}
          onChangePage={pageNum => setPage(pageNum)}
          onChangeRowsPerPage={perPageNum => setPerPage(perPageNum)}
          onSort={handleSort}
          progressComponent={<Spinner />}
          noDataComponent={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <ErroMessage
              title="Ops! Nenhum conteúdo encontrado."
              message="Vamos começar? Clique no botão 'Novo Artigo'"
            />
          }
          sortServer
          defaultSortField="formated_date"
          defaultSortAsc={false}
          paginationServer
          theme={isDark ? 'dark' : 'light'}
          pagination
          noHeader
          highlightOnHover
        />
      </Box>
      <Dialog
        open={modalOpen}
        title="Confirme sua solicitação"
        description1="Você deseja remover o item abaixo?"
        description2={postSelected?.title}
        handleClose={toggleModal}
        buttons={[
          {
            label: 'Cancelar',
            handleClick: toggleModal,
          },
          { label: 'Confirmar', handleClick: handleRemove },
        ]}
      />
    </Layout>
  );
};

export default Post;
