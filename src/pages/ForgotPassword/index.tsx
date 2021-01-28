import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { FiArrowLeft } from 'react-icons/fi';
import { GoHeart } from 'react-icons/go';

import { Button, TextField, withStyles } from '@material-ui/core';
import { Container, AnimatedContent, Content } from './style';
import logoImage from '../../assets/logo-white.png';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface HandleSubmitProps {
  email: string;
}

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

const validateSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email é obrigatório')
    .email('Informe um email válido'),
});

const ForgottPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { push, location } = useHistory();

  const handleSubmit = useCallback(
    async (data: HandleSubmitProps) => {
      setLoading(true);
      try {
        await api.post('/password/forgot', { email: data.email });
        addToast({
          type: 'success',
          title: 'Solicitação realizada com sucesso',
          description:
            'Verifique sua caixa de email, você receberá um email com instruções',
        });
        const timer = setTimeout(() => {
          setLoading(false);
          push('/singin', location.state);
        }, 2500);
        return () => clearTimeout(timer);
      } catch (error) {
        setLoading(false);
        addToast({
          type: 'error',
          title: 'Erro ao efetuar a recuperação',
          description: 'Verifique os dados e tente novamente.',
        });
      }
    },
    [addToast, push, location.state],
  );

  return (
    <>
      <Container>
        <AnimatedContent>
          <Content>
            <div>
              <img
                src={logoImage}
                alt="Por Navegantes"
                width="120px"
                style={{ marginBottom: '20px' }}
              />
              <h1>Portal do Candidato</h1>
              <p>Mantenha sua campanha organizada e focada</p>
            </div>
            <Formik
              initialValues={{ email: '' }}
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
                    <h1>Recuperar minha senha</h1>
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
                    <Button disabled={loading} type="submit" color="secondary">
                      Recuperar senha
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <Link to="/singin">
              <FiArrowLeft />
              Voltar para login
            </Link>
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

export default ForgottPassword;
