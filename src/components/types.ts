import type { Args, Parameters, StoryId, StrictArgTypes } from 'storybook/internal/types';

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

export type CommandAction = (context: CommandsContextType) => void;
export interface CommandType {
  name: string;
  description?: string;
  label?: string;
  action: CommandAction;
}
