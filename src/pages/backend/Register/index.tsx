import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FiExternalLink } from 'react-icons/fi';
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
import { fetchAllUsers, fetchUserRemove, UserProps } from './data';
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

const Register: React.FC = () => {
  const { addToast } = useToast();
  const { isDark } = useTheme();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortField, setSortField] = useState('user.created_at');
  const [sortDir, setSortDir] = useState<'DESC' | 'ASC'>('DESC');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<'guest' | 'user' | undefined>('user');
  const [userSelected, setUserSelected] = useState<UserProps | null>();
  const [inputSearch, setInputSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { push, location } = useHistory();
  const classes = useStyles();

  const fetchData = useCallback(async () => {
    const response = await fetchAllUsers({
      page,
      perPage,
      sortField,
      sortDir,
      role,
      search,
    });
    setUsers(response.data);
    setTotalRows(response.totalItems);
  }, [page, perPage, sortField, sortDir, search, role]);

  useEffect(() => {
    async function callFetchData(): Promise<void> {
      try {
        setLoading(true);
        await fetchData();
      } catch (e) {
        addToast({
          type: 'error',
          title: 'Erro ao carregar lista de usuarios',
        });
      } finally {
        setLoading(false);
      }
    }
    callFetchData();
  }, [addToast, fetchData]);

  const handleSort = useCallback((column, sortDirection) => {
    setSortField(column.sortableField);
    setSortDir(sortDirection.toUpperCase());
  }, []);

  const handleRemove = useCallback(async () => {
    setModalOpen(false);
    if (userSelected) {
      try {
        setLoading(true);
        const { id } = userSelected;
        await fetchUserRemove({ id });
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
        setUserSelected(null);
      }
    }
  }, [userSelected, addToast, fetchData]);

  const handleSubmitSearch = useCallback(() => {
    setSearch(inputSearch);
  }, [inputSearch]);

  const toggleActive = useCallback(() => {
    setRole(a => {
      if (a === 'user') return 'guest';
      return 'user';
    });
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen(() => !modalOpen);
  }, [modalOpen]);

  const remove = useCallback((item: UserProps) => {
    setUserSelected(item);
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
        name: 'Nome Candidato',
        selector: 'name',
        sortableField: 'user.name',
        sortable: true,
        width: '200px',
        cell: (user: UserProps) => (
          <TableTitle>
            {user.name}
            <ul>
              <li>
                <a
                  href={`/${user.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Tooltip title="Visualizar perfil em uma nova aba">
                    Visualizar
                    <FiExternalLink />
                  </Tooltip>
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    push(
                      `/dashboard/register/cadastro/${user.id}`,
                      location.state,
                    );
                  }}
                  type="button"
                >
                  Editar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    remove(user);
                  }}
                >
                  Remover
                </button>
              </li>
            </ul>
          </TableTitle>
        ),
      },
      {
        name: 'Numero',
        selector: 'number',
        sortable: true,
        sortableField: 'user.number',
        center: true,
      },
      {
        name: 'Candidato a',
        selector: 'candidate_for',
        sortable: true,
        sortableField: 'user.candidate_for',
      },
      {
        name: 'Partido',
        selector: 'party',
        sortable: true,
        sortableField: 'user.party',
        center: true,
      },
      {
        name: 'Criado em',
        selector: 'formated_date',
        sortable: true,
        sortableField: 'user.created_at',
        center: true,
      },
    ];
  }, [location.state, push, remove]);

  return (
    <Layout title="Gerencie os Usuários">
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
              {role === 'user' ? 'Exibir Não Pagantes' : 'Exibir Pagantes'}
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.actionButtom}>
            <Button
              onClick={() =>
                push('/dashboard/register/cadastro', location.state)
              }
              variant="contained"
              color="secondary"
            >
              Novo Usuario
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
          data={users}
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
        description2={userSelected?.name}
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

export default Register;
