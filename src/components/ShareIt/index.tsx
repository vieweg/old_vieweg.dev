import React, { HTMLAttributes } from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

import { Container } from './styles';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  path: string;
  title: string;
}
const ShareIt: React.FC<IProps> = ({ path, title, ...rest }: IProps) => (
  <Container {...rest}>
    <strong>Compartilhe isto</strong>
    <ul>
      <li>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}${path}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="facebook" />
        </a>
      </li>
      <li>
        <a
          href={`https://twitter.com/home?status=${window.location.origin}${path}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="twitter" />
        </a>
      </li>
      <li>
        <a
          href={`https://api.whatsapp.com/send?text=${title} ${window.location.origin}${path}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="whatsapp" />
        </a>
      </li>
    </ul>
  </Container>
);

export default ShareIt;
