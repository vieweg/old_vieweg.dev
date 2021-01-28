import React, { createContext, useCallback, useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';

import api from '../services/api';

interface SingInProps {
  email: string;
  password: string;
}

interface User {
  id: string;
  slug: string;
  name: string;
  email: string;
  message?: string;
  number: string;
  candidate_for: 'Prefeito' | 'Vereador';
  candidate_vice?: string;
  party: string;
  coalition?: string;
  whatsapp?: string;
  avatar_url?: string;
  role: 'guest' | 'user' | 'admin';
  socialLinks?: [
    {
      id: number;
      name: string;
      link: string;
    },
  ];
}

interface AuthContextData {
  user: User;
  singIn({ email, password }: SingInProps): Promise<void>;
  singOut(): void;
  updateUser(user: User): void;
  tokenValid(): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@PorNavegantes:token');
    const user = localStorage.getItem('@PorNavegantes:user');
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const singIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { user, token } = response.data;
    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      localStorage.clear();
      localStorage.setItem('@PorNavegantes:token', token);
      localStorage.setItem('@PorNavegantes:user', JSON.stringify(user));
      setData({ user, token });
    }
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@PorNavegantes:user', JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  const singOut = useCallback(() => {
    localStorage.removeItem('@PorNavegantes:token');
    localStorage.removeItem('@PorNavegantes:user');
    api.defaults.headers.authorization = null;
    setData({} as AuthState);
  }, []);

  const tokenValid = useCallback(async () => {
    const token = localStorage.getItem('@PorNavegantes:token');
    if (token) {
      const { exp } = jwtDecode(token);
      if (exp < Date.now() / 1000) {
        singOut();
      }
    }
  }, [singOut]);

  api.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error?.response?.status === 401) {
        singOut();
      }
      return Promise.reject(error);
    },
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, singIn, singOut, updateUser, tokenValid }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  context.tokenValid();
  if (!context) {
    throw new Error('useAuth must be used whithin an AuthProvider');
  }
  return context;
}
export { AuthProvider, useAuth };
