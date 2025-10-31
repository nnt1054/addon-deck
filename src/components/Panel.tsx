import React, { memo, useState, useEffect } from 'react';
import { AddonPanel } from 'storybook/internal/components';
import { useParameter, useStorybookState } from 'storybook/manager-api';
import { styled } from 'storybook/theming';
import { CommandsTable } from './CommandsTable'

const AddonWrapper = styled.div({
  display: 'grid',
  gridTemplateRows: '1fr 39px',
  height: '100%',
  maxHeight: '100vh',
  overflowY: 'auto',
});

interface PanelProps {
  active?: boolean;
}

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props: PanelProps) {
  const { path, previewInitialized } = useStorybookState();
  const [isLoading, setIsLoading] = useState(true);

  // If the story is prepared, then show the args table
  // and reset the loading states
  useEffect(() => {
    if (previewInitialized) {
      setIsLoading(false);
    }
  }, [previewInitialized]);

  const commands = useParameter('deck', []);

  return (
    <AddonPanel active={props.active ?? false}>
      <AddonWrapper>
        <CommandsTable
          commands={ commands }
          isLoading={ isLoading }
        />
      </AddonWrapper>
    </AddonPanel>
  );
});
