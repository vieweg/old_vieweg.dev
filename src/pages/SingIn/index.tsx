import React, { useCallback, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import { GoHeart } from 'react-icons/go';

import { TextField, Button, withStyles } from '@material-ui/core';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { Container, AnimatedContent, Content } from './style';
import logoImage from '../../assets/logo-white.png';

interface HandleSubmitProps {
  email: string;
  password: string;
}

const validateSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Campo obrigatório')
    .email('Insira um email válido'),
  password: Yup.string().required('Campo Obrigatório'),
});

const SingIn: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { push, location } = useHistory();
  const { singIn, user } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: HandleSubmitProps) => {
      setLoading(true);
      try {
        await singIn(data);
      } catch (error) {
        setLoading(false);
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro na autenticação, verifique suas credenciais.',
        });
      }
    },
    [singIn, addToast],
  );

  useEffect(() => {
    if (user) {
      push('/dashboard', location.state);
    }
  }, [push, location.state, user]);

  const CssTextField = withStyles({
    root: {
      '& label.Mui-outlined': {
        color: '#fff',
      },
      '& label.Mui-focused': {
        color: '#fff',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#fff',
      },
      '& .MuiInputLabel-outlined': {
        color: '#fff',
      },
      '& .MuiInputBase-input': {
        color: '#fff',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#fff',
        },
        '&:hover fieldset': {
          borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#72cbfe',
        },
      },
    },
  })(TextField);

  return (
    <>
      <Container>
        <AnimatedContent>
          <Content>
            <div>
              <a href="/">
                <img
                  src={logoImage}
                  alt="Por Navegantes"
                  width="240px"
                  style={{ marginBottom: '20px' }}
                />
              </a>
              <h1>Portal do Candidato</h1>
              <p>Mantenha sua campanha organizada e focada</p>
            </div>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={handleSubmit}
              validationSchema={validateSchema}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  handleBlur,
                  handleChange,
                } = props;
                return (
                  <Form>
                    <h1>Faça seu login</h1>
                    <Field
                      as={CssTextField}
                      name="email"
                      type="text"
                      value={values.email}
                      label="Email"
                      placeholder="Digite seu email cadastrado"
                      variant="outlined"
                      autoComplete="off"
                      fullWidth
                      margin="normal"
                      helperText={
                        errors.email && touched.email ? errors.email : ''
                      }
                      error={!!(errors.email && touched.email)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Field
                      as={CssTextField}
                      name="password"
                      type="password"
                      label="Senha"
                      placeholder="Digite sua senha"
                      variant="outlined"
                      margin="normal"
                      autoComplete="off"
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
                    <Button disabled={loading} type="submit" color="secondary">
                      Entrar
                    </Button>
                    <Link to="/forgot-password">Esqueci minha senha</Link>
                  </Form>
                );
              }}
            </Formik>
            <p>
              Feito com
              <GoHeart />
              em SC
            </p>
          </Content>
        </AnimatedContent>
      </Container>
    </>
  );
};

export default SingIn;
