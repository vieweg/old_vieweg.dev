import { Avatar, Box, Container, Grid } from '@material-ui/core';
import React from 'react';

import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaYoutubeSquare,
  FaLinkedin,
  FaLink,
  FaWhatsapp,
} from 'react-icons/fa';
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

function switchSocialIconRender(name: string): JSX.Element {
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
}

const HeaderProfile: React.FC<IProps> = ({ data }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Container>
        <Grid container direction="row" justify="center" spacing={4}>
          <Grid item xs={12} sm="auto">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={data.avatar_url}
                alt={data.name}
                className={classes.avatarLarge}
              />
              <MidiaLinks>
                Compartilhe meu Cartão
                <ul>
                  <li>
                    <a
                      href={`https://api.whatsapp.com/send?text=Meu%20candidato%20a%20${data.candidate_for}%20-%20${data.name}%20Veja%20Em:%20${window.location.origin}/${data.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp color="#34af23" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/${data.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookSquare color="#3b5998" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://twitter.com/home?status=${window.location.origin}/${data.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitterSquare color="#00acee" />
                    </a>
                  </li>
                </ul>
              </MidiaLinks>
            </Box>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box display="flex" justifyContent="center" flexDirection="column">
              <div className={classes.cardTitle}>
                <div>
                  {data.name}
                  <span className={classes.cardNumber}>{data.number}</span>
                </div>
              </div>
              <div className={classes.cardCandidateFor}>
                Candidato a<span>{data.candidate_for}</span>
              </div>
              <div className={classes.cardParty}>{data.party}</div>
              {data.candidate_vice && (
                <div className={classes.cardCandidateVice}>
                  {`Vice: ${data.candidate_vice}`}
                </div>
              )}
              <div className={classes.cardMessage}>{data.message}</div>
              {data.coalition && (
                <div className={classes.cardCoalition}>{data.coalition}</div>
              )}
              {data.socialLinks && data.socialLinks.length > 0 && (
                <MidiaLinks>
                  Me acompanhe nas redes sociais
                  <ul>
                    {data.socialLinks.map(social => (
                      <li key={social.id}>
                        <a
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {switchSocialIconRender(social.name)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </MidiaLinks>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm="auto">
            <LinksUteis>
              {data.links &&
                data.links.length > 0 &&
                data.links.map(link => {
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
            href={`https://wa.me/${data.whatsapp}?text=Te%20encontrei%20no%20PorNavegantes,%20podemos%20coversar?`}
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
