import styled, { css } from 'styled-components';

import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFilled: boolean;
  isError: boolean;
  theme: 'light' | 'dark';
}

interface LabelProps {
  theme: 'light' | 'dark';
}

const colors = {
  light: {
    color: '#323232',
    colorFilled: '#077ee4',
    colorFocused: '#077ee4',
    border: '#999',
    borderFilled: '#077ee4',
    borderFocused: '#077ee4',
  },
  dark: {
    color: '#fff',
    colorFilled: '#077ee4',
    colorFocused: '#077ee4',
    border: '#fff',
    borderFilled: '#077ee4',
    borderFocused: '#077ee4',
  },
};

export const Label = styled.label<LabelProps>`
  text-align: left;
  margin: 5px 15px;
  font-size: 15px;
  color: ${props =>
    props.theme === 'dark' ? colors.dark.color : colors.light.color};
`;

export const Help = styled.small<LabelProps>`
  color: ${props =>
    props.theme === 'dark' ? colors.dark.color : colors.light.color};
  opacity: 0.6;
  margin-top: -8px;
  margin-bottom: 8px;
  text-align: right;
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  padding: 16px 0;
  background: transparent;
  border-radius: 15px;
  border: 1px solid;
  margin-bottom: 10px;
  border-color: ${props =>
    props.theme === 'dark' ? colors.dark.border : colors.light.border};
  color: ${props =>
    props.theme === 'dark' ? colors.dark.color : colors.light.color};

  svg {
    margin: 0 0 0 10px;
  }

  &:focus-within {
    border-color: ${props =>
      props.theme === 'dark'
        ? colors.dark.borderFocused
        : colors.light.borderFocused};
  }

  ${props =>
    props.isFilled &&
    css`
      color: ${props.theme === 'dark'
        ? colors.dark.colorFilled
        : colors.light.colorFilled};
      border-color: ${props.theme === 'dark'
        ? colors.dark.borderFilled
        : colors.light.borderFilled};
    `}

  ${props =>
    props.isError &&
    css`
      border-color: #ff0000;
    `}

  input {
    flex: 1;
    background: transparent;
    color: ${props =>
      props.theme === 'dark' ? colors.dark.color : colors.light.color};
    border: none;
    padding: 0 10px;
    font-size: 15px;

    &::placeholder {
      color: ${props =>
        props.theme === 'dark' ? colors.dark.color : colors.light.color};
      opacity: 0.4;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
    }
    &:-webkit-autofill {
      -webkit-text-fill-color: ${props =>
        props.theme === 'dark'
          ? colors.dark.color
          : colors.light.color} !important;
    }
  }
`;

export const Error = styled(Tooltip)`
  margin: 0 16px;

  svg {
    margin: 0;
    color: #ff0000;
  }

  span {
    background-color: #ff0000;
    color: #fff;

    &::before {
      border-color: #ff0000 transparent;
    }
  }
`;
