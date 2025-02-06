import type {FC} from 'react';
import React, {memo, useMemo} from 'react';
import type {ViewProps} from 'react-native';
import {StyleSheet, TouchableOpacity, View, useColorScheme} from 'react-native';

import {theme} from './theme';
import {Image} from '../Image';
import BracketText from '@/helpers/BracketText';

interface ScrollViewListItemProps {
  highlight: string;
  title: string;
  loading: boolean | undefined;
  image: string;
  style?: ViewProps['style'];
  onPress?: () => void;
  ignoreAccents?: boolean;
  numberOfLines?: number;
}

export const ScrollViewListItem: FC<ScrollViewListItemProps> = memo(
  ({title, image, onPress}) => {
    const themeName = useColorScheme();
    const styles = useMemo(() => getStyles(themeName || 'light'), [themeName]);

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Image source={{uri: image}} style={{width: 20, height: 20}} />

          <BracketText text={title} />
        </View>
      </TouchableOpacity>
    );
  },
);

const getStyles = (themeName: 'light' | 'dark' = 'light') =>
  StyleSheet.create({
    container: {
      padding: 15,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      columnGap: 20,
      // borderRadius: 14,
      width: '100%',
    },
    text: {
      color: theme[themeName].listItemTextColor,
      fontSize: 16,
      flexGrow: 1,
      flexShrink: 0,
    },
    textBold: {
      fontWeight: 'bold',
    },
  });
