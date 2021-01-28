import React from 'react';
import { Paper, Box, Grid, IconButton, Avatar } from '@material-ui/core';

import { FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';

import { IProfile } from './data';

interface CardProps {
  profile: IProfile;
  toggleFavorite(profile: IProfile): void;
}

const CardItem: React.FC<CardProps> = ({ profile, toggleFavorite }) => {
  const classes = useStyles();

  return (
    <Paper
      className={
        profile.premium_account ? classes.cardItemPremium : classes.cardItem
      }
    >
      <IconButton
        className={classes.cardStar}
        onClick={() => toggleFavorite(profile)}
      >
        {profile.isFavorite ? (
          <FiStar size={22} fill="#ffda52" color="#ffda52" />
        ) : (
          <FiStar size={22} color="#ffda52" />
        )}
      </IconButton>
      <Link
        to={`/${profile.slug}`}
        title={`Ir para o perfil de ${profile.name}`}
        style={{ color: '#282a36' }}
      >
        <Box position="relative">
          <Grid container direction="column" alignItems="center" wrap="nowrap">
            <Grid item>
              <Box mx={2} mt={1}>
                {profile.premium_account ? (
                  <Avatar
                    alt={profile.name}
                    src={profile?.avatar_url}
                    className={classes.avatarLargeNews}
                  />
                ) : (
                  <Avatar
                    alt={profile.name}
                    src={profile?.avatar_url}
                    className={classes.avatarLarge}
                  />
                )}
              </Box>
            </Grid>
            <Grid item>
              <Box textAlign="center" padding={1}>
                <Box className={classes.cardTitle}>
                  <div className={classes.cardCandidateFor}>
                    {`Candidato a${' '}`}
                    <span>{profile.candidate_for}</span>
                  </div>
                  {profile.name}
                  <Box className={classes.cardParty}>({profile.party})</Box>
                  {profile?.candidate_vice && (
                    <div className={classes.cardCandidateVice}>
                      {`Vice ${' '}`}
                      <span>{profile.candidate_vice}</span>
                    </div>
                  )}
                </Box>
                <Box m={2}>
                  <Box className={classes.cardNumber}>{profile.number}</Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Link>
    </Paper>
  );
};

export default CardItem;
