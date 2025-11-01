import React from 'react';
import { styled } from 'storybook/theming';
import { transparentize } from 'polished';
import { Empty } from './Empty';
import { Skeleton } from './Skeleton';
import { CommandRow } from './CommandRow';
import type { CommandType } from './types';

const TablePositionWrapper = styled.div({
  position: 'relative',
});

export const TableWrapper = styled.table(({ theme }) => ({
  '&&': {
    // Resets for cascading/system styles
    borderSpacing: 0,
    color: theme.color.defaultText,

    'td, th': {
      padding: 0,
      border: 'none',
      verticalAlign: 'top',
      textOverflow: 'ellipsis',
    },
    // End Resets

    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '20px',
    textAlign: 'left',
    width: '100%',

    'th:first-of-type, td:first-of-type': {
      paddingLeft: 20,
    },

    'th:last-of-type, td:last-of-type': {
      paddingRight: 20,
    },

    'th:nth-of-type(0), td:nth-of-type(0)': {
      width: '75%',
    },

    'th:nth-of-type(1), td:nth-of-type(1)': {
      width: '75%',
    },

    th: {
      color:
        theme.base === 'light'
          ? transparentize(0.25, theme.color.defaultText)
          : transparentize(0.45, theme.color.defaultText),
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
    },

    td: {
      paddingTop: '10px',
      paddingBottom: '10px',

      '&:not(:first-of-type)': {
        paddingLeft: 15,
        paddingRight: 15,
      },

      '&:last-of-type': {
        paddingRight: 20,
      },
    },

    // Makes border alignment consistent w/other DocBlocks
    marginLeft: 0,
    marginRight: 0,

    tbody: {
      '> tr > *': {
        // For filter to work properly, the table cells all need to be opaque.
        background: theme.background.content,
        borderTop: `1px solid ${theme.appBorderColor}`,
      },
    },
    // End awesome table styling
  },
}));

export type CommandsTableProps = {
  commands: Array<CommandType>;
  isLoading?: boolean;
  temp: boolean;
};

export const CommandsTable: FC<CommandsTableProps> = ({ commands, isLoading }: CommandsTableProps) => {
  if (isLoading) {
    return <Skeleton />;
  }

  if (commands.length <= 0) {
    return <Empty />;
  }

  return (
    <TablePositionWrapper>
      <TableWrapper className="docblock-argstable sb-unstyled">
        <thead className="docblock-argstable-head">
          <tr>
            <th>
              <span>Description</span>
            </th>
            <th>
              <span>Button</span>
            </th>
          </tr>
        </thead>
        <tbody className="docblock-argstable-body">
          {commands.map((row, index) => {
            return <CommandRow key={index} row={row} />;
          })}
        </tbody>
      </TableWrapper>
    </TablePositionWrapper>
  );
};
