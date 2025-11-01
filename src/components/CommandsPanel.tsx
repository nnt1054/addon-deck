import React, { memo, useState, useEffect } from 'react';
import { AddonPanel } from 'storybook/internal/components';
import { useParameter, useStorybookState } from 'storybook/manager-api';
import { styled } from 'storybook/theming';
import { CommandsTable } from './CommandsTable';

const AddonWrapper = styled.div({
  display: 'grid',
  gridTemplateRows: '1fr 39px',
  height: '100%',
  maxHeight: '100vh',
  overflowY: 'auto',
});

interface CommandsPanelProps {
  active?: boolean;
}

export const CommandsPanel: React.FC<CommandsPanelProps> = memo((props: CommandsPanelProps) => {
  const { path, previewInitialized } = useStorybookState();
  const commands = useParameter('deck', []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (previewInitialized) {
      setIsLoading(false);
    }
  }, [previewInitialized]);

  return (
    <AddonPanel active={props.active ?? false}>
      <AddonWrapper>
        <CommandsTable key={path} commands={commands} isLoading={isLoading} />
      </AddonWrapper>
    </AddonPanel>
  );
});

CommandsPanel.displayName = 'CommandsPanel';
