import React from 'react';

import Markdown from 'markdown-to-jsx';
import { Button, codeCommon } from 'storybook/internal/components';
import { useChannel } from 'storybook/manager-api';
import { styled } from 'storybook/theming';
import type { CSSObject } from 'storybook/theming';

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

export type CommandRowProps = {
  row: CommandType;
};

export const CommandRow: React.FC<CommandRowProps> = ({ row }: CommandRowProps) => {
  const { name, description, label } = row;
  const emit = useChannel({});
  const onClick = () => {
    emit('command', name);
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
