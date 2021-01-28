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
  fetchSectionsList,
  fetchSectionUpdate,
  fetchSectionCreate,
  fetchSectionRemove,
  fetchSectionSort,
  ISection,
} from './data';

import Layout from '../layout';

import Tooltip from '../../../components/Tooltip';
import { useToast } from '../../../hooks/toast';
import Dialog from '../../../components/Dialog';

const validateSchema = Yup.object().shape({
  title: Yup.string().required('Nome é obrigatório'),
});

const Section: React.FC = () => {
  const [sections, setSections] = useState<ISection[]>([] as ISection[]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [sectionSelected, setSectionSelected] = useState<ISection | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await fetchSectionsList();
      setSections(response);
    }
    fetchData();
  }, []);

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      try {
        setLoading(true);
        const { title } = values;
        if (
          inputTitle &&
          sectionSelected &&
          inputTitle === sectionSelected.title
        ) {
          const { id } = sectionSelected;
          const response = await fetchSectionUpdate({ id, title });
          const newSections = sections.map(item => {
            if (item.id === id) {
              Object.assign(item, response);
            }
            return item;
          });
          setSections(newSections);
          const formatedData = newSections.map((item, index) => {
            return {
              id: item.id,
              order: index,
            };
          });

          await fetchSectionSort({
            sections: formatedData,
          });
          addToast({
            type: 'success',
            title: 'Item processado com sucesso',
          });
        } else {
          const order = sections.length;
          const response = await fetchSectionCreate({ title, order });
          setSections([...sections, response]);
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
        setSectionSelected(null);
        resetForm({});
      }
    },
    [inputTitle, sectionSelected, sections, addToast],
  );

  const handleRemove = useCallback(async () => {
    setModalOpen(false);
    if (sectionSelected) {
      try {
        const { id } = sectionSelected;
        await fetchSectionRemove({ id });
        const newSections = sections.filter(item => item.id !== id);
        setSections(newSections);

        const formatedData = newSections.map((item, index) => {
          return {
            id: item.id,
            order: index,
          };
        });

        await fetchSectionSort({
          sections: formatedData,
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
        setSectionSelected(null);
      }
    }
  }, [sectionSelected, sections, addToast]);

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
        const sortSections = arrayMove(
          sections,
          result.source.index,
          result.destination.index,
        );

        const formatedData = sortSections.map((item, index) => {
          return {
            id: item.id,
            order: index,
          };
        });

        setSections(sortSections);

        await fetchSectionSort({
          sections: formatedData,
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
    [sections, addToast],
  );

  const edit = useCallback((item: ISection) => {
    setSectionSelected(item);
    setInputTitle(item.title);
  }, []);

  const remove = useCallback((item: ISection) => {
    setSectionSelected(item);
    setModalOpen(true);
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen(() => !modalOpen);
  }, [modalOpen]);

  const clearForm = useCallback(() => {
    setInputTitle('');
    setSectionSelected(null);
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
    <Layout title="Seções">
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
            initialValues={{ title: inputTitle }}
            enableReinitialize
            onSubmit={handleSubmit}
            validationSchema={validateSchema}
          >
            <Form>
              <Field
                as={TextField}
                name="title"
                type="text"
                label="Nome da seção"
                placeholder="Digite o nome da sua nova seção"
                variant="outlined"
                autoComplete="off"
                required
                fullWidth
              />
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
            Lista de seções
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
                  {sections.map((item, index) => (
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
                                        {`${item.title} (${
                                          item.posts?.length || 0
                                        })`}
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
        description2={sectionSelected?.title}
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

export default Section;
