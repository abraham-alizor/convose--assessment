import {createBox} from '@shopify/restyle';
import React from 'react';
import {TouchableHighlight as NSTouchableHighlight} from 'react-native';
import {Theme} from '../theme';

const getTouchableHighlight = () =>
  createBox<
    Theme,
    React.ComponentProps<typeof NSTouchableHighlight> & {
      children?: React.ReactNode;
    }
  >(NSTouchableHighlight);

export type TouchableHighlightProps = React.ComponentProps<
  ReturnType<typeof getTouchableHighlight>
>;

const TouchableHighlight = getTouchableHighlight();

export default TouchableHighlight;
export {TouchableHighlight};
