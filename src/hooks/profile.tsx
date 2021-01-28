import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

import { IHeaderProfile } from '../components/HeaderProfile';
import { IMenuItem } from '../components/Menu';

interface IUpdateProfileProps {
  profileSlug: string;
}
interface ProfileContextData {
  profile: IHeaderProfile;
  menuItems: IMenuItem[] | undefined;
  getProfile({ profileSlug }: IUpdateProfileProps): Promise<void>;
}

const ProfileContext = createContext<ProfileContextData>(
  {} as ProfileContextData,
);

const ProfileProvider: React.FC = ({ children }) => {
  const [profile, setProfile] = useState<IHeaderProfile>({} as IHeaderProfile);
  const [menuItems, setMenuItems] = useState<IMenuItem[] | undefined>([]);

  const { push, location } = useHistory();

  const getProfile = useCallback(
    async ({ profileSlug }) => {
      try {
        const profileResponse = await api.get<IHeaderProfile>(
          `/profile/${profileSlug}`,
        );
        const linksResponse = await api.get(
          `/links/user/${profileResponse.data.id}`,
        );

        Object.assign(profileResponse.data, { links: linksResponse.data });
        setProfile(profileResponse.data);
      } catch (error) {
        push('/page/404', location.state);
      }
    },
    [push, location.state],
  );

  useEffect(() => {
    async function fechMenuData(): Promise<void> {
      try {
        const response = await api.get<IMenuItem[]>(
          `/sections/user/${profile.id}`,
        );
        const initialItems = [
          {
            id: '1',
            title: 'Atualizações',
            slug: 'inicio',
            path: `/${profile.slug}`,
          },
        ];

        const formatedItems = response.data.map(item => {
          const path = `/${profile.slug}/s/${item.slug}`;
          return { ...item, path };
        });

        setMenuItems([...initialItems, ...formatedItems]);
      } catch (error) {
        setMenuItems(undefined);
      }
    }
    if (profile.id) {
      fechMenuData();
    }
  }, [profile.id, profile.slug]);

  return (
    <ProfileContext.Provider value={{ profile, menuItems, getProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

function useProfile(): ProfileContextData {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useAuth must be used whithin an ProfileContext');
  }
  return context;
}
export { ProfileProvider, useProfile };
