import React from 'react';
import { Link } from 'react-router-dom';

import { FiMenu } from 'react-icons/fi';
import { Container } from './styles';
import ErroMessage from '../../ErrorMessage';
import { IMenuItem } from '../index';

interface IMenuProps {
  items: IMenuItem[] | undefined;
}

const MenuDesktop: React.FC<IMenuProps> = ({ items }) => {
  if (!items) {
    return (
      <Container>
        <ErroMessage
          title="Erro ao carregar menu"
          message="Verifique sua internet e atualize a pagina."
        />
      </Container>
    );
  }
  return (
    <Container>
      <div>
        <FiMenu />
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default MenuDesktop;
