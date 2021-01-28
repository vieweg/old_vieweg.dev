import React, { useCallback, useState } from 'react';

import Skeleton from 'react-loading-skeleton';
import ShareIt from '../ShareIt';
import { Container, CardTitle, Section, Title } from './styles';

export interface IArticleItem {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  updated_at: string;
  formatedDate: string;
  content: string;
  photos?: [
    {
      id: string;
      title?: string;
      url: string;
    },
  ];
  user: {
    slug: string;
  };
}

interface IProps {
  data: IArticleItem;
}

export const SkeletonCard: React.FC = () => (
  <>
    <Title>
      <Skeleton width="300px" height="30px" />
    </Title>
    <Container>
      <CardTitle>
        <h1>
          <Skeleton height="30px" />
          <Skeleton height="30px" />
        </h1>
        <Skeleton height="10px" />
      </CardTitle>
      <Section>
        <Skeleton width="100%" height="400px" />
        <p>
          <Skeleton count={5} />
        </p>
      </Section>
    </Container>
  </>
);

const Card: React.FC<IProps> = ({ data }) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [imageIsError, setImageIsError] = useState(false);

  const urlify = useCallback(text => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url: string) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">+Click to view</a>`;
    });
  }, []);

  return (
    <Container>
      <CardTitle>
        <h1>{data.title}</h1>
        {data.content && (
          // eslint-disable-next-line
          <p dangerouslySetInnerHTML={{ __html: urlify(data.content) }} />
        )}
      </CardTitle>
      {(data.image_url || data.content) && (
        <Section>
          {data.image_url && (
            <>
              {imageIsLoading && !imageIsError && (
                <Skeleton width="100%" height="350px" />
              )}
              <img
                src={data.image_url}
                alt={data.title}
                onLoad={() => setImageIsLoading(false)}
                onError={() => setImageIsError(true)}
                style={{ display: imageIsLoading ? 'none' : 'block' }}
              />
            </>
          )}
        </Section>
      )}
      <ShareIt path={`/p/${data.slug}`} title={data.title} />
    </Container>
  );
};

export default Card;
