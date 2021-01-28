import React, { useCallback, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import * as Yup from 'yup';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { GoHeart } from 'react-icons/go';

import { Formik, Form, Field } from 'formik';
import { Container, AnimatedContent, Content } from './style';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import Button from '../../components/formik/Button';
import Input from '../../components/formik/Input';

interface HandleSubmitProps {
  password: string;
  password_confirmation: string;
}

const validateSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Minimo de 6 caracteres'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Confirmação inválida',
  ),
});

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { push, location } = useHistory();
  const params = new URLSearchParams(useLocation().search);

  const handleSubmit = useCallback(
    async (data: HandleSubmitProps) => {
      setLoading(true);
      try {
        const token = params.get('token');

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha Alterada com sucesso',
          description: 'Você já pode proceder com seu login',
        });

        const timer = setTimeout(() => {
          push('/singin', location.state);
        }, 2500);
        setLoading(false);
        return () => clearTimeout(timer);
      } catch (error) {
        setLoading(false);
        addToast({
          type: 'error',
          title: 'Erro ao redefinir a senha',
          description: 'Verifique os dados e tente novamente.',
        });
      }
    },
    [addToast, push, location.state, params],
  );

  return (
    <>
      <Container>
        <AnimatedContent>
          <Content>
            <div>
              <h1>Portal do Candidato</h1>
              <p>Redefinir minha senha, utilize o formulário abaixo.</p>
            </div>
            <Formik
              initialValues={{ password: '', password_confirmation: '' }}
              onSubmit={handleSubmit}
              validationSchema={validateSchema}
            >
              <Form>
                <h1>Nova senha</h1>
                <Field
                  as={Input}
                  icon={FiLock}
                  name="password"
                  type="password"
                  placeholder="Nova senha"
                  theme="dark"
                />
                <Field
                  as={Input}
                  icon={FiLock}
                  name="password_confirmation"
                  type="password"
                  placeholder="Confirme a senha"
                  theme="dark"
                />
                <Button loading={loading} type="submit">
                  Redefinir senha
                </Button>
              </Form>
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

export default ResetPassword;
