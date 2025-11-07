import HealthBar from './HealthBar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/HealthBar',
  component: HealthBar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    color: { control: 'color' },
  },

  parameters: {
    layout: 'centered',
    commands: [
      {
        name: 'increaseHealth10',
        description: 'Increases health by 10 HP.',
        label: 'Heal +10 HP',
        action: ({ args, updateArgs }) => {
          // console.log(Math.min(args.health + 10, args.maxHealth));
          updateArgs({ health: Math.min(args.health + 10, args.maxHealth) });
        },
      },
      {
        name: 'decreaseHealth15',
        description: 'Decreases health by 10 HP.',
        label: 'Inflict -10 HP',
        action: ({ args, updateArgs }) => {
          updateArgs({ health: Math.max(0, args.health - 10) });
        },
      },
    ],
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  // args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    health: 30,
    maxHealth: 100,
    width: 256,
    color: '#82DFA1',
  },
};
