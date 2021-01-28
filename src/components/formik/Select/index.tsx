import React, { SelectHTMLAttributes, ComponentType } from 'react';
import { useField } from 'formik';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Label, Error, Help } from './styles';

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  help?: string;
  options?: { label: string; value: string }[];
  containerStyle?: object;
  theme?: 'light' | 'dark';
  icon?: ComponentType<IconBaseProps>;
}

const Select: React.FC<InputProps> = ({
  label,
  help,
  placeholder,
  options,
  icon: Icon,
  containerStyle,
  theme,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { id, name } = props;
  return (
    <>
      {label && (
        <Label theme={theme || 'light'} htmlFor={id || name}>
          {label}
        </Label>
      )}
      <Container
        style={containerStyle}
        isError={meta.touched && !!meta.error}
        isFilled={meta.touched && !!meta.value && !meta.error}
        theme={theme || 'light'}
      >
        {Icon && <Icon size={20} />}
        <select {...field} {...props}>
          {options ? (
            options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option>{placeholder}</option>
          )}
        </select>
        {meta.touched && meta.error ? (
          <Error title={meta.error}>
            <FiAlertCircle />
          </Error>
        ) : null}
      </Container>
      {help && <Help theme={theme || 'light'}>{help}</Help>}
    </>
  );
};

export default Select;
