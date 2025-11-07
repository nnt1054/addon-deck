import EventEmitter from 'eventemitter3';
import { useEffect } from 'react';
import { useChannel, useArgs, useGlobals, useStoryContext } from 'storybook/preview-api';
import type { Renderer, StoryContext, PartialStoryFn as StoryFunction } from 'storybook/internal/types';

import type { CommandType, CommandsContextType } from './components/types';

const emitter = new EventEmitter();

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

  useChannel(
    {
      command: (name) => {
        emitter.emit(name);
      },
    },
    [commands],
  );

  useEffect(() => {
    commands.forEach(({ name, action }: CommandType) => {
      emitter.on(name, () => {
        action(commandsContext);
      });
    });

    return () => {
      emitter.removeAllListeners();
    };
  }, [commandsContext]);

  return StoryFn();
};
