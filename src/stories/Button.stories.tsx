import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './Button';
import type { CommandsContextType } from '../components/types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onClick: fn(),
  },
  tags: ['autodocs'],
  parameters: {
    commands: [
      {
        name: 'command1',
        description: 'Prints out "Hello World!" in the console.',
        label: 'Hello World!',
        action: () => {
          console.log('Hello world!');
        },
      },
      {
        name: 'flipPrimary',
        description: 'Flips the current value of `primary` in args.',
        action: ({ args, updateArgs }: CommandsContextType) => {
          updateArgs({ primary: !args.primary });
        },
      },
      {
        name: 'printCommandsContext',
        label: 'Print Context',
        description: 'Prints out the `CommandsContext` passed into the action function into the console.',
        action: (context: CommandsContextType) => {
          console.log(context);
        },
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const EmptyCommands: Story = {
  args: {
    label: 'Button',
  },
  parameters: {
    commands: [],
  },
};
