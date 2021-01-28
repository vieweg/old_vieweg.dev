import React, { ComponentType } from 'react';
import { FiUser, FiFileText, FiAnchor, FiList } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Paper, Typography, Link, Box, Icon } from '@material-ui/core';
import { IconType } from 'react-icons/lib';

import Layout from '../layout';

interface GridItemProps {
  url: string;
  icon: ComponentType<IconType>;
  title: string;
  content: string;
  sample: string;
}

const GridItem = ({
  title,
  content,
  url,
  sample,
  icon,
}: GridItemProps): JSX.Element => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper elevation={2} style={{ height: '100%' }}>
        <Box padding={2} textAlign="center">
          <Link
            underline="none"
            component={RouterLink}
            to={url}
            color="textPrimary"
          >
            <Icon component={icon} fontSize="large" color="inherit" />
            <Typography variant="h5" variantMapping={{ h5: 'h3' }} gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" paragraph>
              {content}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {sample}
            </Typography>
          </Link>
        </Box>
      </Paper>
    </Grid>
  );
};

const menuItems = [
  {
    title: 'Artigos (Posts)',
    content:
      'Adicione conteúdo, informação a seu perfil. Eles podem ser classificados por seções, mantendo as informações organizadas.',
    url: '/dashboard/posts',
    sample: 'Ex. Projetos de governo, Notícias...',
    icon: FiFileText,
  },
  {
    title: 'Seções de Conteúdo',
    content:
      'Utilize para classificar o conteúdo postado no site, como categorias. Cada seção cria um novo item no menu do seu perfil no site.',
    url: '/dashboard/sections',
    sample: 'Ex. Meus Projetos, Sobre Mim...',
    icon: FiList,
  },
  {
    title: 'Links Úteis',
    content:
      'Disponibilize links para arquivos, vídeos, áudios e outros conteúdos que forem disponibilizados em outras plataformas',
    url: '/dashboard/links',
    sample: 'Ex. Videos Youtube, Jigles Sound CLoud, E-Books Drive...',
    icon: FiAnchor,
  },
  {
    title: 'Atualizar Perfil',
    content: 'Atualize seus dados pessoais e de campanha, como:',
    url: '/dashboard/profile',
    sample: 'Foto, numero, partido, nome, telefones...',
    icon: FiUser,
  },
];

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Box pt={2}>
        <Grid container direction="row" spacing={4}>
          {menuItems.map(item => (
            <GridItem
              key={item.title}
              title={item.title}
              content={item.content}
              sample={item.sample}
              url={item.url}
              icon={item.icon}
            />
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard;
