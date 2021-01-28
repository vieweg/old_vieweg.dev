import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { FiMove, FiEdit, FiXSquare } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form, Formik, Field } from 'formik';
import arrayMove from 'array-move';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
} from 'react-beautiful-dnd';

import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Icon,
  Paper,
} from '@material-ui/core';
import {
  fetchLinkCreate,
  fetchLinkUpdate,
  fetchLinksList,
  fetchLinkSort,
  fetchLinkRemove,
  ILink,
} from './data';

import Layout from '../layout';

import Tooltip from '../../../components/Tooltip';
import { useToast } from '../../../hooks/toast';
import Dialog from '../../../components/Dialog';

const validateSchema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  url: Yup.string().required('Url Destino é obrigatório'),
});

const Link: React.FC = () => {
  const [links, setLinks] = useState<ILink[]>([] as ILink[]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputURL, setInputURL] = useState('');
  const [linkSelected, setLinkSelected] = useState<ILink | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await fetchLinksList();
      setLinks(response);
    }
    fetchData();
  }, []);

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      try {
        setLoading(true);
        const { title, url } = values;
        if (inputTitle && linkSelected && inputTitle === linkSelected.title) {
          const { id } = linkSelected;
          const response = await fetchLinkUpdate({ id, title, url });
          const newSections = links.map(item => {
            if (item.id === id) {
              Object.assign(item, response);
            }
            return item;
          });
          setLinks(newSections);
          const formatedData = newSections.map((item, index) => {
            return {
              id: item.id,
              order: index,
            };
          });

          await fetchLinkSort({
            links: formatedData,
          });
          addToast({
            type: 'success',
            title: 'Item processado com sucesso',
          });
        } else {
          const order = links.length;
          const response = await fetchLinkCreate({ title, url, order });
          setLinks([...links, response]);
          addToast({
            type: 'success',
            title: 'Item processado com sucesso',
          });
        }
      } catch (e) {
        addToast({
          type: 'error',
          title: 'Erro ao processar sua solicitação',
        });
      } finally {
        setLoading(false);
        setInputTitle('');
        setInputURL('');
        setLinkSelected(null);
        resetForm({});
      }
    },
    [inputTitle, linkSelected, links, addToast],
  );

  const handleRemove = useCallback(async () => {
    setModalOpen(false);
    if (linkSelected) {
      try {
        const { id } = linkSelected;
        await fetchLinkRemove({ id });
        const newLinks = links.filter(item => item.id !== id);
        setLinks(newLinks);

        const formatedData = newLinks.map((item, index) => {
          return {
            id: item.id,
            order: index,
          };
        });

        await fetchLinkSort({
          links: formatedData,
        });
        addToast({
          type: 'success',
          title: 'Item processado com sucesso',
        });
      } catch (e) {
        addToast({
          type: 'error',
          title: 'Erro ao processar sua solicitação',
        });
      } finally {
        setLinkSelected(null);
      }
    }
  }, [linkSelected, links, addToast]);

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      if (
        !result.destination ||
        result.destination.index === result.source.index
      ) {
        return;
      }

      try {
        setLoading(true);
        const sortLinks = arrayMove(
          links,
          result.source.index,
          result.destination.index,
        );

        const formatedData = sortLinks.map((item, index) => {
          return {
            id: item.id,
            order: index,
          };
        });

        setLinks(sortLinks);

        await fetchLinkSort({
          links: formatedData,
        });

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
      }
    },
    [links, addToast],
  );

  const edit = useCallback((item: ILink) => {
    setLinkSelected(item);
    setInputTitle(item.title);
    setInputURL(item.url);
  }, []);

  const remove = useCallback((item: ILink) => {
    setLinkSelected(item);
    setModalOpen(true);
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen(() => !modalOpen);
  }, [modalOpen]);

  const clearForm = useCallback(() => {
    setInputTitle('');
    setInputURL('');
    setLinkSelected(null);
  }, []);

  useLayoutEffect(() => {
    if (inputTitle && contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [inputTitle]);

  return (
    <Layout title="Links" subTitle="Adicione links de serviços externos">
      <div ref={contentRef} />
      <Grid
        container
        direction="row"
        spacing={4}
        style={{ overflowX: 'hidden' }}
      >
        <Grid item xs={12} sm>
          <Typography align="center" variant="h6" gutterBottom>
            {inputTitle ? `Atualizar item: ${inputTitle}` : 'Cadastrar Novo'}
          </Typography>
          <Formik
            initialValues={{ title: inputTitle, url: inputURL }}
            enableReinitialize
            onSubmit={handleSubmit}
            validationSchema={validateSchema}
          >
            <Form>
              <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="title"
                    type="text"
                    label="Titulo do link"
                    placeholder="Texto do botão"
                    variant="outlined"
                    autoComplete="off"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="url"
                    type="text"
                    label="Endereço externo(URL)"
                    placeholder="Cole o endereço do site"
                    variant="outlined"
                    autoComplete="off"
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                {inputTitle ? (
                  <Grid container justify="space-between" direction="row">
                    <Grid item>
                      <Button
                        disabled={loading}
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        Atualizar
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        type="reset"
                        disabled={loading}
                        onClick={clearForm}
                        variant="contained"
                        color="default"
                      >
                        Cancelar
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid item>
                    <Button
                      disabled={loading}
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      Cadastrar
                    </Button>
                  </Grid>
                )}
              </Box>
            </Form>
          </Formik>
        </Grid>
        <Grid item xs={12} sm>
          <Typography align="center" variant="h6" gutterBottom>
            Lista de links
          </Typography>
          {loading && (
            <Typography align="center" variant="caption">
              Salvando...
            </Typography>
          )}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(provided: DroppableProvided) => (
                <Grid
                  container
                  direction="column"
                  spacing={1}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {links.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      isDragDisabled={loading}
                      index={index}
                    >
                      {draggableProvided => (
                        <Grid
                          item
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                        >
                          <Paper>
                            <Box p={2}>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                              >
                                <Grid item>
                                  <Grid
                                    container
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    justify="center"
                                  >
                                    <Grid
                                      item
                                      {...draggableProvided.dragHandleProps}
                                    >
                                      <Tooltip title="Arraste para reorganizar">
                                        <Icon
                                          component={FiMove}
                                          fontSize="small"
                                        />
                                      </Tooltip>
                                    </Grid>
                                    <Grid item>
                                      <Typography variant="body1">
                                        {`${item.title}`}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid
                                    container
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                  >
                                    <Grid item>
                                      <Tooltip title="Editar item">
                                        <Icon
                                          component={FiEdit}
                                          fontSize="small"
                                          onClick={() => edit(item)}
                                          cursor="pointer"
                                        />
                                      </Tooltip>
                                    </Grid>
                                    <Grid item>
                                      <Tooltip title="Remover item">
                                        <Icon
                                          component={FiXSquare}
                                          fontSize="small"
                                          cursor="pointer"
                                          onClick={() => remove(item)}
                                        />
                                      </Tooltip>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                          </Paper>
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
      <Dialog
        open={modalOpen}
        title="Confirme sua solicitação"
        description1="Você deseja remover o item abaixo?"
        description2={linkSelected?.title}
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

export default Link;
