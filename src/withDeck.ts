import { useChannel } from 'storybook/preview-api';
import type { Renderer, StoryContext, PartialStoryFn as StoryFunction } from 'storybook/internal/types';

export const withDeck = (StoryFn: StoryFunction<Renderer>, context: StoryContext<Renderer>) => {
  const { deck = [] } = context.parameters;

  const eventMap = deck.reduce((acc, config) => {
    acc[config.name] = config.action;
    return acc;
  }, {});

  useChannel(eventMap);

  return StoryFn();
};
