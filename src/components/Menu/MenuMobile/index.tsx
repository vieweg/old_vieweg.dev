import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiX } from 'react-icons/fi';
import { Container, Button } from './styles';
import { useToast } from '../../../hooks/toast';
import { IMenuItem } from '../index';

interface IMenuProps {
  items: IMenuItem[] | undefined;
}

const MenuMobile: React.FC<IMenuProps> = ({ items }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (
      items &&
      items.length > 0 &&
      !sessionStorage.getItem('PorNavegantes::ShowHelpMenu')
    ) {
      const timer = setTimeout(() => {
        addToast({
          type: 'success',
          title: 'Slide the menu to see my latest projects',
        });
        sessionStorage.setItem('PorNavegantes::ShowHelpMenu', 'true');
      }, 2500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [addToast, items]);

  const handleOpenMenu = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  return (
    <>
      {items && items.length > 0 && (
        <Button onTouchStart={handleOpenMenu} onClick={handleOpenMenu}>
          Projects +
        </Button>
      )}
      <Container isOpened={isOpened}>
        <div>
          <div>
            <button type="button" onClick={handleOpenMenu}>
              <FiX />
              Close
            </button>
          </div>
          <ul>
            {items &&
              items.map(item => (
                <li key={item.id}>
                  <Link to={item.path} onClick={handleOpenMenu}>
                    {item.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default MenuMobile;
