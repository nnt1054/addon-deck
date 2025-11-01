import { useChannel, useArgs, useGlobals, useStoryContext } from 'storybook/preview-api';
import type { Renderer, StoryContext, PartialStoryFn as StoryFunction } from 'storybook/internal/types';

import type { CommandType, CommandsContextType, EventMap } from './components/types';

export const useCommandsContext = (): CommandsContextType => {
  const { id, parameters, initialArgs, argTypes } = useStoryContext();
  const [args, updateArgs, resetArgs] = useArgs();
  const [globals, updateGlobals] = useGlobals();

  return {
    id,
    parameters,
    initialArgs,
    argTypes,
    args,
    updateArgs,
    resetArgs,
    globals,
    updateGlobals,
  };
};

export const withCommands = (StoryFn: StoryFunction<Renderer>, context: StoryContext<Renderer>) => {
  const { commands = [] } = context.parameters;
  const commandsContext = useCommandsContext();

  const eventMap: EventMap = commands.reduce((acc: EventMap, config: CommandType) => {
    acc[config.name] = () => {
      config.action(commandsContext);
    };
    return acc;
  }, {});
  useChannel(eventMap, [commandsContext]);

  return StoryFn();
};
