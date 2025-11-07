# Storybook Addon Commands

## Installation

First, install the package.

```sh
npm install --save-dev storybook-addon-commands
```

Then, register it as an addon in `.storybook/main.js`.

```ts
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    // ...
    '@storybook/addon-docs',
    'storybook-addon-commands', // 👈 register the addon here
  ],
};

export default config;
```

## Usage

The primary way to use this addon is to define the `commands` parameter. You can do this at the
component level, as below, to affect all stories in the file, or you can do it for a single story.

```ts
// Button.stories.ts

// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/your-framework';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
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
    ],
  },
};

export default meta;
```

## API

### Parameters

This addon contributes the `commands` parameter which accepts a list of `CommandType` objects.
Each `CommandType` object consists of the following properties:

#### `name`

Type: `string`
`Required`

Unique `string` used for the event name by the `commands` event listener.

#### `description`

Type: `string`
`Optional`

Description for the command displayed on the table in the Commands Panel.

#### `label`

Type: `string`
`Optional`

Label used for the button that triggers the `action` function. Defaults to `"Confirm"` if no value
is provided.

#### `action`

Type: `function`

Function called when the Command button is clicked. A `CommandsContextType` object with the following
structure is passed as the first and only parameter to the function.

```ts
export interface CommandsContextType {
  id: StoryId;
  parameters: Parameters;
  initialArgs: Args;
  argTypes: StrictArgTypes<Args>;
  args: Args;
  updateArgs: (newArgs: Partial<Args>) => void;
  resetArgs: (argNames?: (keyof Args)[]) => void;
  globals: Args;
  updateGlobals: (newGlobals: Args) => void;
}
```
