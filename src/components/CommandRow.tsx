import React from 'react';
import { Button } from 'storybook/internal/components';
import { useChannel } from 'storybook/manager-api';
import Markdown from 'markdown-to-jsx';
import { styled } from 'storybook/theming';
import { codeCommon } from 'storybook/internal/components';
import type { CommandType } from './types';

const Description = styled.div(({ theme }) => ({
  '&&': {
    p: {
      margin: '0 0 10px 0',
    },
    a: {
      color: theme.color.secondary,
    },
  },

  code: {
    ...(codeCommon({ theme }) as CSSObject),
    fontSize: 12,
    fontFamily: theme.typography.fonts.mono,
  } as CSSObject,

  '& code': {
    margin: 0,
    display: 'inline-block',
  },

  '& pre > code': {
    whiteSpace: 'pre-wrap',
  },
}));

export const CommandRow: React.FC<CommandType> = ({ row }: CommandType) => {
  const { name, description, label } = row;
  const emit = useChannel({});
  const onClick = () => {
    emit(name);
  };

  return (
    <tr>
      <td>
        <Description>
          <Markdown>{description}</Markdown>
        </Description>
      </td>
      <td>
        <Button variant="outline" size="medium" onClick={onClick}>
          {label || 'Confirm'}
        </Button>
      </td>
    </tr>
  );
};
