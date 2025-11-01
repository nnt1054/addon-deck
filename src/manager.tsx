import React from 'react';
import { addons, types } from 'storybook/manager-api';

import { CommandsPanel } from './components/CommandsPanel';
import { ADDON_ID, PANEL_ID } from './constants';

// Register the addon
addons.register(ADDON_ID, () => {
  // Register a panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Commands',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => <CommandsPanel active={active} />,
  });
});
