import { useEffect, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';
import { fn } from 'storybook/test';
import { useChannel } from 'storybook/preview-api';

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
    deck: [
      {
        label: 'hello world!',
        name: 'button1',
        action: () => { console.log('hello world yeah') },
      },
    ],
  },
  decorators: [
    (Story, context) => {

      // useEffect(() => {
      //   console.log(context);
      // }, [context])

      // useEffect(() => {
      //   console.log(hooks)
      //   console.log(hooks.useArgs)
      //   console.log(hooks.useParameters)
      //   console.log(hooks.useChannel)
      // }, [hooks])

      useChannel({
        button1: () => {
          console.log('hi');
        },
      });

      return <Story />
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
