import { createStyles, makeStyles, Theme } from '@material-ui/core';
import bgSearchField from '../../assets/bg-navegantes3.jpg';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      background: `url(${bgSearchField}) #f0f8ff no-repeat`,
      backgroundAttachment: 'fixed',
      backgroundPosition: 'top',
      backgroundSize: 'contain',
      padding: '10px 0',
    },
    inputSearch: {
      padding: '2px',
      display: 'flex',
      alignItems: 'center',
      maxWidth: 400,
      margin: '0 auto',
      background: '#fff',
      borderRadius: '5px',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    wrapperCard: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    cardStar: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      zIndex: 1000,
    },
    cardItem: {
      position: 'relative',
      width: '280px',
      margin: theme.spacing(1),
      '&:hover': {
        background: '#f0f8ff',
      },
    },
    cardItemPremium: {
      position: 'relative',

      width: '280px',
      margin: theme.spacing(1),
      background: '#f0f8ff',
      '&:hover': {
        background: '#fff',
      },
    },
    avatarLarge: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      fontSize: '90px',
      border: '4px solid #cacaca',
    },
    avatarLargeNews: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      fontSize: '90px',
      border: '4px solid #3c89b5',
    },
    cardCandidateFor: {
      fontSize: '15px',
      fontWeight: 400,
      marginBottom: '5px',
      '&>span': {
        fontWeight: 700,
      },
    },
    cardCandidateVice: {
      marginTop: '8px',
      fontSize: '13px',
      fontWeight: 400,
      '&>span': {
        fontWeight: 700,
      },
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1,
      '&> a': {
        textDecoration: 'none',
        color: '#3c89b5',
      },
      '&> a:hover': {
        color: '#000',
      },
    },
    cardNumber: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#fff',
      background: '#3c89b5',
      padding: theme.spacing(1),
    },
    cardParty: {
      fontSize: '12px',
      fontWeight: 500,
      margin: '2px 0 18px 0',
    },
    itemNews: {
      padding: '5px 0',
      display: 'flex',
      borderBottom: '1px solid #cacaca',
      background: '#fdfcfc',
      borderRadius: '10px',
      '&:hover': {
        background: '#f0f8ff',
      },
    },
    itemNewsAvatar: {
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
    },
    itemNewsContent: {
      width: '100%',
      marginLeft: '10px',
      padding: '5px',
      textDecoration: 'none',
      color: '#2c2e36',
      fontWeight: 700,
      '&>:hover': {
        color: '#000',
      },
    },
    itemNewsDetails: {
      float: 'right',
      listStyle: 'none',
      fontSize: '12px',
      color: '#2c2e36',
      display: 'inline-flex',
      marginTop: '16px',
      '&>li': {
        padding: '0 5px',
      },
      '&>li>a': {
        textDecoration: 'none',
        color: '#2c2e36',
      },
    },
  }),
);
