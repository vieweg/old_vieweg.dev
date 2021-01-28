import React, {
  createContext,
  useState,
  useContext,
  useLayoutEffect,
} from 'react';

interface WindowSizeState {
  width: number;
  height: number;
  scrollPosition: number;
}

const windowSizeContext = createContext<WindowSizeState>({} as WindowSizeState);

const WindowSizeProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<WindowSizeState>(() => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
      scrollPosition: 0,
    };
  });

  useLayoutEffect(() => {
    function handleResize(): void {
      const { innerWidth: width, innerHeight: height } = window;
      setData({ ...data, width, height });
    }

    function handleScroll(): void {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollPosition = (winScroll / height) * 100;
      setData({ ...data, scrollPosition });
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data]);

  return (
    <windowSizeContext.Provider
      value={{
        width: data.width,
        height: data.height,
        scrollPosition: data.scrollPosition,
      }}
    >
      {children}
    </windowSizeContext.Provider>
  );
};

function useWindowSize(): WindowSizeState {
  const context = useContext(windowSizeContext);

  if (!context) {
    throw new Error('useAuth must be used whithin an WindowSizeProvider');
  }
  return context;
}

export { WindowSizeProvider, useWindowSize };
