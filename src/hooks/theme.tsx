import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {
  useMediaQuery,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  Theme,
} from '@material-ui/core';
import { theme as customTheme } from '../styles/theme';

interface ThemeContextData {
  theme: Theme;
  isDark: boolean;
  changeTheme(): void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const prefersDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDark, setIsDark] = useState(prefersDarkTheme);

  useEffect(() => {
    const storageDarkMode = localStorage.getItem('@PorNavegantes:theme');
    if (storageDarkMode) {
      setIsDark(storageDarkMode === 'dark');
    }
  }, []);

  const changeTheme = useCallback(() => {
    setIsDark(mode => {
      localStorage.setItem('@PorNavegantes:theme', !mode ? 'dark' : 'light');
      return !mode;
    });
  }, []);

  const theme = useMemo(() => {
    return createMuiTheme(
      { palette: { type: isDark ? 'dark' : 'light' } },
      customTheme,
    );
  }, [isDark]);
  return (
    <ThemeContext.Provider value={{ theme, isDark, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAuth must be used whithin an ThemeContext');
  }
  return context;
}
export { ThemeProvider, useTheme };
