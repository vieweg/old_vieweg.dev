import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useWindowSize } from '../../hooks/windowSize';

import MenuMobile from './MenuMobile';
import MenuDesktop from './MenuDesktop';

import { ContainerRight, ContainerLeft, ContainerSkeleton } from './styles';

export interface IMenuItem {
  id: string;
  title: string;
  slug: string;
  path: string;
}
interface IProps {
  items: IMenuItem[] | undefined;
  position?: 'right' | 'left';
}

const SkeletonMenu: React.FC = () => {
  const { width: windowWidth } = useWindowSize();
  return (
    <>
      {windowWidth >= 950 && (
        <ContainerSkeleton>
          <ul style={{ width: '100%' }}>
            <li style={{ marginBottom: '15px' }}>
              <Skeleton height={30} />
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Skeleton height={30} />
            </li>
            <li style={{ marginBottom: '5px' }}>
              <Skeleton height={30} />
            </li>
            <li>
              <Skeleton height={30} />
            </li>
            <li>
              <Skeleton height={30} />
            </li>
          </ul>
        </ContainerSkeleton>
      )}
    </>
  );
};

const Menu: React.FC<IProps> = ({ items, position = 'right' }) => {
  const { width: windowWidth } = useWindowSize();

  if (items && items.length === 0) {
    return position === 'right' ? (
      <ContainerRight>
        <SkeletonMenu />
      </ContainerRight>
    ) : (
      <ContainerLeft>
        <SkeletonMenu />
      </ContainerLeft>
    );
  }

  if (windowWidth < 950) {
    return <MenuMobile items={items} />;
  }

  if (position === 'right') {
    return (
      <ContainerRight>
        <MenuDesktop items={items} />
      </ContainerRight>
    );
  }

  return (
    <ContainerLeft>
      <MenuDesktop items={items} />
    </ContainerLeft>
  );
};

export default Menu;
