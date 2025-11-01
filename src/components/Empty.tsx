import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import { EmptyTabContent, Link } from 'storybook/internal/components';

import { DocumentIcon } from '@storybook/icons';

import { styled } from 'storybook/theming';

const Wrapper = styled.div(({ theme }) => ({
  height: '100%',
  display: 'flex',
  border: 'none',
  borderRadius: 0,
  padding: 0,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 15,
  background: theme.background.content,
}));

const Links = styled.div(({ theme }) => ({
  display: 'flex',
  fontSize: theme.typography.size.s2 - 1,
  gap: 25,
}));

export const Empty: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(load);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Wrapper>
      <EmptyTabContent
        title={'command deck for adding interactive buttons'}
        description={
          <>
            Controls give you an easy to use interface to test your components. Set your story args and you&apos;ll see
            controls appearing here automatically. (todo: update this lmao)
          </>
        }
        footer={
          <Links>
            <Link href="https://storybook.js.org/docs/essentials/controls?ref=ui" target="_blank" withArrow>
              <DocumentIcon /> Read docs (todo: add a doc link here)
            </Link>
          </Links>
        }
      />
    </Wrapper>
  );
};
