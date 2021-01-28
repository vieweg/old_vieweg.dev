import React from 'react';
import { Helmet, HelmetProps } from 'react-helmet-async';

interface ISEOProps extends HelmetProps {
  title: string;
  description?: string;
  author?: string;
  image?: string;
}
const SEO: React.FC<ISEOProps> = ({
  children,
  title,
  description,
  author,
  image,
}) => (
  <Helmet title={title} titleTemplate={`${title} :: Por Navegantes`}>
    <meta property="og:title" content={title} />
    {description && (
      <meta name="description" content={description.substr(0, 250)} />
    )}
    {description && (
      <meta property="og:description" content={description.substr(0, 250)} />
    )}
    {author && <meta property="article:author" content={author} />}
    <meta property="og:image" content={image} />
    <meta property="og:site_name" content="Por Navegantes" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={window.location.href} />
    <meta property="og:locale" content="pt_BR" />

    {/* <meta property="fb:app_id" content="123456789" /> */}
    {children}
  </Helmet>
);

export default SEO;
