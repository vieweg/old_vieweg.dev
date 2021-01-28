import React, { useCallback, useState, ChangeEvent, useMemo } from 'react';
import * as Yup from 'yup';

import { Form, Formik, FormikProps } from 'formik';

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Button,
  Avatar,
  Fab,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@material-ui/core';
import { FiCamera, FiX } from 'react-icons/fi';

import { useToast } from '../../../hooks/toast';
import { updateProfile, updateAvatar, IProfile, partidos } from './data';

import { useAuth } from '../../../hooks/auth';
import Layout from '../layout';
import { useStyles } from './styles';

const validateSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  number: Yup.string().required('Número é obrigatório'),
  candidate_for: Yup.string().required('Candidato a é obrigatório'),
  candidate_vice: Yup.string().test(
    'Necessario vice prefeito',
    'Informe o cadidato a vice prefeito',
    function x(value) {
      if (this.parent.candidate_for === 'Prefeito') {
        if (!value) {
          return false;
        }
      }
      return true;
    },
  ),
  party: Yup.string().required('Partido é obrigatório'),
  old_password: Yup.string().test(
    'Senha Atual',
    'Defina a nova senha',
    function x(value) {
      if (!value) {
        return true;
      }
      return !!this.parent.password;
    },
  ),
  password: Yup.string()
    .test('Alterar senha', 'Informe a senha atual', function x(value) {
      if (!value) {
        return true;
      }
      return !!this.parent.old_password;
    })
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      'A senha deve ter no minimo 6 digitos e conter pelo menos uma letra e um numero',
    ),
  password_confirmation: Yup.string().test(
    'Senha diferente',
    'As senhas não coincidem',
    function x(value) {
      return this.parent.password === value;
    },
  ),
});

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isMajor, setIsMajor] = useState(false);
  const [avatar, setAvatar] = useState<File | string | undefined>(
    user.avatar_url,
  );
  const { addToast } = useToast();
  const classes = useStyles();

  const handleSubmit = useCallback(
    async (data: Omit<IProfile, 'slug' | 'id' | 'email' | 'role'>) => {
      setLoading(true);
      try {
        if (avatar instanceof File || avatar === undefined) {
          await updateAvatar(avatar);
        }
        const response = await updateProfile(data);
        updateUser(response);
        addToast({
          type: 'success',
          title: 'Perfil atualizado com sucesso',
        });
      } catch (e) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar seu perfil',
        });
      }
      setLoading(false);
    },
    [addToast, updateUser, avatar],
  );

  const handleUpdateAvatar = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setAvatar(e.target.files[0]);
      }
    },
    [],
  );

  const handleRemoveAvatar = useCallback(() => {
    setAvatar(undefined);
  }, []);

  const renderFieldAvatar = useCallback(() => {
    const image = avatar instanceof File ? URL.createObjectURL(avatar) : avatar;
    return (
      <Box mb={3}>
        <Paper>
          <Box
            display="flex"
            position="relative"
            justifyContent="center"
            maxWidth="292px"
            margin="0px auto"
            p={2}
          >
            <Avatar
              src={image}
              alt={user.name}
              style={{ width: '200px', height: '200px' }}
            />
            <div>
              <Fab
                size="small"
                color="primary"
                aria-label="more"
                disabled={loading}
                onClick={handleRemoveAvatar}
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
                onChange={e => handleUpdateAvatar(e)}
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
        </Paper>
      </Box>
    );
  }, [
    classes,
    loading,
    avatar,
    handleRemoveAvatar,
    handleUpdateAvatar,
    user.name,
  ]);

  const initialValues = useMemo(() => {
    const values = {} as Omit<IProfile, 'slug' | 'id' | 'email'>;
    let facebook = '';
    let instagram = '';
    let twitter = '';
    let youtube = '';
    let linkedin = '';

    if (user.socialLinks) {
      user.socialLinks.forEach(midia => {
        switch (midia.name) {
          case 'facebook':
            facebook = midia.link;
            break;
          case 'instagram':
            instagram = midia.link;
            break;
          case 'twitter':
            twitter = midia.link;
            break;
          case 'youtube':
            youtube = midia.link;
            break;
          case 'linkedin':
            linkedin = midia.link;
            break;
          default:
            break;
        }
      });
    }
    Object.assign(values, {
      ...user,
      facebook,
      instagram,
      twitter,
      youtube,
      linkedin,
    });
    if (!values.candidate_vice) {
      values.candidate_vice = '';
    }
    values.password = '';
    values.old_password = '';
    values.password_confirmation = '';
    return values;
  }, [user]);

  return (
    <Layout title="Atualizar Perfil" subTitle="Mantenha seus dados atualizados">
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={9}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={handleSubmit}
            validationSchema={validateSchema}
          >
            {(
              props: FormikProps<
                Omit<IProfile, 'slug' | 'id' | 'email' | 'role'>
              >,
            ) => {
              const {
                values,
                touched,
                errors,
                handleBlur,
                handleChange,
                isSubmitting,
              } = props;

              return (
                <Form>
                  <Grid container spacing={3}>
                    <Grid
                      item
                      container
                      justify="space-between"
                      direction="row"
                    >
                      <Grid item xs={12} md={4}>
                        {renderFieldAvatar()}
                      </Grid>
                      <Grid
                        item
                        container
                        direction="row"
                        spacing={3}
                        xs={12}
                        md={8}
                      >
                        <Grid item xs={12}>
                          <TextField
                            id="name"
                            name="name"
                            label="Nome de urna"
                            type="text"
                            value={values.name}
                            variant="outlined"
                            fullWidth
                            helperText={
                              errors.name && touched.name ? errors.name : ''
                            }
                            error={!!(errors.name && touched.name)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="number"
                            name="number"
                            label="Número de urna"
                            type="text"
                            value={values.number}
                            variant="outlined"
                            fullWidth
                            helperText={
                              errors.number && touched.number
                                ? errors.number
                                : ''
                            }
                            error={!!(errors.number && touched.number)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl
                            component="fieldset"
                            error={
                              !!(errors.candidate_for && touched.candidate_for)
                            }
                          >
                            <FormLabel component="legend">
                              Candidato a
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-label="candidato a"
                              name="candidate_for"
                              value={values.candidate_for}
                              onChange={e => {
                                handleChange(e);
                                e.target.value === 'Prefeito'
                                  ? setIsMajor(true)
                                  : setIsMajor(false);
                              }}
                              onBlur={handleBlur}
                            >
                              <FormControlLabel
                                value="Prefeito"
                                control={<Radio />}
                                label="Prefeito"
                              />
                              <FormControlLabel
                                value="Vereador"
                                control={<Radio />}
                                label="Vereador"
                              />
                            </RadioGroup>
                            <FormHelperText>
                              {errors.candidate_for && touched.candidate_for
                                ? errors.candidate_for
                                : ''}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    {isMajor && (
                      <Grid item xs={12}>
                        <TextField
                          id="candidate_vice"
                          name="candidate_vice"
                          label="Nome do vice candidato"
                          type="text"
                          value={values.candidate_vice}
                          variant="outlined"
                          fullWidth
                          helperText={
                            errors.candidate_vice && touched.candidate_vice
                              ? errors.candidate_vice
                              : ''
                          }
                          error={
                            !!(errors.candidate_vice && touched.candidate_vice)
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <TextField
                        multiline
                        id="message"
                        name="message"
                        label="Fale brevemente sobre você"
                        variant="outlined"
                        fullWidth
                        value={values.message}
                        helperText={
                          errors.message && touched.message
                            ? errors.message
                            : ''
                        }
                        error={!!(errors.message && touched.message)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        error={!!(errors.party && touched.party)}
                      >
                        <InputLabel id="party">Pelo partido</InputLabel>
                        <Select
                          labelId="party"
                          id="party"
                          label="Pelo partido"
                          name="party"
                          value={values.party}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {partidos.map(p => (
                            <MenuItem key={p} value={p}>
                              {p}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          {errors.party && touched.party ? errors.party : ''}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="coalition"
                        name="coalition"
                        label="Coligação"
                        type="text"
                        value={values.coalition}
                        variant="outlined"
                        fullWidth
                        helperText={
                          errors.coalition && touched.coalition
                            ? errors.coalition
                            : ''
                        }
                        error={!!(errors.coalition && touched.coalition)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                      <Box width="100%" textAlign="center" p={2}>
                        <Typography variant="h6">Redes Sociais</Typography>
                      </Box>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="whatsapp"
                          name="whatsapp"
                          label="Receba mensagens pelo whats"
                          type="text"
                          value={values.whatsapp}
                          variant="outlined"
                          fullWidth
                          helperText={
                            errors.whatsapp && touched.whatsapp
                              ? errors.whatsapp
                              : 'Informe o seu nº no formato(5547999998888)'
                          }
                          error={!!(errors.whatsapp && touched.whatsapp)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="facebook"
                          name="facebook"
                          label="Link do seu facebook"
                          type="text"
                          value={values.facebook}
                          variant="outlined"
                          fullWidth
                          helperText={
                            errors.facebook && touched.facebook
                              ? errors.facebook
                              : ''
                          }
                          error={!!(errors.facebook && touched.facebook)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="instagram"
                          name="instagram"
                          label="Link do seu instagram"
                          type="text"
                          value={values.instagram}
                          variant="outlined"
                          fullWidth
                          helperText={
                            errors.instagram && touched.instagram
                              ? errors.instagram
                              : ''
                          }
                          error={!!(errors.instagram && touched.instagram)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="twitter"
                          name="twitter"
                          label="Link do seu twitter"
                          type="text"
                          value={values.twitter}
                          variant="outlined"
                          fullWidth
                          helperText={
                            errors.twitter && touched.twitter
                              ? errors.twitter
                              : ''
                          }
                          error={!!(errors.twitter && touched.twitter)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="youtube"
                          name="youtube"
                          label="Link do seu youtube"
                          type="text"
                          value={values.youtube}
                          variant="outlined"
                          fullWidth
                          helperText={
                            errors.youtube && touched.youtube
                              ? errors.youtube
                              : ''
                          }
                          error={!!(errors.youtube && touched.youtube)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="linkedin"
                          name="linkedin"
                          label="Link do seu linkedin"
                          type="text"
                          value={values.linkedin}
                          variant="outlined"
                          fullWidth
                          helperText={
                            errors.linkedin && touched.linkedin
                              ? errors.linkedin
                              : ''
                          }
                          error={!!(errors.linkedin && touched.linkedin)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                      <Box width="100%" textAlign="center" p={2}>
                        <Typography variant="h6">Segurança</Typography>
                        <Typography variant="body2">
                          Preencha abaixo caso queira alterar a senha
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="old_password"
                        name="old_password"
                        label="Sua senha atual"
                        type="password"
                        value={values.old_password}
                        variant="outlined"
                        fullWidth
                        helperText={
                          errors.old_password && touched.old_password
                            ? errors.old_password
                            : ''
                        }
                        error={!!(errors.old_password && touched.old_password)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="password"
                        name="password"
                        label="Nova senha"
                        type="password"
                        value={values.password}
                        variant="outlined"
                        fullWidth
                        helperText={
                          errors.password && touched.password
                            ? errors.password
                            : ''
                        }
                        error={!!(errors.password && touched.password)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="password_confirmation"
                        name="password_confirmation"
                        label="Confirme sua nova senha"
                        type="password"
                        value={values.password_confirmation}
                        variant="outlined"
                        fullWidth
                        helperText={
                          errors.password_confirmation &&
                          touched.password_confirmation
                            ? errors.password_confirmation
                            : ''
                        }
                        error={
                          !!(
                            errors.password_confirmation &&
                            touched.password_confirmation
                          )
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
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
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            <Box p={1}>
              <Typography variant="subtitle2" align="center">
                Dicas:
              </Typography>
              <ul style={{ marginLeft: '20px', marginTop: '15px' }}>
                <Typography component="li" variant="body2">
                  Para permitir que falem com você diretamente pelo whatsapp,
                  você deve preencher o campo whatsapp corretamente, para isso,
                  informe seu numero completo sem separadores e/ou espaços, como
                  no exemplo: 5547999998888. onde: 55 é o codigo Brasil, 47 é o
                  DDD e o restante seu numero completo.
                </Typography>
              </ul>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Profile;
