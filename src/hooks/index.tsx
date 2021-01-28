import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { WindowSizeProvider } from './windowSize';
import { ProfileProvider } from './profile';
import { ThemeProvider } from './theme';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <WindowSizeProvider>
        <ToastProvider>
          <ProfileProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ProfileProvider>
        </ToastProvider>
      </WindowSizeProvider>
    </AuthProvider>
  );
};

export default AppProvider;
