import { Avatar, Box, Container, Grid } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useStyles, MidiaLinks, LinksUteis } from './styles';
import btnWhats from '../../assets/btn-whats.png';

export interface IHeaderProfile {
  id: string;
  slug: string;
  avatar_url: string;
  name: string;
  number?: string;
  candidate_for: string;
  party: string;
  coalition?: string;
  candidate_vice?: string;
  message?: string;
  whatsapp?: string;
  premium_account: boolean;
  role: 'guest' | 'user' | 'admin';
  links?: [
    {
      id: number;
      title: string;
      url: string;
    },
  ];
  socialLinks?: [
    {
      id: number;
      name: string;
      link: string;
    },
  ];
}

interface IProps {
  data: IHeaderProfile;
}

/* function switchSocialIconRender(name: string): JSX.Element {
  switch (name) {
    case 'facebook':
      return <FaFacebookSquare color="#3b5998" />;
    case 'instagram':
      return <FaInstagram color="#E1306C" />;
    case 'twitter':
      return <FaTwitterSquare color="#00acee" />;
    case 'youtube':
      return <FaYoutubeSquare color="#c4302b" />;
    case 'linkedin':
      return <FaLinkedin color="#0e76a8" />;
    default:
      return <FaLink />;
  }
} */

const HeaderProfile: React.FC<IProps> = ({ data }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Container>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ padding: '25px' }}
        >
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Link to="/">
                <Avatar
                  src={data.avatar_url}
                  alt={data.name}
                  className={classes.avatarLarge}
                />
              </Link>

              {data.socialLinks && data.socialLinks.length > 0 && (
                <MidiaLinks>
                  <ul>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/vieweg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin color="#0e76a8" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/rvieweg/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram color="#E1306C" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/rafael.vieweg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebookSquare color="#3b5998" />
                      </a>
                    </li>
                  </ul>
                </MidiaLinks>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              marginTop={3}
            >
              <div className={classes.cardTitle}>
                <div>{data.name}</div>
              </div>
              {data.candidate_vice && (
                <div className={classes.cardCandidateVice}>
                  {data.candidate_vice}
                </div>
              )}
              {data.message && (
                <div
                  className={classes.cardMessage}
                  // eslint-disable-next-line
                  dangerouslySetInnerHTML={{ __html: data.message }}
                />
              )}
            </Box>
          </Grid>
          {data.links && data.links.length > 0 && (
            <Grid item xs={12} sm="auto">
              <LinksUteis>
                {data.links.map(link => {
                  return (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        title={link.title}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {link.title}
                      </a>
                    </li>
                  );
                })}
              </LinksUteis>
            </Grid>
          )}
        </Grid>
      </Container>
      {data.whatsapp && (
        <div
          style={{
            position: 'fixed',
            bottom: '15px',
            left: '15px',
            zIndex: 10,
          }}
        >
          <a
            href={`https://wa.me/${data.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={btnWhats} alt="Fale comigo" />
          </a>
        </div>
      )}
    </Box>
  );
};

export default HeaderProfile;
