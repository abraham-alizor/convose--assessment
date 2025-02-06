import React, {memo, useMemo} from 'react';
import type {ListRenderItem} from 'react-native';
import {StyleSheet, FlatList, View, useColorScheme} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {fadeInDownShort, fadeInUpShort} from './helpers';
import {theme} from './theme';
import type {
  AutocompleteDropdownItem,
  IAutocompleteDropdownProps,
} from './types';
import {Box} from '../Box';
import RfValue from '@/helpers/RfValue';
import {Text} from '../Typography';
import TouchableHighlight from '../TouchableHighlight';
import {JSX} from 'react/jsx-runtime';
import Skeleton from 'react-native-reanimated-skeleton';

interface DropdownProps
  extends Omit<IAutocompleteDropdownProps, 'renderItem' | 'ref'> {
  ListEmptyComponent: JSX.Element;
  renderItem: ListRenderItem<AutocompleteDropdownItem>;
}

export const Dropdown = memo((props: DropdownProps) => {
  const {
    loading,
    dataSet,
    suggestionsListMaxHeight,
    renderItem,
    ListEmptyComponent,
    ItemSeparatorComponent,
    direction,
    ...rest
  } = props;
  const themeName = useColorScheme();
  const styles = useMemo(() => getStyles(themeName || 'light'), [themeName]);

  const defaultItemSeparator = useMemo(() => {
    return () => <View style={styles.itemSeparator} />;
  }, [styles.itemSeparator]);

  return (
    <Animatable.View
      useNativeDriver
      animation={direction === 'up' ? fadeInUpShort : fadeInDownShort}
      easing="ease-out-quad"
      delay={direction === 'up' ? 150 : 0}
      duration={150}
      style={{
        ...styles.listContainer,
        ...(rest.suggestionsListContainerStyle as object),
      }}>
      <Box
        backgroundColor={'black'}
        height={RfValue(40)}
        borderTopRightRadius={'sm'}
        borderTopLeftRadius={'sm'}
        flexDirection={'row'}
        columnGap={'md'}
        alignItems={'center'}
        paddingHorizontal={'md'}
        paddingVertical={'sm'}>
        {props.inputValue && (
          <>
            <Text color={'white'}>{props.inputValue}</Text>
            <Text color={'white'} fontStyle={'italic'}>
              {'(Already Added)'}
            </Text>
          </>
        )}
      </Box>

      {/* {loading ? (
        <Box paddingHorizontal={'lg'}>
          <Skeleton
            duration={2000}
            containerStyle={{flex: 1, width: 300}}
            animationDirection="horizontalLeft"
            layout={[
              // long line
              {width: 220, height: 20, marginBottom: 6},
              // short line
              {width: 180, height: 20, marginBottom: 6},
            ]}
            isLoading={loading}
          />
        </Box>
      ) : ( */}
      <FlatList
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        data={dataSet}
        style={{maxHeight: suggestionsListMaxHeight}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparatorComponent ?? defaultItemSeparator}
        {...rest.flatListProps}
      />
      {/* )} */}

      <Box justifyContent={'center'} alignItems={'center'}>
        <TouchableHighlight
          width={RfValue(150)}
          paddingVertical={'sm'}
          borderRadius={'lg'}
          justifyContent={'center'}
          alignItems={'center'}
          borderWidth={2}
          borderColor={'blue400'}
          marginBottom={'md'}>
          <Text color={'Blue800'}>Add "Favorite"</Text>
        </TouchableHighlight>
      </Box>
    </Animatable.View>
  );
});

const getStyles = (themeName: 'light' | 'dark' = 'light') =>
  StyleSheet.create({
    container: {},
    listContainer: {
      backgroundColor: theme[themeName].suggestionsListBackgroundColor,
      width: '100%',
      zIndex: 9,
      borderRadius: 5,
      shadowColor: theme[themeName || 'light'].shadowColor,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.3,
      shadowRadius: 15.46,

      elevation: 20,
    },
    itemSeparator: {
      height: 1,
      width: '100%',
      backgroundColor: theme[themeName || 'light'].itemSeparatorColor,
    },
  });
