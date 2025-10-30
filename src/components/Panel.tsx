import React, { Fragment, memo, useCallback, useState, useEffect } from 'react';
import type { Result } from 'src/types';
import { AddonPanel } from 'storybook/internal/components';
import { Button, Placeholder, TabsState } from 'storybook/internal/components';
import { useChannel, useParameter } from 'storybook/manager-api';
import { styled, useTheme } from 'storybook/theming';

import { ADDON_ID, EVENTS } from '../constants';
import { List } from './List';

interface PanelProps {
  active?: boolean;
}

export const RequestDataButton = styled(Button)({
  marginTop: '1rem',
});

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props: PanelProps) {
  const theme = useTheme();
  const deck = useParameter('deck', []);

  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [{ divs, styled }, setState] = useState<Result>({
    divs: [],
    styled: [],
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => {
      setState(newResults);
    },
  });

  const fetchData = useCallback(() => {
    emit(EVENTS.REQUEST);
  }, [emit]);

  return (
    <AddonPanel active={props.active ?? false}>
      <TabsState initial="overview" backgroundColor={theme.background.hoverable}>
        <div id="overview" title="Overview" color={theme.color.positive}>
          <Placeholder>
            <Fragment>
              Addons can gather details about how a story is rendered. This is panel uses a tab pattern. Click the
              button below to fetch data for the other two tabs.
            </Fragment>
            <Fragment>
              {
                deck.map((config, index) => {
                  const onClick = () => {
                    emit(config.name);
                  }
                  return (
                    <Button key={ index } onClick={ onClick }> { config.label } </Button>
                  )
                })
              }
            </Fragment>
          </Placeholder>
        </div>
        <div id="div" title={`${divs.length} Divs`} color={theme.color.negative}>
          {divs.length > 0 ? (
            <Placeholder>
              <p>The following divs have less than 2 childNodes</p>
              <List
                items={divs.map((item, index) => ({
                  title: `item #${index}`,
                  description: JSON.stringify(item, null, 2),
                }))}
              />
            </Placeholder>
          ) : (
            <Placeholder>
              <p>No divs found</p>
            </Placeholder>
          )}
        </div>
        <div id="all" title={`${styled.length} All`} color={theme.color.warning}>
          {styled.length > 0 ? (
            <Placeholder>
              <p>The following elements have a style attribute</p>
              <List
                items={styled.map((item, index) => ({
                  title: `item #${index}`,
                  description: JSON.stringify(item, null, 2),
                }))}
              />
            </Placeholder>
          ) : (
            <Placeholder>
              <p>No styled elements found</p>
            </Placeholder>
          )}
        </div>
      </TabsState>
    </AddonPanel>
  );
});
