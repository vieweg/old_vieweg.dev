import React, { ComponentType } from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';
import { useField } from 'formik';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Label, Error, Help } from './styles';

interface Props extends TextareaAutosizeProps {
  name: string;
  label?: string;
  help?: string;
  containerStyle?: object;
  theme?: 'light' | 'dark';
  icon?: ComponentType<IconBaseProps>;
}

const Textarea: React.FC<Props> = ({
  label,
  help,
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
        <TextareaAutosize {...field} {...props} />
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

export default Textarea;
