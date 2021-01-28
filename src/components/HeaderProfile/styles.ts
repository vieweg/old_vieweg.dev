import { createStyles, makeStyles, Theme } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      background: '#f0f8ff',
      padding: '16px',
    },
    cardTitle: {
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: 1,
      color: '#3c89b5',
      display: 'inline-flex',
    },
    cardNumber: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#fff',
      background: '#3c89b5',
      padding: '7px 12px 0px 12px',
      marginLeft: '8px',
    },
    cardCandidateFor: {
      fontSize: '15px',
      fontWeight: 400,
      margin: '10px 0 5px 0',
      '&>span': {
        fontWeight: 700,
        marginLeft: '5px',
      },
    },
    avatarLarge: {
      width: '250px',
      height: '250px',
      fontSize: '150px',
      border: '4px solid #cacaca',
    },
    avatarLargeNews: {
      width: '250px',
      height: '250px',
      fontSize: '90px',
      border: '4px solid #3c89b5',
    },
    cardParty: {
      fontSize: '12px',
      fontWeight: 700,
      margin: '2px 0 18px 0',
    },
    cardCandidateVice: {
      fontSize: '20px',
      fontWeight: 400,
      color: '#3c89b5',
    },
    cardCoalition: {
      marginTop: '24px',
      fontSize: '14px',
      fontWeight: 400,
    },
    cardMessage: {
      marginTop: '8px',
      fontSize: '16px',
      fontWeight: 400,
      whiteSpace: 'break-spaces',
    },
    cardStar: {
      position: 'absolute',
      top: '5px',
      right: '5px',
    },
    cardItem: {
      width: '280px',
      margin: theme.spacing(1),
      '&:hover': {
        background: '#f0f8ff',
      },
    },
  }),
);

export const MidiaLinks = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  ul {
    margin-top: 20px;
    list-style: none;
    display: flex;
    flex-direction: row;
    li {
      & + li {
        margin-left: 20px;
      }
      a {
        svg {
          width: 24px;
          height: 24px;
          transition: all 0.2s;

          &:hover {
            filter: grayscale(100%);
          }
        }
      }
    }
  }
`;

export const LinksUteis = styled.ul`
  list-style: none;
  margin-top: 35px;
  li {
    padding: 0 15px;
    border: 1px solid transparent;
    background: #d4ebff;
    border-radius: 5px;
    text-align: center;

    a {
      color: #282a36;
      display: block;
      line-height: 2rem;
    }

    & + li {
      margin-top: 5px;
    }

    &:hover {
      border: 1px solid #3c89b5;
    }
  }
`;
