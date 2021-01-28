import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => `
  position: relative;

  &:hover > span {
    opacity: 1;
    visibility: visible;
  }

  span {
    width: max-content;
    max-width: 180px;
    background: ${theme.palette.info.main};
    padding: 8px;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    z-index: 2000;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    color: ${theme.palette.secondary.contrastText};
    text-align: center;
    font-size: 12px;
    font-weight: 500;

    &::before {
      content: '';
      border-style: solid;
      border-color: ${theme.palette.info.main} transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
  }`}
`;
