import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
} from 'react';
import { Form, Formik, FormikProps } from 'formik';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Typography,
  Switch,
  Fab,
  Backdrop,
  CircularProgress,
  IconButton,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import filesize from 'filesize';
import { FiCamera, FiX } from 'react-icons/fi';
import Upload from '../../../../components/Upload';
import { useToast } from '../../../../hooks/toast';
import Layout from '../../layout';
import { BorderLinearProgress, useStyles } from './styles';

import {
  fetchPost,
  fetchPostSave,
  fetchSections,
  fetchSendFile,
  fetchRemoveFile,
  IPost,
  IFetchPostSave,
  IPhoto,
  fetchImagePost,
} from '../data';
import ErroMessage from '../../../../components/ErrorMessage';

interface FileProps extends Omit<IPhoto, 'id'> {
  id?: string;
  file?: File;
  readableSize?: string;
}

const validateSchema = Yup.object().shape({
  title: Yup.string().required('O titulo do post é obrigatório'),
  content: Yup.string(),
});

const SavePost: React.FC = () => {
  const [post, setPost] = useState<IPost | undefined>();
  const [postImage, setPostImage] = useState<File | string | undefined>();
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photosAdd, setPhotosAdd] = useState<FileProps[]>([]);
  const [photosRemove, setPhotosRemove] = useState<FileProps[]>([]);

  const [formSections, setFormSections] = useState<
    { label: string; value: string }[]
  >([]);

  const [isSendFiles, setIsSendFiles] = useState<boolean | number>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams<{ id: string }>();
  const { replace } = useHistory();
  const { addToast } = useToast();
  const classes = useStyles();

  useEffect(() => {
    async function loadFormSections(): Promise<void> {
      try {
        const sectionsResponse = await fetchSections();
        const userSections = sectionsResponse.map(section => ({
          label: section.title,
          value: section.id,
        }));
        setFormSections([
          { label: 'Sem seção definida', value: '' },
          ...userSections,
        ]);
      } catch (e) {
        addToast({
          type: 'error',
          title: 'Erro ao carregar as seções',
          description: 'Aguarde uns instantes e tente atualizar a página',
        });
      }
    }

    async function loadPost(): Promise<void> {
      try {
        const postResponse = await fetchPost({ id });
        setPost(postResponse);
        setPhotos(postResponse.photos || ([] as FileProps[]));
        setPostImage(postResponse.image_url);
      } catch (e) {
        setError(true);
      }
    }

    if (id) {
      loadPost();
    } else {
      setPost({} as IPost);
    }
    loadFormSections();
  }, [id, addToast]);

  const initialValues = useMemo(() => {
    return {
      id: (post && post.id) || '',
      title: (post && post.title) || '',
      active: (post && post.active) || false,
      section:
        post && post.section
          ? { label: post.section.title, value: post.section.id }
          : { label: 'Sem seção definida', value: '' },
      content: (post && post.content) || '',
    };
  }, [post]);

  const handleSubmit = useCallback(
    async (data: IFetchPostSave) => {
      setLoading(true);
      try {
        const { title, active, content, section } = data;
        const formData = {
          id,
          title,
          active,
          content,
          section,
        };

        const response = await fetchPostSave(formData);

        const jobFilesSize =
          photosAdd.length +
          photosRemove.length +
          (postImage instanceof File || postImage === undefined ? 1 : 0);

        if (jobFilesSize > 0) {
          const progressStep = 100 / jobFilesSize;
          setIsSendFiles(1);
          // Adiciona as fotos novas
          if (photosAdd.length > 0) {
            // eslint-disable-next-line
            for (const photo of photosAdd) {
              if (photo.file) {
                // eslint-disable-next-line
                await fetchSendFile(response.id, photo.file);
                setIsSendFiles(p => Number(p) + progressStep);
              }
            }
            setPhotosAdd([]);
          }

          // Remove as fotos marcadas
          if (photosRemove.length > 0) {
            // eslint-disable-next-line
            for (const photo of photosRemove) {
              if (photo.id) {
                // eslint-disable-next-line
                await fetchRemoveFile(photo.id);
                setIsSendFiles(p => Number(p) + progressStep);
              }
            }
            setPhotosRemove([]);
          }

          // altera a imagem destacada do post
          if (postImage instanceof File || postImage === undefined) {
            const updatedPost = await fetchImagePost(response.id, postImage);
            Object.assign(response, {
              image: updatedPost.image,
              image_url: updatedPost.image_url,
            });
            setPostImage(updatedPost.image_url);
          }
          setIsSendFiles(false);
        }

        if (!id) {
          replace(`/dashboard/posts/cadastro/${response.id}`);
        } else {
          setPost(response);
        }

        addToast({
          type: 'success',
          title: 'Solicitação processada com sucesso',
        });
      } catch (e) {
        addToast({
          type: 'error',
          title: 'Erro ao processar sua solicitação',
        });
      }
      setLoading(false);
      setIsSendFiles(false);
    },
    [addToast, replace, id, photosAdd, photosRemove, postImage],
  );

  const handleUpdatePostImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setPostImage(e.target.files[0]);
      }
    },
    [],
  );

  const handleRemovePostImage = useCallback(() => {
    setPostImage(undefined);
    setPost(p => {
      if (p) {
        return { ...p, image_url: undefined, image: undefined };
      }
    });
  }, []);

  const loadPhotos = useCallback(
    (acceptedFiles: File[], rejectFiles) => {
      // eslint-disable-next-line
      acceptedFiles.map(file => {
        const { name } = file;
        const readableSize = filesize(file.size);
        const foto_url = URL.createObjectURL(file);
        setPhotos(u => [
          ...u,
          {
            file,
            name,
            readableSize,
            foto_url,
          },
        ]);
        setPhotosAdd(u => [
          ...u,
          {
            file,
            name,
            readableSize,
            foto_url,
          },
        ]);
      });

      if (rejectFiles.length > 0) {
        addToast({
          title: 'Ops! Arquivo invalido!',
          description: 'Verifique o tipo e o tamanhos',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  const removePhotos = useCallback(
    index => {
      const photoRemover = photos[index];
      photos.splice(index, 1);
      setPhotos([...photos]);
      if (photoRemover.id) {
        // Marca a photo que ja estava no backend para remoção
        setPhotosRemove(pr => [...pr, photoRemover]);
      } else {
        // remove a photo que acabou de ser adicionada da lista de adições
        setPhotosAdd(prev =>
          prev.filter(photoAdd => photoAdd.foto_url !== photoRemover.foto_url),
        );
      }
    },
    [photos],
  );

  const renderPostImageField = useCallback(() => {
    const image =
      postImage instanceof File ? URL.createObjectURL(postImage) : postImage;
    if (image) {
      return (
        <Box className={classes.postImageBox}>
          <img src={image} alt="" className={classes.postImage} />
          <div>
            <Fab
              size="small"
              color="primary"
              aria-label="more"
              disabled={loading}
              onClick={handleRemovePostImage}
              className={classes.buttomRemove}
            >
              <FiX size={18} />
            </Fab>
          </div>
          <label htmlFor="icon-button-file">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              onChange={e => handleUpdatePostImage(e)}
            />
            <Fab
              color="primary"
              aria-label="upload picture"
              component="span"
              disabled={loading}
              className={classes.buttomChangeImage}
            >
              <FiCamera size={18} />
            </Fab>
          </label>
        </Box>
      );
    }

    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <label htmlFor="icon-button-file">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              onChange={e => handleUpdatePostImage(e)}
            />
            <IconButton
              color="secondary"
              aria-label="upload picture"
              component="span"
            >
              <FiCamera size={26} />
            </IconButton>
          </label>
        </Grid>
        <Grid item>
          <Typography component="div">
            <Box fontSize="h6">
              Clique para adicionar uma foto de destaque neste artigo
            </Box>
            <Box fontSize={12}>
              (imagens horizontais ficam melhores ao se ajustarem no layout)
            </Box>
          </Typography>
        </Grid>
      </Grid>
    );
  }, [
    classes,
    loading,
    postImage,
    handleUpdatePostImage,
    handleRemovePostImage,
  ]);

  const renderGalery = useCallback(() => {
    return (
      <Box>
        <Grid container direction="row" spacing={2}>
          {photos.map((file, index) => (
            <Grid key={index} item xs={4} sm={3} md={2}>
              <Box className={classes.itemGallery}>
                <img
                  src={file.foto_url}
                  alt=""
                  className={classes.itemGalleryImg}
                />
                <div>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="more"
                    disabled={loading}
                    onClick={() => removePhotos(index)}
                    className={classes.buttomRemove}
                  >
                    <FiX size={18} />
                  </Fab>
                </div>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }, [photos, classes, loading, removePhotos]);

  const renderForm = useCallback(() => {
    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validateSchema}
      >
        {(props: FormikProps<IFetchPostSave>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            setFieldValue,
            isSubmitting,
          } = props;

          return (
            <Form>
              <Grid container spacing={3}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  item
                  xs={2}
                  sm={2}
                >
                  <Grid item>Status</Grid>
                  <Grid item>
                    <Switch
                      name="active"
                      checked={values.active}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </Grid>
                  <Grid item>{values.active ? 'Publicar' : 'Rascunho'}</Grid>
                </Grid>
                <Grid item xs={10} sm={6}>
                  <TextField
                    id="title"
                    name="title"
                    label="Título do post"
                    type="text"
                    value={values.title}
                    variant="outlined"
                    fullWidth
                    helperText={
                      errors.title && touched.title ? errors.title : ''
                    }
                    error={!!(errors.title && touched.title)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    id="section"
                    options={formSections}
                    disableClearable
                    value={values.section}
                    onChange={(_, value) => setFieldValue('section', value)}
                    getOptionSelected={(o, v) => o.value === v.value}
                    getOptionLabel={option => option.label}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Seção"
                        variant="outlined"
                        helperText={
                          errors.section && touched.section
                            ? errors.section
                            : ''
                        }
                        error={!!(errors.section && touched.section)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    id="content"
                    name="content"
                    label="Conteúdo do Post"
                    variant="outlined"
                    fullWidth
                    value={values.content}
                    helperText={
                      errors.content && touched.content ? errors.content : ''
                    }
                    error={!!(errors.content && touched.content)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                  <Paper>
                    <Box textAlign="center" height={200} p={3}>
                      {renderPostImageField()}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                  <Box mb={1} textAlign="center">
                    <Typography component="div">
                      <Box fontSize="h6">Fotos do Artigo</Box>
                      <Box fontSize={12}>
                        (Formatos permitidos: JPG, PNG - Tamanho Máx: 3,5Mb)
                      </Box>
                    </Typography>
                  </Box>
                  <Box m={2}>
                    <Upload
                      onFilesDrop={loadPhotos}
                      accept={['image/*']}
                      maxSize={3.6 * 1024 * 1024}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  {renderGalery()}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={isSubmitting || loading}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    fullWidth
                  >
                    {isSubmitting || loading
                      ? 'Aguarde...'
                      : 'Confirmar mudanças'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  }, [
    initialValues,
    formSections,
    loading,
    handleSubmit,
    renderGalery,
    renderPostImageField,
    loadPhotos,
  ]);

  if (error) {
    return (
      <Layout
        title="Artigo (Post)"
        subTitle="Não foi possivel localizar o registro"
      >
        <ErroMessage
          title="Artigo não localizado!"
          message="Verifique se o artigo que você esta tentando acessar ainda existe ou aguarde alguns instantes e tente novamente."
        />
      </Layout>
    );
  }
  return (
    <Layout title="Artigo (Post)" subTitle={post?.title}>
      {post && formSections ? (
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} md={9}>
            {renderForm()}
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper>
              <Box p={1}>
                <Typography variant="subtitle2" align="center">
                  Dicas:
                </Typography>
                <ul style={{ marginLeft: '20px', marginTop: '15px' }}>
                  <Typography component="li" variant="body2">
                    Você pode usar a chave &quot;Status&ldquo; para manter um
                    artigo no modo rascunho até que você tenha tempo para
                    finaliza-lo.
                  </Typography>
                </ul>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Box textAlign="center" mt={3}>
          Aguarde carregando dados
          <BorderLinearProgress />
        </Box>
      )}
      <Backdrop className={classes.backdrop} open={!!isSendFiles}>
        <Box maxWidth={450} textAlign="center" m={4}>
          <CircularProgress color="inherit" style={{ marginBottom: '32px' }} />
          <BorderLinearProgress
            variant="determinate"
            value={Number(isSendFiles)}
          />
          <Box mt={4}>
            Por favor aguarde um instante, estamos enviado os arquivos que você
            adicionou para o servidor, dependendo da velocidade da internet,
            este procedimento pode demorar um pouco.
          </Box>
        </Box>
      </Backdrop>
    </Layout>
  );
};

export default SavePost;
