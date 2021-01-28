import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 40px;

  &.hidden-xs {
    @media (max-width: 587px) {
      display: none;
    }
  }

  &.hidden-md {
    @media (min-width: 587px) {
      display: none;
    }
  }

  ul {
    margin-top: 16px;
    display: flex;
    list-style: none;
    flex-direction: row;
    li {
      & + li {
        margin-left: 12px;
      }
      a {
        svg {
          width: 26px;
          height: 26px;
          transition: all 0.2s;

          &:hover {
            filter: grayscale(80%);
          }
        }
        svg.facebook {
          color: #0000ff;
        }
        svg.twitter {
          color: #1da1f2;
        }
        svg.whatsapp {
          color: #00e676;
        }
      }
    }
  }
`;
