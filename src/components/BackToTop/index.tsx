import React, { useCallback, useState, useLayoutEffect } from 'react';
import { FiArrowUpCircle } from 'react-icons/fi';

import { useWindowSize } from '../../hooks/windowSize';
import { Container } from './style';

const BackToTop: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const { scrollPosition } = useWindowSize();

  const toTop = useCallback(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, []);

  useLayoutEffect(() => {
    if (scrollPosition > 10) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [scrollPosition]);

  if (showButton) {
    return (
      <Container onClick={toTop}>
        <FiArrowUpCircle />
      </Container>
    );
  }
  return null;
};

export default BackToTop;
